import { 
  SystemEventType, 
  ConnectionEvent, 
  ChatEvent
} from '../types/systemEvents';

export class SystemEventFactory {
  static createConnectionEvent(
    type: SystemEventType.CONNECTION_ESTABLISHED | 
          SystemEventType.CONNECTION_LOST | 
          SystemEventType.CONNECTION_RESTORED | 
          SystemEventType.CONNECTION_FAILED | 
          SystemEventType.RECONNECTING,
    data?: { attempt?: number; maxAttempts?: number; reason?: string }
  ): ConnectionEvent {
    return {
      type,
      timestamp: new Date(),
      data,
    };
  }

  static createChatEvent(
    type: SystemEventType.CHAT_COMPLETED | SystemEventType.CHAT_ERROR,
    data?: { conversationId?: string; error?: string; errorCode?: string }
  ): ChatEvent {
    return {
      type,
      timestamp: new Date(),
      data,
    };
  }


  // Convenience methods for common events
  static connectionEstablished(): ConnectionEvent {
    return this.createConnectionEvent(SystemEventType.CONNECTION_ESTABLISHED);
  }

  static connectionLost(reason?: string): ConnectionEvent {
    return this.createConnectionEvent(SystemEventType.CONNECTION_LOST, { reason });
  }

  static connectionRestored(): ConnectionEvent {
    return this.createConnectionEvent(SystemEventType.CONNECTION_RESTORED);
  }

  static reconnecting(attempt: number, maxAttempts: number): ConnectionEvent {
    return this.createConnectionEvent(SystemEventType.RECONNECTING, { attempt, maxAttempts });
  }

  static chatCompleted(conversationId?: string): ChatEvent {
    return this.createChatEvent(SystemEventType.CHAT_COMPLETED, { conversationId });
  }

  static chatError(error: string, errorCode?: string): ChatEvent {
    return this.createChatEvent(SystemEventType.CHAT_ERROR, { error, errorCode });
  }

}