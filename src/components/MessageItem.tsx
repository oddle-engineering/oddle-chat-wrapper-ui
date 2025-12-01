import { useState, useCallback, memo } from "react";
import ReactMarkdown from "react-markdown";
import { Message } from "../types";
import { Reasoning, ReasoningTrigger, ReasoningContent } from "./Reasoning";
import { ToolingHandle, ToolingHandleTrigger } from "./ToolingHandle";
import { Loader } from "./Loader";
import { CopyIcon } from "./icons";
import { SystemMessageCollapsible } from "./SystemMessageCollapsible";
import { ImagePreviewModal } from "./ImagePreviewModal";
import { REASONING_CONSTANTS } from "../client/constants/reasoning";
import { useChatContext } from "../contexts";

interface MessageItemProps {
  message: Message;
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
      <code className="chat-wrapper__code" {...props}>
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
  hr: ({ ...props }: any) => (
    <hr className="chat-wrapper__hr" {...props} />
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
  ({ message }) => {
    const {
      getReasoningTitle,
      getReasoningStatus,
      getReasoningDuration,
      getReasoningContentOnly,
      getToolingTitle,
      getToolingStatus,
      clientTools,
      currentAssistantMessageIdRef,
      onRetryMessage,
    } = useChatContext();
    
    const [copied, setCopied] = useState(false);
    const [showCopyButton, setShowCopyButton] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy message:", err);
      }
    }, [message.content]);

    const handleRetry = useCallback(() => {
      if (onRetryMessage) {
        onRetryMessage(message.id);
      }
    }, [onRetryMessage, message.id]);

    const handleImageClick = useCallback((imageUrl: string) => {
      setPreviewImage(imageUrl);
    }, []);

    // Utility function to parse media URLs (same as in ChatInput)
    const parseImageMediaUrl = useCallback((media: string) => {
      if (media.startsWith("data:image/") && media.includes("thumbnailUrl=")) {
        // Parse the encoded URL format from upload service
        // const thumbnailMatch = media.match(/thumbnailUrl=([^;]+)/);
        const cdnUrlMatch = media.match(/cdnUrl=([^;]+)/);
        const filenameMatch = media.match(/filename=([^;]+)/);
        
        // const thumbnailUrl = thumbnailMatch ? decodeURIComponent(thumbnailMatch[1]) : media;
        const cdnUrl = cdnUrlMatch ? decodeURIComponent(cdnUrlMatch[1]) : media;
        
        return {
          // TODO: Switch back to thumbnailUrl when backend provides proper thumbnail URLs
          // Currently using cdnUrl for both thumbnail and full image display
          thumbnailUrl: cdnUrl, // Using cdnUrl temporarily instead of thumbnailUrl
          cdnUrl: cdnUrl,
          filename: filenameMatch ? decodeURIComponent(filenameMatch[1]) : "image"
        };
      }
      
      // Fallback for base64 or other formats
      return {
        thumbnailUrl: media,
        cdnUrl: media,
        filename: "image"
      };
    }, []);

    const handleClosePreview = useCallback(() => {
      setPreviewImage(null);
    }, []);

    const renderStreamingPlaceholder = () => (
      <div className="chat-wrapper__streaming-placeholder">
        <Loader size={16} variant="dots" />
        <span>{REASONING_CONSTANTS.UI_TEXT.THINKING}</span>
      </div>
    );


    const renderRetryButton = () => (
      onRetryMessage && (
        <button 
          className="chat-wrapper__retry-button"
          onClick={handleRetry}
        >
          Retry
        </button>
      )
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
            {message.media.map((mediaUrl, index) => {
              // Parse the media URL to extract cdnUrl for display
              const imageData = parseImageMediaUrl(mediaUrl);
              return (
                <img
                  key={index}
                  src={imageData.cdnUrl} // Use cdnUrl for display instead of raw mediaUrl
                  alt={`Uploaded content ${index + 1}`}
                  className="chat-wrapper__media-image chat-wrapper__media-image--clickable"
                  onClick={() => handleImageClick(imageData.cdnUrl)} // Use cdnUrl for full-size view
                  style={{ 
                    cursor: 'zoom-in',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                  title="Click to view full size"
                />
              );
            })}
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
      <>
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
            <>
              <div className="chat-wrapper__message-content">
                {renderMessageContent()}
              </div>
              {message.role === "user" && message.hasError && !message.isRetrying && renderRetryButton()}
            </>
          )}
        </div>
        
        {/* Image Preview Modal */}
        <ImagePreviewModal
          imageUrl={previewImage}
          isOpen={!!previewImage}
          onClose={handleClosePreview}
          alt="Message image"
        />
      </>
    );
  }
);

MessageItem.displayName = "MessageItem";
