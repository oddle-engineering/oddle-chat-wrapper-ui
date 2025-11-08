import { createContext, useContext, ReactNode, RefObject } from 'react';
import { Message, ClientTools } from '../types';
import { ChatStatus } from '../constants/chatStatus';
import { ChatInputRef } from '../components/ChatInput';

/**
 * ChatContext - Provides chat state and actions to child components
 * 
 * This eliminates prop drilling by making chat state available via Context API
 * instead of passing 28+ props through component hierarchy.
 * 
 * Benefits:
 * - Reduced prop drilling (28 props → ~5 props)
 * - Components only consume what they need
 * - Type-safe access via useChatContext hook
 * - Easier to refactor and maintain
 */

export interface ChatContextValue {
  // ===== Message State =====
  messages: Message[];
  isStreaming: boolean;
  isThinking: boolean;
  isHandlingTool: boolean;
  
  // ===== UI State =====
  isLoadingConversation: boolean;
  chatStatus: ChatStatus;
  conversationError?: string | null;
  
  // ===== Configuration =====
  headerName: string;
  headerDescription?: string;
  placeholderTexts?: string[];
  chipName?: string;
  chipLogo?: string;
  suggestedPrompts?: Array<{
    title: string;
    description: string;
    icon?: ReactNode;
  }>;
  
  // ===== Tools & Features =====
  clientTools?: ClientTools;
  fileUploadEnabled?: boolean;
  
  // ===== Reasoning Helpers =====
  getReasoningTitle: (content: string, isStreaming?: boolean) => string;
  getReasoningStatus: (content: string, isStreaming?: boolean) => "processing" | "completed" | "error";
  getReasoningDuration: (content: string) => string | undefined;
  getReasoningContentOnly: (content: string) => string;
  
  // ===== Tooling Helpers =====
  getToolingTitle: (content: string, isStreaming?: boolean) => string;
  getToolingStatus: (content: string, isStreaming?: boolean) => "processing" | "completed" | "error";
  
  // ===== Refs =====
  currentAssistantMessageIdRef: RefObject<string | null>;
  messagesEndRef: RefObject<HTMLDivElement>;
  chatInputRef: RefObject<ChatInputRef>;
  
  // ===== Event Handlers =====
  onSubmit: (message: string, media?: string[]) => void;
  onFileUpload: (files: File[]) => Promise<string[]>;
  onStopGeneration: () => void;
  onPromptSelect?: (prompt: { description: string }) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export interface ChatProviderProps {
  children: ReactNode;
  value: ChatContextValue;
}

/**
 * ChatProvider - Provides chat context to child components
 * 
 * Usage:
 * ```tsx
 * <ChatProvider value={chatContextValue}>
 *   <ChatContent />
 * </ChatProvider>
 * ```
 */
export function ChatProvider({ children, value }: ChatProviderProps) {
  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

/**
 * useChatContext - Access chat context in child components
 * 
 * Usage:
 * ```tsx
 * function ChatContent() {
 *   const { messages, isStreaming, onSubmit } = useChatContext();
 *   // Use the values...
 * }
 * ```
 * 
 * @throws Error if used outside ChatProvider
 */
export function useChatContext(): ChatContextValue {
  const context = useContext(ChatContext);
  
  if (!context) {
    throw new Error(
      'useChatContext must be used within ChatProvider. ' +
      'Make sure your component is wrapped with <ChatProvider>.'
    );
  }
  
  return context;
}
