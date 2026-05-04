import { useState } from "react";
import { z } from "zod";
import {
  useChatActions,
  type GenerativeComponent,
} from "@oddle/chat-wrapper-ui";

/**
 * Redeemable card — rendered by the agent after `create_redeemable_campaign`
 * succeeds. Mirrors the campaign's customer-facing fields plus a status pill
 * and quick action buttons (Activate / Edit / Terms).
 *
 * Props match the create_redeemable_campaign tool parameters so the agent can
 * forward what it just created with minimal mapping.
 */

export const RedeemablePropsSchema = z.object({
  campaignId: z
    .string()
    .optional()
    .describe(
      "Internal campaign id returned by create_redeemable_campaign. Required for action buttons (activate/edit) to reference the right campaign."
    ),
  redeemableTitle: z
    .string()
    .describe("Customer-facing title of the redeemable, e.g. '10% off your next order'."),
  status: z
    .enum(["draft", "active", "paused"])
    .optional()
    .describe(
      "Campaign status. Newly created campaigns are 'draft' by default."
    ),
  description: z
    .string()
    .optional()
    .describe(
      "Customer-facing description of what the redeemable is. May contain simple HTML (<p>, <strong>, <em>). Keep concise."
    ),
  termsAndConditions: z
    .string()
    .optional()
    .describe(
      "Terms and conditions. May contain simple HTML, typically <ul><li>…</li></ul>."
    ),
  imageUrl: z
    .string()
    .optional()
    .describe("Cover image URL (landscape)."),
  issuedType: z
    .enum(["unlimited", "limited"])
    .optional()
    .describe("How many redeemables can be issued."),
  issuedMax: z
    .number()
    .optional()
    .describe("Maximum number of redeemables issued (when issuedType is limited)."),
  redemptionType: z
    .enum(["unlimited", "limited"])
    .optional()
    .describe("How many redeemables can be redeemed."),
  redemptionMax: z
    .number()
    .optional()
    .describe("Maximum number of redemptions (when redemptionType is limited)."),
  claimLimit: z
    .number()
    .optional()
    .describe(
      "Per-customer claim limit. 1 = once only (typical for first-time promos); >1 or unlimited for ongoing perks."
    ),
  expiryType: z
    .enum(["never", "fix", "specific_date"])
    .optional()
    .describe("How the redeemable expires after issuance."),
  expiryDays: z
    .number()
    .optional()
    .describe("Days after issuance the redeemable expires (when expiryType = 'fix')."),
  expiryDate: z
    .string()
    .optional()
    .describe("Specific expiry date in DD-MM-YYYY (when expiryType = 'specific_date')."),
  redemptionAvailableSummary: z
    .string()
    .optional()
    .describe(
      "One-line natural language summary of when redemption becomes available, e.g. 'Available immediately', 'Available the next day', 'Available 7 days after issuance'."
    ),
  scheduleSummary: z
    .string()
    .optional()
    .describe(
      "One-line summary of redemption schedule, e.g. 'All days, all times' or 'Weekdays 12:00–14:00 only'."
    ),
});

type Props = z.infer<typeof RedeemablePropsSchema>;

// ─── Styling helpers ──────────────────────────────────────────────────────

const skeleton: React.CSSProperties = {
  display: "inline-block",
  height: 12,
  width: 100,
  background: "rgba(0,0,0,0.08)",
  borderRadius: 4,
};

const STATUS_STYLE: Record<NonNullable<Props["status"]>, { bg: string; fg: string }> = {
  draft: { bg: "#f4f4f5", fg: "#52525b" },
  active: { bg: "#dcfce7", fg: "#166534" },
  paused: { bg: "#fef3c7", fg: "#854d0e" },
};

