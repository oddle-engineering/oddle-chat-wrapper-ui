import { useEffect, useState } from "react";
import { z } from "zod";
import {
  useChatActions,
  type GenerativeComponent,
} from "@oddle/chat-wrapper-ui";

/**
 * Sample interactive generative-UI component: a date picker.
 *
 * The agent renders this when it needs the user to choose a date (booking,
 * scheduling, follow-up reminder, etc.). User picks a date → component sends
 * a follow-up user message back to the agent via `useChatActions`.
 */

export const DatePickerPropsSchema = z.object({
  prompt: z
    .string()
    .describe(
      "The question shown to the user, e.g. 'When would you like to dine with us?'"
    ),
  purpose: z
    .string()
    .optional()
    .describe(
      "What the date is for, used to phrase the follow-up message. Examples: 'reservation', 'reminder', 'delivery'."
    ),
  minDate: z
    .string()
    .optional()
    .describe("Earliest selectable date in YYYY-MM-DD format."),
  maxDate: z
    .string()
    .optional()
    .describe("Latest selectable date in YYYY-MM-DD format."),
  suggestions: z
    .array(
      z.object({
        date: z.string().describe("Date in YYYY-MM-DD format."),
        label: z.string().describe("Friendly chip label like 'Tonight' or 'Tomorrow'."),
      })
    )
    .optional()
    .describe("Quick-pick chips shown above the calendar."),
});

type DatePickerProps = z.infer<typeof DatePickerPropsSchema>;

const skeleton: React.CSSProperties = {
  display: "inline-block",
  height: 12,
  width: 120,
  background: "rgba(0,0,0,0.08)",
  borderRadius: 4,
};

const formatLong = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const todayIso = () => new Date().toISOString().slice(0, 10);

export function DatePickerCard({
  prompt,
  purpose,
  minDate,
  maxDate,
  suggestions,
}: Partial<DatePickerProps>) {
  const { sendMessage, isStreaming } = useChatActions();
  const [selected, setSelected] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  // Default min to today if the agent didn't specify one (avoids past dates).
  const effectiveMin = minDate ?? todayIso();

  // If the user submitted, lock the card so it can't be re-fired.
  useEffect(() => {
    if (submitted) return;
  }, [submitted]);

  const submit = (iso: string) => {
    if (!iso || isStreaming || submitted) return;
    setSelected(iso);
    setSubmitted(true);
    const noun = purpose ? `for ${purpose}` : "";
    sendMessage(`I'd like ${formatLong(iso)} ${noun}`.trim());
  };

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 12,
        padding: 16,
        background: "white",
        fontSize: 14,
        lineHeight: 1.45,
        maxWidth: 360,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 12 }}>
        {prompt ?? <span style={skeleton} />}
      </div>

      {suggestions && suggestions.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 12,
          }}
        >
          {suggestions.map((s) => {
            const active = selected === s.date;
            return (
              <button
                key={s.date}
                disabled={isStreaming || submitted}
                onClick={() => submit(s.date)}
                style={{
                  padding: "6px 10px",
                  borderRadius: 999,
                  border: `1px solid ${active ? "#3d0099" : "rgba(0,0,0,0.12)"}`,
                  background: active ? "#3d0099" : "white",
                  color: active ? "white" : "#111",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor:
                    isStreaming || submitted ? "not-allowed" : "pointer",
                  opacity: submitted && !active ? 0.4 : 1,
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <input
          type="date"
          value={selected}
          min={effectiveMin}
          max={maxDate}
          disabled={isStreaming || submitted}
          onChange={(e) => setSelected(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.12)",
            fontSize: 13,
            fontFamily: "inherit",
            background: submitted ? "#f4f4f5" : "white",
          }}
        />
        <button
          disabled={!selected || isStreaming || submitted}
          onClick={() => submit(selected)}
          style={{
            padding: "8px 14px",
            borderRadius: 8,
            border: "none",
            background: !selected || submitted ? "#e4e4e7" : "#3d0099",
            color: !selected || submitted ? "#9ca3af" : "white",
            fontSize: 12,
            fontWeight: 600,
            cursor: !selected || isStreaming || submitted ? "not-allowed" : "pointer",
            transition: "opacity 0.15s",
          }}
        >
          {submitted ? "Sent" : "Confirm"}
        </button>
      </div>

      {submitted && selected && (
        <div
          style={{
            marginTop: 10,
            fontSize: 12,
            color: "rgba(0,0,0,0.55)",
          }}
        >
          Picked <strong>{formatLong(selected)}</strong>.
        </div>
      )}
    </div>
  );
}

export const datePickerRegistration: GenerativeComponent<typeof DatePickerPropsSchema> = {
  name: "DatePicker",
  description:
    "Show a calendar/date picker so the user can choose a date. Use whenever a date is required from the user — booking, scheduling a reminder, picking a delivery date. Provide `purpose` so the follow-up message reads naturally (e.g. 'reservation' → 'I'd like Friday March 5 for reservation'). Provide `suggestions` for fast common picks like 'Tonight' or 'Next weekend' when applicable.",
  propsSchema: DatePickerPropsSchema,
  component: DatePickerCard,
};
