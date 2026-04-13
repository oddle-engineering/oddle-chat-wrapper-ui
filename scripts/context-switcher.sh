#!/usr/bin/env bash
# context-switcher.sh
# Reads the current git branch + user prompt, selects relevant context/*.md files,
# and injects @import lines into CLAUDE.md between managed markers.
# Fires on every UserPromptSubmit hook — safe to run repeatedly (idempotent).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
CLAUDE_MD="$PROJECT_ROOT/CLAUDE.md"
CONTEXT_DIR="$PROJECT_ROOT/context"

START_MARKER="<!-- dynamic-context:start -->"
END_MARKER="<!-- dynamic-context:end -->"

# ---------------------------------------------------------------------------
# 1. Read the user prompt from stdin (Claude Code passes JSON on UserPromptSubmit)
# ---------------------------------------------------------------------------
PROMPT_JSON=$(cat 2>/dev/null || echo "{}")

if command -v jq &>/dev/null; then
  PROMPT=$(echo "$PROMPT_JSON" | jq -r '.prompt // ""' 2>/dev/null || echo "")
else
  PROMPT=$(echo "$PROMPT_JSON" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    print(data.get('prompt', ''))
except Exception:
    print('')
" 2>/dev/null || echo "")
fi

PROMPT_LOWER=$(echo "$PROMPT" | tr '[:upper:]' '[:lower:]')

# ---------------------------------------------------------------------------
# 2. Get current git branch
# ---------------------------------------------------------------------------
BRANCH=$(git -C "$PROJECT_ROOT" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")

# ---------------------------------------------------------------------------
# 3. Determine which context files to load
# ---------------------------------------------------------------------------
declare -a IMPORTS=()

add_import() {
  local file="$1"
  # Prevent duplicates
  for existing in "${IMPORTS[@]+"${IMPORTS[@]}"}"; do
    [[ "$existing" == "$file" ]] && return
  done
  IMPORTS+=("$file")
}

# --- Branch-based matching ---
case "$BRANCH" in
  feature/websocket-*|fix/websocket-*|fix/connection-*|feature/connection-*|fix/ticket-*)
    add_import "@context/websocket.md" ;;
  feature/ui-*|feature/component-*|fix/ui-*|fix/component-*|feat/chat-*)
    add_import "@context/components.md" ;;
  feature/state-*|fix/state-*|refactor/store-*|refactor/slice-*)
    add_import "@context/state.md" ;;
  feature/api-*|fix/api-*|feature/thread-*|fix/thread-*)
    add_import "@context/api.md" ;;
  feature/types-*|fix/types-*|refactor/types-*)
    add_import "@context/types.md" ;;
  feature/i18n-*|feature/lang-*|fix/i18n-*|chore/translations-*)
    add_import "@context/i18n.md" ;;
  release/*|chore/release-*|chore/build-*|fix/build-*)
    add_import "@context/build-release.md" ;;
esac

# --- Keyword-based matching (supplements branch match) ---
contains() { echo "$PROMPT_LOWER" | grep -qE "$1" 2>/dev/null; }

contains "websocket|connection|socket|\bws\b|ticket|reconnect|disconnect" \
  && add_import "@context/websocket.md"

contains "component|ui\b|render|modal|button|chatwrapper|chat.wrapper|messageitem|message.item|toolinghandle|tooling.handle|chatinput|chat.input" \
  && add_import "@context/components.md"

contains "\bstore\b|state\b|zustand|slice|chatstate|chat.state|layoutstate|layout.state|streamingstatus" \
  && add_import "@context/state.md"

contains "\bapi\b|\bfetch\b|\bthread\b|\bendpoint\b|\bhttp\b|\brequest\b|agentconfig|agent.config" \
  && add_import "@context/api.md"

contains "\btype\b|\binterface\b|\benum\b|\btypedef\b|typescript|inboundmessage|outboundmessage" \
  && add_import "@context/types.md"

contains "i18n|translation|language|locale|internation|tolgee" \
  && add_import "@context/i18n.md"

contains "\bbuild\b|\brelease\b|\bversion\b|\bdeploy\b|changelog|vite|publish|npm.pack|dist\b" \
  && add_import "@context/build-release.md"

# ---------------------------------------------------------------------------
# 4. Build the replacement block
# ---------------------------------------------------------------------------
build_block() {
  echo "$START_MARKER"
  if [ ${#IMPORTS[@]} -eq 0 ]; then
    echo "<!-- no specific context loaded | branch: $BRANCH -->"
  else
    for imp in "${IMPORTS[@]}"; do
      echo "$imp"
    done
  fi
  echo "$END_MARKER"
}

NEW_BLOCK=$(build_block)

# ---------------------------------------------------------------------------
# 5. Replace the managed section in CLAUDE.md (idempotent)
# ---------------------------------------------------------------------------
python3 - <<PYEOF
import re, sys, pathlib

claude_md_path = pathlib.Path("$CLAUDE_MD")

if not claude_md_path.exists():
    print("context-switcher: CLAUDE.md not found, skipping", file=sys.stderr)
    sys.exit(0)

content = claude_md_path.read_text(encoding="utf-8")

start_marker = "$START_MARKER"
end_marker   = "$END_MARKER"
new_block    = """$NEW_BLOCK"""

pattern = re.escape(start_marker) + r".*?" + re.escape(end_marker)

if re.search(pattern, content, re.DOTALL):
    updated = re.sub(pattern, new_block, content, flags=re.DOTALL)
else:
    # Markers not found — append section
    updated = content.rstrip() + "\n\n# --- dynamic context (auto-managed) ---\n\n" + new_block + "\n"

if updated != content:
    claude_md_path.write_text(updated, encoding="utf-8")
PYEOF