// Strip simple HTML to text, preserving <li> as bullets and <br>/<p> as newlines.
// Keeps the showcase dependency-free; for production HTML we'd use DOMPurify.
const htmlToText = (html: string): string => {
  return html
    .replace(/<\s*li[^>]*>/gi, "• ")
    .replace(/<\s*\/\s*li[^>]*>/gi, "\n")
    .replace(/<\s*br\s*\/?\s*>/gi, "\n")
    .replace(/<\s*\/\s*p[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const formatExpiry = (props: Partial<Props>): string => {
  switch (props.expiryType) {
    case "never":
      return "Never expires";
    case "fix":
      return props.expiryDays
        ? `Expires ${props.expiryDays} day${props.expiryDays === 1 ? "" : "s"} after issuance`
        : "Expires after a fixed delay";
    case "specific_date":
      return props.expiryDate
        ? `Expires on ${props.expiryDate}`
        : "Expires on a specific date";
    default:
      return "—";
  }
};

const formatLimit = (
  type: Props["issuedType"],
  max: number | undefined,
  noun: string
): string => {
  if (!type) return "—";
  if (type === "unlimited") return `Unlimited ${noun}`;
  if (typeof max === "number") return `Up to ${max.toLocaleString()} ${noun}`;
  return `Limited ${noun}`;
};

const formatClaimLimit = (n: number | undefined): string => {
  if (n === undefined) return "—";
  if (n === 1) return "Once per customer";
  if (n > 1) return `Up to ${n} times per customer`;
  return "Unlimited per customer";
};

// ─── Component ────────────────────────────────────────────────────────────

export function RedeemableCard(props: Partial<Props>) {
  const {
    campaignId,
    redeemableTitle,
    status = "draft",
    description,
    termsAndConditions,
    imageUrl,
    issuedType,
    issuedMax,
    redemptionType,
    redemptionMax,
    claimLimit,
    redemptionAvailableSummary,
    scheduleSummary,
  } = props;

  const { sendMessage, isStreaming } = useChatActions();
  const [showTerms, setShowTerms] = useState(false);
  const [pending, setPending] = useState<null | "activate" | "edit" | "pause">(null);

  const statusStyle = STATUS_STYLE[status] ?? STATUS_STYLE.draft;
  const reference = campaignId ? `campaign ${campaignId}` : `"${redeemableTitle ?? "this redeemable"}"`;

  const handle = (action: "activate" | "edit" | "pause") => {
    if (isStreaming || pending) return;
    setPending(action);
    const prompts = {
      activate: `Activate redeemable ${reference}.`,
      pause: `Pause redeemable ${reference}.`,
      edit: `I want to edit redeemable ${reference}. What would you like me to ask first?`,
    };
    sendMessage(prompts[action]);
  };

  const cleanDescription = description ? htmlToText(description) : undefined;
  const cleanTerms = termsAndConditions ? htmlToText(termsAndConditions) : undefined;

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 12,
        background: "white",
        overflow: "hidden",
        maxWidth: 380,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        fontSize: 14,
        lineHeight: 1.45,
      }}
    >
      {/* Cover image / fallback strip */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={redeemableTitle ?? ""}
          style={{
            width: "100%",
            height: 140,
            objectFit: "cover",
            display: "block",
            background: "#f4f4f5",
          }}
        />
      ) : (
        <div
          style={{
            height: 6,
            background: "linear-gradient(90deg, #3d0099, #7c3aed)",
          }}
        />
      )}

      <div style={{ padding: 16 }}>
        {/* Title + status row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
            marginBottom: 8,
          }}
        >
          <strong style={{ fontSize: 16, lineHeight: 1.3 }}>
            {redeemableTitle ?? <span style={skeleton} />}
          </strong>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 999,
              background: statusStyle.bg,
              color: statusStyle.fg,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              whiteSpace: "nowrap",
            }}
          >
            {status}
          </span>
        </div>

        {/* Description */}
        {cleanDescription && (
          <p
            style={{
              margin: "0 0 12px",
              color: "rgba(0,0,0,0.7)",
              whiteSpace: "pre-wrap",
            }}
          >
            {cleanDescription}
          </p>
        )}

        {/* Key facts grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px 16px",
            padding: "10px 0",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            fontSize: 12,
          }}
        >
          <Fact label="Issued" value={formatLimit(issuedType, issuedMax, "issues")} />
          <Fact label="Redemptions" value={formatLimit(redemptionType, redemptionMax, "uses")} />
          <Fact label="Per customer" value={formatClaimLimit(claimLimit)} />
          <Fact label="Expiry" value={formatExpiry(props)} />
          {redemptionAvailableSummary && (
            <Fact label="Available" value={redemptionAvailableSummary} span={2} />
          )}
          {scheduleSummary && (
            <Fact label="Schedule" value={scheduleSummary} span={2} />
          )}
        </div>

        {/* Terms (collapsible) */}
        {cleanTerms && (
          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => setShowTerms((s) => !s)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "#3d0099",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {showTerms ? "Hide terms" : "View terms & conditions"}
            </button>
            {showTerms && (
              <div
                style={{
                  marginTop: 8,
                  padding: 10,
                  background: "#fafafa",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "rgba(0,0,0,0.7)",
                  whiteSpace: "pre-wrap",
                }}
              >
                {cleanTerms}
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div
          style={{
            marginTop: 14,
            display: "flex",
            gap: 8,
            opacity: isStreaming ? 0.5 : 1,
            pointerEvents: isStreaming ? "none" : "auto",
          }}
        >
          {status === "draft" && (
            <button
              onClick={() => handle("activate")}
              disabled={!!pending}
              style={primaryBtn}
            >
              {pending === "activate" ? "Activating…" : "Activate"}
            </button>
          )}
          {status === "active" && (
            <button
              onClick={() => handle("pause")}
              disabled={!!pending}
              style={neutralBtn}
            >
              {pending === "pause" ? "Pausing…" : "Pause"}
            </button>
          )}
          <button
            onClick={() => handle("edit")}
            disabled={!!pending}
            style={neutralBtn}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Internal sub-components ──────────────────────────────────────────────

function Fact({
  label,
  value,
  span,
}: {
  label: string;
  value: string;
  span?: number;
}) {
  return (
    <div style={{ gridColumn: span === 2 ? "span 2" : undefined }}>
      <div
        style={{
          textTransform: "uppercase",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: 0.5,
          color: "rgba(0,0,0,0.5)",
          marginBottom: 2,
        }}
      >
        {label}
      </div>
      <div style={{ color: "rgba(0,0,0,0.85)" }}>{value}</div>
    </div>
  );
}

const primaryBtn: React.CSSProperties = {
  flex: 1,
  padding: "8px 12px",
  borderRadius: 8,
  border: "none",
  background: "#3d0099",
  color: "white",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
};

const neutralBtn: React.CSSProperties = {
  flex: 1,
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid rgba(0,0,0,0.12)",
  background: "#f4f4f5",
  color: "#111",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
};

// ─── Registration ─────────────────────────────────────────────────────────

export const redeemableRegistration: GenerativeComponent<typeof RedeemablePropsSchema> = {
  name: "Redeemable",
  description:
    "Display a redeemable campaign card after `create_redeemable_campaign` succeeds, " +
    "or whenever the user asks to view a specific redeemable. Shows title, cover, status, " +
    "issuance/redemption limits, claim limit, expiry, availability, schedule, and T&C. " +
    "Includes action buttons (Activate / Pause / Edit) that fire follow-up messages. " +
    "Pass `campaignId` whenever you have it so action buttons can reference the right campaign. " +
    "Pass `redemptionAvailableSummary` and `scheduleSummary` as natural-language one-liners " +
    "(don't pass the raw object/schedule structure).",
  propsSchema: RedeemablePropsSchema,
  component: RedeemableCard,
};
