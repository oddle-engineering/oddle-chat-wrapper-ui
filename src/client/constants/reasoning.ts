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
    DURATION_FOR: 'for',
    DURATION_SECOND: 'second',
    DURATION_SECONDS: 'seconds',
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
  
  // Detection patterns (language-agnostic)
  PATTERNS: {
    DURATION: /for ([\d.]+) \w+/,  // Matches "for <number> <any-word>"
    THOUGHT_CONTENT: /\*\*(.*?)\*\*/g,
    HANDLING_TOOL: /🔧 Handling: (.+)/,
    COMPLETED_OR_ERROR_TOOL: /(?:✅ Completed|❌ Error): (.+?)(?:\s-\s|$)/
  }
} as const;

export type ReasoningMessageType = typeof REASONING_CONSTANTS.MESSAGE_TYPES[keyof typeof REASONING_CONSTANTS.MESSAGE_TYPES];

// Translation function type
export type ReasoningTranslationFn = (key: string, options?: { count?: number }) => string;

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
  
  extractDuration: (content: string, t?: ReasoningTranslationFn): string | undefined => {
    const match = content.match(REASONING_CONSTANTS.PATTERNS.DURATION);
    if (!match) return undefined;
    
    const duration = parseFloat(match[1]);
    
    // If translation function provided, use it
    if (t) {
      const forText = t('chat.reasoning.duration.for');
      const unit = duration === 1 
        ? t('chat.reasoning.duration.second')
        : t('chat.reasoning.duration.seconds');
      return ` ${forText} ${duration} ${unit}`;
    }
    
    // Fallback to English
    const unit = duration === 1 
      ? REASONING_CONSTANTS.UI_TEXT.DURATION_SECOND
      : REASONING_CONSTANTS.UI_TEXT.DURATION_SECONDS;
    return ` ${REASONING_CONSTANTS.UI_TEXT.DURATION_FOR} ${duration} ${unit}`;
  },
  
  cleanReasoningContent: (content: string): string => {
    // Remove prefixes
    let cleanContent = content
      .replace(new RegExp(`^${REASONING_CONSTANTS.THINKING_PREFIX}\\s*`), "")
      .replace(new RegExp(`^${REASONING_CONSTANTS.REASONING_PREFIX}\\s*`), "")
      .replace(new RegExp(`^${REASONING_CONSTANTS.THOUGHT_PREFIX}\\s*`), "");
      
    // Remove duration at end (language-agnostic: matches "for <number> <any-word>")
    cleanContent = cleanContent.replace(/\s*for [\d.]+\s+\w+$/, "");
    
    // Remove content between ** 
    cleanContent = cleanContent.replace(REASONING_CONSTANTS.PATTERNS.THOUGHT_CONTENT, "");
    
    return cleanContent.trim();
  },
  
  getMessageType: (content: string, isStreaming?: boolean): ReasoningMessageType => {
    if (isStreaming === false) {
      if (ReasoningDetector.isErrorMessage(content)) {
        return REASONING_CONSTANTS.MESSAGE_TYPES.ERROR;
      }
      // Check for duration pattern (language-agnostic)
      if (ReasoningDetector.isThinkingMessage(content) && 
          REASONING_CONSTANTS.PATTERNS.DURATION.test(content)) {
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