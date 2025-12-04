// API Configuration for the showcase application

export interface ApiConfig {
  briefPlannerEndpoint: string; // Legacy endpoint for backward compatibility
  conversationEndpoint: string; // Default endpoint now used for all demos
  baseUrl: string;
}

// Default configuration
const defaultConfig: ApiConfig = {
  briefPlannerEndpoint: '/api/v1/brief-planner',
  conversationEndpoint: '/api/v1/conversation',
  baseUrl: 'http://localhost:3000', // Change this to your real API base URL
};

export const apiConfig: ApiConfig = defaultConfig;

// Helper functions
export const getFullUrl = (endpoint: string): string => {
  // If endpoint already includes protocol, use as-is
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  
  // Otherwise, combine with base URL
  return `${apiConfig.baseUrl}${endpoint}`;
};

export const getBriefPlannerUrl = (): string => {
  return getFullUrl(apiConfig.briefPlannerEndpoint);
};

export const getConversationInitUrl = (): string => {
  return getFullUrl(`${apiConfig.conversationEndpoint}/init`);
};

export const getConversationUrl = (conversationId: string): string => {
  return getFullUrl(`${apiConfig.conversationEndpoint}/${conversationId}`);
};

// Configuration display for debugging
export const getConfigSummary = () => {
  return {
    baseUrl: apiConfig.baseUrl,
    briefPlannerUrl: getBriefPlannerUrl(),
    conversationInitUrl: getConversationInitUrl(),
  };
};