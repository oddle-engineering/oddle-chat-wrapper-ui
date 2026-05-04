import { useState } from "react";
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
      "Optional value sent back when this option is selected. Defaults to `label`. Use this when the visible button text differs from the answer you want the agent to receive (e.g. label \"Yes\" → value \"Yes, schedule the campaign for next Friday\").",
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
      "Stable identifier for this question. Optional — falls back to a positional id (q1, q2, …) when omitted.",
    ),
  title: z
    .string()
    .optional()
    .describe(
      "The question text shown above the options (e.g. \"What's your main goal?\").",
    ),
  type: AskUserInputV0QuestionTypeSchema.optional().describe(
    "single_choice = pick exactly one option (radio). multi_choice = pick one or more (checkbox). Defaults to single_choice.",
  ),
  options: z
    .array(AskUserInputV0OptionSchema)
    .optional()
    .describe(
      "Reply options for this question. Provide 2–6 — fewer than 2 is not a meaningful choice; more than 6 hurts readability.",
    ),
  helperText: z
    .string()
    .optional()
    .describe(
      "Optional hint shown below the options (e.g. \"Pick one\", \"Pick one or more\"). When omitted, a sensible default is chosen from the question type.",
    ),
});

export const AskUserInputV0PropsSchema = z.object({
  prompt: z
    .string()
    .optional()
    .describe(
      "Optional intro shown above the questions (e.g. \"A couple of quick questions to tailor it to you:\"). Plain text only.",
    ),
  questions: z
    .array(AskUserInputV0QuestionSchema)
    .optional()
    .describe(
      "One or more questions. Each is rendered as its own group; answers are collected and sent together when the user clicks Submit.",
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

type Answers = Record<string, string[]>;

function questionId(q: AskUserInputV0Question, index: number): string {
  return q.id?.trim() || `q${index + 1}`;
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
  entries: Array<{ question: AskUserInputV0Question; qIndex: number }>,
  answers: Answers,
): string {
  const lines: string[] = [];
  if (prompt?.trim()) {
    lines.push(prompt.trim());
    lines.push("");
  }
  entries.forEach(({ question, qIndex }) => {
    const id = questionId(question, qIndex);
    const picked = answers[id] ?? [];
    if (picked.length === 0) return;
    const title = question.title?.trim() || `Q${qIndex + 1}`;
    lines.push(`${title} ${picked.join(", ")}`);
  });
  return lines.join("\n").trim();
}

export function AskUserInputV0(props: Partial<AskUserInputV0Props>) {
  const { prompt, questions, submitLabel } = props;
  // Older persisted cards carry `options` directly on the root (no questions[]).
  // Read it loosely so we can migrate at render time without re-advertising
  // the legacy shape on the schema.
  const legacyOptions = (props as { options?: AskUserInputV0Question["options"] })
    .options;
  const { sendMessage, isStreaming } = useChatActions();
  const render = useGenerativeRender();
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  // A card is the "active" question only when it's the most recent
  // ui-component AND no user message has come after it. Older cards (already
  // answered, or superseded by a newer card) are locked. This rule covers
  // both live and rehydrated cards consistently:
  //  - Live, freshly rendered, no reply yet → isLatest=true → unlocked
  //  - Rehydrated as the last unanswered message → isLatest=true → unlocked
  //  - Anything older or already replied to → isLatest=false → locked
  // `submitted` covers the in-session race between Submit click and the next
  // user-message tick that flips isLatest to false.
  const isLatest = render?.isLatest ?? true;
  const locked = submitted || !isLatest;
  const safeQuestions = normalizeQuestions(questions, legacyOptions);

  // Filter out questions that have no options — a question with a title but no
  // options renders as a confusing empty group, so skip it entirely.
  const renderableQuestions = safeQuestions
    .map((question, qIndex) => ({
      question,
      qIndex,
      opts: (question.options ?? []).slice(0, MAX_OPTIONS_PER_QUESTION),
    }))
    .filter(({ opts }) => opts.length > 0);

  const togglePick = (
    qIndex: number,
    type: AskUserInputV0QuestionType | undefined,
    value: string,
  ) => {
    // Only `locked` blocks picks — picks are local state and never hit the
    // network, so we don't gate them on `isStreaming`. The agent's reply may
    // still be streaming when the form renders, and the user must remain free
    // to make/change selections during that window. Streaming only gates Submit.
    if (locked) return;
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
  };

  // Submit gate: every renderable single_choice question must have a pick.
  // multi_choice can be empty (user opted out).
  const canSubmit = (() => {
    if (locked || isStreaming) return false;
    if (renderableQuestions.length === 0) return false;
    return renderableQuestions.every(({ question, qIndex }) => {
      const type = question.type ?? "single_choice";
      if (type === "multi_choice") return true;
      const id = questionId(question, qIndex);
      return (answers[id] ?? []).length > 0;
    });
  })();

  const handleSubmit = () => {
    if (!canSubmit) return;
    const message = formatSubmission(prompt, renderableQuestions, answers);
    if (!message) return;
    setSubmitted(true);
    sendMessage(message);
  };

  // Nothing useful to show — most often a streaming frame before props arrive,
  // or a rehydrated card whose props are incomplete. Rendering nothing is
  // friendlier than a placeholder error string the user can't act on.
  if (renderableQuestions.length === 0) {
    return null;
  }

  return (
    <div className="chat-wrapper__ask-user-input-v0">
      {prompt ? (
        <p className="chat-wrapper__ask-user-input-v0-prompt">{prompt}</p>
      ) : null}

      <div className="chat-wrapper__ask-user-input-v0-questions">
        {renderableQuestions.map(({ question, qIndex, opts }) => {
          const id = questionId(question, qIndex);
          const type = question.type ?? "single_choice";
          const helper = question.helperText?.trim() || defaultHelper(type);
          const picked = answers[id] ?? [];

          return (
            <div
              key={id}
              className="chat-wrapper__ask-user-input-v0-question"
              data-question-type={type}
            >
              {question.title ? (
                <p className="chat-wrapper__ask-user-input-v0-question-title">
                  {question.title}
                </p>
              ) : null}

              <div className="chat-wrapper__ask-user-input-v0-options">
                {opts.map((option, oIndex) => {
                  const label = optionLabel(option.label, oIndex);
                  const value = optionValue(
                    option.value,
                    option.label,
                    oIndex,
                  );
                  const isPicked = picked.includes(value);
                  // Disable only when the form is locked (after submit or
                  // when rehydrated). Streaming-state must NOT disable picks,
                  // otherwise multi_choice can't accept a second selection
                  // while the agent's reply is still arriving.
                  const disabled = locked;

                  return (
                    <button
                      key={`${id}-${value}-${oIndex}`}
                      type="button"
                      className={`chat-wrapper__ask-user-input-v0-option${
                        isPicked
                          ? " chat-wrapper__ask-user-input-v0-option--picked"
                          : ""
                      }`}
                      disabled={disabled}
                      aria-pressed={isPicked}
                      onClick={() => togglePick(qIndex, type, value)}
                    >
                      <span className="chat-wrapper__ask-user-input-v0-option-label">
                        {label}
                      </span>
                      {isPicked ? (
                        <span
                          className="chat-wrapper__ask-user-input-v0-option-check"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              <p className="chat-wrapper__ask-user-input-v0-helper">{helper}</p>
            </div>
          );
        })}

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
      </div>
    </div>
  );
}
