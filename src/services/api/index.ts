/**
 * API Services - Centralized service layer for all API interactions
 * 
 * Usage:
 * 1. Initialize the factory in your app:
 *    ApiServiceFactory.initialize({ baseUrl: 'https://api.example.com' });
 * 
 * 2. Use services in components:
 *    const { auth, agent, thread } = useApiServices();
 *    const tickets = await auth.requestWebSocketTicket(...);
 * 
 * 3. Or access directly:
 *    const authService = getAuthService();
 *    const ticket = await authService.requestWebSocketTicket(...);
 */

// Base service and types
export { BaseApiService, ApiError } from './BaseApiService';
export type { ApiRequestConfig, AuthOptions, ApiResponse } from './BaseApiService';

// Specific services
export { AuthApiService } from './AuthApiService';
export type { 
  WebSocketTicketRequest, 
  WebSocketTicketResponse 
} from './AuthApiService';

export { AgentApiService } from './AgentApiService';
export type {
  AgentConfiguration,
  AgentConfigurationUpdate,
  AgentConfigurationResponse,
  AgentConfigurationUpdateResponse
} from './AgentApiService';

export { ThreadApiService } from './ThreadApiService';
export type {
  Thread,
  Message,
  ThreadsResponse,
  MessagesResponse,
  CreateThreadRequest,
  FetchThreadsOptions
} from './ThreadApiService';

// Factory and convenience functions
export { ApiServiceFactory } from './ApiServiceFactory';
export type { ApiServiceConfig } from './ApiServiceFactory';
export {
  getAuthService,
  getAgentService,
  getThreadService,
  getAllServices,
  useApiServices
} from './ApiServiceFactory';

// Individual exports are sufficient - no need for convenience object
// Usage: import { getAuthService, AuthApiService } from './services/api';