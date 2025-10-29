import { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import {
  ChatWrapperProps,
  Message,
  ToolResult,
  ContextHelpers,
  ToolCallRequest,
} from "../types";
import { ChatStatus } from "./PromptInput";
import { ChatInput, ChatInputRef } from "./ChatInput";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { Reasoning, ReasoningTrigger, ReasoningContent } from "./Reasoning";
import { ToolingHandle, ToolingHandleTrigger } from "./ToolingHandle";
import { Loader } from "./Loader";
import { InlineLoader } from "./InlineLoader";
import { DevSettings } from "./DevSettings";
import { CopyIcon } from "./CopyIcon";
import { WebSocketChatClient, SystemEvent, SystemEventType } from "../client";
import { sanitizeMessage } from "../utils/security";
import { fetchThreadMessages } from "../utils/threadApi";
import "../styles/chat-wrapper.css";

// Memoized Message Component to prevent unnecessary re-renders
const MessageComponent = memo(
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
  }: {
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
  }) => {
    const [copied, setCopied] = useState(false);
    const [showCopyButton, setShowCopyButton] = useState(false);

    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide "copied" message after 2 seconds
      } catch (err) {
        console.error("Failed to copy message:", err);
      }
    }, [message.content]);

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
          /* Reasoning message - no content wrapper */
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
        ) : message.role === "tooling" ? (
          /* Tooling message - no content wrapper */
          <ToolingHandle isStreaming={message.isStreaming || false}>
            <ToolingHandleTrigger
              title={getToolingTitle(message.content, message.isStreaming)}
              status={getToolingStatus(message.content, message.isStreaming)}
              toolData={message.toolData}
              toolName={message.toolData?.toolName}
              clientTools={clientTools}
            />
          </ToolingHandle>
        ) : (
          <div className="chat-wrapper__message-content">
            {message.role === "assistant" &&
            message.isStreaming &&
            message.content === "" &&
            message.id === currentAssistantMessageIdRef.current ? (
              /* Show streaming indicator when no content yet */
              <div className="chat-wrapper__streaming-placeholder">
                <Loader size={16} variant="dots" />
                <span>{`Thinking`}</span>
              </div>
            ) : message.role === "system" ? (
              /* System message with collapsible tool result */
              <SystemMessageCollapsible message={message} />
            ) : message.role === "assistant" ? (
              /* Assistant message with regular markdown display */
              <div className="chat-wrapper__regular-message chat-wrapper__assistant-message-container">
                {showCopyButton && (
                  <button
                    className="chat-wrapper__copy-button"
                    onClick={handleCopy}
                    title="Copy message"
                  >
                    <CopyIcon />
                  </button>
                )}
                {copied && (
                  <div className="chat-wrapper__copied-notification">
                    Copied!
                  </div>
                )}
                <div className="chat-wrapper__markdown-content">
                  <ReactMarkdown
                    components={{
                      pre: ({ children }) => (
                        <pre className="chat-wrapper__code-block">
                          {children}
                        </pre>
                      ),
                      code: ({ children, className }) => {
                        const isInline = !className;
                        return isInline ? (
                          <code className="chat-wrapper__inline-code">
                            {children}
                          </code>
                        ) : (
                          <code className="chat-wrapper__code-block">
                            {children}
                          </code>
                        );
                      },
                      ul: ({ children }) => (
                        <ul className="chat-wrapper__list">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="chat-wrapper__ordered-list">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="chat-wrapper__list-item">{children}</li>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              /* User message display with markdown */
              <div className="chat-wrapper__regular-message">
                <div className="chat-wrapper__markdown-content">
                  <ReactMarkdown
                    components={{
                      pre: ({ children }) => (
                        <pre className="chat-wrapper__code-block">
                          {children}
                        </pre>
                      ),
                      code: ({ children, className }) => {
                        const isInline = !className;
                        return isInline ? (
                          <code className="chat-wrapper__inline-code">
                            {children}
                          </code>
                        ) : (
                          <code className="chat-wrapper__code">{children}</code>
                        );
                      },
                      p: ({ children }) => (
                        <p className="chat-wrapper__paragraph">{children}</p>
                      ),
                      h1: ({ children }) => (
                        <h1 className="chat-wrapper__heading-1">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="chat-wrapper__heading-2">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="chat-wrapper__heading-3">{children}</h3>
                      ),
                      ul: ({ children }) => (
                        <ul className="chat-wrapper__list">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="chat-wrapper__ordered-list">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="chat-wrapper__list-item">{children}</li>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="chat-wrapper__blockquote">
                          {children}
                        </blockquote>
                      ),
                      strong: ({ children }) => (
                        <strong className="chat-wrapper__bold">
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => (
                        <em className="chat-wrapper__italic">{children}</em>
                      ),
                    }}
                  >
                    {message.content.trim()}
                  </ReactMarkdown>
                </div>
                {message.role === "user" &&
                  message.media &&
                  message.media.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginBottom: "4px",
                        justifyContent: "flex-end",
                      }}
                    >
                      {message.media.map((media, index) => {
                        // Check if it's an image (either base64 or URL)
                        const isImageBase64 = media.startsWith("data:image/");
                        const isImageUrl =
                          media.startsWith("http://") ||
                          media.startsWith("https://");
                        const isImage = isImageBase64 || isImageUrl;

                        return (
                          <div
                            key={index}
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            {isImage ? (
                              <div
                                style={{
                                  position: "relative",
                                  width: "56px",
                                  height: "56px",
                                  borderRadius: "8px",
                                  overflow: "hidden",
                                  border: "1px solid #e2e8f0",
                                  justifyContent: "flex-end",
                                }}
                              >
                                {/* Main image */}
                                <img
                                  src={media}
                                  alt={`Attachment ${index + 1}`}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                                {/* Dark overlay on top of image */}
                                <div
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                                    zIndex: 1,
                                  }}
                                />
                              </div>
                            ) : (
                              <div
                                style={{
                                  position: "relative",
                                  display: "flex",
                                  alignItems: "center",
                                  backgroundColor: "#1f2937",
                                  borderRadius: "8px",
                                  padding: "8px",
                                  minWidth: "200px",
                                  maxWidth: "300px",
                                  height: "56px",
                                }}
                              >
                                {/* File icon */}
                                <div
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    backgroundColor: "#8b5cf6",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: "12px",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <mask
                                      id="mask0_190_623"
                                      style={{ maskType: "alpha" }}
                                      maskUnits="userSpaceOnUse"
                                      x="0"
                                      y="0"
                                      width="24"
                                      height="25"
                                    >
                                      <rect
                                        y="0.354126"
                                        width="24"
                                        height="24"
                                        fill="#D9D9D9"
                                      />
                                    </mask>
                                    <g mask="url(#mask0_190_623)">
                                      <path
                                        d="M8.19225 13.0079H15.8077V11.5079H8.19225V13.0079ZM8.19225 15.8926H15.8077V14.3926H8.19225V15.8926ZM8.19225 18.7771H12.8077V17.2771H8.19225V18.7771ZM6.30775 21.8541C5.80258 21.8541 5.375 21.6791 5.025 21.3291C4.675 20.9791 4.5 20.5515 4.5 20.0464V4.66188C4.5 4.15671 4.675 3.72913 5.025 3.37913C5.375 3.02913 5.80258 2.85413 6.30775 2.85413H14.25L19.5 8.10413V20.0464C19.5 20.5515 19.325 20.9791 18.975 21.3291C18.625 21.6791 18.1974 21.8541 17.6923 21.8541H6.30775ZM13.5 8.85413V4.35413H6.30775C6.23075 4.35413 6.16025 4.38621 6.09625 4.45038C6.03208 4.51438 6 4.58488 6 4.66188V20.0464C6 20.1234 6.03208 20.1939 6.09625 20.2579C6.16025 20.322 6.23075 20.3541 6.30775 20.3541H17.6923C17.7692 20.3541 17.8398 20.322 17.9038 20.2579C17.9679 20.1939 18 20.1234 18 20.0464V8.85413H13.5Z"
                                        fill="white"
                                      />
                                    </g>
                                  </svg>
                                </div>

                                {/* File info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div
                                    style={{
                                      color: "white",
                                      fontSize: "14px",
                                      fontWeight: "500",
                                      marginBottom: "2px",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      maxWidth: "200px",
                                    }}
                                  >
                                    {/* Extract filename from media string */}
                                    {(() => {
                                      const nameMatch =
                                        media.match(/name=([^;]+)/);
                                      if (nameMatch) {
                                        return decodeURIComponent(nameMatch[1]);
                                      }
                                      return "document.pdf";
                                    })()}
                                  </div>
                                  <div
                                    style={{
                                      color: "#9ca3af",
                                      fontSize: "12px",
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    {/* Extract file type from media string */}
                                    {(() => {
                                      const typeMatch =
                                        media.match(/data:([^;]+)/);
                                      if (typeMatch) {
                                        const mimeType = typeMatch[1];
                                        switch (mimeType) {
                                          case "application/pdf":
                                            return "PDF";
                                          case "application/msword":
                                          case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                                            return "DOC";
                                          case "application/vnd.ms-excel":
                                          case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                                            return "XLS";
                                          case "application/vnd.ms-powerpoint":
                                          case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                                            return "PPT";
                                          case "text/plain":
                                            return "TXT";
                                          case "text/csv":
                                            return "CSV";
                                          case "application/json":
                                            return "JSON";
                                          case "application/xml":
                                          case "text/xml":
                                            return "XML";
                                          case "application/zip":
                                            return "ZIP";
                                          case "application/x-rar-compressed":
                                            return "RAR";
                                          default:
                                            // Extract the subtype after the slash
                                            const subtype =
                                              mimeType.split("/")[1];
                                            return subtype
                                              ? subtype
                                                  .toUpperCase()
                                                  .substring(0, 4)
                                              : "FILE";
                                        }
                                      }
                                      return "FILE";
                                    })()}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

MessageComponent.displayName = "MessageComponent";

// Separate component for streaming message to avoid re-rendering message list
const StreamingMessage = memo(
  ({ content, messageId }: { content: string; messageId: string | null }) => {
    if (!messageId || !content) return null;

    return (
      <div className="chat-wrapper__message chat-wrapper__message--assistant">
        <div className="chat-wrapper__message-content">
          <div className="chat-wrapper__regular-message">
            <div className="chat-wrapper__markdown-content">
              <ReactMarkdown
                components={{
                  pre: ({ children }) => (
                    <pre className="chat-wrapper__code-block">{children}</pre>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="chat-wrapper__inline-code">
                        {children}
                      </code>
                    ) : (
                      <code className="chat-wrapper__code-block">
                        {children}
                      </code>
                    );
                  },
                  ul: ({ children }) => (
                    <ul className="chat-wrapper__list">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="chat-wrapper__ordered-list">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="chat-wrapper__list-item">{children}</li>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

StreamingMessage.displayName = "StreamingMessage";

// System message collapsible component
function SystemMessageCollapsible({ message }: { message: Message }) {
  const [isExpanded, setIsExpanded] = useState(true);
  // Determine the appropriate label and icon based on message role
  const getMessageLabel = () => {
    if (message.role === "system") {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div className="chat-wrapper__thinking-icon">
            <svg
              width="20"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_64_36257"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="16"
                height="17"
              >
                <rect y="0.381836" width="16" height="16" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_64_36257)">
                <path
                  d="M11.0999 13.6651L7.91657 10.4817C7.69435 10.5706 7.45268 10.6401 7.19157 10.6901C6.93046 10.7401 6.66657 10.7651 6.3999 10.7651C5.2999 10.7651 4.35824 10.3762 3.5749 9.5984C2.79157 8.82063 2.3999 7.88174 2.3999 6.78174C2.3999 6.36196 2.45268 5.96257 2.55824 5.58357C2.66379 5.20457 2.82212 4.85396 3.03324 4.53174L5.43324 6.93174L6.5999 5.76507L4.1999 3.36507C4.52212 3.17618 4.86935 3.03174 5.24157 2.93174C5.61379 2.83174 5.9999 2.78174 6.3999 2.78174C7.51101 2.78174 8.45546 3.17618 9.23324 3.96507C10.011 4.75396 10.3999 5.69946 10.3999 6.80157C10.3999 7.05502 10.3749 7.29007 10.3249 7.50674C10.2749 7.7234 10.2055 7.94285 10.1166 8.16507L13.3666 11.3984C13.5221 11.5578 13.5999 11.7505 13.5999 11.9762C13.5999 12.2021 13.5221 12.3928 13.3666 12.5484L12.2332 13.6651C12.0767 13.8206 11.8876 13.8984 11.6659 13.8984C11.4441 13.8984 11.2555 13.8206 11.0999 13.6651ZM11.6666 12.5317L12.2499 11.9651L8.66657 8.41507C8.88879 8.14841 9.03324 7.85674 9.0999 7.54007C9.16657 7.2234 9.1999 6.97618 9.1999 6.7984C9.1999 6.05563 8.93601 5.40885 8.40824 4.85807C7.88046 4.30718 7.24435 4.01507 6.4999 3.98174L7.86657 5.33174C7.98879 5.45596 8.0499 5.60091 8.0499 5.76657C8.0499 5.93224 7.98718 6.07735 7.86174 6.20191L5.85474 8.1949C5.72929 8.31946 5.58779 8.38174 5.43024 8.38174C5.27268 8.38174 5.13479 8.32063 5.01657 8.1984L3.5999 6.78174C3.5999 7.5484 3.8749 8.20396 4.4249 8.7484C4.9749 9.29285 5.63324 9.56507 6.3999 9.56507C6.58879 9.56507 6.8499 9.52618 7.18324 9.44841C7.51657 9.37063 7.82768 9.21507 8.11657 8.98174L11.6666 12.5317Z"
                  fill="#637381"
                />
              </g>
            </svg>
          </div>
          <span>{`AI text input <show-toolname>`}...</span>
          <div className="chat-wrapper__thinking-icon">
            <div className="chat-wrapper__thinking-icon">
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
          </div>
          <div className="chat-wrapper__thinking-icon">
            <div className="chat-wrapper__thinking-icon">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_64_36278"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="16"
                  height="17"
                >
                  <rect y="0.381836" width="16" height="16" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_64_36278)">
                  <path
                    d="M6.7966 7.78193C6.9656 7.78193 7.10843 7.72477 7.2251 7.61043C7.34176 7.4961 7.4001 7.35443 7.4001 7.18543C7.4001 7.01643 7.34293 6.8736 7.2286 6.75693C7.11426 6.64027 6.9726 6.58193 6.8036 6.58193C6.6346 6.58193 6.49176 6.6391 6.3751 6.75343C6.25843 6.86777 6.2001 7.00943 6.2001 7.17843C6.2001 7.34743 6.25726 7.49027 6.3716 7.60693C6.48593 7.7236 6.6276 7.78193 6.7966 7.78193ZM6.7966 10.1819C6.9656 10.1819 7.10843 10.1248 7.2251 10.0104C7.34176 9.8961 7.4001 9.75443 7.4001 9.58543C7.4001 9.41643 7.34293 9.2736 7.2286 9.15693C7.11426 9.04027 6.9726 8.98193 6.8036 8.98193C6.6346 8.98193 6.49176 9.0391 6.3751 9.15343C6.25843 9.26777 6.2001 9.40943 6.2001 9.57843C6.2001 9.74743 6.25726 9.89027 6.3716 10.0069C6.48593 10.1236 6.6276 10.1819 6.7966 10.1819ZM4.8001 7.58193C4.90676 7.58193 5.0001 7.54193 5.0801 7.46193C5.1601 7.38193 5.2001 7.2886 5.2001 7.18193C5.2001 7.07527 5.1601 6.98193 5.0801 6.90193C5.0001 6.82193 4.90676 6.78193 4.8001 6.78193C4.69343 6.78193 4.6001 6.82193 4.5201 6.90193C4.4401 6.98193 4.4001 7.07527 4.4001 7.18193C4.4001 7.2886 4.4401 7.38193 4.5201 7.46193C4.6001 7.54193 4.69343 7.58193 4.8001 7.58193ZM6.8001 11.9819C6.90676 11.9819 7.0001 11.9419 7.0801 11.8619C7.1601 11.7819 7.2001 11.6886 7.2001 11.5819C7.2001 11.4753 7.1601 11.3819 7.0801 11.3019C7.0001 11.2219 6.90676 11.1819 6.8001 11.1819C6.69343 11.1819 6.6001 11.2219 6.5201 11.3019C6.4401 11.3819 6.4001 11.4753 6.4001 11.5819C6.4001 11.6886 6.4401 11.7819 6.5201 11.8619C6.6001 11.9419 6.69343 11.9819 6.8001 11.9819ZM4.8001 9.98193C4.90676 9.98193 5.0001 9.94193 5.0801 9.86193C5.1601 9.78193 5.2001 9.6886 5.2001 9.58193C5.2001 9.47527 5.1601 9.38193 5.0801 9.30193C5.0001 9.22193 4.90676 9.18193 4.8001 9.18193C4.69343 9.18193 4.6001 9.22193 4.5201 9.30193C4.4401 9.38193 4.4001 9.47527 4.4001 9.58193C4.4001 9.6886 4.4401 9.78193 4.5201 9.86193C4.6001 9.94193 4.69343 9.98193 4.8001 9.98193ZM6.8001 5.58193C6.90676 5.58193 7.0001 5.54193 7.0801 5.46193C7.1601 5.38193 7.2001 5.2886 7.2001 5.18193C7.2001 5.07527 7.1601 4.98193 7.0801 4.90193C7.0001 4.82193 6.90676 4.78193 6.8001 4.78193C6.69343 4.78193 6.6001 4.82193 6.5201 4.90193C6.4401 4.98193 6.4001 5.07527 6.4001 5.18193C6.4001 5.2886 6.4401 5.38193 6.5201 5.46193C6.6001 5.54193 6.69343 5.58193 6.8001 5.58193ZM9.1966 7.78193C9.3656 7.78193 9.50843 7.72477 9.6251 7.61043C9.74176 7.4961 9.8001 7.35443 9.8001 7.18543C9.8001 7.01643 9.74293 6.8736 9.6286 6.75693C9.51426 6.64027 9.3726 6.58193 9.2036 6.58193C9.0346 6.58193 8.89176 6.6391 8.7751 6.75343C8.65843 6.86777 8.6001 7.00943 8.6001 7.17843C8.6001 7.34743 8.65726 7.49027 8.7716 7.60693C8.88593 7.7236 9.0276 7.78193 9.1966 7.78193ZM9.2001 5.58193C9.30676 5.58193 9.4001 5.54193 9.4801 5.46193C9.5601 5.38193 9.6001 5.2886 9.6001 5.18193C9.6001 5.07527 9.5601 4.98193 9.4801 4.90193C9.4001 4.82193 9.30676 4.78193 9.2001 4.78193C9.09343 4.78193 9.0001 4.82193 8.9201 4.90193C8.8401 4.98193 8.8001 5.07527 8.8001 5.18193C8.8001 5.2886 8.8401 5.38193 8.9201 5.46193C9.0001 5.54193 9.09343 5.58193 9.2001 5.58193ZM11.2001 9.98193C11.3068 9.98193 11.4001 9.94193 11.4801 9.86193C11.5601 9.78193 11.6001 9.6886 11.6001 9.58193C11.6001 9.47527 11.5601 9.38193 11.4801 9.30193C11.4001 9.22193 11.3068 9.18193 11.2001 9.18193C11.0934 9.18193 11.0001 9.22193 10.9201 9.30193C10.8401 9.38193 10.8001 9.47527 10.8001 9.58193C10.8001 9.6886 10.8401 9.78193 10.9201 9.86193C11.0001 9.94193 11.0934 9.98193 11.2001 9.98193ZM11.2001 7.58193C11.3068 7.58193 11.4001 7.54193 11.4801 7.46193C11.5601 7.38193 11.6001 7.2886 11.6001 7.18193C11.6001 7.07527 11.5601 6.98193 11.4801 6.90193C11.4001 6.82193 11.3068 6.78193 11.2001 6.78193C11.0934 6.78193 11.0001 6.82193 10.9201 6.90193C10.8401 6.98193 10.8001 7.07527 10.8001 7.18193C10.8001 7.2886 10.8401 7.38193 10.9201 7.46193C11.0001 7.54193 11.0934 7.58193 11.2001 7.58193ZM8.00476 14.7819C7.12388 14.7819 6.29454 14.6153 5.51676 14.2819C4.73899 13.9486 4.05843 13.4903 3.4751 12.9069C2.89176 12.3236 2.43343 11.6433 2.1001 10.8659C1.76676 10.0886 1.6001 9.25805 1.6001 8.37427C1.6001 7.49049 1.76676 6.66249 2.1001 5.89027C2.43343 5.11805 2.89176 4.44027 3.4751 3.85693C4.05843 3.2736 4.73876 2.81527 5.5161 2.48193C6.29343 2.1486 7.12399 1.98193 8.00776 1.98193C8.89154 1.98193 9.71954 2.1486 10.4918 2.48193C11.264 2.81527 11.9418 3.2736 12.5251 3.85693C13.1084 4.44027 13.5668 5.11927 13.9001 5.89393C14.2334 6.66871 14.4001 7.49649 14.4001 8.37727C14.4001 9.25816 14.2334 10.0875 13.9001 10.8653C13.5668 11.643 13.1084 12.3236 12.5251 12.9069C11.9418 13.4903 11.2628 13.9486 10.4881 14.2819C9.71332 14.6153 8.88554 14.7819 8.00476 14.7819ZM8.0001 13.5819C9.44454 13.5819 10.6723 13.0764 11.6834 12.0653C12.6945 11.0542 13.2001 9.82638 13.2001 8.38193C13.2001 6.93749 12.6945 5.70971 11.6834 4.6986C10.6723 3.68749 9.44454 3.18193 8.0001 3.18193C6.55565 3.18193 5.32788 3.68749 4.31676 4.6986C3.30565 5.70971 2.8001 6.93749 2.8001 8.38193C2.8001 9.82638 3.30565 11.0542 4.31676 12.0653C5.32788 13.0764 6.55565 13.5819 8.0001 13.5819ZM9.2001 11.9819C9.30676 11.9819 9.4001 11.9419 9.4801 11.8619C9.5601 11.7819 9.6001 11.6886 9.6001 11.5819C9.6001 11.4753 9.5601 11.3819 9.4801 11.3019C9.4001 11.2219 9.30676 11.1819 9.2001 11.1819C9.09343 11.1819 9.0001 11.2219 8.9201 11.3019C8.8401 11.3819 8.8001 11.4753 8.8001 11.5819C8.8001 11.6886 8.8401 11.7819 8.9201 11.8619C9.0001 11.9419 9.09343 11.9819 9.2001 11.9819ZM9.1966 10.1819C9.3656 10.1819 9.50843 10.1248 9.6251 10.0104C9.74176 9.8961 9.8001 9.75443 9.8001 9.58543C9.8001 9.41643 9.74293 9.2736 9.6286 9.15693C9.51426 9.04027 9.3726 8.98193 9.2036 8.98193C9.0346 8.98193 8.89176 9.0391 8.7751 9.15343C8.65843 9.26777 8.6001 9.40943 8.6001 9.57843C8.6001 9.74743 8.65726 9.89027 8.7716 10.0069C8.88593 10.1236 9.0276 10.1819 9.1966 10.1819Z"
                    fill="#637381"
                  />
                </g>
              </svg>
            </div>
          </div>

          <span>Pending...</span>
        </div>
      );
    } else if (message.role === "assistant") {
      if (message.isStreaming) {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div className="chat-wrapper__thinking-icon">
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.79576 11.3819C3.46532 11.3819 3.18343 11.2644 2.9501 11.0294C2.71676 10.7944 2.6001 10.5119 2.6001 10.1819V9.06527C1.96676 8.65082 1.4751 8.11943 1.1251 7.4711C0.775098 6.82277 0.600098 6.12638 0.600098 5.38193C0.600098 4.15627 1.02665 3.11649 1.87976 2.2626C2.73288 1.40882 3.77176 0.981934 4.99643 0.981934C6.2211 0.981934 7.26121 1.40882 8.11676 2.2626C8.97232 3.11649 9.4001 4.15627 9.4001 5.38193C9.4001 6.12438 9.2251 6.8211 8.8751 7.4721C8.5251 8.1231 8.03343 8.65416 7.4001 9.06527V10.1819C7.4001 10.5119 7.28243 10.7944 7.0471 11.0294C6.81188 11.2644 6.52904 11.3819 6.1986 11.3819H3.79576ZM3.8001 10.1819H6.2001V8.41527L6.7501 8.06527C7.20565 7.77638 7.56121 7.39204 7.81676 6.91227C8.07232 6.43249 8.2001 5.92238 8.2001 5.38193C8.2001 4.4966 7.88771 3.74193 7.26293 3.11793C6.63826 2.49393 5.88271 2.18193 4.99626 2.18193C4.10993 2.18193 3.35565 2.49393 2.73343 3.11793C2.11121 3.74193 1.8001 4.4966 1.8001 5.38193C1.8001 5.92238 1.92788 6.43249 2.18343 6.91227C2.43899 7.39204 2.79454 7.77638 3.2501 8.06527L3.8001 8.41527V10.1819ZM3.8001 13.7819C3.57343 13.7819 3.38343 13.7053 3.2301 13.5519C3.07676 13.3986 3.0001 13.2086 3.0001 12.9819V12.5819H7.0001V12.9819C7.0001 13.2086 6.92343 13.3986 6.7701 13.5519C6.61676 13.7053 6.42676 13.7819 6.2001 13.7819H3.8001Z"
                  fill="#637381"
                />
              </svg>
            </div>
            <span>Thinking...</span>
            <div className="chat-wrapper__thinking-icon">
              <div className="chat-wrapper__thinking-icon">
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
                    <rect
                      y="0.000488281"
                      width="16"
                      height="16"
                      fill="#D9D9D9"
                    />
                  </mask>
                  <g mask="url(#mask0_44_18068)">
                    <path
                      d="M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z"
                      fill="#637381"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div className="chat-wrapper__thinking-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                  fill="#10b981"
                />
              </svg>
            </div>
            <span>Thought</span>
            <div className="chat-wrapper__thinking-icon">
              <div className="chat-wrapper__thinking-icon">
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
                    <rect
                      y="0.000488281"
                      width="16"
                      height="16"
                      fill="#D9D9D9"
                    />
                  </mask>
                  <g mask="url(#mask0_44_18068)">
                    <path
                      d="M8 10.4506L4 6.45059L4.85 5.60059L8 8.75059L11.15 5.60059L12 6.45059L8 10.4506Z"
                      fill="#637381"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        );
      }
    }
    return "💬 Message";
  };

  return (
    <div className="chat-wrapper__system-message">
      <button
        className="chat-wrapper__system-message-trigger"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 0px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "14px",
          color: "#6b7280",
          textAlign: "left",
        }}
      >
        {getMessageLabel()}
      </button>
      {isExpanded && (
        <div
          className="chat-wrapper__system-message-content"
          style={{
            padding: "0 12px 12px 0px",
          }}
        >
          <div className="chat-wrapper__markdown-content">
            <ReactMarkdown
              components={{
                pre: ({ children }) => (
                  <pre className="chat-wrapper__code-block">{children}</pre>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="chat-wrapper__inline-code">
                      {children}
                    </code>
                  ) : (
                    <code className="chat-wrapper__code">{children}</code>
                  );
                },
                p: ({ children }) => (
                  <p className="chat-wrapper__paragraph">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="chat-wrapper__bold">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="chat-wrapper__italic">{children}</em>
                ),
              }}
            >
              {message.content.trim()}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

function ChatWrapper({
  apiUrl,
  config,
  tools,
  clientTools,
  initialMessages = [],
  userId,
  devMode = false,
  app,
  contextHelpers,
}: ChatWrapperProps) {
  // Convert WebSocket URL to HTTP URL for REST API calls
  const getHttpUrl = useCallback((wsUrl: string): string => {
    return wsUrl.replace(/^wss?:\/\//, (match) =>
      match === "wss://" ? "https://" : "http://"
    );
  }, []);

  const httpApiUrl = useMemo(() => getHttpUrl(apiUrl), [apiUrl, getHttpUrl]);
  // WebSocketChatClient state
  const [agentClient, setAgentClient] = useState<WebSocketChatClient | null>(
    null
  );
  const [isConnected, setIsConnected] = useState(false);
  const agentClientRef = useRef<WebSocketChatClient | null>(null);

  // Core chat state
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatStatus, setChatStatus] = useState<ChatStatus>("idle");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentMode, setCurrentMode] = useState(config.mode);

  // Thread and conversation state
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [conversationError, setConversationError] = useState<string | null>(
    null
  );
  const [_currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [currentConvUuid, setCurrentConvUuid] = useState<string | null>(null);

  // Advanced state for tool results and streaming
  const [toolResults] = useState<ToolResult[]>([]);
  const [streamingStatus, setStreamingStatus] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [, setReasoningContent] = useState("");
  const [streamingContent, setStreamingContent] = useState("");

  // Tool JSON handling state
  const [isHandlingTool, setIsHandlingTool] = useState(false);

  // Tooling handling state
  const [, setToolingMessagesByCallId] = useState<Map<string, string>>(
    new Map()
  ); // Map callId -> messageId

  // Reasoning handling state
  const [, setReasoningMessagesByCallId] = useState<Map<string, string>>(
    new Map()
  ); // Map callId -> messageId

  // Dev mode state
  const [isDevSettingsOpen, setIsDevSettingsOpen] = useState(false);

  // Refs for managing streaming
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<ChatInputRef>(null);
  const currentAssistantMessageIdRef = useRef<string | null>(null);
  const shouldUpdateMessageRef = useRef<boolean>(true);
  const streamingContentRef = useRef<string>("");
  const hasLoadedConversationRef = useRef<boolean>(false);

  // Utility functions
  const generateId = useCallback(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  );

  // Memoized helper functions to prevent unnecessary re-renders
  const getReasoningStatus = useMemo(
    () =>
      (
        content: string,
        isStreaming?: boolean
      ): "processing" | "completed" | "error" => {
        if (isStreaming === false) {
          if (content.includes("❌")) return "error";
          return "completed";
        }
        if (content.includes("✅ Completed:") || content.includes("✅"))
          return "completed";
        if (content.includes("❌")) return "error";
        return "processing";
      },
    []
  );

  const getReasoningDuration = useMemo(
    () =>
      (content: string): string | undefined => {
        // Extract duration from content like "🧠 [content] for 2.3 seconds"
        const match = content.match(/for ([\d.]+) seconds/);
        return match ? ` for ${match[1]} seconds` : undefined;
      },
    []
  );

  const getReasoningContentOnly = useMemo(
    () =>
      (content: string): string => {
        // Remove the brain emoji and duration, keep only the reasoning text
        let cleanContent = content.replace(/^🧠\s*/, ""); // Remove brain emoji at start
        cleanContent = cleanContent.replace(/\s*for [\d.]+\s*seconds$/, ""); // Remove duration at end

        // Replace content between ** with placeholder text
        cleanContent = cleanContent.replace(/\*\*(.*?)\*\*/g, "");

        return cleanContent;
      },
    []
  );

  const getReasoningTitle = useMemo(
    () =>
      (content: string, isStreaming?: boolean): string => {
        console.log("🔍 getReasoningTitle:", { content, isStreaming });

        if (isStreaming === false) {
          if (content.includes("❌")) return "Error";
          if (
            content.includes("🧠") &&
            content.includes("for") &&
            content.includes("seconds")
          ) {
            return "Thought";
          }
          if (content.includes("🧠 Thought")) {
            return "Thought";
          }
          return "Thought";
        }

        // For streaming content
        if (content.includes("✅ Completed:") || content.includes("✅"))
          return "Completed";
        if (content.includes("❌")) return "Error";
        if (content.includes("🔧 Handling:")) return "Thinking...";
        if (content.includes("🧠") && !content.includes("AI is thinking"))
          return "Thinking...";
        return "Thinking...";
      },
    []
  );

  const getToolingTitle = useMemo(
    () =>
      (content: string, isStreaming?: boolean): string => {
        if (isStreaming === false) {
          if (content.includes("❌")) return "Tool Error";
          return "Tool Completed";
        }
        if (content.includes("✅ Completed:") || content.includes("✅"))
          return "Tool Completed";
        if (content.includes("❌")) return "Tool Error";
        if (content.includes("🔧 Handling:")) return "Tool Processing...";
        return "Tool Processing...";
      },
    []
  );

  const getToolingStatus = useMemo(
    () =>
      (
        content: string,
        isStreaming?: boolean
      ): "processing" | "completed" | "error" => {
        if (isStreaming === false) {
          if (content.includes("❌")) return "error";
          return "completed";
        }
        if (content.includes("✅ Completed:") || content.includes("✅"))
          return "completed";
        if (content.includes("❌")) return "error";
        return "processing";
      },
    []
  );

  // Helper function to add messages
  const addMessage = useCallback(
    (role: Message["role"], content: string) => {
      // Sanitize content based on role
      const isAssistant = role === "assistant";
      const sanitizedContent = sanitizeMessage(content, isAssistant);

      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role,
          content: sanitizedContent,
          timestamp: new Date(),
        },
      ]);
    },
    [generateId]
  );

  // Handle chat finished event
  // Helper function to finalize any current streaming message
  const finalizeCurrentStreamingMessage = useCallback(() => {
    if (currentAssistantMessageIdRef.current && streamingContentRef.current) {
      // Final sanitization check before storing the complete message
      const sanitizedContent = sanitizeMessage(
        streamingContentRef.current,
        true
      );

      const finalMessage: Message = {
        id: currentAssistantMessageIdRef.current,
        role: "assistant",
        content: sanitizedContent,
        timestamp: new Date(),
        isStreaming: false,
      };

      setMessages((prev) => [...prev, finalMessage]);

      // Reset streaming state
      currentAssistantMessageIdRef.current = null;
      streamingContentRef.current = "";
      setStreamingContent("");

      return true; // Indicates a message was finalized
    }
    return false; // No streaming message to finalize
  }, []);

  const handleChatFinished = useCallback(() => {
    setIsStreaming(false);
    setIsThinking(false); // Hide thinking bubble when chat completes
    setChatStatus("idle");

    // Finalize any current streaming message
    finalizeCurrentStreamingMessage();
    // Focus the input after assistant response completes
    setTimeout(() => {
      chatInputRef.current?.focus();
    }, 0);
  }, [finalizeCurrentStreamingMessage]);

  // Handle chat error event
  const handleChatError = useCallback(
    (error: string) => {
      console.error("Chat error:", error);
      setIsStreaming(false);
      setIsThinking(false); // Hide thinking bubble on error
      setChatStatus("error");

      // Finalize any current streaming message before showing error
      finalizeCurrentStreamingMessage();

      addMessage("system", `❌ Chat error: ${error}`);
    },
    [addMessage, finalizeCurrentStreamingMessage]
  );

  // WebSocketChatClient connection management
  const connectAgentClient = useCallback(async () => {
    try {
      const client = new WebSocketChatClient();
      agentClientRef.current = client;
      setAgentClient(client);

      // Use contextHelpers from props or default to empty object
      const contextHelpersToUse: ContextHelpers = contextHelpers || {};

      await client.onInit({
        apiUrl: apiUrl,
        userId: userId,
        toolSchemas: clientTools,
        clientTools: tools,
        contextHelpers: contextHelpersToUse,
        onSetMessage: (char: string) => {
          // Sanitize incoming character data from assistant
          const sanitizedChar = sanitizeMessage(char, true);

          // Check if we're already streaming
          if (currentAssistantMessageIdRef.current) {
            // Update streaming content without re-rendering messages array
            streamingContentRef.current += sanitizedChar;
            setStreamingContent(streamingContentRef.current);
          } else {
            // Assistant is starting to stream - hide thinking bubble
            setIsThinking(false);
            const newAssistantMessageId = generateId();
            currentAssistantMessageIdRef.current = newAssistantMessageId;
            streamingContentRef.current = sanitizedChar;
            setStreamingContent(sanitizedChar);
          }
        },
        onSystemEvent: (event: SystemEvent) => {
          // Handle different types of system events with proper typing
          switch (event.type) {
            case SystemEventType.CHAT_COMPLETED:
              handleChatFinished();
              break;
            case SystemEventType.CHAT_ERROR:
              if (event.data?.error) {
                handleChatError(event.data.error);
              }
              break;
            case SystemEventType.CONNECTION_LOST:
              // Handle connection lost if needed
              break;
            case SystemEventType.CONNECTION_RESTORED:
              // Handle connection restored if needed
              break;
            default:
              // Handle unknown events
              break;
          }
        },
        onReasoningUpdate: (
          isThinking: boolean,
          content: string,
          toolCallRequest?: ToolCallRequest
        ) => {
          console.log("🤔 Reasoning update:", {
            isThinking,
            content,
            toolCallRequest,
          });
          const { callId } = toolCallRequest || {};
          setIsHandlingTool(isThinking);
          setReasoningContent(content);

          // If no callId provided, use legacy behavior
          if (!callId) {
            console.log("⚠️ No callId provided for reasoning update");
            return;
          }

          // Check if this is a reasoning event (brain icon)
          const isReasoningStarted = false; // No longer using "AI is thinking..." start message
          const isReasoningThinking =
            content.includes("🧠") &&
            !content.includes("for") &&
            !content.includes("seconds");
          const isReasoningCompleted =
            content.includes("🧠") &&
            content.includes("for") &&
            content.includes("seconds");

          // Check if this is a tools-started event (processing)
          const isToolStarted = content.includes("🔧 Handling:");
          // Check if this is a tool-completed event (completed)
          const isToolCompleted = content.includes("✅ Completed:");
          // Check if this is an error event
          const isToolError = content.includes("❌ Error:");

          console.log("🔍 Debug reasoning conditions:", {
            isReasoningStarted,
            isReasoningThinking,
            isReasoningCompleted,
            isToolStarted,
            isToolCompleted,
            isToolError,
            callId,
            isHandlingTool,
          });

          // Handle reasoning events separately from tool events
          if (isReasoningThinking || isReasoningCompleted) {
            setReasoningMessagesByCallId((prevMap) => {
              const newMap = new Map(prevMap);
              const existingMessageId = newMap.get(callId);

              if (isReasoningThinking && !existingMessageId) {
                // Cut off any current streaming message before creating reasoning message
                finalizeCurrentStreamingMessage();

                // Create a new reasoning message on first thinking content
                const reasoningMessageId = generateId();
                newMap.set(callId, reasoningMessageId);

                const reasoningMessage: Message = {
                  id: reasoningMessageId,
                  role: "reasoning" as any,
                  content: content,
                  timestamp: new Date(),
                  isStreaming: true,
                };

                setMessages((prev) => [...prev, reasoningMessage]);
              } else if (isReasoningCompleted && existingMessageId) {
                // Update existing reasoning message to completed state
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === existingMessageId
                      ? {
                          ...msg,
                          content: content,
                          isStreaming: false, // Mark as completed
                        }
                      : msg
                  )
                );

                // Remove from tracking map since it's completed
                newMap.delete(callId);
              } else if (existingMessageId && isReasoningThinking) {
                // Update existing reasoning message content (during thinking)
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === existingMessageId
                      ? {
                          ...msg,
                          content: content,
                          isStreaming: true,
                        }
                      : msg
                  )
                );
              }

              return newMap;
            });
          }

          // Create tooling messages instead of reasoning messages for tool handling
          setToolingMessagesByCallId((prevMap) => {
            const newMap = new Map(prevMap);
            const existingMessageId = newMap.get(callId);

            if (isToolStarted && !existingMessageId) {
              // Cut off any current streaming message before creating tooling message
              finalizeCurrentStreamingMessage();

              // Extract tool name from content
              const toolNameMatch = content.match(/🔧 Handling: (.+)/);
              const toolName = toolNameMatch
                ? toolNameMatch[1]
                : "Unknown Tool";

              // Create a new tooling message when tools start
              const toolingMessageId = generateId();
              newMap.set(callId, toolingMessageId);

              const toolingMessage: Message = {
                id: toolingMessageId,
                role: "tooling" as any,
                content: content,
                timestamp: new Date(),
                isStreaming: true,
                toolData: {
                  ...toolCallRequest,
                  toolName,
                  callId,
                  status: "processing",
                },
              };

              setMessages((prev) => [...prev, toolingMessage]);
            } else if ((isToolCompleted || isToolError) && existingMessageId) {
              // Extract tool name from content
              const toolNameMatch = content.match(
                /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
              );
              const toolName = toolNameMatch
                ? toolNameMatch[1]
                : "Unknown Tool";

              // Update existing tooling message to completed state
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === existingMessageId
                    ? {
                        ...msg,
                        content: content,
                        isStreaming: false, // Mark as completed
                        toolData: {
                          ...msg.toolData,
                          toolName,
                          status: isToolError ? "error" : "completed",
                          callId: callId ?? "",
                        },
                      }
                    : msg
                )
              );

              // Remove from tracking map since it's completed
              newMap.delete(callId);
            } else if (
              existingMessageId &&
              isHandlingTool &&
              !isToolCompleted &&
              !isToolError
            ) {
              // Update existing tooling message content (during processing only)
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === existingMessageId
                    ? {
                        ...msg,
                        content: content,
                        isStreaming: true,
                      }
                    : msg
                )
              );
            }

            return newMap;
          });
        },
        onBusinessDataUpdate: (data: any) => {
          if (config.onBusinessDataUpdate) {
            config.onBusinessDataUpdate(data);
          }
        },
      });

      setIsConnected(true);
      console.log("WebSocketChatClient connected");
    } catch (error) {
      console.error("Error connecting WebSocketChatClient:", error);
      setIsConnected(false);
    }
  }, [
    apiUrl,
    clientTools,
    tools,
    config,
    generateId,
    addMessage,
    handleChatFinished,
    handleChatError,
    finalizeCurrentStreamingMessage,
  ]);

  const disconnectAgentClient = useCallback(() => {
    if (agentClientRef.current) {
      agentClientRef.current.disconnect();
      agentClientRef.current = null;
    }
    setAgentClient(null);
    setIsConnected(false);
  }, []);

  const resetToolHandling = useCallback(() => {
    console.log("🔍 DEBUG: resetToolHandling called! Stack trace:");
    console.trace();
    setIsHandlingTool(false);
    shouldUpdateMessageRef.current = true; // Reset to allow message updates
  }, []);

  // Scroll animation frame ref
  const scrollAnimationFrame = useRef<number | null>(null);

  const scrollToBottom = useCallback(() => {
    // Cancel any pending scroll animation
    if (scrollAnimationFrame.current) {
      cancelAnimationFrame(scrollAnimationFrame.current);
    }

    // Schedule smooth scroll on next frame
    scrollAnimationFrame.current = requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      scrollAnimationFrame.current = null;
    });
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Auto-scroll when streaming content changes
  useEffect(() => {
    if (streamingContent) {
      scrollToBottom();
    }
  }, [streamingContent, scrollToBottom]);

  // Handle config callbacks
  useEffect(() => {
    if (config.onStreamingStatusChange) {
      config.onStreamingStatusChange(streamingStatus);
    }
  }, [streamingStatus, config]);

  // WebSocketChatClient connection management
  useEffect(() => {
    // Auto-connect on component mount
    console.log("Connecting WebSocketChatClient...");
    connectAgentClient();

    // Cleanup on unmount
    return () => {
      disconnectAgentClient();
      // Cancel any pending scroll animation
      if (scrollAnimationFrame.current) {
        cancelAnimationFrame(scrollAnimationFrame.current);
      }
    };
  }, [connectAgentClient, disconnectAgentClient]);

  // Monitor connection status
  useEffect(() => {
    const interval = setInterval(() => {
      if (agentClientRef.current) {
        const status = agentClientRef.current.getConnectionStatus();
        setIsConnected(status.connected);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Load conversation history from API if userId is provided
  useEffect(() => {
    const loadConversation = async () => {
      // Skip if no userId provided
      if (!userId) {
        return;
      }

      // Skip if already loaded once
      if (hasLoadedConversationRef.current) {
        return;
      }

      // Skip if already loading
      if (isLoadingConversation) {
        return;
      }

      // Skip if messages already exist (either from props or already loaded)
      if (messages.length > 0) {
        return;
      }

      try {
        setIsLoadingConversation(true);
        setConversationError(null);

        // Step 1: Fetch user's threads
        console.log(`📚 Fetching threads for user: ${userId}`);
        // const threads = await fetchUserThreads(httpApiUrl, userId, {
        //   limit: 1, // Get only the first/most recent thread
        // });
        const threads: string | any[] = [];

        if (threads.length === 0) {
          console.log("ℹ️ No threads found for user");
          setIsLoadingConversation(false);
          hasLoadedConversationRef.current = true;
          return;
        }

        // Step 2: Use the first thread
        const firstThread = threads[0];
        console.log(
          `📖 Loading thread: ${firstThread.id} (${firstThread.title})`
        );
        setCurrentThreadId(firstThread.id);
        setCurrentConvUuid(firstThread.convUuid); // Store convUuid for sending with messages

        // Step 3: Fetch messages for this thread
        const loadedMessages = await fetchThreadMessages(
          httpApiUrl,
          firstThread.id
        );
        console.log(`✅ Loaded ${loadedMessages.length} messages`);

        // Step 4: Set messages to state
        setMessages(loadedMessages);

        // Mark as loaded
        hasLoadedConversationRef.current = true;
      } catch (error) {
        console.error("❌ Error loading conversation:", error);
        setConversationError(
          error instanceof Error ? error.message : "Failed to load conversation"
        );
        hasLoadedConversationRef.current = true; // Don't retry automatically
      } finally {
        setIsLoadingConversation(false);
      }
    };

    loadConversation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, httpApiUrl]);

  // Handle message submission via WebSocketChatClient
  const handleSubmit = useCallback(
    async (message: string, media?: string[]) => {
      if (!message.trim() || isStreaming || !agentClient || !isConnected)
        return;

      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content: message.trim(),
        timestamp: new Date(),
        media,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsStreaming(true);
      setIsThinking(true); // Show thinking bubble while waiting for assistant response
      setChatStatus("submitted");
      setStreamingStatus("Starting...");

      try {
        await agentClient.onTriggerMessage(
          userMessage.content,
          app,
          media,
          currentConvUuid || undefined,
          undefined
        );
        setChatStatus("streaming");
      } catch (error) {
        console.error("Agent client send error:", error);
        setIsThinking(false); // Hide thinking bubble on send error
        setChatStatus("error");

        addMessage(
          "system",
          `Sorry, there was an error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );

        if (config.onError) {
          config.onError(
            error instanceof Error ? error : new Error("Unknown error")
          );
        }

        setIsStreaming(false);
        setChatStatus("idle");
        setStreamingStatus("");
      }
    },
    [
      isStreaming,
      agentClient,
      isConnected,
      generateId,
      addMessage,
      config,
      currentConvUuid,
    ]
  );

  // Stop generation
  const stopGeneration = useCallback(() => {
    setIsStreaming(false);
    setChatStatus("idle");
    setStreamingStatus("");
    setIsThinking(false);
    setReasoningContent("");

    // Clean up streaming state
    currentAssistantMessageIdRef.current = null;
    streamingContentRef.current = "";
    setStreamingContent("");

    resetToolHandling(); // Clear any ongoing tool handling
  }, [resetToolHandling]);

  // Handle file upload
  const handleFileUpload = useCallback(
    async (files: File[]): Promise<string[]> => {
      console.log("Files selected:", files);

      const newMedia: string[] = [];
      const serverUrl = apiUrl;
      const folder = "chat-uploads";

      for (const file of files) {
        try {
          // Create FormData for file upload
          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", folder);

          console.log(`Uploading file: ${file.name} to ${serverUrl}/upload`);

          // Upload the file to the server
          const response = await fetch(`${serverUrl}/upload`, {
            method: "POST",
            body: formData,
          });

          const result = await response.json();

          if (response.ok) {
            console.log("✅ Upload successful:", result);
            // Store the URL from the server response
            // For images, we can still use the URL directly
            // For other files, store metadata with the URL
            if (file.type.startsWith("image/")) {
              newMedia.push(result.url);
            } else {
              // For non-image files, create a data URL format with metadata
              newMedia.push(
                `data:${file.type};name=${encodeURIComponent(
                  result.fileName || file.name
                )};url=${encodeURIComponent(result.url)}`
              );
            }
          } else {
            console.error("❌ Upload failed:", result.error);
            // Fallback to base64 encoding for images if upload fails
            if (file.type.startsWith("image/")) {
              const reader = new FileReader();
              const base64Result = await new Promise<string>(
                (resolve, reject) => {
                  reader.onload = () => resolve(reader.result as string);
                  reader.onerror = reject;
                  reader.readAsDataURL(file);
                }
              );
              newMedia.push(base64Result);
            } else {
              // For other files, store metadata with filename
              newMedia.push(
                `data:${file.type};name=${encodeURIComponent(
                  file.name
                )};base64,placeholder`
              );
            }
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          // Fallback to base64 encoding for images on error
          try {
            if (file.type.startsWith("image/")) {
              const reader = new FileReader();
              const base64Result = await new Promise<string>(
                (resolve, reject) => {
                  reader.onload = () => resolve(reader.result as string);
                  reader.onerror = reject;
                  reader.readAsDataURL(file);
                }
              );
              newMedia.push(base64Result);
            } else {
              // For other files, store metadata with filename
              newMedia.push(
                `data:${file.type};name=${encodeURIComponent(
                  file.name
                )};base64,placeholder`
              );
            }
          } catch (fallbackError) {
            console.error("Error in fallback encoding:", fallbackError);
          }
        }
      }

      console.log("Added media:", newMedia);
      return newMedia;
    },
    [apiUrl]
  );

  // Modal controls
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Collapse controls
  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  // Mode switching controls
  const toggleFullscreen = useCallback(() => {
    setCurrentMode((prev) => (prev === "sidebar" ? "fullscreen" : "sidebar"));
  }, []);

  // Handle escape key for modal
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && currentMode === "modal" && isModalOpen) {
        closeModal();
      }
    };

    if (currentMode === "modal" && isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [currentMode, isModalOpen, closeModal]);

  // Build CSS classes without external library
  const buildClasses = (...classes: (string | undefined | false)[]): string => {
    return classes.filter(Boolean).join(" ");
  };

  const containerClasses = buildClasses(
    "chat-wrapper",
    `chat-wrapper--${currentMode}`,
    config.position && `chat-wrapper--${config.position}`,
    config.theme && `chat-wrapper--${config.theme}`,
    isCollapsed && "chat-wrapper--collapsed",
    currentMode === "embedded" &&
      config.constrainedHeight &&
      "chat-wrapper--constrained"
  );

  // Render bubble button for modal, sidebar (collapsed), and fullscreen (collapsed) modes
  const renderBubbleButton = () => {
    const shouldShowBubble =
      (currentMode === "modal" && !isModalOpen) ||
      (currentMode === "sidebar" && isCollapsed) ||
      (currentMode === "fullscreen" && isCollapsed);

    if (shouldShowBubble) {
      const handleClick = currentMode === "modal" ? openModal : toggleCollapse;
      const title =
        currentMode === "modal"
          ? `Open ${config.appName}`
          : `Expand ${config.appName}`;

      return (
        <button
          className="chat-wrapper__bubble-button"
          onClick={handleClick}
          title={title}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="chat-wrapper__bubble-icon"
          >
            <path
              d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
              fill="currentColor"
            />
            <circle cx="7" cy="10" r="1" fill="currentColor" />
            <circle cx="12" cy="10" r="1" fill="currentColor" />
            <circle cx="17" cy="10" r="1" fill="currentColor" />
          </svg>
          {config.features?.showBubbleText !== false && (
            <span className="chat-wrapper__bubble-text">
              {config.bubbleText || "Chat"}
            </span>
          )}
        </button>
      );
    }
    return null;
  };

  // Render close button for modal mode
  const renderCloseButton = () => {
    if (currentMode === "modal" && isModalOpen) {
      return (
        <button
          className="chat-wrapper__close-button"
          onClick={closeModal}
          title="Close chat"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
              fill="currentColor"
            />
          </svg>
        </button>
      );
    }
    return null;
  };

  // Render fullscreen toggle button for sidebar mode and minimize button for fullscreen mode
  const renderModeToggleButton = () => {
    if (
      (currentMode === "sidebar" || currentMode === "fullscreen") &&
      !isCollapsed
    ) {
      const isFullscreen = currentMode === "fullscreen";

      return (
        <button
          className={
            isFullscreen
              ? "chat-wrapper__minimize-button"
              : "chat-wrapper__fullscreen-button"
          }
          onClick={toggleFullscreen}
          title={isFullscreen ? "Switch to sidebar" : "Switch to fullscreen"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isFullscreen ? (
              // Minimize icon (arrows pointing inward)
              <path
                d="M8 3v3a2 2 0 01-2 2H3M21 8h-3a2 2 0 01-2-2V3M3 16h3a2 2 0 012 2v3M16 21v-3a2 2 0 012-2h3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              // Fullscreen icon (arrows pointing outward)
              <path
                d="M7 14H5v5h5v-2M5 10V5h5v2M17 14h2v5h-5v-2M19 10V5h-5v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>
      );
    }
    return null;
  };

  // Render collapse button for sidebar and fullscreen modes (only when expanded)
  const renderCollapseButton = () => {
    const shouldShow =
      (currentMode === "sidebar" || currentMode === "fullscreen") &&
      !isCollapsed;

    if (shouldShow) {
      return (
        <button
          className="chat-wrapper__collapse-button"
          onClick={toggleCollapse}
          title="Collapse chat"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 12l-3 3-3-3m-6 3l-3 3-3-3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      );
    }
    return null;
  };

  // Render settings button (only in dev mode)
  const renderSettingsButton = () => {
    if (!devMode) return null;

    // If header is visible, render in header controls
    if (config.headerVisible !== false) {
      return (
        <button
          className="chat-wrapper__settings-button"
          onClick={() => setIsDevSettingsOpen(true)}
          title="Developer Settings"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
              fill="currentColor"
            />
          </svg>
        </button>
      );
    }

    // If header is not visible, render as floating button
    return null; // We'll render this separately outside the header
  };

  // Render floating settings button when header is not visible
  const renderFloatingSettingsButton = () => {
    if (!devMode || config.headerVisible !== false) return null;

    return (
      <button
        className="chat-wrapper__settings-button chat-wrapper__settings-button--floating"
        onClick={() => setIsDevSettingsOpen(true)}
        title="Developer Settings"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
            fill="currentColor"
          />
        </svg>
      </button>
    );
  };

  // Render tool results panel (if enabled)
  const renderToolResults = () => {
    if (!config.features?.showToolResults || toolResults.length === 0)
      return null;

    return (
      <div className="chat-wrapper__tool-results">
        <h4>Tool Results</h4>
        <div className="chat-wrapper__tool-results-list">
          {toolResults.map((result) => (
            <div key={result.id} className="chat-wrapper__tool-result">
              <div className="chat-wrapper__tool-result-title">
                {result.title}
              </div>
              {result.description && (
                <div className="chat-wrapper__tool-result-description">
                  {result.description}
                </div>
              )}
              <div className="chat-wrapper__tool-result-meta">
                Status: {result.status || "completed"}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // For modal mode, only render when open
  // For sidebar and fullscreen modes, render bubble when collapsed
  if (currentMode === "modal" && !isModalOpen) {
    return renderBubbleButton();
  }

  if (
    (currentMode === "sidebar" || currentMode === "fullscreen") &&
    isCollapsed
  ) {
    return renderBubbleButton();
  }

  return (
    <>
      <div className={containerClasses} style={config.customStyles}>
        {/* Floating settings button for when header is not visible */}
        {renderFloatingSettingsButton()}

        {config.headerVisible !== false && (
          <div className="chat-wrapper__header">
            <div className="chat-wrapper__title-area">
              <h2 className="chat-wrapper__title">{config.appName}</h2>
            </div>
            <div className="chat-wrapper__header-controls">
              {renderSettingsButton()}
              {renderModeToggleButton()}
              {renderCollapseButton()}
              {renderCloseButton()}
            </div>
          </div>
        )}

        {/* {renderThinkingIndicator()} */}

        {!isCollapsed && (
          <>
            {/* Conversation error message */}
            {conversationError && (
              <div className="chat-wrapper__conversation-error">
                <p>⚠️ {conversationError}</p>
              </div>
            )}

            {/* Main Header Section - only show when no messages and not loading */}
            {messages.length === 0 &&
              !isStreaming &&
              !isLoadingConversation && (
                <div className="chat-wrapper__main-header">
                  <h1 className="chat-wrapper__main-title">{config.appName}</h1>
                  {config.description && (
                    <p className="chat-wrapper__description">
                      {config.description}
                    </p>
                  )}
                </div>
              )}

            {/* Chat Content Area - flexible layout based on message state */}
            <div
              className={`chat-wrapper__content ${
                messages.length === 0 && !isStreaming && !isLoadingConversation
                  ? "chat-wrapper__content--empty"
                  : "chat-wrapper__content--with-messages"
              }`}
            >
              {/* Messages Area */}
              <div className="chat-wrapper__messages">
                {/* Show inline loader when loading conversation */}
                {isLoadingConversation && messages.length === 0 && (
                  <InlineLoader fullHeight={true} />
                )}

                {messages.map((message) => (
                  <MessageComponent
                    key={message.id}
                    message={message}
                    getReasoningTitle={getReasoningTitle}
                    getReasoningStatus={getReasoningStatus}
                    getReasoningDuration={getReasoningDuration}
                    getReasoningContentOnly={getReasoningContentOnly}
                    getToolingTitle={getToolingTitle}
                    getToolingStatus={getToolingStatus}
                    clientTools={clientTools || []}
                    currentAssistantMessageIdRef={currentAssistantMessageIdRef}
                  />
                ))}

                {/* Streaming message component */}
                {currentAssistantMessageIdRef.current && streamingContent && (
                  <StreamingMessage
                    content={streamingContent}
                    messageId={currentAssistantMessageIdRef.current}
                  />
                )}

                {/* Thinking bubble for assistant streaming */}
                {isThinking && !isHandlingTool && (
                  <div className="chat-wrapper__message chat-wrapper__message--assistant">
                    <div className="chat-wrapper__thinking-bubble">
                      <div className="chat-wrapper__thinking-content">
                        <div className="chat-wrapper__thinking-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {renderToolResults()}

              {/* Chat Input - flexible sizing */}
              <div className="chat-wrapper__input-container">
                <ChatInput
                  ref={chatInputRef}
                  placeholder={config.placeholder}
                  placeholderTexts={config.placeholderTexts}
                  disabled={isStreaming}
                  chatStatus={chatStatus}
                  fileUploadEnabled={config.features?.fileUpload}
                  restaurantName={config.restaurantName}
                  restaurantLogo={config.restaurantLogo}
                  hasMessages={messages.length > 0}
                  onSubmit={(message, media) => handleSubmit(message, media)}
                  onFileUpload={handleFileUpload}
                  onStopGeneration={stopGeneration}
                />
              </div>

              {/* Suggested Prompts - only show when no messages and not loading */}
              {messages.length === 0 &&
                !isStreaming &&
                !isLoadingConversation &&
                config.suggestedPrompts && (
                  <SuggestedPrompts
                    prompts={config.suggestedPrompts}
                    onPromptSelect={(prompt) => {
                      // Copy prompt description to the input field
                      if (chatInputRef.current) {
                        chatInputRef.current.setText(prompt.description);
                      }
                    }}
                  />
                )}
            </div>
          </>
        )}

        {config.onError && <div className="chat-wrapper__error-boundary" />}

        {/* Dev Settings Popup */}
        <DevSettings
          isOpen={isDevSettingsOpen}
          onClose={() => setIsDevSettingsOpen(false)}
          app={app}
          apiUrl={apiUrl}
        />
      </div>
    </>
  );
}

const ChatWrapperMemo = memo(ChatWrapper);

export { ChatWrapperMemo as ChatWrapper };
