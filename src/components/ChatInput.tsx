import {
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { ImagePreviewModal } from "./ImagePreviewModal";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputButton,
  PromptInputSubmit,
} from "./PromptInput";
import { isChatActive } from "../constants/chatStatus";
import { AnimatedPlaceholder } from "./AnimatedPlaceholder";
import { sanitizeMessage, sanitizeFileName } from "../utils/security";
import { useChatContext } from "../contexts";
import { ConnectionState } from "../types";

export interface ChatInputRef {
  focus: () => void;
  setText: (text: string) => void;
}

// TODO: Review onFileUpload security implications
export const ChatInput = forwardRef<ChatInputRef, {}>((_, ref) => {
  const {
    placeholderTexts,
    isStreaming,
    isLoadingConversation,
    chatStatus,
    fileUploadEnabled,
    fileUploadConfig,
    chipName,
    chipLogo,
    messages,
    onSubmit,
    onFileUpload,
    onStopGeneration,
    connectionState,
  } = useChatContext();

  // Helper to check if input should be disabled based on connection state
  const isInputDisabled =
    isStreaming ||
    isLoadingConversation ||
    connectionState !== ConnectionState.CONNECTED;

  // Helper to check if placeholder should be shown
  const shouldShowPlaceholder = connectionState === ConnectionState.CONNECTED;

  const hasMessages = messages.length > 0;
  const [input, setInput] = useState("");
  const [uploadedMedia, setUploadedMedia] = useState<string[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<Array<{
    file: File;
    preview: string;
    isUploading: boolean;
    progress: number;
  }>>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);


  const handleImagePreview = useCallback(
    (media: string) => {
      setPreviewImageUrl(media);
      setIsPreviewModalOpen(true);
    },
    []
  );

  // Helper function to create preview URL for file
  const createFilePreview = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  // Determine which placeholders to use
  const activePlaceholderTexts =
    placeholderTexts && placeholderTexts.length > 0
      ? placeholderTexts
      : ["What would you like to know?"];

  // Determine if animation should be active
  const shouldAnimate =
    input.length === 0 && !hasMessages && activePlaceholderTexts.length > 1;

  useImperativeHandle(ref, () => ({
    focus: () => {
      textareaRef.current?.focus();
    },
    setText: (text: string) => {
      setInput(text);
      // Focus the textarea and move cursor to the end
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          // Set cursor position to the end of the text
          const length = text.length;
          textareaRef.current.setSelectionRange(length, length);
        }
      }, 0);
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

  const handlePaste = useCallback(
    async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const items = Array.from(e.clipboardData?.items || []);
      const imageItems = items.filter((item) => item.type.startsWith("image/"));

      if (imageItems.length > 0) {
        e.preventDefault();
        setUploadError(null);

        try {
          const files = await Promise.all(
            imageItems.map((item) => {
              const file = item.getAsFile();
              if (file) {
                // Create a proper File object with a name
                return new File(
                  [file],
                  `clipboard-image-${Date.now()}.${file.type.split("/")[1]}`,
                  {
                    type: file.type,
                  }
                );
              }
              return null;
            })
          ).then((files) => files.filter(Boolean) as File[]);

          if (files.length > 0) {
            // Validate file size and type before upload
            const validFiles = files.filter((file) => {
              // Check file size using configurable limit
              const maxSize = fileUploadConfig?.maxFileSize ?? (15 * 1024 * 1024);
              if (file.size > maxSize) {
                console.warn(
                  `File too large: ${file.name} (${file.size} bytes)`
                );
                setUploadError(`File too large. Maximum size is ${Math.round(maxSize / (1024 * 1024))}MB.`);
                return false;
              }

              // File type validation using configurable types
              const allowedTypes = fileUploadConfig?.allowedTypes ?? [
                "image/jpeg",
                "image/png", 
                "image/gif",
                "image/webp",
              ];

              if (!allowedTypes.includes(file.type)) {
                console.warn(
                  `File type not allowed: ${file.name} (${file.type})`
                );
                setUploadError(
                  `File type not supported. Allowed types: ${allowedTypes.join(", ")}`
                );
                return false;
              }

              return true;
            });

            if (validFiles.length > 0) {
              // Check total file limit using configurable limit
              const maxFiles = fileUploadConfig?.maxFiles ?? 5;
              const totalFiles = uploadedMedia.length + uploadingFiles.length + validFiles.length;
              if (totalFiles > maxFiles) {
                setUploadError(`Maximum ${maxFiles} files allowed. Currently ${uploadedMedia.length + uploadingFiles.length} files, trying to add ${validFiles.length} more.`);
                return;
              }

              // Create preview URLs and add to uploading state
              const filePreviewPromises = validFiles.map(async (file) => ({
                file,
                preview: await createFilePreview(file),
                isUploading: true,
                progress: 0,
              }));

              const filePreviews = await Promise.all(filePreviewPromises);
              setUploadingFiles(prev => [...prev, ...filePreviews]);

              // Start upload
              const newMedia = await onFileUpload(validFiles);
              
              // Move from uploading to uploaded
              setUploadingFiles(prev => prev.filter(item => !validFiles.includes(item.file)));
              setUploadedMedia(prev => [...prev, ...newMedia]);
              setUploadError(null);
            }
          }
        } catch (error) {
          console.error("Clipboard paste error:", error);
          setUploadError(
            error instanceof Error ? error.message : "Failed to paste image"
          );
          // Clear uploading files on error
          setUploadingFiles([]);
        }
      }
    },
    [onFileUpload, fileUploadConfig, uploadedMedia, uploadingFiles, createFilePreview]
  );

  const handleFileUploadClick = useCallback(async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.multiple = true; // Allow multiple file selection
    fileInput.onchange = async (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        try {
          setUploadError(null);

          // Validate and sanitize file names for security
          const validFiles = Array.from(files).filter((file) => {
            const sanitizedName = sanitizeFileName(file.name);
            if (sanitizedName !== file.name) {
              console.warn(
                `File name sanitized: ${file.name} -> ${sanitizedName}`
              );
            }

            // Check file size using configurable limit
            const maxSize = fileUploadConfig?.maxFileSize ?? (15 * 1024 * 1024);
            if (file.size > maxSize) {
              console.warn(`File too large: ${file.name} (${file.size} bytes)`);
              setUploadError(`File too large. Maximum size is ${Math.round(maxSize / (1024 * 1024))}MB.`);
              return false;
            }

            // File type validation using configurable types
            const allowedTypes = fileUploadConfig?.allowedTypes ?? [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp",
            ];

            if (!allowedTypes.includes(file.type)) {
              console.warn(
                `File type not allowed: ${file.name} (${file.type})`
              );
              setUploadError(
                `File type not supported. Allowed types: ${allowedTypes.join(", ")}`
              );
              return false;
            }

            return true;
          });

          if (validFiles.length > 0) {
            // Check total file limit using configurable limit
            const maxFiles = fileUploadConfig?.maxFiles ?? 5;
            const totalFiles = uploadedMedia.length + uploadingFiles.length + validFiles.length;
            if (totalFiles > maxFiles) {
              setUploadError(`Maximum ${maxFiles} files allowed. Currently ${uploadedMedia.length + uploadingFiles.length} files, trying to add ${validFiles.length} more.`);
              return;
            }

            // Create preview URLs and add to uploading state
            const filePreviewPromises = validFiles.map(async (file) => ({
              file,
              preview: await createFilePreview(file),
              isUploading: true,
              progress: 0,
            }));

            const filePreviews = await Promise.all(filePreviewPromises);
            setUploadingFiles(prev => [...prev, ...filePreviews]);

            // Start upload
            const newMedia = await onFileUpload(validFiles);
            
            // Move from uploading to uploaded
            setUploadingFiles(prev => prev.filter(item => !validFiles.includes(item.file)));
            setUploadedMedia(prev => [...prev, ...newMedia]);
            setUploadError(null); // Clear any previous errors on successful upload
          }
        } catch (error) {
          console.error("File upload error:", error);
          setUploadError(
            error instanceof Error ? error.message : "Upload failed"
          );
          // Clear uploading files on error
          setUploadingFiles([]);
        }
      }
    };
    fileInput.click();
  }, [onFileUpload, fileUploadConfig, uploadedMedia, uploadingFiles, createFilePreview]);

  return (
    <PromptInput
      onSubmit={handleSubmit}
      style={{ position: "relative" }}
      className={isInputDisabled ? "chat-wrapper__prompt-input--disabled" : ""}
    >
      <PromptInputTextarea
        ref={textareaRef}
        name="message"
        value={input}
        onChange={handleInputChange}
        onPaste={handlePaste}
        placeholder="" // Empty placeholder since we'll use our custom animated one
        disabled={isInputDisabled}
      />

      {/* Animated placeholder component */}
      {!input.trim() && shouldShowPlaceholder && (
        <AnimatedPlaceholder
          placeholderTexts={activePlaceholderTexts}
          shouldAnimate={shouldAnimate}
        />
      )}


      {/* Upload error message */}
      {uploadError && (
        <div
          style={{
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            margin: "8px 0",
          }}
        >
          <span style={{ color: "#ef4444", fontSize: "14px" }}>
            ❌ {uploadError}
          </span>
          <button
            onClick={() => setUploadError(null)}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              color: "#ef4444",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Media preview section - above the textarea */}
      {(uploadedMedia.length > 0 || uploadingFiles.length > 0) && (
        <div
          style={{
            padding: "8px 16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center",
          }}
        >
          {/* Render uploading files with loading indicators */}
          {uploadingFiles.map((uploadingFile, index) => (
            <div
              key={`uploading-${index}`}
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
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
                {/* Image preview */}
                <img
                  src={uploadingFile.preview}
                  alt={`Uploading ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                {/* Loading overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                  }}
                >
                  {/* Spinning loading indicator */}
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                </div>
              </div>
              {/* Remove button */}
              <button
                onClick={() => {
                  setUploadingFiles(prev => prev.filter((_, i) => i !== index));
                }}
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "transparent",
                  border: "2px solid white",
                  color: "white",
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 3,
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                  fontWeight: "bold",
                  transition: "all 0.2s",
                }}
                title="Cancel upload"
              >
                ×
              </button>
            </div>
          ))}

          {/* Render uploaded media */}
          {uploadedMedia.map((media, index) => {
            // Check if it's an image (either base64 or URL)
            const isImageBase64 = media.startsWith("data:image/");
            const isImageUrl =
              media.startsWith("http://") || media.startsWith("https://");
            const isImage = isImageBase64 || isImageUrl;

            // Media is now a direct CDN URL for images

            return (
              <div
                key={`uploaded-${index}`}
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
                      cursor: "pointer",
                    }}
                    onClick={() => handleImagePreview(media)}
                    title="Click to view full image"
                  >
                    {/* Main image - use CDN URL directly */}
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
                    {/* Zoom icon overlay */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontSize: "16px",
                        zIndex: 2,
                        opacity: 0.8,
                        pointerEvents: "none",
                      }}
                    ></div>
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
                    // Clear upload error when removing media
                    if (uploadError) {
                      setUploadError(null);
                    }
                  }}
                  style={{
                    position: "absolute",
                    top: isImage ? "6px" : "8px",
                    right: isImage ? "6px" : "8px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "transparent",
                    border: "2px solid white",
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
                  title="Remove attachment"
                >
                  ×
                </button>
              </div>
            );
          })}
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
                  uploadingFiles.length > 0
                    ? `Uploading ${uploadingFiles.length} file(s)...`
                    : uploadedMedia.length > 0
                    ? `${uploadedMedia.length}/${fileUploadConfig?.maxFiles ?? 5} image(s) attached`
                    : `Attach images (max ${fileUploadConfig?.maxFiles ?? 5} files, ${Math.round((fileUploadConfig?.maxFileSize ?? (15 * 1024 * 1024)) / (1024 * 1024))}MB each)`
                }
                disabled={isInputDisabled || uploadingFiles.length > 0}
                style={{
                  position: "relative",
                }}
              >
                <svg
                  width="36"
                  height="37"
                  viewBox="0 0 36 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="0.354126"
                    width="36"
                    height="36"
                    rx="18"
                    fill="#F4F6F8"
                  />
                  <g clipPath="url(#clip0_121_9706)">
                    <path
                      d="M21.3334 13.3541V22.9374C21.3334 24.7791 19.8417 26.2708 18 26.2708C16.1584 26.2708 14.6667 24.7791 14.6667 22.9374V12.5208C14.6667 11.3708 15.6 10.4374 16.75 10.4374C17.9 10.4374 18.8334 11.3708 18.8334 12.5208V21.2708C18.8334 21.7291 18.4584 22.1041 18 22.1041C17.5417 22.1041 17.1667 21.7291 17.1667 21.2708V13.3541H15.9167V21.2708C15.9167 22.4208 16.85 23.3541 18 23.3541C19.15 23.3541 20.0834 22.4208 20.0834 21.2708V12.5208C20.0834 10.6791 18.5917 9.18744 16.75 9.18744C14.9084 9.18744 13.4167 10.6791 13.4167 12.5208V22.9374C13.4167 25.4708 15.4667 27.5208 18 27.5208C20.5334 27.5208 22.5834 25.4708 22.5834 22.9374V13.3541H21.3334Z"
                      fill="#212B36"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_121_9706">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(8 8.35413)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </PromptInputButton>
              {/* <span
                onClick={uploadingFiles.length > 0 ? undefined : handleFileUploadClick}
                style={{
                  fontSize: "12px",
                  color: uploadingFiles.length > 0 ? "#94a3b8" : "#919EAB",
                  marginLeft: "4px",
                  cursor: uploadingFiles.length > 0 ? "not-allowed" : "pointer",
                }}
              >
                {uploadingFiles.length > 0 ? `Uploading ${uploadingFiles.length}...` : `Attach ${uploadedMedia.length > 0 ? `(${uploadedMedia.length}/${fileUploadConfig?.maxFiles ?? 5})` : ""}`}
              </span> */}
            </div>
          )}
          {fileUploadEnabled && chipName && (
            <div className="chat-wrapper__divider"></div>
          )}
          {chipName && (
            <div className="chat-wrapper__restaurant-chip">
              {chipLogo && (
                <img
                  src={chipLogo}
                  alt="Chip logo"
                  className="chat-wrapper__restaurant-logo"
                />
              )}
              <span className="chat-wrapper__restaurant-name">{chipName}</span>
            </div>
          )}
        </PromptInputTools>
        <PromptInputSubmit
          status={chatStatus}
          disabled={
            isChatActive(chatStatus)
              ? false // Never disable stop button when chat is active
              : !input.trim() || isInputDisabled // Normal disabled logic when idle
          }
          onClick={
            isChatActive(chatStatus) && onStopGeneration
              ? () => {
                  onStopGeneration();
                }
              : undefined
          }
        />
      </PromptInputToolbar>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        imageUrl={previewImageUrl}
        isOpen={isPreviewModalOpen}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setPreviewImageUrl(null);
        }}
        alt="Image preview"
      />
    </PromptInput>
  );
});
