// API Configuration for the showcase application

export interface ApiConfig {
  useMockApi: boolean;
  briefPlannerEndpoint: string;
  conversationEndpoint: string;
  baseUrl: string;
}

// Default configuration
const defaultConfig: ApiConfig = {
  useMockApi: false, // Set to false to use real API
  briefPlannerEndpoint: '/api/brief-planner',
  conversationEndpoint: '/api/conversation',
  baseUrl: 'http://localhost:3000', // Change this to your real API base URL
};

// Environment-based configuration
const getApiConfig = (): ApiConfig => {
  // Check for environment variables (Vite uses VITE_ prefix)
  const useMockApi = import.meta.env.VITE_USE_MOCK_API !== 'false';
  const baseUrl = import.meta.env.VITE_API_BASE_URL || defaultConfig.baseUrl;
  const briefPlannerEndpoint = import.meta.env.VITE_BRIEF_PLANNER_ENDPOINT || defaultConfig.briefPlannerEndpoint;
  const conversationEndpoint = import.meta.env.VITE_CONVERSATION_ENDPOINT || defaultConfig.conversationEndpoint;

  return {
    useMockApi,
    baseUrl,
    briefPlannerEndpoint,
    conversationEndpoint,
  };
};

export const apiConfig = getApiConfig();

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
    mode: apiConfig.useMockApi ? 'Mock API' : 'Real API',
    baseUrl: apiConfig.baseUrl,
    briefPlannerUrl: getBriefPlannerUrl(),
    conversationInitUrl: getConversationInitUrl(),
  };
};