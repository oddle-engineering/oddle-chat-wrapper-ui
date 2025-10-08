interface LoaderProps {
  size?: number;
  variant?: 'dots' | 'pulse' | 'spinner';
}

export function Loader({ size = 16, variant = 'dots' }: LoaderProps) {
  if (variant === 'dots') {
    return (
      <div className="chat-wrapper__loader-dots" style={{ fontSize: size }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div 
        className="chat-wrapper__loader-pulse" 
        style={{ width: size, height: size }}
      ></div>
    );
  }

  return (
    <div 
      className="chat-wrapper__loader-spinner" 
      style={{ width: size, height: size }}
    ></div>
  );
}