import { default as default_2 } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { MemoExoticComponent } from 'react';
import { ReactNode } from 'react';

export declare const AnimatedPlaceholder: ({ placeholderTexts, shouldAnimate, className, }: AnimatedPlaceholderProps) => JSX_2.Element;

declare interface AnimatedPlaceholderProps {
    placeholderTexts: string[];
    shouldAnimate: boolean;
    className?: string;
}

export declare type App = "UD21" | "Host" | "Reserve";

export declare interface ChatConfig {
    mode: ChatMode;
    position?: ChatPosition;
    appName: string;
    apiEndpoint: string;
    apiKey?: string;
    theme?: ChatTheme;
    description?: string;
    placeholder?: string;
    placeholderTexts?: string[];
    welcomeMessage?: string;
    promptPath?: string;
    bubbleText?: string;
    constrainedHeight?: boolean;
    headerVisible?: boolean;
    restaurantName?: string;
    restaurantLogo?: string;
    suggestedPrompts?: Array<{
        title: string;
        description: string;
        icon?: default_2.ReactNode;
    }>;
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
    customStyles?: default_2.CSSProperties;
    endpoint?: "brief-planner" | "conversation";
}

export declare type ChatMode = "sidebar" | "fullscreen" | "modal" | "embedded";

export declare type ChatPosition = "left" | "right";

export declare type ChatStatus = "idle" | "submitted" | "streaming" | "error";

export declare type ChatTheme = "light" | "dark" | "auto";

export declare const ChatWrapper: MemoExoticComponent<typeof ChatWrapper_2>;

declare function ChatWrapper_2({ apiUrl, config, tools, clientTools, initialMessages, userId, devMode, app, contextHelpers, }: ChatWrapperProps): JSX_2.Element | null;

export declare interface ChatWrapperProps {
    apiUrl: string;
    config: Omit<ChatConfig, "apiEndpoint">;
    tools?: Record<string, (...args: any[]) => any>;
    clientTools?: ClientTools;
    initialMessages?: Message[];
    userId?: string;
    devMode?: boolean;
    app: App;
    contextHelpers?: ContextHelpers;
}

export declare interface ClientTool {
    name: string;
    description: string;
    parameters: ToolParameter[];
}

export declare type ClientTools = ClientTool[];

declare interface ContextHelpers {
    [key: string]: any;
}

export declare interface ConversationResponse {
    conversationId: string;
    message: string;
}

/**
 * Create a new thread
 */
export declare function createThread(apiBaseUrl: string, userId: string, convUuid: string, options?: {
    title?: string;
    agentType?: string;
}): Promise<Thread>;

export declare const DevSettings: ({ isOpen, onClose, app, apiUrl, }: DevSettingsProps) => JSX_2.Element | null;

declare interface DevSettingsProps {
    isOpen: boolean;
    onClose: () => void;
    app: App;
    apiUrl: string;
}

/**
 * Fetch messages by conversation UUID
 */
export declare function fetchMessagesByConvUuid(apiBaseUrl: string, convUuid: string): Promise<Message[]>;

/**
 * Fetch thread by conversation UUID
 */
export declare function fetchThreadByConvUuid(apiBaseUrl: string, convUuid: string): Promise<Thread>;

/**
 * Fetch messages for a thread
 */
export declare function fetchThreadMessages(apiBaseUrl: string, threadId: string): Promise<Message[]>;

/**
 * Fetch user threads from the API
 */
export declare function fetchUserThreads(apiBaseUrl: string, userId: string, options?: {
    includeArchived?: boolean;
    limit?: number;
}): Promise<Thread[]>;

export declare const InlineLoader: ({ size, fullHeight, }: InlineLoaderProps) => JSX_2.Element;

declare interface InlineLoaderProps {
    size?: number;
    fullHeight?: boolean;
}

export declare function Loader({ size, variant }: LoaderProps): JSX_2.Element;

declare interface LoaderProps {
    size?: number;
    variant?: 'dots' | 'pulse' | 'spinner';
}

