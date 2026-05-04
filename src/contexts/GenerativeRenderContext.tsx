import { createContext, useContext, type ReactNode } from "react";

/**
 * Render-context metadata exposed to a generative-UI component while it
 * renders. Components registered via `generativeComponents` (and library
 * built-ins) receive their props from the agent through `propsSchema`; this
 * context carries the *render-side* metadata that lives outside that schema.
 *
 * Most importantly, `source` lets interactive cards (e.g. `AskUserInputV0`)
 * disable themselves when rehydrated from history, so the user can't
 * re-trigger an answer that was already given.
 */
export interface GenerativeRenderContextValue {
  /** Stable id of the agent's render call — same value across status updates. */
  callId: string;
  /** Streaming lifecycle status forwarded from the server. */
  status: "streaming" | "complete" | "error";
  /**
   * Where this render came from:
   *  - "live" — produced in the current session as the agent streamed
   *  - "history" — rehydrated from a persisted thread on initial load
   */
  source: "live" | "history";
  /**
   * True when this card is the most recent ui-component in the conversation
   * AND no user message has come after it — i.e. the user is still expected
   * to answer this card. Interactive cards (e.g. `AskUserInputV0`) use this
   * as the lock signal: stay answerable when `isLatest` is true, even after
   * a page reload that rehydrates the card from history.
   */
  isLatest: boolean;
}

const GenerativeRenderContext = createContext<
  GenerativeRenderContextValue | null
>(null);

interface GenerativeRenderProviderProps extends GenerativeRenderContextValue {
  children: ReactNode;
}

export function GenerativeRenderProvider({
  callId,
  status,
  source,
  isLatest,
  children,
}: GenerativeRenderProviderProps) {
  return (
    <GenerativeRenderContext.Provider
      value={{ callId, status, source, isLatest }}
    >
      {children}
    </GenerativeRenderContext.Provider>
  );
}

/**
 * Read render-context metadata from inside a generative-UI component.
 *
 * Returns `null` when called outside of a `GenerativeComponentRenderer` (e.g.
 * if a registered component is mounted directly in tests/storybook). Callers
 * should treat `null` as "no render context — assume live".
 *
 * @example
 * function ConfirmCard({ orderId }: { orderId?: string }) {
 *   const render = useGenerativeRender();
 *   const isRehydrated = render?.source === "history";
 *   return <button disabled={isRehydrated}>Confirm</button>;
 * }
 */
export function useGenerativeRender(): GenerativeRenderContextValue | null {
  return useContext(GenerativeRenderContext);
}
