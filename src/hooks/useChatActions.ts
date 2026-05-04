import { useChatContext } from "../contexts";
import type { ChatStatus } from "../constants/chatStatus";

/**
 * Public actions available to generative-UI components rendered inside
 * `<ChatWrapper>`. Use this hook from components registered via
 * `generativeComponents` to react to user clicks by sending a follow-up
 * message back to the agent.
 *
 * @example
 * function ConfirmCard({ orderId }: { orderId?: string }) {
 *   const { sendMessage, isStreaming } = useChatActions();
 *   return (
 *     <button
 *       disabled={isStreaming}
 *       onClick={() => sendMessage(`Confirm order ${orderId}`)}
 *     >
 *       Confirm
 *     </button>
 *   );
 * }
 */
export interface ChatActions {
  /** Send a user message to the agent (same as the user typing it). */
  sendMessage: (message: string, media?: string[]) => void;
  /** Cancel an in-flight assistant response. */
  stopGeneration: () => void;
  /** True while the assistant is producing a response. */
  isStreaming: boolean;
  /** Current chat status (idle, submitted, streaming, error, etc.). */
  chatStatus: ChatStatus;
}

export function useChatActions(): ChatActions {
  const { onSubmit, onStopGeneration, isStreaming, chatStatus } =
    useChatContext();

  return {
    sendMessage: onSubmit,
    stopGeneration: onStopGeneration,
    isStreaming,
    chatStatus,
  };
}
