export class ChatAPI {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    return headers;
  }

  async initConversation(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/conversation/init`, {
      method: 'POST',
      headers: this.getHeaders(),
    });
    
    if (!response.ok) throw new Error('Failed to initialize conversation');
    
    const data = await response.json();
    return data.conversationId;
  }

  async *streamMessage(
    conversationId: string,
    message: string
  ): AsyncGenerator<string, void, unknown> {
    const response = await fetch(
      `${this.baseUrl}/api/conversation/${conversationId}`,
      {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ message }),
      }
    );

    if (!response.ok) throw new Error('Failed to send message');
    if (!response.body) throw new Error('No response body');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') return;
          try {
            const parsed = JSON.parse(data);
            yield parsed.content || '';
          } catch (e) {
            console.error('Failed to parse chunk:', e);
          }
        }
      }
    }
  }
}