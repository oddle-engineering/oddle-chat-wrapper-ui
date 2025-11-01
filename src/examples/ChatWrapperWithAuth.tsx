import React from 'react';
import { 
  ChatWrapper, 
  App, 
  EntityType
} from '../index';

// Example component showing how to use ChatWrapper with required authentication props
export const ChatWrapperWithAuth: React.FC = () => {
  // REQUIRED: Authentication and server configuration
  const userMpAuthToken = "your-mp-auth-token-here"; // Authorization header + WebSocket auth
  const chatServerUrl = "wss://your-chat-server.com"; // WebSocket + HTTP endpoint
  const chatServerKey = "your-chat-server-key"; // App identification (UD21, Host, Reserve)
  const userId = "user-123"; // User identification
  
  // OPTIONAL: Entity and conversation configuration
  const providerResId = ""; // If empty => generate conversation based on EntityType + entityId
  const entityId = "brand-456"; // Either brandId or accountId
  const entityType = EntityType.BRAND; // BRAND, ACCOUNT, or USER
  
  // REQUIRED: App identification
  const app = App.UD21; // UD21, Host, or Reserve

  return (
    <div style={{ padding: '20px' }}>
      <h2>ChatWrapper with Individual Authentication Props</h2>
      
      {/* Status Display */}
      <div style={{ marginBottom: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '5px' }}>
        <h3>Configuration:</h3>
        <p><strong>Server URL:</strong> {chatServerUrl}</p>
        <p><strong>User ID:</strong> {userId}</p>
        <p><strong>Entity:</strong> {entityType} - {entityId}</p>
        <p><strong>App:</strong> {app}</p>
        <p><strong>Provider Resource ID:</strong> {providerResId || "Auto-generate"}</p>
      </div>

      {/* Authentication Configuration Info */}
      <div style={{ marginBottom: '20px', padding: '10px', background: '#e8f4fd', borderRadius: '5px' }}>
        <h3>🔐 Required Authentication Props:</h3>
        <ul>
          <li><strong>userMpAuthToken:</strong> Required - Used in Authorization header for HTTP requests and WebSocket initialization</li>
          <li><strong>chatServerUrl:</strong> Required - Single endpoint for both WebSocket and HTTP connections</li>
          <li><strong>chatServerKey:</strong> Required - Server can detect which app is using the chat server (UD21, Host, Reserve)</li>
          <li><strong>userId:</strong> Required - User identification</li>
          <li><strong>providerResId:</strong> Optional - If empty, generates conversation based on EntityType + entityId</li>
          <li><strong>entityType & entityId:</strong> Optional - Used for conversation generation (BRAND, ACCOUNT, USER)</li>
        </ul>
      </div>

      {/* ChatWrapper with individual props */}
      <ChatWrapper
        // Authentication and server configuration
        userMpAuthToken={userMpAuthToken}
        chatServerUrl={chatServerUrl}
        chatServerKey={chatServerKey}
        
        // Entity and conversation configuration
        providerResId={providerResId}
        userId={userId}
        entityId={entityId}
        entityType={entityType}
        
        // App identification
        app={app}
        
        // Chat configuration
        config={{
          mode: "embedded",
          appName: "Authenticated Chat",
          description: "Chat with individual authentication props",
          placeholder: "Start typing with authentication...",
          
          onStreamingStatusChange: (status) => {
            console.log('Streaming status changed:', status);
          },
          
          onError: (error: Error) => {
            console.error('Chat error with auth context:', {
              error: error.message,
              userId,
              entityType,
              entityId
            });
          },
          
          onMessage: (message) => {
            console.log('Message with auth context:', {
              message,
              userId,
              entityType
            });
          }
        }}
        
        // Optional props
        initialMessages={[]}
        devMode={false}
      />
      
      <div style={{ marginTop: '20px', padding: '10px', background: '#fff3cd', borderRadius: '5px' }}>
        <h4>💡 Clean ChatServerUrl Implementation:</h4>
        <ul>
          <li><strong>Single Source:</strong> Only chatServerUrl is used - no more apiUrl confusion</li>
          <li><strong>Required Props:</strong> All authentication props are now required for security</li>
          <li><strong>Type Safety:</strong> Strong TypeScript typing prevents missing authentication</li>
          <li><strong>Simplified API:</strong> Cleaner interface with no legacy props</li>
          <li><strong>Consistent Endpoint:</strong> Same URL for both WebSocket and HTTP requests</li>
          <li><strong>Early Validation:</strong> Clear error messages if required props are missing</li>
        </ul>
        
        <h4>⚠️ Error Prevention:</h4>
        <p>If you see "Cannot read properties of undefined (reading 'replace')", make sure all required props are provided:</p>
        <ul>
          <li><code>userMpAuthToken</code> - Your authentication token</li>
          <li><code>chatServerUrl</code> - Your WebSocket server URL (e.g., "wss://your-server.com")</li>
          <li><code>chatServerKey</code> - Your server identification key</li>
          <li><code>userId</code> - User identification string</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatWrapperWithAuth;