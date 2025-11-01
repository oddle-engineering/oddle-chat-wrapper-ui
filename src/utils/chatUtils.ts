import { ChatMode, ChatTheme, ChatPosition } from '../types';

/**
 * Chat utility functions for common operations and state calculations
 */

export const chatStateHelpers = {
  /**
   * Determine if the bubble button should be shown based on mode and state
   */
  shouldShowBubble: (mode: ChatMode, isModalOpen: boolean, isCollapsed: boolean): boolean => {
    return (mode === "modal" && !isModalOpen) ||
           ((mode === "sidebar" || mode === "fullscreen") && isCollapsed);
  },

  /**
   * Determine if the chat is in a collapsed state
   */
  isCollapsedState: (mode: ChatMode, isCollapsed: boolean): boolean => {
    return (mode === "sidebar" || mode === "fullscreen") && isCollapsed;
  },

  /**
   * Get the appropriate title text based on mode and state
   */
  getBubbleTitle: (mode: ChatMode, appName: string): string => {
    return mode === "modal" ? `Open ${appName}` : `Expand ${appName}`;
  },

  /**
   * Determine if header should be visible
   */
  shouldShowHeader: (headerVisible?: boolean): boolean => {
    return headerVisible !== false;
  },

  /**
   * Determine if main header section should be shown
   */
  shouldShowMainHeader: (
    messagesLength: number,
    isStreaming: boolean,
    isLoadingConversation: boolean
  ): boolean => {
    return messagesLength === 0 && !isStreaming && !isLoadingConversation;
  },

  /**
   * Get content area CSS class based on message state
   */
  getContentAreaClass: (
    messagesLength: number,
    isStreaming: boolean,
    isLoadingConversation: boolean
  ): string => {
    const baseClass = "chat-wrapper__content";
    const isEmpty = messagesLength === 0 && !isStreaming && !isLoadingConversation;
    return `${baseClass} ${isEmpty ? 'chat-wrapper__content--empty' : 'chat-wrapper__content--with-messages'}`;
  },

  /**
   * Determine if suggested prompts should be shown
   */
  shouldShowSuggestedPrompts: (
    messagesLength: number,
    isStreaming: boolean,
    isLoadingConversation: boolean,
    suggestedPrompts?: any[]
  ): boolean => {
    return messagesLength === 0 &&
           !isStreaming &&
           !isLoadingConversation &&
           !!suggestedPrompts;
  },
};

export const urlHelpers = {
  /**
   * Convert WebSocket URL to HTTP URL for REST API calls
   */
  convertWebSocketToHttp: (wsUrl: string): string => {
    return wsUrl.replace(/^wss?:\/\//, (match) =>
      match === "wss://" ? "https://" : "http://"
    );
  },

  /**
   * Validate if a URL is a valid WebSocket URL
   */
  isValidWebSocketUrl: (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'ws:' || urlObj.protocol === 'wss:';
    } catch {
      return false;
    }
  },

  /**
   * Validate if a URL is a valid HTTP URL
   */
  isValidHttpUrl: (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  },
};

export const validationHelpers = {
  /**
   * Validate required authentication props
   */
  validateAuthProps: (props: {
    userMpAuthToken?: string;
    chatServerUrl?: string;
    chatServerKey?: string;
    userId?: string;
  }): void => {
    if (!props.userMpAuthToken) {
      throw new Error("ChatWrapper: userMpAuthToken is required");
    }
    if (!props.chatServerUrl) {
      throw new Error("ChatWrapper: chatServerUrl is required");
    }
    if (!props.chatServerKey) {
      throw new Error("ChatWrapper: chatServerKey is required");
    }
    if (!props.userId) {
      throw new Error("ChatWrapper: userId is required");
    }
  },

  /**
   * Validate WebSocket URL format
   */
  validateWebSocketUrl: (url: string): void => {
    if (!urlHelpers.isValidWebSocketUrl(url)) {
      throw new Error(`Invalid WebSocket URL: ${url}. Must start with ws:// or wss://`);
    }
  },

  /**
   * Validate message content before sending
   */
  validateMessageContent: (content: string): boolean => {
    return content.trim().length > 0;
  },
};

export const cssHelpers = {
  /**
   * Build CSS class names conditionally
   */
  buildClasses: (...classes: (string | undefined | null | false)[]): string => {
    return classes.filter(Boolean).join(' ');
  },

  /**
   * Get container CSS classes based on configuration
   */
  getContainerClasses: (
    mode: ChatMode,
    position?: ChatPosition,
    theme?: ChatTheme,
    isCollapsed?: boolean,
    constrainedHeight?: boolean
  ): string => {
    return cssHelpers.buildClasses(
      "chat-wrapper",
      `chat-wrapper--${mode}`,
      position && `chat-wrapper--${position}`,
      theme && `chat-wrapper--${theme}`,
      isCollapsed && "chat-wrapper--collapsed",
      mode === "embedded" && constrainedHeight && "chat-wrapper--constrained"
    );
  },
};

export const messageHelpers = {
  /**
   * Generate a unique message ID
   */
  generateMessageId: (): string => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  },

  /**
   * Check if a message is from the user
   */
  isUserMessage: (role: string): boolean => {
    return role === "user";
  },

  /**
   * Check if a message is from the assistant
   */
  isAssistantMessage: (role: string): boolean => {
    return role === "assistant";
  },

  /**
   * Check if a message is a system message
   */
  isSystemMessage: (role: string): boolean => {
    return role === "system";
  },

  /**
   * Format timestamp for display
   */
  formatTimestamp: (timestamp: Date): string => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  },

  /**
   * Truncate message content for preview
   */
  truncateContent: (content: string, maxLength: number = 100): string => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  },
};

export const performanceHelpers = {
  /**
   * Debounce function for performance optimization
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: number;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => func.apply(null, args), delay);
    };
  },

  /**
   * Throttle function for performance optimization
   */
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let lastCall = 0;
    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func.apply(null, args);
      }
    };
  },

  /**
   * Create a stable callback reference
   */
  useStableCallback: <T extends (...args: any[]) => any>(callback: T): T => {
    // This would need to be implemented as a hook in actual usage
    return callback;
  },
};

export const errorHelpers = {
  /**
   * Create a standardized error for the chat system
   */
  createChatError: (message: string, code?: string, originalError?: Error): Error => {
    const error = new Error(message);
    (error as any).code = code;
    (error as any).originalError = originalError;
    return error;
  },

  /**
   * Check if an error is a network error
   */
  isNetworkError: (error: Error): boolean => {
    return error.message.includes('fetch') || 
           error.message.includes('network') ||
           error.message.includes('connection');
  },

  /**
   * Get user-friendly error message
   */
  getUserFriendlyErrorMessage: (error: Error): string => {
    if (errorHelpers.isNetworkError(error)) {
      return "Connection error. Please check your internet connection and try again.";
    }
    
    if (error.message.includes('authentication') || error.message.includes('auth')) {
      return "Authentication error. Please refresh the page and try again.";
    }
    
    if (error.message.includes('timeout')) {
      return "Request timed out. Please try again.";
    }
    
    return "An unexpected error occurred. Please try again.";
  },
};

/**
 * Combined utility object with all helpers
 */
export const chatUtils = {
  state: chatStateHelpers,
  url: urlHelpers,
  validation: validationHelpers,
  css: cssHelpers,
  message: messageHelpers,
  performance: performanceHelpers,
  error: errorHelpers,
};