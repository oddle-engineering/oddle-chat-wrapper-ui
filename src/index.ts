// Import CSS to ensure it's bundled
import './styles/chat-wrapper.css';

export { ChatWrapper } from './components/ChatWrapper';
export { useChatConnection } from './hooks/useChatConnection';
export type { 
  ChatConfig, 
  ChatWrapperProps,
  Message, 
  ChatMode, 
  ChatTheme,
  ChatPosition,
  ConversationResponse 
} from './types';