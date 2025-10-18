import { useState, useCallback, useRef, useImperativeHandle, forwardRef } from "react";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputButton,
  PromptInputSubmit,
  ChatStatus,
} from "./PromptInput";
import { sanitizeMessage, sanitizeFileName } from "../utils/security";

interface ChatInputProps {
  placeholder?: string;
  disabled?: boolean;
  chatStatus: ChatStatus;
  fileUploadEnabled?: boolean;
  onSubmit: (message: string, media: string[]) => void;
  onFileUpload: (files: File[]) => Promise<string[]>;
  onStopGeneration?: () => void;
}

export interface ChatInputRef {
  focus: () => void;
}

export const ChatInput = forwardRef<ChatInputRef, ChatInputProps>(({
  placeholder = "What would you like to know?",
  disabled = false,
  chatStatus,
  fileUploadEnabled = false,
  onSubmit,
  onFileUpload,
  onStopGeneration,
}, ref) => {
  const [input, setInput] = useState("");
  const [uploadedMedia, setUploadedMedia] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      textareaRef.current?.focus();
    },
  }));

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const rawMessage = formData.get("message") as string;

      if (rawMessage?.trim()) {
        // Sanitize the user message for security
        const sanitizedMessage = sanitizeMessage(rawMessage.trim(), false);

        // Check if sanitization removed everything
        if (!sanitizedMessage.trim()) {
          console.warn("Message was blocked due to security concerns");
          // Optionally show user feedback
          return;
        }

        onSubmit(sanitizedMessage, uploadedMedia);
        setInput("");
        setUploadedMedia([]);
      }
    },
    [onSubmit, uploadedMedia]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const rawValue = e.target.value;
      // For real-time input, we can be less strict than final submission
      // Just prevent the most dangerous content while typing
      const sanitizedValue = rawValue
        .replace(/<script[\s\S]*?<\/script>/gi, "") // Remove script tags
        .replace(/javascript:/gi, "") // Remove javascript: URLs
        .replace(/on\w+\s*=/gi, ""); // Remove event handlers

      setInput(sanitizedValue);
    },
    []
  );

  const handleFileUploadClick = useCallback(async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,text/*,.pdf,.doc,.docx";
    input.multiple = true;
    input.onchange = async (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        // Validate and sanitize file names for security
        const validFiles = Array.from(files).filter((file) => {
          const sanitizedName = sanitizeFileName(file.name);
          if (sanitizedName !== file.name) {
            console.warn(
              `File name sanitized: ${file.name} -> ${sanitizedName}`
            );
          }

          // Check file size (limit to 10MB)
          if (file.size > 10 * 1024 * 1024) {
            console.warn(`File too large: ${file.name} (${file.size} bytes)`);
            return false;
          }

          // Basic file type validation
          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "text/plain",
            "text/csv",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ];

          if (!allowedTypes.includes(file.type)) {
            console.warn(`File type not allowed: ${file.name} (${file.type})`);
            return false;
          }

          return true;
        });

        if (validFiles.length > 0) {
          const newMedia = await onFileUpload(validFiles);
          setUploadedMedia((prev) => [...prev, ...newMedia]);
        }
      }
    };
    input.click();
  }, [onFileUpload]);

  return (
    <PromptInput onSubmit={handleSubmit}>
      <PromptInputTextarea
        ref={textareaRef}
        name="message"
        value={input}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
      />

      {/* Media preview section - above the textarea */}
      {uploadedMedia.length > 0 && (
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center",
          }}
        >
          {uploadedMedia.map((media, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
              {media.startsWith("data:image/") ? (
                <div
                  style={{
                    position: "relative",
                    width: "56px",
                    height: "56px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid #e2e8f0",
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
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
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
                    borderRadius: "12px",
                    padding: "8px 12px",
                    minWidth: "200px",
                    maxWidth: "300px",
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
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                        fill="white"
                      />
                      <path
                        d="M14 2V8H20"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
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
                        maxWidth: "100px",
                      }}
                    >
                      {/* Extract filename from media string */}
                      {(() => {
                        const nameMatch = media.match(/name=([^;]+)/);
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
                        const typeMatch = media.match(/data:([^;]+)/);
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
                              const subtype = mimeType.split("/")[1];
                              return subtype
                                ? subtype.toUpperCase().substring(0, 4)
                                : "FILE";
                          }
                        }
                        return "FILE";
                      })()}
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={() => {
                  setUploadedMedia((prev) =>
                    prev.filter((_, i) => i !== index)
                  );
                }}
                style={{
                  position: "absolute",
                  top: media.startsWith("data:image/") ? "2px" : "8px",
                  right: media.startsWith("data:image/") ? "2px" : "8px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: media.startsWith("data:image/")
                    ? "transparent"
                    : "#6b7280",
                  border: media.startsWith("data:image/")
                    ? "2px solid white"
                    : "none",
                  color: "white",
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2, // Above the overlay
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                  fontWeight: "bold",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!media.startsWith("data:image/")) {
                    e.currentTarget.style.backgroundColor = "#ef4444";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!media.startsWith("data:image/")) {
                    e.currentTarget.style.backgroundColor = "#6b7280";
                  }
                }}
                title="Remove attachment"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <PromptInputToolbar>
        <PromptInputTools>
          {fileUploadEnabled && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <PromptInputButton
                variant="ghost"
                size="icon"
                onClick={handleFileUploadClick}
                title={
                  uploadedMedia.length > 0
                    ? `${uploadedMedia.length} file(s) attached`
                    : "Attach files"
                }
                disabled={disabled}
                style={{
                  position: "relative",
                  color: uploadedMedia.length > 0 ? "#3b82f6" : undefined,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49L13.1 2.41a4 4 0 015.66 5.66L9.41 17.41a2 2 0 01-2.83-2.83L15.9 5.24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </PromptInputButton>
              <span
                onClick={handleFileUploadClick}
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginLeft: "4px",
                  cursor: "pointer",
                }}
              >
                Upload files
              </span>
            </div>
          )}
        </PromptInputTools>
        <PromptInputSubmit
          status={chatStatus}
          disabled={!input.trim() && chatStatus !== "streaming"}
          onClick={
            chatStatus === "streaming" && onStopGeneration
              ? () => {
                  onStopGeneration();
                }
              : undefined
          }
        />
      </PromptInputToolbar>
    </PromptInput>
  );
});
