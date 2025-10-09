import React, { ReactNode, KeyboardEventHandler, forwardRef } from 'react';

// Base utility function for class names (simplified version of cn)
const cn = (...classes: (string | undefined | false | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Status type for the submit button
export type ChatStatus = 'idle' | 'submitted' | 'streaming' | 'error';

// Icons as SVG components
const SendIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
  </svg>
);

const LoaderIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SquareIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Main PromptInput container
export interface PromptInputProps extends React.HTMLAttributes<HTMLFormElement> {}

export const PromptInput = ({ className, ...props }: PromptInputProps) => (
  <form
    className={cn(
      'chat-wrapper__prompt-input',
      className
    )}
    {...props}
  />
);

// Textarea component
export interface PromptInputTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minHeight?: number;
  maxHeight?: number;
}

export const PromptInputTextarea = forwardRef<HTMLTextAreaElement, PromptInputTextareaProps>(({
  onChange,
  className,
  placeholder = 'What would you like to know?',
  minHeight = 48,
  maxHeight = 164,
  onKeyDown,
  ...props
}, ref) => {
  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow newline
        return;
      }
      // Submit on Enter (without Shift)
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
        form.dispatchEvent(submitEvent);
      }
    }
    onKeyDown?.(e);
  };

  return (
    <textarea
      ref={ref}
      className={cn(
        'chat-wrapper__prompt-textarea',
        className
      )}
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
});

PromptInputTextarea.displayName = 'PromptInputTextarea';

// Toolbar container
export interface PromptInputToolbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PromptInputToolbar = ({
  className,
  ...props
}: PromptInputToolbarProps) => (
  <div
    className={cn('chat-wrapper__prompt-toolbar', className)}
    {...props}
  />
);

// Tools container (left side of toolbar)
export interface PromptInputToolsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PromptInputTools = ({
  className,
  ...props
}: PromptInputToolsProps) => (
  <div
    className={cn('chat-wrapper__prompt-tools', className)}
    {...props}
  />
);

// Generic button component
export interface PromptInputButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'icon' | 'sm' | 'lg';
}

export const PromptInputButton = ({
  variant = 'ghost',
  size = 'default',
  className,
  children,
  ...props
}: PromptInputButtonProps) => {
  // Auto-detect size based on children content
  const autoSize = size === 'default' && (typeof children === 'string' || React.Children.count(children) === 1) ? 'icon' : size;
  
  return (
    <button
      className={cn(
        'chat-wrapper__prompt-button',
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
export interface PromptInputSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'icon' | 'sm' | 'lg';
  status?: ChatStatus;
}

export const PromptInputSubmit = ({
  className,
  variant = 'default',
  size = 'icon',
  status = 'idle',
  children,
  disabled,
  ...props
}: PromptInputSubmitProps) => {
  let Icon: ReactNode = <SendIcon className="chat-wrapper__prompt-icon" />;
  
  if (status === 'submitted') {
    Icon = <LoaderIcon className="chat-wrapper__prompt-icon chat-wrapper__prompt-icon--spin" />;
  } else if (status === 'streaming') {
    Icon = <SquareIcon className="chat-wrapper__prompt-icon" />;
  } else if (status === 'error') {
    Icon = <XIcon className="chat-wrapper__prompt-icon" />;
  }

  const isDisabled = disabled || status === 'submitted' || status === 'streaming';

  return (
    <button
      className={cn(
        'chat-wrapper__prompt-submit',
        `chat-wrapper__prompt-submit--${variant}`,
        `chat-wrapper__prompt-submit--${size}`,
        status === 'streaming' && 'chat-wrapper__prompt-submit--stop',
        className
      )}
      type="submit"
      disabled={isDisabled}
      {...props}
    >
      {children ?? Icon}
    </button>
  );
};

// Model select components (placeholder structure)
export interface PromptInputModelSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const PromptInputModelSelect = ({ className, children, ...props }: PromptInputModelSelectProps) => (
  <select
    className={cn('chat-wrapper__prompt-select', className)}
    {...props}
  >
    {children}
  </select>
);

export interface PromptInputModelSelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PromptInputModelSelectTrigger = ({
  className,
  children,
  ...props
}: PromptInputModelSelectTriggerProps) => (
  <button
    className={cn('chat-wrapper__prompt-select-trigger', className)}
    type="button"
    {...props}
  >
    {children}
  </button>
);

export interface PromptInputModelSelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PromptInputModelSelectContent = ({
  className,
  ...props
}: PromptInputModelSelectContentProps) => (
  <div
    className={cn('chat-wrapper__prompt-select-content', className)}
    {...props}
  />
);

export interface PromptInputModelSelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const PromptInputModelSelectItem = ({
  className,
  value,
  ...props
}: PromptInputModelSelectItemProps) => (
  <div
    className={cn('chat-wrapper__prompt-select-item', className)}
    data-value={value}
    {...props}
  />
);

export interface PromptInputModelSelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}

export const PromptInputModelSelectValue = ({
  className,
  placeholder,
  ...props
}: PromptInputModelSelectValueProps) => (
  <span
    className={cn('chat-wrapper__prompt-select-value', className)}
    {...props}
  >
    {placeholder}
  </span>
);