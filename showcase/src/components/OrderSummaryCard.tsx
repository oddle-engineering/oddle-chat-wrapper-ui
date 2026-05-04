import { z } from "zod";
import {
  useChatActions,
  type GenerativeComponent,
} from "@oddle/chat-wrapper-ui";

/**
 * Sample generative-UI component for the UD21 showcase.
 * Demonstrates the streaming-undefined contract: every prop is optional and
 * the component shows skeleton placeholders for missing values.
 */

export const OrderSummaryPropsSchema = z.object({
  orderId: z
    .string()
    .describe("Order ID, e.g. 'ORD-12345'. Always required for the card title."),
  status: z
    .enum(["pending", "shipped", "delivered", "cancelled"])
    .describe("Current fulfilment status of the order."),
  customerName: z
    .string()
    .optional()
    .describe("Display name of the customer who placed the order."),
  totalAmount: z
    .number()
    .optional()
    .describe("Order total in the brand's default currency."),
  items: z
    .array(
      z.object({
        name: z.string().describe("Menu/product item name."),
        qty: z.number().describe("Quantity ordered."),
      })
    )
    .optional()
    .describe("Line items in the order."),
});

type OrderSummaryProps = z.infer<typeof OrderSummaryPropsSchema>;

const STATUS_COLOURS: Record<OrderSummaryProps["status"], string> = {
  pending: "#b7791f",
  shipped: "#2b6cb0",
  delivered: "#2f855a",
  cancelled: "#c53030",
};

const skeletonStyle: React.CSSProperties = {
  display: "inline-block",
  height: 12,
  width: 80,
  background: "rgba(0,0,0,0.08)",
  borderRadius: 4,
};

const buttonStyle = (variant: "primary" | "danger" | "neutral"): React.CSSProperties => ({
  flex: 1,
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid rgba(0,0,0,0.12)",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  background:
    variant === "primary"
      ? "#3d0099"
      : variant === "danger"
      ? "#fff"
      : "#f4f4f5",
  color:
    variant === "primary" ? "white" : variant === "danger" ? "#c53030" : "#111",
  transition: "opacity 0.15s",
});

export function OrderSummaryCard({
  orderId,
  status,
  customerName,
  totalAmount,
  items,
}: Partial<OrderSummaryProps>) {
  // useChatActions only works when this component is rendered inside <ChatWrapper>.
  // Generative components always are, so this is safe.
  const { sendMessage, isStreaming } = useChatActions();

  const showActions =
    typeof orderId === "string" && orderId.length > 0 && !!status;

  const handleAction = (action: "ship" | "cancel" | "details") => {
    if (!orderId) return;
    const prompts: Record<typeof action, string> = {
      ship: `Mark order ${orderId} as shipped.`,
      cancel: `Cancel order ${orderId} and tell me why customers usually cancel.`,
      details: `Show full details for order ${orderId}.`,
    };
    sendMessage(prompts[action]);
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
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <strong>{orderId ?? <span style={skeletonStyle} />}</strong>
        {status ? (
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 999,
              background: `${STATUS_COLOURS[status]}1a`,
              color: STATUS_COLOURS[status],
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {status}
          </span>
        ) : (
          <span style={{ ...skeletonStyle, width: 60 }} />
        )}
      </div>

      <div style={{ color: "rgba(0,0,0,0.6)", marginBottom: 12 }}>
        {customerName ?? <span style={skeletonStyle} />}
      </div>

      {items ? (
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {items.map((item, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px 0",
                borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <span>{item.name}</span>
              <span style={{ color: "rgba(0,0,0,0.6)" }}>×{item.qty}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ ...skeletonStyle, width: "100%", height: 36 }} />
      )}

      <div
        style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: "1px solid rgba(0,0,0,0.08)",
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 600,
        }}
      >
        <span>Total</span>
        <span>
          {typeof totalAmount === "number" ? (
            `$${totalAmount.toFixed(2)}`
          ) : (
            <span style={{ ...skeletonStyle, width: 60 }} />
          )}
        </span>
      </div>

      {showActions && (
        <div
          style={{
            marginTop: 12,
            display: "flex",
            gap: 8,
            opacity: isStreaming ? 0.5 : 1,
            pointerEvents: isStreaming ? "none" : "auto",
          }}
        >
          {status === "pending" && (
            <button style={buttonStyle("primary")} onClick={() => handleAction("ship")}>
              Mark as shipped
            </button>
          )}
          <button style={buttonStyle("neutral")} onClick={() => handleAction("details")}>
            See details
          </button>
          {status !== "cancelled" && status !== "delivered" && (
            <button style={buttonStyle("danger")} onClick={() => handleAction("cancel")}>
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export const orderSummaryRegistration: GenerativeComponent<typeof OrderSummaryPropsSchema> = {
  name: "OrderSummary",
  description:
    "Show details of a customer order — id, status, customer, items, and total. " +
    "Use whenever the user asks about a specific order.",
  propsSchema: OrderSummaryPropsSchema,
  component: OrderSummaryCard,
};
