import { default as default_2 } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { MemoExoticComponent } from 'react';
import { ReactNode } from 'react';
import { RefAttributes } from 'react';
import { StoreApi } from 'zustand';
import { UseBoundStore } from 'zustand';

export declare const AnimatedPlaceholder: ({ placeholderTexts, shouldAnimate, className, }: AnimatedPlaceholderProps) => JSX_2.Element;

declare interface AnimatedPlaceholderProps {
    placeholderTexts: string[];
    shouldAnimate: boolean;
    className?: string;
}

export declare const CHAT_STATUS: {
    readonly IDLE: "idle";
    readonly SUBMITTED: "submitted";
    readonly STREAMING: "streaming";
    readonly ERROR: "error";
};

export declare interface ChatConfig {
    mode: ChatMode;
    position?: ChatPosition;
    headerName: string;
    apiEndpoint: string;
    apiKey?: string;
    theme?: ChatTheme;
    headerDescription?: string;
    placeholderTexts?: string[];
    bubbleText?: string;
    constrainedHeight?: boolean;
    headerVisible?: boolean;
    chipName?: string;
    chipLogo?: string;
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
    customStyles?: default_2.CSSProperties;
}

export declare const ChatIcon: default_2.FC<IconProps>;

export declare type ChatMode = "sidebar" | "fullscreen" | "modal" | "embedded";

export declare type ChatPosition = "left" | "right";

export declare interface ChatSlice {
    chatStatus: ChatStatus;
    streamingStatus: StreamingStatus;
    setChatStatus: (status: ChatStatus) => void;
    setStreamingStatus: (status: StreamingStatus) => void;
    resetChatStatus: () => void;
}

export declare type ChatStatus = typeof CHAT_STATUS[keyof typeof CHAT_STATUS];

export declare type ChatTheme = "light" | "dark" | "auto";

export declare const ChatWrapper: MemoExoticComponent<ForwardRefExoticComponent<ChatWrapperProps & RefAttributes<ChatWrapperRef>>>;

export declare interface ChatWrapperProps {
    userMpAuthToken: string;
    chatServerUrl: string;
    chatServerKey: string;
    userId: string;
    entityId?: string;
    entityType?: EntityType;
    config: Omit<ChatConfig, "apiEndpoint">;
    tools?: Tools;
    devMode?: boolean;
    contextHelpers?: ContextHelpers;
}

export declare interface ChatWrapperRef {
    /**
     * Update the entity ID and/or entity type associated with this chat
     * Useful when a conversation starts without an entity, then later gets associated with one
     *
     * @param entityId - The new entity ID to associate
     * @param entityType - Optional: The new entity type (only if it changed)
     *
     * @example
     * ```tsx
     * const chatRef = useRef<ChatWrapperRef>(null);
     *
     * // Later, after user creates/selects an entity
     * chatRef.current?.updateEntityId('brand-123', EntityType.BRAND);
     * ```
     */
    updateEntityId: (entityId: string, entityType?: EntityType) => void;
}

export declare interface ClientTool {
    name: string;
    description: string;
    parameters: ToolParameter[];
}

export declare type ClientTools = ClientTool[];

export declare const CloseIcon: default_2.FC<IconProps>;

export declare const CollapseIcon: default_2.FC<IconProps>;

/**
 * ConnectionNotification - Full overlay notification for connection status
 *
 * Displays a full-screen overlay when connection is lost, blocking interaction
 * until connection is restored or user manually retries.
 *
 * @example
 * ```tsx
 * <ConnectionNotification
 *   isConnected={isConnected}
 *   isReconnecting={isReconnecting}
 *   reconnectAttempt={2}
 *   maxReconnectAttempts={5}
 *   onRetry={() => connectChatClient()}
 * />
 * ```
 */
export declare function ConnectionNotification({ isConnected, isConnecting, isReconnecting, reconnectAttempt, maxReconnectAttempts, onRetry, autoHideDuration, }: ConnectionNotificationProps): JSX_2.Element | null;

