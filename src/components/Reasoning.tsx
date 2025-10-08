import { ReactNode } from 'react';

interface ReasoningProps {
  isStreaming: boolean;
  children: ReactNode;
}

interface ReasoningTriggerProps {
  title: string;
}

interface ReasoningContentProps {
  children: ReactNode;
}

export function Reasoning({ children }: ReasoningProps) {
  return (
    <div className="chat-wrapper__reasoning">
      {children}
    </div>
  );
}

export function ReasoningTrigger({ title }: ReasoningTriggerProps) {
  return (
    <div className="chat-wrapper__reasoning-trigger">
      <div className="chat-wrapper__reasoning-icon">
        <div className="chat-wrapper__reasoning-spinner"></div>
      </div>
      <span className="chat-wrapper__reasoning-title">{title}</span>
    </div>
  );
}

export function ReasoningContent({ children }: ReasoningContentProps) {
  return (
    <div className="chat-wrapper__reasoning-content">
      <div className="chat-wrapper__reasoning-text">
        {children}
      </div>
    </div>
  );
}