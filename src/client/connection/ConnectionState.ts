import { ConnectionState as IConnectionState } from '../types';

export class ConnectionState {
  private state: IConnectionState;

  constructor() {
    this.state = {
      isConnected: false,
      isReconnecting: false,
      reconnectAttempts: 0,
      reconnectDelay: 1000,
    };
  }

  update(updates: Partial<IConnectionState>): void {
    Object.assign(this.state, updates);
  }

  get isConnected(): boolean {
    return this.state.isConnected;
  }

  get isReconnecting(): boolean {
    return this.state.isReconnecting;
  }

  get reconnectAttempts(): number {
    return this.state.reconnectAttempts;
  }

  get reconnectDelay(): number {
    return this.state.reconnectDelay;
  }

  setConnected(connected: boolean): void {
    this.state.isConnected = connected;
  }

  setReconnecting(reconnecting: boolean): void {
    this.state.isReconnecting = reconnecting;
  }

  incrementReconnectAttempts(): void {
    this.state.reconnectAttempts++;
  }

  resetReconnectAttempts(): void {
    this.state.reconnectAttempts = 0;
  }

  updateReconnectDelay(delay: number): void {
    this.state.reconnectDelay = delay;
  }

  reset(): void {
    this.state = {
      isConnected: false,
      isReconnecting: false,
      reconnectAttempts: 0,
      reconnectDelay: 1000,
    };
  }

  getSnapshot(): IConnectionState {
    return { ...this.state };
  }
}