export declare interface ConnectionNotificationProps {
    /** Whether the client is connected */
    isConnected: boolean;
    /** Whether initial connection is in progress (fetching ticket) */
    isConnecting?: boolean;
    /** Whether reconnection is in progress */
    isReconnecting?: boolean;
    /** Current reconnection attempt number */
    reconnectAttempt?: number;
    /** Maximum reconnection attempts */
    maxReconnectAttempts?: number;
    /** Callback when user clicks retry */
    onRetry?: () => void;
    /** Auto-hide success messages after this duration (ms) */
    autoHideDuration?: number;
}

declare interface ContextHelpers {
    [key: string]: any;
}

export declare interface ConversationResponse {
    conversationId: string;
    message: string;
}

export declare interface ConversationSlice {
    isLoadingConversation: boolean;
    conversationError: string | null;
    setIsLoadingConversation: (isLoading: boolean) => void;
    setConversationError: (error: string | null) => void;
    clearConversationError: () => void;
}

export declare const CopyIcon: default_2.FC<IconProps>;

export declare const DevSettings: ({ isOpen, onClose, apiUrl, userMpAuthToken, chatServerKey, app, }: DevSettingsProps) => JSX_2.Element | null;

declare interface DevSettingsProps {
    isOpen: boolean;
    onClose: () => void;
    apiUrl: string;
    userMpAuthToken?: string;
    chatServerKey?: string;
    app?: string;
}

export declare interface DevSlice {
    isDevSettingsOpen: boolean;
    setIsDevSettingsOpen: (isOpen: boolean) => void;
    toggleDevSettings: () => void;
}

export declare enum EntityType {
    BRAND = "BRAND",
    ACCOUNT = "ACCOUNT",
    USER = "USER"
}

/**
 * Fetch thread by conversation UUID
 */
export declare function fetchThreadByConvUuid(apiBaseUrl: string, convUuid: string): Promise<Thread>;

/**
 * Fetch messages for a thread
 */
export declare function fetchThreadMessages(apiBaseUrl: string, threadId: string, authOptions?: {
    userMpAuthToken?: string;
    chatServerKey?: string;
}): Promise<{
    messages: Message[];
    providerResId?: string;
}>;

/**
 * Fetch messages for a thread with flexible query parameters (V2)
 *
 * This version allows querying by entityId, userId, or custom metadata
 * instead of requiring a specific threadId. The server will match threads
 * based on the provided query parameters.
 *
 * @param apiBaseUrl - Base URL of the API
 * @param queryParams - Flexible query parameters
 * @param authOptions - Authentication options
 * @returns Messages and optional providerResId
 *
 * @example
 * // Query by entityId and userId
 * const result = await fetchThreadMessagesV2(apiUrl, {
 *   entityId: 'brand_123',
 *   userId: 'user_456'
 * }, authOptions);
 *
 * @example
 * // Query with custom metadata
 * const result = await fetchThreadMessagesV2(apiUrl, {
 *   userId: 'user_456',
 *   metadata: {
 *     orderId: 'order_789',
 *     sessionId: 'session_abc'
 *   }
 * }, authOptions);
 */
export declare function fetchThreadMessagesV2(apiBaseUrl: string, queryParams: {
    userId: string;
    entityId?: string;
    entityType?: string;
    metadata?: Record<string, any>;
}, authOptions?: {
    userMpAuthToken?: string;
    chatServerKey?: string;
}): Promise<{
    messages: Message[];
    providerResId?: string;
    threadId?: string;
}>;

/**
 * Fetch user threads from the API
 */
export declare function fetchUserThreads(apiBaseUrl: string, userId: string, options?: {
    includeArchived?: boolean;
    limit?: number;
}): Promise<Thread[]>;

export declare const FullscreenIcon: default_2.FC<FullscreenIconProps>;

declare interface FullscreenIconProps extends IconProps {
    isFullscreen?: boolean;
}

export declare interface IconProps {
    className?: string;
    onClick?: () => void;
    size?: number;
    color?: string;
}

export declare const InlineLoader: ({ size, fullHeight, }: InlineLoaderProps) => JSX_2.Element;

declare interface InlineLoaderProps {
    size?: number;
    fullHeight?: boolean;
}

export declare const isChatActive: (status: ChatStatus) => boolean;

