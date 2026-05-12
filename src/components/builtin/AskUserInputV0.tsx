import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useChatActions } from "../../hooks/useChatActions";
import { useGenerativeRender } from "../../contexts/GenerativeRenderContext";

export const AskUserInputV0OptionSchema = z.object({
  label: z
    .string()
    .optional()
    .describe("Button label shown to the user. Keep short (≤ 32 chars)."),
  value: z
    .string()
    .optional()
    .describe(
      "Optional value sent back when this option is selected. Defaults to `label`. Use this when the visible label differs from the answer you want the agent to receive (e.g. label \"Yes\" → value \"Yes, schedule the campaign for next Friday\").",
    ),
});

export const AskUserInputV0QuestionTypeSchema = z.enum([
  "single_choice",
  "multi_choice",
]);

export const AskUserInputV0QuestionSchema = z.object({
  id: z
    .string()
    .optional()
    .describe(
      "Stable identifier for this question. Optional — falls back to a positional id (q1, q2, …).",
    ),
  title: z
    .string()
    .optional()
    .describe(
      "The question text shown above the options (e.g. \"Which campaign idea do you want to run next?\").",
    ),
  type: AskUserInputV0QuestionTypeSchema.optional().describe(
    "single_choice = pick exactly one (radio). multi_choice = pick one or more (checkbox). Defaults to single_choice.",
  ),
  options: z
    .array(AskUserInputV0OptionSchema)
    .optional()
    .describe(
      "Reply options for this question. Provide 2–6 — fewer is not a meaningful choice; more hurts readability.",
    ),
  helperText: z
    .string()
    .optional()
    .describe(
      "Hint shown inline after the bolded title (e.g. \"Pick one\", \"Pick one or more\"). Auto-derived from `type` when omitted.",
    ),
  allowFreeText: z
    .boolean()
    .optional()
    .describe(
      "When true, render a text input below the options where the user can type their own answer. For single_choice, the input is mutually exclusive with the radio picks (typing into the input deselects radios; picking a radio clears the input). For multi_choice, the typed text combines with any selected checkboxes on submit. Defaults to false.",
    ),
});

export const AskUserInputV0PropsSchema = z.object({
  prompt: z
    .string()
    .optional()
    .describe(
      "Optional intro shown above the questions. Plain text only.",
    ),
  questions: z
    .array(AskUserInputV0QuestionSchema)
    .optional()
    .describe(
      "One or more questions. When the agent provides several, the form steps through them one at a time (Back/Next navigation) and submits all answers together as a single message when the user clicks Submit on the final step.",
    ),
  submitLabel: z
    .string()
    .optional()
    .describe("Label for the submit button. Defaults to \"Submit\"."),
});

export type AskUserInputV0Props = z.infer<typeof AskUserInputV0PropsSchema>;
export type AskUserInputV0Question = z.infer<typeof AskUserInputV0QuestionSchema>;
export type AskUserInputV0QuestionType = z.infer<
  typeof AskUserInputV0QuestionTypeSchema
>;

const MAX_OPTIONS_PER_QUESTION = 6;
const FREE_TEXT_PLACEHOLDER = "Type your answer here…";

type Answers = Record<string, string[]>;
type FreeTextValues = Record<string, string>;

type RenderableQuestion = {
  question: AskUserInputV0Question;
  qIndex: number;
  opts: Array<{ label?: string; value?: string }>;
};

function questionId(q: AskUserInputV0Question, index: number): string {
  const base = q.id?.trim() || `q${index + 1}`;
  return `${base}-${index}`;
}

function defaultHelper(type: AskUserInputV0QuestionType | undefined): string {
  return type === "multi_choice" ? "Pick one or more" : "Pick one";
}

function optionLabel(label: string | undefined, fallbackIndex: number): string {
  return label?.trim() || `Option ${fallbackIndex + 1}`;
}

function optionValue(
  value: string | undefined,
  label: string | undefined,
  fallbackIndex: number,
): string {
  return value?.trim() || optionLabel(label, fallbackIndex);
}

/**
 * Map a stored picked-value back to its visible label. Used by the summary
 * view so the user sees the same text they clicked, even when the agent
 * provided a `value` that differs from the `label`.
 */
function findOptionLabel(
  opts: Array<{ label?: string; value?: string }>,
  pickedValue: string,
): string {
  for (let i = 0; i < opts.length; i++) {
    const opt = opts[i];
    if (optionValue(opt.value, opt.label, i) === pickedValue) {
      return optionLabel(opt.label, i);
    }
  }
  return pickedValue;
}

/**
 * Backwards-compat shim: cards persisted before the multi-question redesign
 * arrive with `{ prompt, options }` (no `questions[]`). Treat that as a single
 * single_choice question so rehydrated history still renders meaningfully.
 */
