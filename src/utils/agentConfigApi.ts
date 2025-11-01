import { App } from '../types';

export interface AgentConfiguration {
  promptPath: string;
  versionUuid: string;
  isDefault: boolean;
}

export interface AgentConfigurationResponse {
  success: boolean;
  configuration: AgentConfiguration;
}

export interface AgentConfigurationUpdate {
  promptPath: string;
  versionUuid: string;
  isDefault?: boolean;
}

export interface AgentConfigurationUpdateResponse {
  success: boolean;
  message: string;
  configuration: AgentConfiguration;
}

/**
 * Get agent configuration for a specific app
 */
export async function getAgentConfiguration(
  apiUrl: string,
  app: App,
  authOptions?: {
    userMpAuthToken?: string;
    chatServerKey?: string;
  }
): Promise<AgentConfiguration> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add authentication headers if provided
  if (authOptions?.userMpAuthToken) {
    headers['Authorization'] = `Bearer ${authOptions.userMpAuthToken}`;
  }
  if (authOptions?.chatServerKey) {
    headers['X-Chat-Server-Key'] = authOptions.chatServerKey;
  }

  const response = await fetch(`${apiUrl}/agent-configurations/${app}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to get agent configuration: ${response.statusText}`
    );
  }

  const data: AgentConfigurationResponse = await response.json();
  return data.configuration;
}

/**
 * Update agent configuration for a specific app
 */
export async function updateAgentConfiguration(
  apiUrl: string,
  app: App,
  update: AgentConfigurationUpdate,
  authOptions?: {
    userMpAuthToken?: string;
    chatServerKey?: string;
  }
): Promise<AgentConfiguration> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add authentication headers if provided
  if (authOptions?.userMpAuthToken) {
    headers['Authorization'] = `Bearer ${authOptions.userMpAuthToken}`;
  }
  if (authOptions?.chatServerKey) {
    headers['X-Chat-Server-Key'] = authOptions.chatServerKey;
  }

  const response = await fetch(`${apiUrl}/agent-configurations/${app}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(update),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to update agent configuration: ${response.statusText}`
    );
  }

  const data: AgentConfigurationUpdateResponse = await response.json();
  return data.configuration;
}