export declare const isChatError: (status: ChatStatus) => boolean;

export declare const isChatIdle: (status: ChatStatus) => boolean;

export declare const isProcessingActive: (status: ProcessingStatus) => boolean;

export declare const isProcessingComplete: (status: ProcessingStatus) => boolean;

export declare const isProcessingError: (status: ProcessingStatus) => boolean;

export declare interface LayoutSlice {
    isModalOpen: boolean;
    isCollapsed: boolean;
    currentMode: string;
    setIsModalOpen: (isOpen: boolean) => void;
    setIsCollapsed: (isCollapsed: boolean) => void;
    setCurrentMode: (mode: string) => void;
    openModal: () => void;
    closeModal: () => void;
    toggleCollapse: () => void;
    toggleFullscreen: () => void;
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
    providerResId?: string;
}

/**
 * Messages Slice State
 * Manages streaming state and current assistant message tracking
 */
declare interface MessagesSlice {
    isStreaming: boolean;
    isThinking: boolean;
    streamingContent: string;
    isHandlingTool: boolean;
    currentAssistantMessageId: string | null;
    setIsStreaming: (isStreaming: boolean) => void;
    setIsThinking: (isThinking: boolean) => void;
    setStreamingContent: (content: string) => void;
    setIsHandlingTool: (isHandling: boolean) => void;
    setCurrentAssistantMessageId: (id: string | null) => void;
    startStreaming: (assistantMessageId: string) => void;
    stopStreaming: () => void;
    clearStreamingBuffers: () => void;
    resetToolHandling: () => void;
}

export declare const PROCESSING_STATUS: {
    readonly PROCESSING: "processing";
    readonly COMPLETED: "completed";
    readonly ERROR: "error";
};

export declare type ProcessingStatus = typeof PROCESSING_STATUS[keyof typeof PROCESSING_STATUS];

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

export declare const SettingsIcon: default_2.FC<IconProps>;

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

export declare const STREAMING_STATUS: {
    readonly STARTING: "Starting...";
    readonly PROCESSING: "Processing...";
    readonly THINKING: "Thinking...";
    readonly STREAMING: "Streaming response...";
    readonly FINALIZING: "Finalizing...";
    readonly COMPLETED: "Completed";
    readonly ERROR: "Error occurred";
    readonly IDLE: "";
};

export declare type StreamingStatus = typeof STREAMING_STATUS[keyof typeof STREAMING_STATUS];

/**
 * SuggestedPrompts - Displays suggested prompt buttons
 *
 * Uses ChatContext to access prompts and selection handler.
 */
export declare const SuggestedPrompts: React.FC;

export declare interface SVGIconProps extends IconProps {
    width?: number;
    height?: number;
    viewBox?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
}

export declare interface Thread {
    id: string;
    userId: string;
    convUuid: string;
    providerResId?: string;
    title: string;
    agentType: string;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
}

export declare interface ThreadSlice {
    currentThreadId: string | null;
    providerResId: string | null;
    setCurrentThreadId: (threadId: string | null) => void;
    setProviderResId: (providerResId: string | null) => void;
    clearThreadData: () => void;
}

export declare interface ThreadsResponse {
    threads: Thread[];
}

