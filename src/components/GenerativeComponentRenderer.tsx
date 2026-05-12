import { memo } from "react";
import type { ComponentRegistry } from "../services/componentRegistry";
import { GenerativeRenderProvider } from "../contexts/GenerativeRenderContext";

interface GenerativeComponentRendererProps {
  registry?: ComponentRegistry;
  componentName: string;
  props: Record<string, any>;
  status: "streaming" | "complete" | "error";
  /** Stable id of the agent's render call — required so child components can
   *  read it via `useGenerativeRender`. */
  callId: string;
  /** Whether this render is live or rehydrated from history. Defaults to
   *  "live" when omitted. */
  source?: "live" | "history";
  /** True when this card is the latest ui-component with no subsequent user
   *  reply. Interactive cards use this to remain answerable. Defaults to
   *  false. */
  isLatest?: boolean;
}

/**
 * Renders a registered generative-UI component by name. Components must accept
 * `Partial<Props>` since props arrive incrementally during streaming.
 */
export const GenerativeComponentRenderer = memo<GenerativeComponentRendererProps>(
  ({
    registry,
    componentName,
    props,
    status,
    callId,
    source = "live",
    isLatest = false,
  }) => {
    const entry = registry?.get(componentName);

    if (!entry) {
      // status === "complete" on a missing component means the message was
      // rehydrated from history; the dashboard removed/renamed the component
      // since. Show the user-facing copy in that case.
      const variant = status === "complete" ? "rehydrated" : "live";
      return <UnknownComponentFallback name={componentName} variant={variant} />;
    }

    const Component = entry.component;
    return (
      <div
        className="chat-wrapper__generative-component"
        data-component-name={componentName}
        data-streaming={status === "streaming" ? "true" : undefined}
        data-source={source}
      >
        <GenerativeRenderProvider
          callId={callId}
          status={status}
          source={source}
          isLatest={isLatest}
        >
          <Component {...props} />
        </GenerativeRenderProvider>
      </div>
    );
  }
);

GenerativeComponentRenderer.displayName = "GenerativeComponentRenderer";

interface UnknownComponentFallbackProps {
  name: string;
  /** "live" = component missing during a fresh render (dev/integration error);
   *  "rehydrated" = saved card whose component is no longer registered. */
  variant?: "live" | "rehydrated";
}

export const UnknownComponentFallback = memo<UnknownComponentFallbackProps>(
  ({ name, variant = "live" }) => {
    if (variant === "rehydrated") {
      return (
        <div className="chat-wrapper__generative-component-unknown" role="note">
          <strong>This card is no longer available.</strong>
          <div className="chat-wrapper__generative-component-unknown-hint">
            It was rendered in a previous conversation but the component is no
            longer part of this dashboard.
          </div>
        </div>
      );
    }

    return (
      <div className="chat-wrapper__generative-component-unknown" role="alert">
        <strong>Unknown component:</strong> <code>{name}</code>
        <div className="chat-wrapper__generative-component-unknown-hint">
          Pass <code>{name}</code> in <code>generativeComponents</code> on{" "}
          <code>&lt;ChatWrapper /&gt;</code> to render it here.
        </div>
      </div>
    );
  }
);

UnknownComponentFallback.displayName = "UnknownComponentFallback";
