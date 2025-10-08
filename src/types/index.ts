export type ChatMode = 'sidebar' | 'fullscreen' | 'modal' | 'embedded';
export type ChatPosition = 'left' | 'right';
export type ChatTheme = 'light' | 'dark' | 'auto';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface ChatConfig {
  mode: ChatMode;
  position?: ChatPosition;
  appName: string;
  apiEndpoint: string;
  apiKey?: string;
  theme?: ChatTheme;
  placeholder?: string;
  welcomeMessage?: string;
  features?: {
    fileUpload?: boolean;
    voiceInput?: boolean;
    messageHistory?: boolean;
    exportChat?: boolean;
  };
  onMessage?: (message: Message) => void;
  onError?: (error: Error) => void;
  customStyles?: React.CSSProperties;
}

export interface ConversationResponse {
  conversationId: string;
  message: string;
}