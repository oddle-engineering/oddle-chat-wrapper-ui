import React from 'react';

interface ChatMainHeaderProps {
  headerName: string;
  headerDescription?: string;
}

export const ChatMainHeader: React.FC<ChatMainHeaderProps> = ({
  headerName,
  headerDescription,
}) => {
  return (
    <div className="chat-wrapper__main-header">
      <h1 className="chat-wrapper__main-title">{headerName}</h1>
      {headerDescription && (
        <p className="chat-wrapper__description">
          {headerDescription}
        </p>
      )}
    </div>
  );
};