function normalizeQuestions(
  questions: AskUserInputV0Question[] | undefined,
  legacyOptions:
    | Array<{ label?: string; value?: string }>
    | undefined,
): AskUserInputV0Question[] {
  if (questions && questions.length > 0) return questions;
  if (legacyOptions && legacyOptions.length > 0) {
    return [
      {
        id: "q1",
        type: "single_choice",
        options: legacyOptions,
      },
    ];
  }
  return [];
}

function formatSubmission(
  prompt: string | undefined,
  entries: RenderableQuestion[],
  answers: Answers,
  freeTextValues: FreeTextValues,
): string {
  const lines: string[] = [];
  if (prompt?.trim()) {
    lines.push(prompt.trim());
    lines.push("");
  }
  entries.forEach(({ question, qIndex }) => {
    const id = questionId(question, qIndex);
    const type = question.type ?? "single_choice";
    const picks = answers[id] ?? [];
    const text = (freeTextValues[id] ?? "").trim();
    // multi_choice combines every selected option AND the typed text.
    // single_choice picks win when present; the typed text only contributes
    // when no radio is selected. (togglePick / handleFreeTextChange enforce
    // mutual exclusion for single_choice, so this is just a safety join.)
    const parts =
      type === "multi_choice"
        ? [...picks, ...(text ? [text] : [])]
        : picks.length > 0
          ? [...picks]
          : text
            ? [text]
            : [];
    if (parts.length === 0) return;
    const title = question.title?.trim() || `Q${qIndex + 1}`;
    lines.push(`${title} ${parts.join(", ")}`);
  });
  return lines.join("\n").trim();
}

