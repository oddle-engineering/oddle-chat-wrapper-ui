import React, { useState, useCallback, memo } from "react";
import ReactMarkdown from "react-markdown";
import { Message } from "../types";
import { Reasoning, ReasoningTrigger, ReasoningContent } from "./Reasoning";
import { ToolingHandle, ToolingHandleTrigger } from "./ToolingHandle";
import { Loader } from "./Loader";
import { CopyIcon } from "./CopyIcon";
import { SystemMessageCollapsible } from "./SystemMessageCollapsible";
import { REASONING_CONSTANTS } from "../client/constants/reasoning";

interface MessageItemProps {
  message: Message;
  getReasoningTitle: (content: string, isStreaming?: boolean) => string;
  getReasoningStatus: (
    content: string,
    isStreaming?: boolean
  ) => "processing" | "completed" | "error";
  getReasoningDuration: (content: string) => string | undefined;
  getReasoningContentOnly: (content: string) => string;
  getToolingTitle: (content: string, isStreaming?: boolean) => string;
  getToolingStatus: (
    content: string,
    isStreaming?: boolean
  ) => "processing" | "completed" | "error";
  clientTools: any[];
  currentAssistantMessageIdRef: React.MutableRefObject<string | null>;
}

const MarkdownComponents = {
  pre: ({ children, ...props }: any) => (
    <pre className="chat-wrapper__code-block" {...props}>
      {children}
    </pre>
  ),
  code: ({ children, className, ...props }: any) => {
    const isInline = !className;
    return isInline ? (
      <code className="chat-wrapper__inline-code" {...props}>
        {children}
      </code>
    ) : (
      <code className="chat-wrapper__code-block" {...props}>
        {children}
      </code>
    );
  },
  ul: ({ children, ...props }: any) => (
    <ul className="chat-wrapper__list" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="chat-wrapper__ordered-list" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="chat-wrapper__list-item" {...props}>
      {children}
    </li>
  ),
};

const UserMarkdownComponents = {
  ...MarkdownComponents,
  code: ({ children, className, ...props }: any) => {
    const isInline = !className;
    return isInline ? (
      <code className="chat-wrapper__inline-code" {...props}>
        {children}
      </code>
    ) : (
      <code className="chat-wrapper__code" {...props}>
        {children}
      </code>
    );
  },
};

export const MessageItem = memo<MessageItemProps>(
  ({
    message,
    getReasoningTitle,
    getReasoningStatus,
    getReasoningDuration,
    getReasoningContentOnly,
    getToolingTitle,
    getToolingStatus,
    clientTools,
    currentAssistantMessageIdRef,
  }) => {
    const [copied, setCopied] = useState(false);
    const [showCopyButton, setShowCopyButton] = useState(false);

    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy message:", err);
      }
    }, [message.content]);

    const renderStreamingPlaceholder = () => (
      <div className="chat-wrapper__streaming-placeholder">
        <Loader size={16} variant="dots" />
        <span>{REASONING_CONSTANTS.UI_TEXT.THINKING}</span>
      </div>
    );

    const renderCopyButton = () => (
      <>
        <div className="chat-wrapper__copy-button-container">
          <button
            className={`chat-wrapper__copy-button ${showCopyButton ? 'chat-wrapper__copy-button--visible' : 'chat-wrapper__copy-button--hidden'}`}
            onClick={handleCopy}
            title="Copy message"
          >
            <CopyIcon />
          </button>
        </div>
        {copied && (
          <div className="chat-wrapper__copied-notification">Copied!</div>
        )}
      </>
    );

    const renderAssistantMessage = () => (
      <div className="chat-wrapper__regular-message chat-wrapper__assistant-message-container">
        <div className="chat-wrapper__assistant-content-wrapper">
          <div className="chat-wrapper__markdown-content">
            <ReactMarkdown components={MarkdownComponents}>
              {message.content}
            </ReactMarkdown>
          </div>
          {renderCopyButton()}
        </div>
      </div>
    );

    const renderUserMessage = () => (
      <div className="chat-wrapper__regular-message">
        <div className="chat-wrapper__markdown-content">
          <ReactMarkdown components={UserMarkdownComponents}>
            {message.content}
          </ReactMarkdown>
        </div>
        {message.media && message.media.length > 0 && (
          <div className="chat-wrapper__media">
            {message.media.map((mediaUrl, index) => (
              <img
                key={index}
                src={mediaUrl}
                alt={`Uploaded content ${index + 1}`}
                className="chat-wrapper__media-image"
              />
            ))}
          </div>
        )}
      </div>
    );

    const renderMessageContent = () => {
      // Show streaming placeholder for empty assistant messages that are currently streaming
      if (
        message.role === "assistant" &&
        message.isStreaming &&
        message.content === "" &&
        message.id === currentAssistantMessageIdRef.current
      ) {
        return renderStreamingPlaceholder();
      }

      // System messages
      if (message.role === "system") {
        return <SystemMessageCollapsible message={message} />;
      }

      // Assistant messages
      if (message.role === "assistant") {
        return renderAssistantMessage();
      }

      // User messages (default)
      return renderUserMessage();
    };

    const renderReasoningMessage = () => (
      <Reasoning isStreaming={message.isStreaming || false}>
        <ReasoningTrigger
          title={getReasoningTitle(message.content, message.isStreaming)}
          status={getReasoningStatus(message.content, message.isStreaming)}
          duration={getReasoningDuration(message.content)}
        />
        <ReasoningContent>
          {getReasoningContentOnly(message.content)}
        </ReasoningContent>
      </Reasoning>
    );

    const renderToolingMessage = () => (
      <ToolingHandle isStreaming={message.isStreaming || false}>
        <ToolingHandleTrigger
          title={getToolingTitle(message.content, message.isStreaming)}
          status={getToolingStatus(message.content, message.isStreaming)}
          toolData={message.toolData}
          toolName={message.toolData?.toolName}
          clientTools={clientTools}
        />
      </ToolingHandle>
    );

    return (
      <div
        className={`chat-wrapper__message chat-wrapper__message--${
          message.role === "system"
            ? "assistant"
            : message.role === "reasoning"
            ? "reasoning"
            : message.role === "tooling"
            ? "tooling"
            : message.role
        }`}
        onMouseEnter={() =>
          message.role === "assistant" && setShowCopyButton(true)
        }
        onMouseLeave={() =>
          message.role === "assistant" && setShowCopyButton(false)
        }
      >
        {message.role === "reasoning" ? (
          renderReasoningMessage()
        ) : message.role === "tooling" ? (
          renderToolingMessage()
        ) : (
          <div className="chat-wrapper__message-content">
            {renderMessageContent()}
          </div>
        )}
      </div>
    );
  }
);

MessageItem.displayName = "MessageItem";
