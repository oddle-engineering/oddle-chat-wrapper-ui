import { ChatWrapper, ChatWrapperProps } from '../index';

// Example usage of the ChatWrapper component
export function ExampleUsage() {
  const chatConfig: ChatWrapperProps = {
    apiUrl: 'https://your-api-server.com', // Your API server URL
    config: {
      mode: 'sidebar',
      position: 'right',
      appName: 'Customer Support',
      theme: 'light',
      placeholder: 'How can we help you today?',
      welcomeMessage: 'Hello! Welcome to our support chat.',
      features: {
        fileUpload: true,
        messageHistory: true,
        exportChat: false,
      },
      onMessage: (message) => {
        console.log('New message:', message);
      },
      onError: (error) => {
        console.error('Chat error:', error);
      },
      customStyles: {
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
    },
  };

  return <ChatWrapper {...chatConfig} />;
}

// Example configuration objects for different use cases
export const modalConfig: ChatWrapperProps = {
  apiUrl: 'https://api.example.com',
  config: {
    mode: 'modal',
    appName: 'AI Assistant',
    theme: 'dark',
    placeholder: 'Ask me anything...',
  },
};

export const embeddedConfig: ChatWrapperProps = {
  apiUrl: 'https://chat-api.example.com',
  config: {
    mode: 'embedded',
    appName: 'Help Center',
    theme: 'auto',
    placeholder: 'Search or ask a question...',
    features: {
      fileUpload: true,
      voiceInput: false,
      messageHistory: true,
      exportChat: true,
    },
  },
};

export const fullscreenConfig: ChatWrapperProps = {
  apiUrl: 'https://support.example.com/api',
  config: {
    mode: 'fullscreen',
    appName: 'Premium Support',
    theme: 'light',
    apiKey: 'your-api-key-here',
    customStyles: {
      fontFamily: 'Inter, sans-serif',
    },
  },
};