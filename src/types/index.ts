export type ChatMode = "sidebar" | "fullscreen" | "modal" | "embedded";
export type ChatPosition = "left" | "right";
export type ChatTheme = "light" | "dark" | "auto";

export interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "reasoning" | "tooling";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  media?: string[];
  toolData?: {
    toolName: string;
    callId: string;
    parameters?: Record<string, any>;
    result?: any;
    status?: "processing" | "completed" | "error";
  };
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
  parameters?: any[] | Record<string, any> | any;
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
  promptPath?: string;
  bubbleText?: string;
  constrainedHeight?: boolean; // When true, embedded mode will fill parent container completely
  features?: {
    fileUpload?: boolean;
    voiceInput?: boolean;
    messageHistory?: boolean;
    exportChat?: boolean;
    showToolResults?: boolean;
    showBubbleText?: boolean;
  };
  onMessage?: (message: Message) => void;
  onError?: (error: Error) => void;
  onToolResult?: (tool: string, result: any) => void;
  onStreamingStatusChange?: (status: string) => void;
  onBusinessDataUpdate?: (data: any) => void;
  customStyles?: React.CSSProperties;
  endpoint?: "brief-planner" | "conversation";
}

export interface ChatWrapperProps {
  apiUrl: string;
  config: Omit<ChatConfig, "apiEndpoint">;
  tools?: Record<string, (...args: any[]) => any>;
  clientTools?: ClientTools;
  initialMessages?: Message[];
}

export interface ConversationResponse {
  conversationId: string;
  message: string;
}

export interface ToolParameter {
  name: string;
  type: string;
  description: string;
  isRequired: boolean;
  schema: {
    type: string;
    properties?: Record<string, any>;
    required?: string[];
    additionalProperties?: boolean;
    $schema?: string;
    enum?: string[];
    items?: any;
  };
}

export interface ClientTool {
  name: string;
  description: string;
  parameters: ToolParameter[];
}

export type ClientTools = ClientTool[];

export interface BusinessData {
  [key: string]: any;
}

export interface BusinessAgentClientProps {
  toolSchemas?: any[];
  clientTools?: Record<string, Function>;
  businessContext: BusinessData;
  onSetMessage?: (char: string) => void;
  onSystemMessage?: (message: string) => void;
  onBusinessDataUpdate?: (data: any) => void;
  onReasoningUpdate?: (isThinking: boolean, content: string, toolCallRequest?: ToolCallRequest) => void;
}

export interface ToolCallRequest {
  toolName: string;
  parameters: Record<string, any>;
  callId: string;
}

export interface WebSocketMessage {
  type: string;
  sessionId?: string;
  content?: string;
  data?: any;
  event?: string;
  error?: string;
  toolName?: string;
  parameters?: Record<string, any>;
  callId?: string;
  result?: any;
  timestamp?: string;
  uuid?: string;
  connectionInfo?: any;
  toolSchemas?: any[];
  businessContext?: BusinessData;
  agentType?: string;
  pingTime?: string;
  originalTimestamp?: string;
}
