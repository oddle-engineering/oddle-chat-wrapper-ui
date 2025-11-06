// Import CSS to ensure it's bundled
import './styles/chat-wrapper.css';

export { ChatWrapper } from './components/ChatWrapper';
export { ConnectionNotification } from './components/ConnectionNotification';
export type { ConnectionNotificationProps } from './components/ConnectionNotification';
export { Reasoning, ReasoningTrigger, ReasoningContent } from './components/Reasoning';
export { Loader } from './components/Loader';
export { InlineLoader } from './components/InlineLoader';
export { SuggestedPrompts } from './components/SuggestedPrompts';
export { AnimatedPlaceholder } from './components/AnimatedPlaceholder';
export { DevSettings } from './components/DevSettings';
export { 
  ChatIcon, 
  CloseIcon, 
  FullscreenIcon, 
  CollapseIcon, 
  SettingsIcon,
  CopyIcon 
} from './components/icons';
export { 
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputModelSelect,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectValue
} from './components/PromptInput';
export {
  fetchUserThreads,
  fetchThreadByConvUuid,
  fetchThreadMessages,
  fetchMessagesByConvUuid,
  createThread
} from './utils/threadApi';
export type {
  ChatConfig,
  ChatWrapperProps,
  Message,
  ChatMode,
  ChatTheme,
  ChatPosition,
  ConversationResponse,
  StreamEvent,
  ToolResult,
  ToolParameter,
  ToolSchema,
  Tool,
  Tools,
  ClientTool,
  ClientTools,
  Thread,
  ThreadsResponse,
  MessagesResponse
} from './types';
export { EntityType } from './types';
export type { ChatStatus, StreamingStatus, ProcessingStatus } from './constants/chatStatus';
export { 
  CHAT_STATUS, 
  STREAMING_STATUS, 
  PROCESSING_STATUS,
  isChatActive,
  isChatIdle,
  isChatError,
  isProcessingActive,
  isProcessingComplete,
  isProcessingError
} from './constants/chatStatus';
export type { IconProps, SVGIconProps } from './components/icons';