export declare interface Message {
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

export declare interface MessagesResponse {
    messages: Message[];
}

export declare const PromptInput: ({ className, ...props }: PromptInputProps) => JSX_2.Element;

export declare const PromptInputButton: ({ variant, size, className, children, ...props }: PromptInputButtonProps) => JSX_2.Element;

declare interface PromptInputButtonProps extends default_2.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "ghost" | "outline";
    size?: "default" | "icon" | "sm" | "lg";
}

export declare const PromptInputModelSelect: ({ className, children, ...props }: PromptInputModelSelectProps) => JSX_2.Element;

export declare const PromptInputModelSelectContent: ({ className, ...props }: PromptInputModelSelectContentProps) => JSX_2.Element;

declare interface PromptInputModelSelectContentProps extends default_2.HTMLAttributes<HTMLDivElement> {
}

export declare const PromptInputModelSelectItem: ({ className, value, ...props }: PromptInputModelSelectItemProps) => JSX_2.Element;

declare interface PromptInputModelSelectItemProps extends default_2.HTMLAttributes<HTMLDivElement> {
    value: string;
}

declare interface PromptInputModelSelectProps extends default_2.SelectHTMLAttributes<HTMLSelectElement> {
}

export declare const PromptInputModelSelectTrigger: ({ className, children, ...props }: PromptInputModelSelectTriggerProps) => JSX_2.Element;

declare interface PromptInputModelSelectTriggerProps extends default_2.ButtonHTMLAttributes<HTMLButtonElement> {
}

export declare const PromptInputModelSelectValue: ({ className, placeholder, ...props }: PromptInputModelSelectValueProps) => JSX_2.Element;

declare interface PromptInputModelSelectValueProps extends default_2.HTMLAttributes<HTMLSpanElement> {
    placeholder?: string;
}

declare interface PromptInputProps extends default_2.HTMLAttributes<HTMLFormElement> {
}

export declare const PromptInputSubmit: ({ className, variant, size, status, children, disabled, ...props }: PromptInputSubmitProps) => JSX_2.Element;

declare interface PromptInputSubmitProps extends default_2.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "ghost" | "outline";
    size?: "default" | "icon" | "sm" | "lg";
    status?: ChatStatus;
}

export declare const PromptInputTextarea: default_2.ForwardRefExoticComponent<PromptInputTextareaProps & default_2.RefAttributes<HTMLTextAreaElement>>;

declare interface PromptInputTextareaProps extends default_2.TextareaHTMLAttributes<HTMLTextAreaElement> {
    minHeight?: number;
    maxHeight?: number;
}

export declare const PromptInputToolbar: ({ className, ...props }: PromptInputToolbarProps) => JSX_2.Element;

declare interface PromptInputToolbarProps extends default_2.HTMLAttributes<HTMLDivElement> {
}

export declare const PromptInputTools: ({ className, ...props }: PromptInputToolsProps) => JSX_2.Element;

declare interface PromptInputToolsProps extends default_2.HTMLAttributes<HTMLDivElement> {
}

export declare function Reasoning({ children, isStreaming }: ReasoningProps): JSX_2.Element;

export declare function ReasoningContent({ children, isVisible, }: ReasoningContentProps): JSX_2.Element | null;

declare interface ReasoningContentProps {
    children: ReactNode;
    isVisible?: boolean;
}

declare interface ReasoningProps {
    isStreaming: boolean;
    children: ReactNode;
}

export declare function ReasoningTrigger({ title, status, duration, onToggle, isExpanded, }: ReasoningTriggerProps): JSX_2.Element;

declare interface ReasoningTriggerProps {
    title: string;
    status?: "processing" | "completed" | "error";
    duration?: string;
    onToggle?: () => void;
    isExpanded?: boolean;
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
    parameters?: any[] | Record<string, any> | any;
    todos?: any[];
    briefs?: any[];
}

declare interface SuggestedPrompt {
    title: string;
    description: string;
}

export declare const SuggestedPrompts: default_2.FC<SuggestedPromptsProps>;

declare interface SuggestedPromptsProps {
    prompts: SuggestedPrompt[];
    onPromptSelect: (prompt: SuggestedPrompt) => void;
}

export declare interface Thread {
    id: string;
    userId: string;
    convUuid: string;
    title: string;
    agentType: string;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
}

export declare interface ThreadsResponse {
    threads: Thread[];
}

export declare interface ToolParameter {
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
