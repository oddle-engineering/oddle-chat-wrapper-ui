// Import CSS to ensure it's bundled
import './styles/chat-wrapper.css';

export { ChatWrapper } from './components/ChatWrapper';
export { Reasoning, ReasoningTrigger, ReasoningContent } from './components/Reasoning';
export { Loader } from './components/Loader';
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
  ToolResult
} from './types';