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
    tools: {
      create_email: (subject: string, body: string) => {
        console.log('Creating email:', { subject, body });
        return { success: true, emailId: Date.now().toString() };
      },
      update_email: (emailId: string, updates: any) => {
        console.log('Updating email:', emailId, updates);
        return { success: true, emailId };
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
  tools: {
    get_weather: (location: string) => ({ location, temp: 22, condition: 'sunny' }),
    set_reminder: (_message: string, _time: string) => ({ success: true, reminderId: Date.now() }),
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
  tools: {
    search_docs: (query: string) => ({ results: [`Doc about ${query}`, `Guide for ${query}`] }),
    create_ticket: (_title: string, _description: string) => ({ ticketId: Date.now(), status: 'open' }),
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
  tools: {
    escalate_ticket: (_ticketId: string, _reason: string) => ({ success: true, escalated: true }),
    get_user_info: (userId: string) => ({ userId, name: 'John Doe', tier: 'premium' }),
    schedule_callback: (_phoneNumber: string, _preferredTime: string) => ({ scheduled: true, callbackId: Date.now() }),
  },
};