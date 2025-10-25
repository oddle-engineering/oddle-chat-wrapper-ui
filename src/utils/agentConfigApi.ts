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
  app: App
): Promise<AgentConfiguration> {
  const response = await fetch(`${apiUrl}/agent-configurations/${app}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
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
  update: AgentConfigurationUpdate
): Promise<AgentConfiguration> {
  const response = await fetch(`${apiUrl}/agent-configurations/${app}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
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