import React from "react";

export interface ConnectionErrorProps {
  /** Type of error that occurred */
  errorType?: "network" | "auth" | "server" | "unknown";
  /** Custom error message */
  errorMessage?: string;
  /** Number of retry attempts made */
  retryCount?: number;
  /** Callback when retry button is clicked */
  onRetry?: () => void;
  /** Optional footer content to show below error */
  footer?: React.ReactNode;
}

/**
 * ConnectionError - Displays error overlay when connection fails
 *
 * Shows a friendly error message with retry option when ticket fetch
 * or WebSocket connection fails.
 */
export const ConnectionError: React.FC<ConnectionErrorProps> = ({
  errorType = "unknown",
  errorMessage,
  retryCount = 0,
  onRetry,
  footer,
}) => {
  const getErrorContent = () => {
    if (errorMessage) {
      return {
        title: "Connection Failed",
        message: errorMessage,
      };
    }

    switch (errorType) {
      case "network":
        return {
          title: "Connection Failed",
          message:
            "We couldn't establish a connection. Please check your internet connection and try again.",
        };
      case "auth":
        return {
          title: "Authentication Failed",
          message:
            "We couldn't verify your identity. Please refresh the page to try again.",
        };
      case "server":
        return {
          title: "Something went wrong",
          message:
            "AI-Assist is temporarily unable to reach the server. Please try again.",
        };
      default:
        return {
          title: "Something went wrong",
          message:
            "AI-Assist is temporarily unable to reach the server. Please try again.",
        };
    }
  };

  const { title, message } = getErrorContent();

  return (
    <div className="chat-wrapper__connection-error-overlay">
      <div className="chat-wrapper__connection-error-card">
        <div className="chat-wrapper__connection-error-icon">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="20" fill="#FEE2E2" />
            <path
              d="M24 16V26M24 30V32"
              stroke="#DC2626"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h3 className="chat-wrapper__connection-error-title">{title}</h3>
        <p className="chat-wrapper__connection-error-message">{message}</p>

        {retryCount > 0 && (
          <p className="chat-wrapper__connection-error-retry-count">
            Retry attempt: {retryCount}
          </p>
        )}

        {onRetry && (
          <button
            className="chat-wrapper__connection-error-button"
            onClick={onRetry}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.84871 2 11.5009 2.85147 12.6 4.2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 2V4.5H9.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Try Again
          </button>
        )}

        {/* Footer with alternative options */}
        {footer && (
          <div className="chat-wrapper__connection-error-footer">{footer}</div>
        )}
      </div>
    </div>
  );
};
