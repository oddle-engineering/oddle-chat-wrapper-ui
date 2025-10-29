import { ChatEventHandlers } from '../types';

/**
 * Base interface for handlers that can receive event handler updates
 */
export interface HandlerUpdateable {
  updateEventHandlers(handlers: Partial<ChatEventHandlers>): void;
}

/**
 * Base class for handlers with common functionality
 */
export abstract class BaseHandler implements HandlerUpdateable {
  protected handlers: Partial<ChatEventHandlers> = {};

  constructor(handlers: Partial<ChatEventHandlers> = {}) {
    this.handlers = handlers;
  }

  updateEventHandlers(handlers: Partial<ChatEventHandlers>): void {
    Object.assign(this.handlers, handlers);
    this.onHandlersUpdated(handlers);
  }

  /**
   * Hook for subclasses to react to handler updates
   */
  protected onHandlersUpdated(_handlers: Partial<ChatEventHandlers>): void {
    // Override in subclasses if needed
  }

  protected getHandler<K extends keyof ChatEventHandlers>(
    key: K
  ): ChatEventHandlers[K] | undefined {
    return this.handlers[key];
  }
}