export function AskUserInputV0(props: Partial<AskUserInputV0Props>) {
  const { prompt, questions, submitLabel } = props;
  // Older persisted cards carry `options` directly on the root (no questions[]).
  const legacyOptions = (props as { options?: AskUserInputV0Question["options"] })
    .options;
  const { sendMessage, isStreaming } = useChatActions();
  const render = useGenerativeRender();
  const [answers, setAnswers] = useState<Answers>({});
  // Per-question typed text for questions that opt into `allowFreeText`.
  // Kept separate from `answers` so multi_choice can combine option picks
  // with a custom text answer in one submission.
  const [freeTextValues, setFreeTextValues] = useState<FreeTextValues>({});
  const [submitted, setSubmitted] = useState(false);
  // Progressive reveal: how many questions are visible right now. Starts at
  // 1, advances by one each time the user picks the latest-revealed
  // question. Strictly one-way — once revealed, a question stays visible
  // and stays editable so users can change earlier answers before Submit.
  const [revealedCount, setRevealedCount] = useState(1);
  // Question ids the user has explicitly re-opened via "Change answer".
  // single_choice questions auto-collapse to a summary view once answered;
  // clicking Change answer puts that question back into edit mode while
  // still keeping any later revealed questions visible.
  const [editingIds, setEditingIds] = useState<Set<string>>(() => new Set());

  // Auto-scroll the chat to keep newly-revealed questions in view. We hold
  // a ref to the outer container and the previous revealedCount so we can
  // scroll only on forward advances (not on initial mount, not when the
  // user clicks Change answer, not on rehydrate).
  const containerRef = useRef<HTMLDivElement>(null);
  const previousRevealedCount = useRef(revealedCount);
  useEffect(() => {
    if (revealedCount > previousRevealedCount.current) {
      // Scroll the bottom edge of the form into view inside the chat's
      // scrollable container — pushes the just-revealed question (and the
      // Submit button on the final advance) into the visible area.
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
    previousRevealedCount.current = revealedCount;
  }, [revealedCount]);

  // A card is the "active" question only when it's the most recent
  // ui-component AND no user message has come after it. Older cards (already
  // answered, or superseded by a newer card) lock their option controls.
  const isLatest = render?.isLatest ?? true;
  const safeQuestions = normalizeQuestions(questions, legacyOptions);

  // Skip questions that offer the user nothing to do — no options AND no
  // free-text input. A title with neither input affordance would just be
  // dead UI. Questions with only `allowFreeText: true` (no options) are
  // still kept; they render as a single text input.
  const renderableQuestions: RenderableQuestion[] = safeQuestions
    .map((question, qIndex) => ({
      question,
      qIndex,
      opts: (question.options ?? []).slice(0, MAX_OPTIONS_PER_QUESTION),
    }))
    .filter(
      ({ opts, question }) =>
        opts.length > 0 || question.allowFreeText === true,
    );

  const totalSteps = renderableQuestions.length;
  // Clamp — `questions` can shrink while streaming or be empty momentarily.
  const safeRevealedCount = Math.max(
    1,
    Math.min(revealedCount, Math.max(totalSteps, 1)),
  );
  const visibleQuestions = renderableQuestions.slice(0, safeRevealedCount);
  const allRevealed = totalSteps > 0 && safeRevealedCount >= totalSteps;

  // Options are interactive only while this is the active question and the
  // user hasn't submitted yet. Once submitted, the form locks for good — the
  // user's picks remain highlighted (via the `--picked` class) so they can
  // still see what they answered.
  const optionsDisabled = submitted || !isLatest;

  // Auto-reveal: when the user makes a pick OR types a non-empty free-text
  // answer on the latest revealed question, expose the next one. One-way —
  // earlier questions stay revealed and editable, so users can revise an
  // earlier answer before Submit.
  useEffect(() => {
    if (optionsDisabled) return;
    if (totalSteps === 0 || revealedCount >= totalSteps) return;
    const latest = renderableQuestions[revealedCount - 1];
    if (!latest) return;
    const id = questionId(latest.question, latest.qIndex);
    const hasPick = (answers[id] ?? []).length > 0;
    const hasText = (freeTextValues[id] ?? "").trim().length > 0;
    if (hasPick || hasText) {
      setRevealedCount((c) => Math.min(c + 1, totalSteps));
    }
    // renderableQuestions is rebuilt every render but we only read by index.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, freeTextValues, optionsDisabled, totalSteps, revealedCount]);

  const isQuestionAnswered = (entry: RenderableQuestion): boolean => {
    const id = questionId(entry.question, entry.qIndex);
    const picks = answers[id] ?? [];
    const text = (freeTextValues[id] ?? "").trim();
    return picks.length > 0 || text.length > 0;
  };

  const togglePick = (
    qIndex: number,
    type: AskUserInputV0QuestionType | undefined,
    value: string,
  ) => {
    if (optionsDisabled) return;
    const id = questionId(safeQuestions[qIndex], qIndex);
    setAnswers((prev) => {
      if (type === "multi_choice") {
        const current = prev[id] ?? [];
        const next = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        return { ...prev, [id]: next };
      }
      // single_choice (default): replace selection
      return { ...prev, [id]: [value] };
    });
    // Single_choice is mutually exclusive between radio and free-text input.
    // Picking a radio clears any typed text so the active answer is
    // unambiguous. multi_choice keeps both — they combine on submit.
    if (type !== "multi_choice") {
      setFreeTextValues((prev) => ({ ...prev, [id]: "" }));
      // Auto-collapse this question to its summary view. If the user
      // re-opened it via "Change answer", picking again ends the edit.
      setEditingIds((prev) => {
        if (!prev.has(id)) return prev;
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleChangeAnswer = (qIndex: number) => {
    if (optionsDisabled) return;
    const id = questionId(safeQuestions[qIndex], qIndex);
    setEditingIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleFreeTextChange = (
    qIndex: number,
    type: AskUserInputV0QuestionType | undefined,
    text: string,
  ) => {
    if (optionsDisabled) return;
    const id = questionId(safeQuestions[qIndex], qIndex);
    setFreeTextValues((prev) => ({ ...prev, [id]: text }));
    // Single_choice mutual exclusion: typing in the input deselects radios.
    if (type !== "multi_choice") {
      setAnswers((prev) => ({ ...prev, [id]: [] }));
    }
  };

  // Submit gate: every renderable single_choice question must be answered
  // (either a radio pick OR non-empty typed text). multi_choice can be
  // empty (user opted out). Don't submit while the agent is mid-stream —
  // the new message would race the in-flight reply.
  const canSubmit = (() => {
    if (optionsDisabled || isStreaming) return false;
    if (totalSteps === 0) return false;
    if (!allRevealed) return false;
    return renderableQuestions.every((entry) => {
      const type = entry.question.type ?? "single_choice";
      if (type === "multi_choice") return true;
      return isQuestionAnswered(entry);
    });
  })();

  const handleSubmit = () => {
    if (!canSubmit) return;
    const message = formatSubmission(
      prompt,
      renderableQuestions,
      answers,
      freeTextValues,
    );
    if (!message) return;
    setSubmitted(true);
    sendMessage(message);
  };

  // Nothing useful to show — most often a streaming frame before props
  // arrive, or a malformed render. Rendering nothing is friendlier than a
  // placeholder error string the user can't act on.
  if (totalSteps === 0) {
    return null;
  }

  const renderQuestion = (entry: RenderableQuestion) => {
    const { question, qIndex, opts } = entry;
    const id = questionId(question, qIndex);
    const type = question.type ?? "single_choice";
    const helper = question.helperText?.trim() || defaultHelper(type);
    const picked = answers[id] ?? [];
    const text = freeTextValues[id] ?? "";
    const indicatorClass =
      type === "multi_choice"
        ? "chat-wrapper__ask-user-input-v0-option-indicator--checkbox"
        : "chat-wrapper__ask-user-input-v0-option-indicator--radio";
    // Hide the disabled empty input post-submit / on rehydrate — an empty
    // greyed-out box adds no information. Keep it visible if the user did
    // type something so they can still see their answer.
    const showFreeTextInput =
      question.allowFreeText === true &&
      (!optionsDisabled || text.trim().length > 0);

    // Summary view — show the user's pick + a "Change answer" button —
    // applies only to single_choice questions answered with a radio pick
    // while the form is still in progress (not submitted/locked) AND the
    // user hasn't explicitly re-opened the question via Change answer.
    // Multi/free-text answers stay in their normal edit view because there
    // isn't a clean "done" signal for those.
    const inSummaryMode =
      !optionsDisabled &&
      type === "single_choice" &&
      picked.length > 0 &&
      !editingIds.has(id);

    return (
      <div
        key={id}
        className="chat-wrapper__ask-user-input-v0-question"
        data-question-type={type}
        data-mode={inSummaryMode ? "summary" : "edit"}
      >
        <p className="chat-wrapper__ask-user-input-v0-question-title">
          {question.title ? <strong>{question.title}</strong> : null}
          {question.title && helper ? " " : null}
          {helper ? (
            <span className="chat-wrapper__ask-user-input-v0-helper">
              {helper}
            </span>
          ) : null}
        </p>

        {inSummaryMode ? (
          <>
            <p className="chat-wrapper__ask-user-input-v0-summary-text">
              You selected: {findOptionLabel(opts, picked[0])}
            </p>
            <button
              type="button"
              className="chat-wrapper__ask-user-input-v0-change-answer"
              onClick={() => handleChangeAnswer(qIndex)}
            >
              Change answer
            </button>
          </>
        ) : (
          <>
            {opts.length > 0 ? (
              <div
                className="chat-wrapper__ask-user-input-v0-options"
                role={type === "multi_choice" ? "group" : "radiogroup"}
              >
                {opts.map((option, oIndex) => {
                  const label = optionLabel(option.label, oIndex);
                  const value = optionValue(option.value, option.label, oIndex);
                  const isPicked = picked.includes(value);

                  return (
                    <button
                      key={`${id}-${value}-${oIndex}`}
                      type="button"
                      className={`chat-wrapper__ask-user-input-v0-option${
                        isPicked
                          ? " chat-wrapper__ask-user-input-v0-option--picked"
                          : ""
                      }`}
                      disabled={optionsDisabled}
                      role={type === "multi_choice" ? "checkbox" : "radio"}
                      aria-checked={isPicked}
                      onClick={() => togglePick(qIndex, type, value)}
                    >
                      <span
                        className={`chat-wrapper__ask-user-input-v0-option-indicator ${indicatorClass}`}
                        aria-hidden="true"
                      />
                      <span className="chat-wrapper__ask-user-input-v0-option-label">
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            {showFreeTextInput ? (
              <input
                type="text"
                className="chat-wrapper__ask-user-input-v0-free-text-input"
                value={text}
                onChange={(e) =>
                  handleFreeTextChange(qIndex, type, e.target.value)
                }
                placeholder={FREE_TEXT_PLACEHOLDER}
                disabled={optionsDisabled}
                aria-label={
                  question.title
                    ? `Type your answer for: ${question.title}`
                    : "Type your answer"
                }
              />
            ) : null}
          </>
        )}
      </div>
    );
  };

  // Two view modes:
  //  - Active editing: progressive reveal — render only the questions that
  //    have been revealed so far (starting at 1, advancing on each pick).
  //    All revealed questions stay interactive so users can revise earlier
  //    answers. Submit appears once every question is revealed and the
  //    required ones are answered.
  //  - Locked (post-submit, or rehydrated): stacked view — every question
  //    visible at once, options disabled, picks highlighted so the user can
  //    still see what was answered.
  const showStacked = optionsDisabled;
  const questionsToRender = showStacked ? renderableQuestions : visibleQuestions;

  // Layout: each block (intro prompt, every question, the submit row) is a
  // direct child of the outer container. Questions carry their own card
  // styling so they read as separate inline messages in the chat; the
  // prompt is plain text above them, not part of any card.
  return (
    <div
      ref={containerRef}
      className="chat-wrapper__ask-user-input-v0"
    >
      {prompt ? (
        <p className="chat-wrapper__ask-user-input-v0-prompt">{prompt}</p>
      ) : null}

      {questionsToRender.map(renderQuestion)}

      {!showStacked && allRevealed ? (
        <div className="chat-wrapper__ask-user-input-v0-actions">
          <button
            type="button"
            className="chat-wrapper__ask-user-input-v0-submit"
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            {submitLabel?.trim() || "Submit"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