export declare interface Tool extends ToolSchema {
    execute: (params: any) => Promise<any> | any;
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

export declare type Tools = Tool[];

export declare interface ToolSchema {
    name: string;
    description: string;
    parameters: ToolParameter[];
}

export declare type UIStore = LayoutSlice & ChatSlice & ConversationSlice & ThreadSlice & DevSlice & MessagesSlice;

/**
 * Update thread properties (attach to entity, update metadata, tag, etc.)
 *
 * This function allows you to:
 * - Attach a draft thread to an entity (brand/account)
 * - Update thread title, tag, or metadata
 * - Detach thread from entity (set entityId/entityType to null)
 *
 * @param apiBaseUrl - Base URL of the API
 * @param providerResId - Provider resource ID (conversationId) of the thread to update
 * @param updates - Fields to update
 * @param authOptions - Authentication options
 * @returns Updated thread data
 *
 * @example
 * // Attach draft thread to brand
 * const thread = await updateThread(apiUrl, 'conv_abc123', {
 *   entityId: 'brand_456',
 *   entityType: 'BRAND',
 *   tag: 'customer-inquiry',
 *   metadata: { source: 'widget', priority: 'high' }
 * }, authOptions);
 *
 * @example
 * // Update only metadata
 * const thread = await updateThread(apiUrl, 'conv_abc123', {
 *   metadata: { status: 'resolved', assignedTo: 'agent-789' }
 * }, authOptions);
 *
 * @example
 * // Detach from entity
 * const thread = await updateThread(apiUrl, 'conv_abc123', {
 *   entityId: null,
 *   entityType: null
 * }, authOptions);
 */
export declare function updateThread(apiBaseUrl: string, providerResId: string, updates: {
    title?: string;
    tag?: string | null;
    metadata?: any;
    entityId?: string | null;
    entityType?: string | null;
}, authOptions?: {
    userMpAuthToken?: string;
    chatServerKey?: string;
}): Promise<Thread>;

export declare const useChatState: () => {
    chatStatus: ChatStatus;
    streamingStatus: StreamingStatus;
    setChatStatus: (status: ChatStatus) => void;
    setStreamingStatus: (status: StreamingStatus) => void;
    resetChatStatus: () => void;
};

export declare const useConversationState: () => {
    isLoadingConversation: boolean;
    conversationError: string | null;
    setIsLoadingConversation: (isLoading: boolean) => void;
    setConversationError: (error: string | null) => void;
    clearConversationError: () => void;
};

export declare const useDevState: () => {
    isDevSettingsOpen: boolean;
    setIsDevSettingsOpen: (isOpen: boolean) => void;
    toggleDevSettings: () => void;
};

export declare const useLayoutState: () => {
    isModalOpen: boolean;
    isCollapsed: boolean;
    currentMode: string;
    openModal: () => void;
    closeModal: () => void;
    toggleCollapse: () => void;
    toggleFullscreen: () => void;
};

export declare const useThreadState: () => {
    currentThreadId: string | null;
    providerResId: string | null;
    setCurrentThreadId: (threadId: string | null) => void;
    setProviderResId: (providerResId: string | null) => void;
    clearThreadData: () => void;
};

/**
 * Legacy hook for backward compatibility - now uses Zustand store
 * @deprecated Use direct Zustand store hooks instead (useLayoutState, useChatState, etc.)
 */
export declare function useUIState({ initialMode }: UseUIStateProps): {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    isCollapsed: boolean;
    setIsCollapsed: (isCollapsed: boolean) => void;
    currentMode: string;
    setCurrentMode: (mode: string) => void;
    chatStatus: ChatStatus;
    setChatStatus: (status: ChatStatus) => void;
    streamingStatus: StreamingStatus;
    setStreamingStatus: (status: StreamingStatus) => void;
    isLoadingConversation: boolean;
    setIsLoadingConversation: (isLoading: boolean) => void;
    conversationError: string | null;
    setConversationError: (error: string | null) => void;
    currentThreadId: string | null;
    setCurrentThreadId: (threadId: string | null) => void;
    providerResId: string | null;
    setProviderResId: (providerResId: string | null) => void;
    isDevSettingsOpen: boolean;
    setIsDevSettingsOpen: (isOpen: boolean) => void;
    openModal: () => void;
    closeModal: () => void;
    toggleCollapse: () => void;
    toggleFullscreen: () => void;
};

declare interface UseUIStateProps {
    initialMode?: string;
}

export declare const useUIStore: UseBoundStore<Omit<StoreApi<UIStore>, "setState" | "devtools"> & {
setState(partial: UIStore | Partial<UIStore> | ((state: UIStore) => UIStore | Partial<UIStore>), replace?: false | undefined, action?: (string | {
[x: string]: unknown;
[x: number]: unknown;
[x: symbol]: unknown;
type: string;
}) | undefined): void;
setState(state: UIStore | ((state: UIStore) => UIStore), replace: true, action?: (string | {
[x: string]: unknown;
[x: number]: unknown;
[x: symbol]: unknown;
type: string;
}) | undefined): void;
devtools: {
cleanup: () => void;
};
}>;

export { }
