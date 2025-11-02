import { BaseApiService, AuthOptions } from './BaseApiService';

/**
 * Agent configuration management service
 */

export interface AgentConfiguration {
  app: string;
  promptPath: string;
  versionUuid: string;
  isDefault: boolean;
}

export interface AgentConfigurationUpdate {
  app: string;
  promptPath: string;
  versionUuid: string;
  isDefault?: boolean;
}

export interface AgentConfigurationResponse {
  success: boolean;
  configurations: AgentConfiguration[];
}

export interface AgentConfigurationUpdateResponse {
  success: boolean;
  message: string;
  configuration: AgentConfiguration;
}

export class AgentApiService extends BaseApiService {
  /**
   * Get all agent configurations
   */
  async getConfigurations(authOptions?: AuthOptions): Promise<AgentConfiguration[]> {
    const response = await this.get<AgentConfigurationResponse>(
      '/api/agent-configurations',
      authOptions
    );
    return response.configurations;
  }

  /**
   * Get agent configuration for a specific app
   */
  async getConfiguration(app: string, authOptions?: AuthOptions): Promise<AgentConfiguration | null> {
    const configurations = await this.getConfigurations(authOptions);
    return configurations.find(config => config.app === app) || null;
  }

  /**
   * Update agent configuration for a specific app
   */
  async updateConfiguration(
    update: AgentConfigurationUpdate,
    authOptions?: AuthOptions
  ): Promise<AgentConfiguration> {
    const response = await this.put<AgentConfigurationUpdateResponse>(
      '/api/agent-configurations',
      update,
      authOptions
    );
    return response.configuration;
  }

  /**
   * Get configuration by app with caching (useful for frequent access)
   */
  private configCache = new Map<string, { data: AgentConfiguration; timestamp: number }>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  async getConfigurationCached(app: string, authOptions?: AuthOptions): Promise<AgentConfiguration | null> {
    const cacheKey = `${app}_${authOptions?.userMpAuthToken || 'anonymous'}`;
    const cached = this.configCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.CACHE_TTL) {
      console.log(`Returning cached configuration for app: ${app}`);
      return cached.data;
    }

    const config = await this.getConfiguration(app, authOptions);
    
    if (config) {
      this.configCache.set(cacheKey, {
        data: config,
        timestamp: Date.now()
      });
    }

    return config;
  }

  /**
   * Clear configuration cache
   */
  clearCache(): void {
    this.configCache.clear();
  }

  /**
   * Clear cache for specific app
   */
  clearCacheForApp(app: string): void {
    const keysToDelete = Array.from(this.configCache.keys()).filter(key => key.startsWith(`${app}_`));
    keysToDelete.forEach(key => this.configCache.delete(key));
  }
}