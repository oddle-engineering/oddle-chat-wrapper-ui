import React, { ReactNode, KeyboardEventHandler, forwardRef } from "react";
import { ChatStatus, CHAT_STATUS } from "../constants/chatStatus";
import { isChatActive } from "../constants/chatStatus";

// Base utility function for class names (simplified version of cn)
const cn = (...classes: (string | undefined | false | null)[]): string => {
  return classes.filter(Boolean).join(" ");
};

// Icons as SVG components
const SendIcon = () => (
  <svg
    width="54"
    height="55"
    viewBox="0 0 54 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_dd_121_23927)">
      <path
        d="M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z"
        fill="#3D0099"
        shapeRendering="crispEdges"
      />
      <g clipPath="url(#clip0_121_23927)">
        <path
          d="M16.3333 26.3541L18.2133 28.2341L25.6666 20.7941V37.0208H28.3333V20.7941L35.7733 28.2474L37.6666 26.3541L26.9999 15.6874L16.3333 26.3541Z"
          fill="white"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_dd_121_23927"
        x="0"
        y="0.354126"
        width="54"
        height="54"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_121_23927"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_121_23927"
          result="effect2_dropShadow_121_23927"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_121_23927"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_121_23927">
        <rect
          width="32"
          height="32"
          fill="white"
          transform="translate(11 10.3541)"
        />
      </clipPath>
    </defs>
  </svg>
);

// Stop Icon component
const StopIcon = () => (
  <svg
    width="54"
    height="55"
    viewBox="0 0 54 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_dd_121_23927)">
      <path
        d="M3 26.3541C3 13.0993 13.7452 2.35413 27 2.35413C40.2548 2.35413 51 13.0993 51 26.3541C51 39.609 40.2548 50.3541 27 50.3541C13.7452 50.3541 3 39.609 3 26.3541Z"
        fill="inherit"
        shapeRendering="crispEdges"
      />
      <rect x="19" y="19.3541" width="16" height="16" rx="2" fill="white" />
    </g>
    <defs>
      <filter
        id="filter0_dd_121_23927"
        x="0"
        y="0.354126"
        width="54"
        height="54"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_121_23927"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_121_23927"
          result="effect2_dropShadow_121_23927"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_121_23927"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

// Main PromptInput container
export interface PromptInputProps
  extends React.HTMLAttributes<HTMLFormElement> {}

export const PromptInput = ({ className, ...props }: PromptInputProps) => (
  <form className={cn("chat-wrapper__prompt-input", className)} {...props} />
);

// Textarea component
export interface PromptInputTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minHeight?: number;
  maxHeight?: number;
}

export const PromptInputTextarea = forwardRef<
  HTMLTextAreaElement,
  PromptInputTextareaProps
>(
  (
    {
      onChange,
      className,
      placeholder = "What would you like to know?",
      minHeight = 48,
      maxHeight = 164,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      if (e.key === "Enter") {
        if (e.shiftKey) {
          // Allow newline
          return;
        }
        // Submit on Enter (without Shift)
        e.preventDefault();
        const form = e.currentTarget.form;
        if (form) {
          const submitEvent = new Event("submit", {
            cancelable: true,
            bubbles: true,
          });
          form.dispatchEvent(submitEvent);
        }
      }
      onKeyDown?.(e);
    };

    return (
      <textarea
        ref={ref}
        className={cn("chat-wrapper__prompt-textarea", className)}
        name="message"
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{
          minHeight: `${minHeight}px`,
          maxHeight: `${maxHeight}px`,
        }}
        {...props}
      />
    );
  }
);

PromptInputTextarea.displayName = "PromptInputTextarea";

// Toolbar container
export interface PromptInputToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const PromptInputToolbar = ({
  className,
  ...props
}: PromptInputToolbarProps) => (
  <div className={cn("chat-wrapper__prompt-toolbar", className)} {...props} />
);

// Tools container (left side of toolbar)
export interface PromptInputToolsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const PromptInputTools = ({
  className,
  ...props
}: PromptInputToolsProps) => (
  <div className={cn("chat-wrapper__prompt-tools", className)} {...props} />
);

// Generic button component
export interface PromptInputButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "icon" | "sm" | "lg";
}

export const PromptInputButton = ({
  variant = "ghost",
  size = "default",
  className,
  children,
  ...props
}: PromptInputButtonProps) => {
  // Auto-detect size based on children content
  const autoSize =
    size === "default" &&
    (typeof children === "string" || React.Children.count(children) === 1)
      ? "icon"
      : size;

  return (
    <button
      className={cn(
        "chat-wrapper__prompt-button",
        `chat-wrapper__prompt-button--${variant}`,
        `chat-wrapper__prompt-button--${autoSize}`,
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

// Submit button with status awareness
export interface PromptInputSubmitProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "icon" | "sm" | "lg";
  status?: ChatStatus;
}

export const PromptInputSubmit = ({
  className,
  variant = "default",
  size = "icon",
  status = CHAT_STATUS.IDLE,
  children,
  disabled,
  ...props
}: PromptInputSubmitProps) => {
  // Show stop icon when chat is active (submitted or streaming)
  const showStopButton = isChatActive(status);
  let Icon: ReactNode = showStopButton ? <StopIcon /> : <SendIcon />;

  return (
    <button
      className={cn(
        "chat-wrapper__prompt-submit",
        `chat-wrapper__prompt-submit--${variant}`,
        `chat-wrapper__prompt-submit--${size}`,
        !disabled && "chat-wrapper__prompt-submit--enabled",
        showStopButton && "chat-wrapper__prompt-submit--stop",
        className
      )}
      type={showStopButton ? "button" : "submit"}
      disabled={disabled}
      {...props}
    >
      {children ?? Icon}
    </button>
  );
};

// Model select components (placeholder structure)
export interface PromptInputModelSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const PromptInputModelSelect = ({
  className,
  children,
  ...props
}: PromptInputModelSelectProps) => (
  <select className={cn("chat-wrapper__prompt-select", className)} {...props}>
    {children}
  </select>
);

export interface PromptInputModelSelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PromptInputModelSelectTrigger = ({
  className,
  children,
  ...props
}: PromptInputModelSelectTriggerProps) => (
  <button
    className={cn("chat-wrapper__prompt-select-trigger", className)}
    type="button"
    {...props}
  >
    {children}
  </button>
);

export interface PromptInputModelSelectContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const PromptInputModelSelectContent = ({
  className,
  ...props
}: PromptInputModelSelectContentProps) => (
  <div
    className={cn("chat-wrapper__prompt-select-content", className)}
    {...props}
  />
);

export interface PromptInputModelSelectItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const PromptInputModelSelectItem = ({
  className,
  value,
  ...props
}: PromptInputModelSelectItemProps) => (
  <div
    className={cn("chat-wrapper__prompt-select-item", className)}
    data-value={value}
    {...props}
  />
);

export interface PromptInputModelSelectValueProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}

export const PromptInputModelSelectValue = ({
  className,
  placeholder,
  ...props
}: PromptInputModelSelectValueProps) => (
  <span
    className={cn("chat-wrapper__prompt-select-value", className)}
    {...props}
  >
    {placeholder}
  </span>
);
