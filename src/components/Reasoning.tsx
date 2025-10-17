import { ReactNode } from "react";

interface ReasoningProps {
  isStreaming: boolean;
  children: ReactNode;
}

interface ReasoningTriggerProps {
  title: string;
  status?: "processing" | "completed" | "error";
}

interface ReasoningContentProps {
  children: ReactNode;
}

export function Reasoning({ children }: ReasoningProps) {
  return <div className="chat-wrapper__reasoning">{children}</div>;
}

export function ReasoningTrigger({
  title,
  status = "processing",
}: ReasoningTriggerProps) {
  const renderIcon = () => {
    switch (status) {
      case "completed":
        return (
          <div className="chat-wrapper__reasoning-checkmark">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case "error":
        return (
          <div className="chat-wrapper__reasoning-error">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="chat-wrapper__reasoning-processing">
            <svg
              width="10"
              height="14"
              viewBox="0 0 10 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.79576 11.3819C3.46532 11.3819 3.18343 11.2644 2.9501 11.0294C2.71676 10.7944 2.6001 10.5119 2.6001 10.1819V9.06527C1.96676 8.65082 1.4751 8.11943 1.1251 7.4711C0.775098 6.82277 0.600098 6.12638 0.600098 5.38193C0.600098 4.15627 1.02665 3.11649 1.87976 2.2626C2.73288 1.40882 3.77176 0.981934 4.99643 0.981934C6.2211 0.981934 7.26121 1.40882 8.11676 2.2626C8.97232 3.11649 9.4001 4.15627 9.4001 5.38193C9.4001 6.12438 9.2251 6.8211 8.8751 7.4721C8.5251 8.1231 8.03343 8.65416 7.4001 9.06527V10.1819C7.4001 10.5119 7.28243 10.7944 7.0471 11.0294C6.81188 11.2644 6.52904 11.3819 6.1986 11.3819H3.79576ZM3.8001 10.1819H6.2001V8.41527L6.7501 8.06527C7.20565 7.77638 7.56121 7.39204 7.81676 6.91227C8.07232 6.43249 8.2001 5.92238 8.2001 5.38193C8.2001 4.4966 7.88771 3.74193 7.26293 3.11793C6.63826 2.49393 5.88271 2.18193 4.99626 2.18193C4.10993 2.18193 3.35565 2.49393 2.73343 3.11793C2.11121 3.74193 1.8001 4.4966 1.8001 5.38193C1.8001 5.92238 1.92788 6.43249 2.18343 6.91227C2.43899 7.39204 2.79454 7.77638 3.2501 8.06527L3.8001 8.41527V10.1819ZM3.8001 13.7819C3.57343 13.7819 3.38343 13.7053 3.2301 13.5519C3.07676 13.3986 3.0001 13.2086 3.0001 12.9819V12.5819H7.0001V12.9819C7.0001 13.2086 6.92343 13.3986 6.7701 13.5519C6.61676 13.7053 6.42676 13.7819 6.2001 13.7819H3.8001Z"
                fill="#637381"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="chat-wrapper__reasoning-trigger">
      <div className="chat-wrapper__reasoning-icon">{renderIcon()}</div>
      <span className="chat-wrapper__reasoning-title">{title}</span>
      {(title.includes("Thinking") || title.includes("Processing")) && (
        <div className="chat-wrapper__reasoning-arrow">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_44_18068"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="16"
              height="17"
            >
              <rect y="0.000488281" width="16" height="16" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_44_18068)">
              <path
                d="M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z"
                fill="#637381"
              />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}

export function ReasoningContent({ children }: ReasoningContentProps) {
  return (
    <div className="chat-wrapper__reasoning-content">
      <div className="chat-wrapper__reasoning-text">{children}</div>
    </div>
  );
}
