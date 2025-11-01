import React from 'react';

interface ChatMainHeaderProps {
  appName: string;
  description?: string;
}

export const ChatMainHeader: React.FC<ChatMainHeaderProps> = ({
  appName,
  description,
}) => {
  return (
    <div className="chat-wrapper__main-header">
      <h1 className="chat-wrapper__main-title">{appName}</h1>
      {description && (
        <p className="chat-wrapper__description">
          {description}
        </p>
      )}
    </div>
  );
};