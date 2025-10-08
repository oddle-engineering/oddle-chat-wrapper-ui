export type ChatMode = 'sidebar' | 'fullscreen' | 'modal' | 'embedded';
export type ChatPosition = 'left' | 'right';
export type ChatTheme = 'light' | 'dark' | 'auto';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  media?: string[];
}

export interface StreamEvent {
  type: string;
  event?: string;
  data?: any;
  content?: string;
  error?: string;
  done?: boolean;
  uuid?: string;
  result?: any;
  tool?: string;
  todos?: any[];
  briefs?: any[];
}

export interface ToolResult {
  id: string;
  title: string;
  description?: string;
  status?: string;
  created_at: string;
  [key: string]: any;
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
    showToolResults?: boolean;
  };
  onMessage?: (message: Message) => void;
  onError?: (error: Error) => void;
  onToolResult?: (tool: string, result: any) => void;
  onStreamingStatusChange?: (status: string) => void;
  customStyles?: React.CSSProperties;
  endpoint?: 'brief-planner' | 'conversation';
}

export interface ChatWrapperProps {
  apiUrl: string;
  config: Omit<ChatConfig, 'apiEndpoint'>;
  tools?: Record<string, (...args: any[]) => any>;
  initialMessages?: Message[];
}

export interface ConversationResponse {
  conversationId: string;
  message: string;
}