import { useState, useEffect, useRef } from 'react';
import { getBriefPlannerUrl, apiConfig, getConfigSummary } from '../config/apiConfig';

interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

interface Brief {
  id: string;
  title: string;
  markdown: string;
  created_at: string;
  word_count: number;
  character_count: number;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export function BriefPlannerDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your Middle Child Bar Brief Planner, powered by Latitude.so. I have comprehensive knowledge about Middle Child Bar's brand, menu, history, and identity.

I can help you create:
- Marketing briefs and strategies
- Campaign planning documents  
- Brand positioning materials
- Task organization and management

What would you like me to help you plan for Middle Child Bar today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [conversationUuid, setConversationUuid] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [streamingStatus, setStreamingStatus] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [reasoningContent, setReasoningContent] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentAssistantMessageIdRef = useRef<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const updateAssistantMessage = (updateFn: (msg: Message) => Message) => {
    const currentId = currentAssistantMessageIdRef.current;
    if (currentId) {
      setMessages(prev => prev.map(msg => 
        msg.id === currentId ? updateFn(msg) : msg
      ));
    }
  };

  const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);
    setStreamingStatus('Starting...');

    // Create assistant message placeholder
    const assistantMessageId = generateId();
    currentAssistantMessageIdRef.current = assistantMessageId;
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    };
    setMessages(prev => [...prev, assistantMessage]);

    try {
      const response = await fetch(getBriefPlannerUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          promptPath: 'briefPlanner',
          conversationUuid,
          todos,
          briefs,
          media: [],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body reader available');
      }

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          console.log('Stream completed');
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonData = line.slice(6).trim();

            if (jsonData === '[DONE]' || jsonData === '') {
              continue;
            }

            try {
              const event = JSON.parse(jsonData);
              console.log('Received event:', event.type, event);

              switch (event.type) {
                case 'event':
                  if (event.event === 'latitude-event') {
                    if (event.data?.type === 'chain-started') {
                      setStreamingStatus('Planning chain started');
                      setIsThinking(true);
                      setReasoningContent('🔗 Starting comprehensive brief planning chain...');
                    } else if (event.data?.type === 'step-started') {
                      setStreamingStatus('Planning step started');
                      setIsThinking(true);
                      setReasoningContent('📊 Executing planning step... Processing your requirements and generating recommendations...');
                    } else if (event.data?.type === 'provider-completed') {
                      setStreamingStatus('AI planning completed');
                      setIsThinking(false);
                      setReasoningContent('');
                      
                      if (event.data.response?.text) {
                        updateAssistantMessage(msg => ({
                          ...msg,
                          content: event.data.response.text,
                          isStreaming: false,
                        }));
                      }
                    } else if (event.data?.type === 'chain-completed') {
                      setStreamingStatus('Planning completed');
                      setIsThinking(false);
                      setReasoningContent('');
                      
                      if (event.data.uuid) {
                        setConversationUuid(event.data.uuid);
                      }

                      updateAssistantMessage(msg => ({
                        ...msg,
                        isStreaming: false,
                      }));
                    }
                  } else if (event.event === 'provider-event') {
                    if (event.data?.type === 'text-delta') {
                      setIsThinking(false);
                      setReasoningContent('');
                      updateAssistantMessage(msg => ({
                        ...msg,
                        content: msg.content + event.data.textDelta,
                      }));
                    }
                  }
                  break;

                case 'tool-result':
                  console.log('Tool result received:', event);
                  if (event.todos) {
                    setTodos(event.todos);
                  }
                  if (event.briefs) {
                    setBriefs(event.briefs);
                  }
                  break;

                case 'finished':
                  setStreamingStatus('Stream finished');
                  if (event.uuid) {
                    setConversationUuid(event.uuid);
                  }
                  if (event.result?.response?.text) {
                    updateAssistantMessage(msg => ({
                      ...msg,
                      content: event.result.response.text,
                      isStreaming: false,
                    }));
                  } else {
                    updateAssistantMessage(msg => ({
                      ...msg,
                      isStreaming: false,
                    }));
                  }
                  break;

                case 'stream-error':
                  console.error('Stream error:', event.error);
                  updateAssistantMessage(msg => ({
                    ...msg,
                    content: `Stream Error: ${event.error}`,
                    isStreaming: false,
                  }));
                  break;
              }
            } catch (parseError) {
              console.error('Failed to parse event:', parseError);
            }
          }
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);
      updateAssistantMessage(msg => ({
        ...msg,
        content: `Sorry, there was an error: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        isStreaming: false,
      }));
    } finally {
      setIsStreaming(false);
      setStreamingStatus('');
      setIsThinking(false);
      setReasoningContent('');
      currentAssistantMessageIdRef.current = null;
    }
  };

  return (
    <div style={{ display: 'flex', height: '600px', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ 
          padding: '16px', 
          background: '#f8fafc', 
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Middle Child Bar Brief Planner</h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#718096' }}>
              {apiConfig.useMockApi ? 'Mock API Mode' : 'Real API Mode'} - {getBriefPlannerUrl()}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            {streamingStatus && (
              <div style={{ fontSize: '12px', color: '#4299e1', fontWeight: 500, marginBottom: '4px' }}>
                {streamingStatus}
              </div>
            )}
            <div style={{ fontSize: '10px', color: '#a0aec0' }}>
              {apiConfig.useMockApi ? '🔧' : '🌐'} {getConfigSummary().mode}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ 
          flex: 1, 
          padding: '16px', 
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.map(message => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%'
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '18px',
                  fontSize: '14px',
                  lineHeight: 1.4,
                  backgroundColor: message.role === 'user' ? '#4299e1' : '#f1f5f9',
                  color: message.role === 'user' ? '#ffffff' : '#1a202c',
                  borderBottomRightRadius: message.role === 'user' ? '4px' : '18px',
                  borderBottomLeftRadius: message.role === 'assistant' ? '4px' : '18px',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {message.isStreaming && isThinking ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      border: '2px solid #e2e8f0',
                      borderTop: '2px solid #4299e1',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    <span style={{ fontStyle: 'italic', color: '#718096' }}>
                      {reasoningContent || 'Thinking...'}
                    </span>
                  </div>
                ) : (
                  message.content
                )}
                {message.isStreaming && !isThinking && message.content && (
                  <span style={{ animation: 'pulse 1.5s infinite', marginLeft: '4px' }}>...</span>
                )}
              </div>
              <div style={{ 
                fontSize: '11px', 
                color: '#718096', 
                marginTop: '4px',
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start'
              }}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} style={{ 
          padding: '16px', 
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          gap: '8px'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Middle Child Bar planning, create todos, or generate briefs..."
            disabled={isStreaming}
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #d2d6dc',
              borderRadius: '20px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            style={{
              padding: '12px 20px',
              backgroundColor: isStreaming || !input.trim() ? '#cbd5e0' : '#4299e1',
              color: '#ffffff',
              border: 'none',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: isStreaming || !input.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            {isStreaming ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>

      {/* Sidebar for Todos and Briefs */}
      <div style={{ 
        width: '300px', 
        borderLeft: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Todos Section */}
        <div style={{ flex: 1, padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 600 }}>
            Todos ({todos.length})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
            {todos.length === 0 ? (
              <p style={{ margin: 0, fontSize: '14px', color: '#718096', fontStyle: 'italic' }}>
                No todos yet. Ask me to create some!
              </p>
            ) : (
              todos.map(todo => (
                <div key={todo.id} style={{ 
                  padding: '8px 12px', 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '8px',
                  fontSize: '13px'
                }}>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>{todo.title}</div>
                  <div style={{ color: '#718096', fontSize: '12px' }}>{todo.description}</div>
                  <div style={{ 
                    marginTop: '4px', 
                    fontSize: '11px', 
                    color: '#4299e1',
                    fontWeight: 500
                  }}>
                    {todo.status}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Briefs Section */}
        <div style={{ flex: 1, padding: '16px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 600 }}>
            Briefs ({briefs.length})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
            {briefs.length === 0 ? (
              <p style={{ margin: 0, fontSize: '14px', color: '#718096', fontStyle: 'italic' }}>
                No briefs yet. Ask me to create a marketing brief!
              </p>
            ) : (
              briefs.map(brief => (
                <div key={brief.id} style={{ 
                  padding: '8px 12px', 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '8px',
                  fontSize: '13px'
                }}>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>{brief.title}</div>
                  <div style={{ color: '#718096', fontSize: '12px', marginBottom: '4px' }}>
                    {brief.word_count} words
                  </div>
                  <details>
                    <summary style={{ cursor: 'pointer', fontSize: '12px', color: '#4299e1' }}>
                      View Content
                    </summary>
                    <div style={{ 
                      marginTop: '8px', 
                      padding: '8px',
                      backgroundColor: '#ffffff',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                      maxHeight: '100px',
                      overflowY: 'auto',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {brief.markdown}
                    </div>
                  </details>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}