import React, { ReactNode, useState } from "react";
import { REASONING_CONSTANTS } from "../client/constants/reasoning";

interface ReasoningProps {
  isStreaming: boolean;
  children: ReactNode;
}

interface ReasoningTriggerProps {
  title: string;
  status?: "processing" | "completed" | "error";
  duration?: string;
  onToggle?: () => void;
  isExpanded?: boolean;
}

interface ReasoningContentProps {
  children: ReactNode;
  isVisible?: boolean;
}

export function Reasoning({ children, isStreaming }: ReasoningProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);

  // When reasoning completes (isStreaming becomes false), auto-collapse
  React.useEffect(() => {
    if (!isStreaming && !hasCompleted) {
      setHasCompleted(true);
      setIsExpanded(false); // Auto-collapse when completed
    } else if (isStreaming) {
      setHasCompleted(false);
      setIsExpanded(true); // Auto-expand when streaming starts
    }
  }, [isStreaming, hasCompleted]);

  const handleToggle = () => {
    // Only allow collapsing if not streaming
    if (!isStreaming) {
      setIsExpanded(!isExpanded);
    }
  };

  // Clone children and pass props
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === ReasoningTrigger) {
        return React.cloneElement(
          child as React.ReactElement<ReasoningTriggerProps>,
          {
            onToggle: handleToggle,
            isExpanded,
          }
        );
      }
      if (child.type === ReasoningContent) {
        return React.cloneElement(
          child as React.ReactElement<ReasoningContentProps>,
          {
            isVisible: isExpanded,
          }
        );
      }
    }
    return child;
  });

  return <div className="chat-wrapper__reasoning">{childrenWithProps}</div>;
}

export function ReasoningTrigger({
  title,
  status = "processing",
  duration,
  onToggle,
  isExpanded = true,
}: ReasoningTriggerProps) {
  const renderIcon = () => {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_64_36210"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="16"
          height="16"
        >
          <rect width="16" height="16" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_64_36210)">
          <path
            d="M6.79576 11.9996C6.46532 11.9996 6.18343 11.8821 5.9501 11.6471C5.71676 11.4121 5.6001 11.1296 5.6001 10.7996V9.68294C4.96676 9.2685 4.4751 8.73711 4.1251 8.08878C3.7751 7.44044 3.6001 6.74405 3.6001 5.99961C3.6001 4.77394 4.02665 3.73417 4.87976 2.88028C5.73288 2.0265 6.77176 1.59961 7.99643 1.59961C9.2211 1.59961 10.2612 2.0265 11.1168 2.88028C11.9723 3.73417 12.4001 4.77394 12.4001 5.99961C12.4001 6.74205 12.2251 7.43878 11.8751 8.08978C11.5251 8.74078 11.0334 9.27183 10.4001 9.68294V10.7996C10.4001 11.1296 10.2824 11.4121 10.0471 11.6471C9.81188 11.8821 9.52904 11.9996 9.1986 11.9996H6.79576ZM6.8001 10.7996H9.2001V9.03294L9.7501 8.68294C10.2057 8.39405 10.5612 8.00972 10.8168 7.52994C11.0723 7.05017 11.2001 6.54005 11.2001 5.99961C11.2001 5.11428 10.8877 4.35961 10.2629 3.73561C9.63826 3.11161 8.88271 2.79961 7.99626 2.79961C7.10993 2.79961 6.35565 3.11161 5.73343 3.73561C5.11121 4.35961 4.8001 5.11428 4.8001 5.99961C4.8001 6.54005 4.92788 7.05017 5.18343 7.52994C5.43899 8.00972 5.79454 8.39405 6.2501 8.68294L6.8001 9.03294V10.7996ZM6.8001 14.3996C6.57343 14.3996 6.38343 14.3229 6.2301 14.1696C6.07676 14.0163 6.0001 13.8263 6.0001 13.5996V13.1996H10.0001V13.5996C10.0001 13.8263 9.92343 14.0163 9.7701 14.1696C9.61676 14.3229 9.42676 14.3996 9.2001 14.3996H6.8001Z"
            fill="#637381"
          />
        </g>
      </svg>
    );
  };

  const canToggle =
    status === "completed" ||
    title.includes(REASONING_CONSTANTS.UI_TEXT.THINKING) ||
    title.includes(REASONING_CONSTANTS.UI_TEXT.PROCESSING);

  return (
    <div
      className={`chat-wrapper__reasoning-trigger ${
        canToggle ? "chat-wrapper__reasoning-trigger--clickable" : ""
      }`}
      onClick={canToggle ? onToggle : undefined}
      style={{ cursor: canToggle ? "pointer" : "default" }}
    >
      <div className="chat-wrapper__reasoning-icon">{renderIcon()}</div>
      <span className="chat-wrapper__reasoning-title">
        {title}
        {duration && status === "completed" && (
          <span className="chat-wrapper__reasoning-duration">{duration}</span>
        )}
      </span>
      {canToggle && (
        <div
          className={`chat-wrapper__reasoning-arrow ${
            !isExpanded ? "chat-wrapper__reasoning-arrow--collapsed" : ""
          }`}
        >
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

export function ReasoningContent({
  children,
  isVisible = true,
}: ReasoningContentProps) {
  if (!isVisible) return null;

  return (
    <div className="chat-wrapper__reasoning-content">
      <div className="chat-wrapper__reasoning-text">{children}</div>
    </div>
  );
}
