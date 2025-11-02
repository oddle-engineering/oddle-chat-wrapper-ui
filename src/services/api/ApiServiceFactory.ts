import { AuthApiService } from './AuthApiService';
import { AgentApiService } from './AgentApiService';
import { ThreadApiService } from './ThreadApiService';

/**
 * Factory for creating API service instances
 * Provides centralized configuration and dependency injection
 */

export interface ApiServiceConfig {
  baseUrl: string;
  timeout?: number;
  retries?: number;
}

export class ApiServiceFactory {
  private static instance: ApiServiceFactory;
  private config: ApiServiceConfig;

  // Service instances (singletons)
  private authService?: AuthApiService;
  private agentService?: AgentApiService;
  private threadService?: ThreadApiService;

  private constructor(config: ApiServiceConfig) {
    this.config = config;
  }

  /**
   * Initialize the factory with configuration
   */
  static initialize(config: ApiServiceConfig): ApiServiceFactory {
    if (!ApiServiceFactory.instance) {
      ApiServiceFactory.instance = new ApiServiceFactory(config);
    }
    return ApiServiceFactory.instance;
  }

  /**
   * Get the factory instance
   */
  static getInstance(): ApiServiceFactory {
    if (!ApiServiceFactory.instance) {
      throw new Error('ApiServiceFactory not initialized. Call initialize() first.');
    }
    return ApiServiceFactory.instance;
  }

  /**
   * Update configuration (useful for switching environments)
   */
  updateConfig(config: Partial<ApiServiceConfig>): void {
    this.config = { ...this.config, ...config };
    // Clear cached services to use new config
    this.authService = undefined;
    this.agentService = undefined;
    this.threadService = undefined;
  }

  /**
   * Get authentication service
   */
  getAuthService(): AuthApiService {
    if (!this.authService) {
      this.authService = new AuthApiService(this.config.baseUrl);
    }
    return this.authService;
  }

  /**
   * Get agent configuration service
   */
  getAgentService(): AgentApiService {
    if (!this.agentService) {
      this.agentService = new AgentApiService(this.config.baseUrl);
    }
    return this.agentService;
  }

  /**
   * Get thread management service
   */
  getThreadService(): ThreadApiService {
    if (!this.threadService) {
      this.threadService = new ThreadApiService(this.config.baseUrl);
    }
    return this.threadService;
  }

  /**
   * Get all services at once
   */
  getAllServices() {
    return {
      auth: this.getAuthService(),
      agent: this.getAgentService(),
      thread: this.getThreadService(),
    };
  }

  /**
   * Reset all services (useful for testing)
   */
  reset(): void {
    this.authService = undefined;
    this.agentService = undefined;
    this.threadService = undefined;
  }
}

/**
 * Convenience functions for accessing services
 * These assume the factory has been initialized
 */

export const getAuthService = (): AuthApiService => {
  return ApiServiceFactory.getInstance().getAuthService();
};

export const getAgentService = (): AgentApiService => {
  return ApiServiceFactory.getInstance().getAgentService();
};

export const getThreadService = (): ThreadApiService => {
  return ApiServiceFactory.getInstance().getThreadService();
};

export const getAllServices = () => {
  return ApiServiceFactory.getInstance().getAllServices();
};

/**
 * Hook-style access for React components
 */
export const useApiServices = () => {
  return getAllServices();
};