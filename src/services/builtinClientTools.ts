import type { Tool, Tools } from "../types";

/**
 * Reserved tool name for the built-in "ask the user a structured question"
 * client tool. The ToolHandler short-circuits this tool: instead of executing
 * a user-supplied function, it emits a synthetic `ui_component` render event
 * that mounts the built-in `AskUserInputV0` form, then acks the tool call so
 * the agent doesn't block on a response. The actual user answer flows back as
 * a normal chat message when the form is submitted — same UX as the legacy
 * server-driven `render_ui` path.
 */
export const ASK_USER_QUESTION_TOOL_NAME = "ask_user_question";

/**
 * Built-in client tool that lets the agent ask the user one or more clarifying
 * questions through a structured form. Mirrors the prop shape of
 * `AskUserInputV0` but trimmed to two top-level params for easier agent use:
 *
 *  - `type`: "single" (radio, exactly one answer per question) or "multiple"
 *    (checkbox, one or more answers per question). Applies to every question
 *    in the call.
 *  - `questions_list`: ordered array of `{ title, options[] }`. The form
 *    reveals questions progressively as the user answers them and submits all
 *    answers as a single chat message.
 *
 * The tool's `execute` function is a no-op fallback — the ToolHandler
 * intercepts the call before it reaches here and routes the parameters into
 * the UI render pipeline. The fallback is only invoked if interception is
 * bypassed (e.g. when this tool definition is registered through
 * `addClientTools` on a chat client that doesn't know to intercept).
 */
export const askUserQuestionTool: Tool = {
  name: ASK_USER_QUESTION_TOOL_NAME,
  description:
    "Render an in-chat form that asks the user one or more structured " +
    "clarifying questions before continuing. Use whenever you would " +
    "otherwise ask the user a small, well-defined set of choices — picking " +
    "a campaign goal, confirming a preference, narrowing an audience, etc. " +
    "Set `type` to \"single\" for radio (one answer per question) or " +
    "\"multiple\" for checkbox (one or more answers per question); the mode " +
    "applies to every question in `questions_list`. Each entry in " +
    "`questions_list` is `{ title, options?, allow_free_text? }`. " +
    "`options` is a list of short labels (2–6 per question) the user picks " +
    "from. Set `allow_free_text: true` to render a text input the user " +
    "types into — use for open-ended answers that can't be pre-enumerated " +
    "(dates, names, free-form notes). A question with `allow_free_text: " +
    "true` and no `options` renders as a pure text input; combining both " +
    "is allowed (for \"multiple\" the typed text is included alongside " +
    "any checked picks; for \"single\" the input and radios are mutually " +
    "exclusive — typing deselects the picked option). The form reveals " +
    "questions one at a time and submits the user's full set of answers " +
    "as a single chat message when they hit Submit. Do not use for ranking " +
    "or casual conversational replies — pose those in chat text instead.",
  parameters: [
    {
      name: "type",
      type: "string",
      description:
        "Answer mode applied to every question: \"single\" renders radios " +
        "(exactly one pick per question) and \"multiple\" renders " +
        "checkboxes (one or more picks per question).",
      isRequired: true,
      schema: {
        type: "string",
        enum: ["single", "multiple"],
      },
    },
    {
      name: "questions_list",
      type: "array",
      description:
        "Ordered list of questions to ask. Each item is `{ title, " +
        "options?, allow_free_text? }`. Every item needs at least one of " +
        "`options` (a list of 2–6 short string labels) or " +
        "`allow_free_text: true` — a question with neither offers the user " +
        "nothing to do and is skipped.",
      isRequired: true,
      schema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Question text shown above the input(s).",
            },
            options: {
              type: "array",
              items: { type: "string" },
              description:
                "Reply options for this question. 2–6 entries is the " +
                "comfortable range; fewer isn't a real choice, more hurts " +
                "readability. Omit when asking a pure free-text question.",
            },
            allow_free_text: {
              type: "boolean",
              description:
                "When true, render a text input the user types into. Use " +
                "for open-ended answers that can't be pre-enumerated " +
                "(dates, names, free-form notes). Combine with `options` " +
                "only when picking from the list AND typing a custom " +
                "answer are both meaningful — otherwise drop `options` " +
                "and ask pure free-text.",
            },
          },
          required: ["title"],
        },
      },
    },
  ],
  execute: async () => ({ rendered: true }),
};

export const BUILTIN_CLIENT_TOOLS: Tools = [askUserQuestionTool];

/**
 * Merge consumer-supplied client tools with the library's built-ins. Ordering
 * mirrors `mergeWithBuiltinComponents`: consumer entries come first so an app
 * can override a built-in by registering a tool with the same name (most
 * registry-style lookups in this library are first-write-wins).
 */
export function mergeWithBuiltinClientTools(user?: Tools): Tools {
  if (!user || user.length === 0) {
    return [...BUILTIN_CLIENT_TOOLS];
  }
  const userNames = new Set(user.map((tool) => tool.name));
  const builtins = BUILTIN_CLIENT_TOOLS.filter(
    (tool) => !userNames.has(tool.name),
  );
  return [...user, ...builtins];
}

/**
 * Parameters as they arrive from the agent for `ask_user_question`.
 * Kept loose (`unknown`-like) because the LLM may produce slightly off-shape
 * payloads — the mapper in `mapAskUserQuestionParamsToProps` normalizes them
 * before handing off to `AskUserInputV0`.
 */
export interface AskUserQuestionParams {
  type?: "single" | "multiple" | string;
  questions_list?: Array<{
    title?: string;
    options?: Array<string | { label?: string; value?: string }>;
    /**
     * Tool-side spelling — `snake_case` to match how it's advertised to the
     * agent. The mapper translates this into `allowFreeText` (the camelCase
     * prop `AskUserInputV0` expects).
     */
    allow_free_text?: boolean;
    /** Tolerated alias in case the agent uses camelCase by mistake. */
    allowFreeText?: boolean;
  }>;
}

/**
 * Translate `ask_user_question` tool params into the prop shape that
 * `AskUserInputV0` expects. The built-in tool exposes a deliberately smaller
 * surface (one `type` for the whole call, options as bare strings) than the
 * generative-UI schema; this mapper bridges the two so the same form
 * component can power both entry points.
 */
export function mapAskUserQuestionParamsToProps(
  params: AskUserQuestionParams | undefined,
): Record<string, unknown> {
  const rawType = params?.type;
  const questionType =
    rawType === "multiple" || rawType === "multi_choice"
      ? "multi_choice"
      : "single_choice";

  const questionsList = Array.isArray(params?.questions_list)
    ? params!.questions_list!
    : [];

  const questions = questionsList.map((q) => {
    const options = Array.isArray(q?.options) ? q!.options! : [];
    // Accept either snake_case (tool surface) or camelCase (defensive
    // alias) so a sloppy agent payload still renders the text input.
    const allowFreeText =
      q?.allow_free_text === true || q?.allowFreeText === true;
    return {
      title: typeof q?.title === "string" ? q.title : undefined,
      type: questionType,
      options: options.map((opt) =>
        typeof opt === "string"
          ? { label: opt }
          : { label: opt?.label, value: opt?.value },
      ),
      allowFreeText,
    };
  });

  return { questions };
}
