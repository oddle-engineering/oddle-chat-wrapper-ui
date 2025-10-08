import { KeyboardEvent } from 'react';

interface MessageInputProps {
  onSend: (message: string, media?: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onStop?: () => void;
  onClear?: () => void;
  showStopButton?: boolean;
  showClearButton?: boolean;
}

export function MessageInput({ 
  onSend, 
  disabled, 
  placeholder,
  value,
  onChange,
  onStop,
  onClear,
  showStopButton,
  showClearButton
}: MessageInputProps) {

  const handleSend = () => {
    const message = value || '';
    if (message.trim() && !disabled) {
      onSend(message.trim());
      if (onChange) {
        onChange('');
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleStop = () => {
    if (onStop) {
      onStop();
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="chat-wrapper__input">
      <textarea
        value={value || ''}
        onChange={(e) => onChange ? onChange(e.target.value) : undefined}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className="chat-wrapper__textarea"
        rows={1}
      />
      <div className="chat-wrapper__input-buttons">
        {showStopButton && (
          <button
            onClick={handleStop}
            className="chat-wrapper__stop-button"
            title="Stop generation"
          >
            Stop
          </button>
        )}
        {showClearButton && !disabled && (
          <button
            onClick={handleClear}
            className="chat-wrapper__clear-button"
            title="Clear chat"
          >
            Clear
          </button>
        )}
        <button
          onClick={handleSend}
          disabled={disabled || !value?.trim()}
          className="chat-wrapper__send-button"
        >
          {disabled ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}