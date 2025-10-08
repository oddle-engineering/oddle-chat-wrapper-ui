import { JSX as JSX_2 } from 'react/jsx-runtime';
import { ReactNode } from 'react';

export declare interface ChatConfig {
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
    customStyles?: React.CSSProperties;
    endpoint?: 'brief-planner' | 'conversation';
}

export declare type ChatMode = 'sidebar' | 'fullscreen' | 'modal' | 'embedded';

export declare type ChatPosition = 'left' | 'right';

export declare type ChatTheme = 'light' | 'dark' | 'auto';

export declare function ChatWrapper({ apiUrl, config, tools, initialMessages, }: ChatWrapperProps): JSX_2.Element | null;

export declare interface ChatWrapperProps {
    apiUrl: string;
    config: Omit<ChatConfig, 'apiEndpoint'>;
    tools?: Record<string, (...args: any[]) => any>;
    initialMessages?: Message[];
}

export declare interface ConversationResponse {
    conversationId: string;
    message: string;
}

export declare function Loader({ size, variant }: LoaderProps): JSX_2.Element;

declare interface LoaderProps {
    size?: number;
    variant?: 'dots' | 'pulse' | 'spinner';
}

export declare interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    isStreaming?: boolean;
    media?: string[];
}

export declare function Reasoning({ children }: ReasoningProps): JSX_2.Element;

export declare function ReasoningContent({ children }: ReasoningContentProps): JSX_2.Element;

declare interface ReasoningContentProps {
    children: ReactNode;
}

declare interface ReasoningProps {
    isStreaming: boolean;
    children: ReactNode;
}

export declare function ReasoningTrigger({ title }: ReasoningTriggerProps): JSX_2.Element;

declare interface ReasoningTriggerProps {
    title: string;
}

export declare interface StreamEvent {
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

export declare interface ToolResult {
    id: string;
    title: string;
    description?: string;
    status?: string;
    created_at: string;
    [key: string]: any;
}

export declare function useChatConnection(apiEndpoint: string, apiKey?: string): {
    messages: Message[];
    isLoading: boolean;
    error: Error | null;
    sendMessage: (content: string) => Promise<void>;
    clearMessages: () => void;
};

export { }
