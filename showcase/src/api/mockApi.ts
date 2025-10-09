// Mock API implementation for testing the chat wrapper
import { mockLatitudeAPI } from './mockLatitudeApi';
import { apiConfig } from '../config/apiConfig';

export interface MockMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

class MockChatAPI {
  private conversations: Map<string, MockMessage[]> = new Map();
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  async initConversation(): Promise<{ conversationId: string }> {
    await this.delay(200);
    const conversationId = this.generateId();
    this.conversations.set(conversationId, []);
    return { conversationId };
  }

  async sendMessage(conversationId: string, message: string): Promise<Response> {
    await this.delay(300);

    const conversation = this.conversations.get(conversationId) || [];
    conversation.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    // Generate a mock response
    const responses = [
      "That's an interesting question! Let me help you with that.",
      "I understand what you're asking. Here's what I think:",
      "Great question! Based on what you've told me:",
      "I can definitely help with that. Here's my suggestion:",
      "That's a common concern. Let me explain:",
      "I see what you mean. Here's how I'd approach this:",
      "Thanks for asking! Here's what I recommend:",
      "Good point! Let me break this down for you:",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const fullResponse = `${randomResponse}\n\nYou asked: "${message}"\n\nThis is a mock response demonstrating the chat functionality. In a real implementation, this would be connected to your actual AI or chat backend.\n\n🤖 This message is being streamed to simulate real-time responses!`;

    // Create a ReadableStream to simulate streaming response
    const stream = new ReadableStream({
      start(controller) {
        const words = fullResponse.split(' ');
        let index = 0;

        const pushWord = () => {
          if (index < words.length) {
            const chunk = index === 0 ? words[index] : ' ' + words[index];
            const sseData = `data: ${JSON.stringify({ content: chunk })}\n\n`;
            controller.enqueue(new TextEncoder().encode(sseData));
            index++;
            setTimeout(pushWord, 50 + Math.random() * 100); // Random delay between words
          } else {
            controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
            controller.close();
          }
        };

        setTimeout(pushWord, 500); // Initial delay
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }

  // New method to handle brief-planner requests using the Latitude mock
  async sendBriefPlannerMessage(requestData: any): Promise<Response> {
    return await mockLatitudeAPI.handleBriefPlannerRequest(requestData);
  }
}

const mockAPI = new MockChatAPI();

// Mock fetch function to intercept API calls (only when mock API is enabled)
export function setupMockAPI(_baseUrl?: string) {
  // Only setup mock if configured to use it
  if (!apiConfig.useMockApi) {
    console.log('Mock API disabled - using real API endpoints');
    return () => {}; // Return empty cleanup function
  }

  console.log('Setting up Mock API for showcase');
  const originalFetch = window.fetch;

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input.toString();
    
    // Intercept brief-planner requests (legacy endpoint for backward compatibility)
    if (url.includes('/api/brief-planner') && init?.method === 'POST') {
      console.log('Mock API: Intercepting brief-planner request (legacy)');
      const requestData = init.body ? JSON.parse(init.body as string) : {};
      return await mockAPI.sendBriefPlannerMessage(requestData);
    }
    
    // Intercept conversation init
    if (url.includes('/api/conversation/init') && init?.method === 'POST') {
      console.log('Mock API: Intercepting conversation init');
      const requestData = init.body ? JSON.parse(init.body as string) : {};
      
      // If the request includes brief planner tools, use the Latitude mock
      if (requestData.tools && requestData.tools.includes('create_brief')) {
        console.log('Mock API: Using brief planner functionality for conversation init');
        return await mockAPI.sendBriefPlannerMessage(requestData);
      }
      
      // Otherwise use standard conversation init
      const data = await mockAPI.initConversation();
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Intercept message sending
    if (url.includes('/api/conversation/') && init?.method === 'POST' && !url.includes('/init')) {
      console.log('Mock API: Intercepting conversation message');
      const conversationId = url.split('/').pop();
      const body = init.body ? JSON.parse(init.body as string) : {};
      
      if (conversationId && body.message) {
        return await mockAPI.sendMessage(conversationId, body.message);
      }
    }

    // Fallback to original fetch for other requests
    return originalFetch(input, init);
  };

  return () => {
    window.fetch = originalFetch;
  };
}