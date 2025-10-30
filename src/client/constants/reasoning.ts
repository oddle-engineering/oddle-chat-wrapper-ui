export const REASONING_CONSTANTS = {
  // Message prefixes and markers
  THINKING_PREFIX: 'THINKING:',
  REASONING_PREFIX: 'REASONING:',
  THOUGHT_PREFIX: 'THOUGHT:',
  
  // Status indicators
  COMPLETED_MARKER: '✅ Completed:',
  ERROR_MARKER: '❌',
  HANDLING_MARKER: '🔧 Handling:',
  
  // UI Text constants
  UI_TEXT: {
    AI_IS_THINKING: 'AI is thinking',
    THINKING: 'Thinking',
    THINKING_ELLIPSIS: 'Thinking...',
    PROCESSING: 'Processing',
    THOUGHT: 'Thought',
  } as const,
  
  // Message types
  MESSAGE_TYPES: {
    THINKING: 'thinking',
    REASONING: 'reasoning', 
    THOUGHT: 'thought',
    COMPLETED: 'completed',
    ERROR: 'error',
    PROCESSING: 'processing'
  } as const,
  
  // Detection patterns
  PATTERNS: {
    DURATION: /for ([\d.]+) seconds/,
    THOUGHT_CONTENT: /\*\*(.*?)\*\*/g,
    HANDLING_TOOL: /🔧 Handling: (.+)/,
    COMPLETED_OR_ERROR_TOOL: /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
  }
} as const;

export type ReasoningMessageType = typeof REASONING_CONSTANTS.MESSAGE_TYPES[keyof typeof REASONING_CONSTANTS.MESSAGE_TYPES];

// Helper functions for reasoning detection
export const ReasoningDetector = {
  isThinkingMessage: (content: string): boolean => {
    return content.startsWith(REASONING_CONSTANTS.THINKING_PREFIX) ||
           content.startsWith(REASONING_CONSTANTS.REASONING_PREFIX) ||
           content.startsWith(REASONING_CONSTANTS.THOUGHT_PREFIX);
  },
  
  isCompletedMessage: (content: string): boolean => {
    return content.includes(REASONING_CONSTANTS.COMPLETED_MARKER);
  },
  
  isErrorMessage: (content: string): boolean => {
    return content.includes(REASONING_CONSTANTS.ERROR_MARKER);
  },
  
  isHandlingMessage: (content: string): boolean => {
    return content.includes(REASONING_CONSTANTS.HANDLING_MARKER);
  },
  
  extractDuration: (content: string): string | undefined => {
    const match = content.match(REASONING_CONSTANTS.PATTERNS.DURATION);
    return match ? ` for ${match[1]} seconds` : undefined;
  },
  
  cleanReasoningContent: (content: string): string => {
    // Remove prefixes
    let cleanContent = content
      .replace(new RegExp(`^${REASONING_CONSTANTS.THINKING_PREFIX}\\s*`), "")
      .replace(new RegExp(`^${REASONING_CONSTANTS.REASONING_PREFIX}\\s*`), "")
      .replace(new RegExp(`^${REASONING_CONSTANTS.THOUGHT_PREFIX}\\s*`), "");
      
    // Remove duration at end
    cleanContent = cleanContent.replace(/\s*for [\d.]+\s*seconds$/, "");
    
    // Remove content between ** 
    cleanContent = cleanContent.replace(REASONING_CONSTANTS.PATTERNS.THOUGHT_CONTENT, "");
    
    return cleanContent.trim();
  },
  
  getMessageType: (content: string, isStreaming?: boolean): ReasoningMessageType => {
    if (isStreaming === false) {
      if (ReasoningDetector.isErrorMessage(content)) {
        return REASONING_CONSTANTS.MESSAGE_TYPES.ERROR;
      }
      if (ReasoningDetector.isThinkingMessage(content) && 
          (content.includes("for") && content.includes("seconds"))) {
        return REASONING_CONSTANTS.MESSAGE_TYPES.THOUGHT;
      }
      if (ReasoningDetector.isThinkingMessage(content)) {
        return REASONING_CONSTANTS.MESSAGE_TYPES.THOUGHT;
      }
      return REASONING_CONSTANTS.MESSAGE_TYPES.THOUGHT;
    }

    // For streaming content
    if (ReasoningDetector.isCompletedMessage(content)) {
      return REASONING_CONSTANTS.MESSAGE_TYPES.COMPLETED;
    }
    if (ReasoningDetector.isErrorMessage(content)) {
      return REASONING_CONSTANTS.MESSAGE_TYPES.ERROR;
    }
    if (ReasoningDetector.isHandlingMessage(content)) {
      return REASONING_CONSTANTS.MESSAGE_TYPES.THINKING;
    }
    if (ReasoningDetector.isThinkingMessage(content) && !content.includes(REASONING_CONSTANTS.UI_TEXT.AI_IS_THINKING)) {
      return REASONING_CONSTANTS.MESSAGE_TYPES.THINKING;
    }
    return REASONING_CONSTANTS.MESSAGE_TYPES.THINKING;
  }
};