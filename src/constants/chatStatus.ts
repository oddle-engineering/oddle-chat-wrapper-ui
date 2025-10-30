// Chat Status Constants
export const CHAT_STATUS = {
  IDLE: "idle",
  SUBMITTED: "submitted", 
  STREAMING: "streaming",
  ERROR: "error",
} as const;

export type ChatStatus = typeof CHAT_STATUS[keyof typeof CHAT_STATUS];

// Streaming Status Constants
export const STREAMING_STATUS = {
  STARTING: "Starting...",
  PROCESSING: "Processing...",
  THINKING: "Thinking...",
  STREAMING: "Streaming response...",
  FINALIZING: "Finalizing...",
  COMPLETED: "Completed",
  ERROR: "Error occurred",
  IDLE: "",
} as const;

export type StreamingStatus = typeof STREAMING_STATUS[keyof typeof STREAMING_STATUS];

// Tool and Reasoning Status Constants
export const PROCESSING_STATUS = {
  PROCESSING: "processing",
  COMPLETED: "completed", 
  ERROR: "error",
} as const;

export type ProcessingStatus = typeof PROCESSING_STATUS[keyof typeof PROCESSING_STATUS];

// Status Checker Utilities
export const isChatActive = (status: ChatStatus): boolean => {
  return status === CHAT_STATUS.SUBMITTED || status === CHAT_STATUS.STREAMING;
};

export const isChatIdle = (status: ChatStatus): boolean => {
  return status === CHAT_STATUS.IDLE;
};

export const isChatError = (status: ChatStatus): boolean => {
  return status === CHAT_STATUS.ERROR;
};

export const isProcessingActive = (status: ProcessingStatus): boolean => {
  return status === PROCESSING_STATUS.PROCESSING;
};

export const isProcessingComplete = (status: ProcessingStatus): boolean => {
  return status === PROCESSING_STATUS.COMPLETED;
};

export const isProcessingError = (status: ProcessingStatus): boolean => {
  return status === PROCESSING_STATUS.ERROR;
};