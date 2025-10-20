// Import CSS to ensure it's bundled
import './styles/chat-wrapper.css';

export { ChatWrapper } from './components/ChatWrapper';
export { Reasoning, ReasoningTrigger, ReasoningContent } from './components/Reasoning';
export { Loader } from './components/Loader';
export { SuggestedPrompts } from './components/SuggestedPrompts';
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
export { useChatConnection } from './hooks/useChatConnection';
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
  ClientTool,
  ClientTools
} from './types';
export type { ChatStatus } from './components/PromptInput';