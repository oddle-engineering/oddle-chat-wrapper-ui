import { JSX as JSX_2 } from 'react/jsx-runtime';

export declare interface ChatConfig {
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

export declare type ChatMode = 'sidebar' | 'fullscreen' | 'modal' | 'embedded';

export declare type ChatPosition = 'left' | 'right';

export declare type ChatTheme = 'light' | 'dark' | 'auto';

export declare function ChatWrapper({ apiUrl, config, tools }: ChatWrapperProps): JSX_2.Element;

export declare interface ChatWrapperProps {
    apiUrl: string;
    config: Omit<ChatConfig, 'apiEndpoint'>;
    tools?: Record<string, (...args: any[]) => any>;
}

export declare interface ConversationResponse {
    conversationId: string;
    message: string;
}

export declare interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    isStreaming?: boolean;
}

export declare function useChatConnection(apiEndpoint: string, apiKey?: string): {
    messages: Message[];
    isLoading: boolean;
    error: Error | null;
    sendMessage: (content: string) => Promise<void>;
    clearMessages: () => void;
};

export { }
