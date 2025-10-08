import { useState, useEffect, useRef, useCallback } from 'react';
import { ChatWrapperProps, Message, StreamEvent, ToolResult } from '../types';
import { MessageInput } from './MessageInput';
import '../styles/chat-wrapper.css';

export function ChatWrapper({ 
  apiUrl, 
  config, 
  tools, 
  initialMessages = [] 
}: ChatWrapperProps) {
  // Core chat state
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [conversationUuid, setConversationUuid] = useState<string | null>(null);
  
  // Advanced state for tool results and streaming
  const [toolResults, setToolResults] = useState<ToolResult[]>([]);
  const [todos, setTodos] = useState<any[]>([]);
  const [briefs, setBriefs] = useState<any[]>([]);
  const [uploadedMedia, setUploadedMedia] = useState<string[]>([]);
  const [streamingStatus, setStreamingStatus] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [reasoningContent, setReasoningContent] = useState('');
  
  // Refs for managing streaming
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentAssistantMessageIdRef = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Utility functions
  const generateId = useCallback(() => 
    Math.random().toString(36).substring(2) + Date.now().toString(36), []
  );

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Log available tools for debugging
  useEffect(() => {
    if (tools && Object.keys(tools).length > 0) {
      console.log('Available tools:', Object.keys(tools));
    }
  }, [tools]);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle config callbacks
  useEffect(() => {
    if (config.onStreamingStatusChange) {
      config.onStreamingStatusChange(streamingStatus);
    }
  }, [streamingStatus, config]);

  // Helper to update the current assistant message
  const updateAssistantMessage = useCallback((updateFn: (msg: Message) => Message) => {
    const currentId = currentAssistantMessageIdRef.current;
    if (currentId) {
      setMessages(prev => prev.map(msg => 
        msg.id === currentId ? updateFn(msg) : msg
      ));
    }
  }, []);

  // Get the appropriate API endpoint
  const getApiEndpoint = useCallback(() => {
    const endpoint = config.endpoint || 'conversation';
    
    if (endpoint === 'brief-planner') {
      return `${apiUrl}/api/brief-planner`;
    } else {
      return conversationUuid ? 
        `${apiUrl}/api/conversation/${conversationUuid}` : 
        `${apiUrl}/api/conversation/init`;
    }
  }, [apiUrl, config.endpoint, conversationUuid]);

  // Process streaming events from the API
  const processStreamEvent = useCallback((event: StreamEvent) => {
    console.log('Processing stream event:', event.type, event);

    switch (event.type) {
      case 'event':
        if (event.event === 'latitude-event') {
          if (event.data?.type === 'chain-started') {
            setStreamingStatus('Planning chain started');
            setIsThinking(true);
            setReasoningContent('🔗 Starting comprehensive planning chain...');
          } else if (event.data?.type === 'step-started') {
            setStreamingStatus('Planning step started');
            setIsThinking(true);
            setReasoningContent('📊 Executing planning step...');
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

      case 'text-delta':
        if (event.content) {
          updateAssistantMessage(msg => ({
            ...msg,
            content: msg.content + event.content,
          }));
        }
        break;

      case 'tool-result':
        console.log('Tool result received:', event);
        
        // Handle different tool results
        if (event.tool && event.data) {
          // Add to tool results if it has the right structure
          if (event.data.id || event.data.success) {
            const toolResult: ToolResult = {
              id: event.data.id || generateId(),
              title: event.data.title || `${event.tool} result`,
              description: event.data.description,
              status: event.data.status || 'completed',
              created_at: event.data.created_at || new Date().toISOString(),
              ...event.data
            };
            
            setToolResults(prev => [...prev, toolResult]);
          }
        }
        
        // Handle todos and briefs if provided
        if (event.todos) {
          setTodos(event.todos);
          // Call onToolResult callback if provided
          if (config.onToolResult) {
            config.onToolResult('todos', event.todos);
          }
        }
        
        if (event.briefs) {
          setBriefs(event.briefs);
          // Call onToolResult callback if provided
          if (config.onToolResult) {
            config.onToolResult('briefs', event.briefs);
          }
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

      case 'error':
        console.error('API error:', event.error);
        updateAssistantMessage(msg => ({
          ...msg,
          content: `Error: ${event.error}`,
          isStreaming: false,
        }));
        break;
    }
  }, [updateAssistantMessage, generateId, config]);

  // Handle message submission
  const handleSubmit = useCallback(async (message: string, media?: string[]) => {
    if (!message.trim() || isStreaming) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: message.trim(),
      timestamp: new Date(),
      media,
    };

    setMessages(prev => [...prev, userMessage]);
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
      // Create abort controller for this request
      abortControllerRef.current = new AbortController();

      const endpoint = getApiEndpoint();
      const requestBody = config.endpoint === 'brief-planner' ? {
        messages: [...messages, userMessage],
        promptPath: config.promptPath || 'briefPlanner',
        conversationUuid,
        todos, // Send current todos to the API
        briefs, // Send current briefs to the API  
        media: uploadedMedia, // Send uploaded images as base64
      } : {
        message: message.trim(),
        tools: tools ? Object.keys(tools) : []
      };

      console.log('Sending request to:', endpoint);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
        },
        body: JSON.stringify(requestBody),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle regular conversation init response
      if (!conversationUuid && config.endpoint !== 'brief-planner') {
        const data = await response.json();
        setConversationUuid(data.conversationId);
        
        // For regular conversation, we need to make another request to send the actual message
        const messageEndpoint = `${apiUrl}/api/conversation/${data.conversationId}`;
        const messageResponse = await fetch(messageEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
          },
          body: JSON.stringify({ message: message.trim() }),
          signal: abortControllerRef.current.signal,
        });
        
        if (!messageResponse.ok) {
          throw new Error(`HTTP error! status: ${messageResponse.status}`);
        }
        
        // Process the streaming response
        await processStreamingResponse(messageResponse);
      } else {
        // Process the streaming response for brief-planner or existing conversation
        await processStreamingResponse(response);
      }

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.error('Request error:', error);
        updateAssistantMessage(msg => ({
          ...msg,
          content: `Sorry, there was an error: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`,
          isStreaming: false,
        }));
        
        if (config.onError) {
          config.onError(error instanceof Error ? error : new Error('Unknown error'));
        }
      }
    } finally {
      setIsStreaming(false);
      setStreamingStatus('');
      setIsThinking(false);
      setReasoningContent('');
      abortControllerRef.current = null;
      currentAssistantMessageIdRef.current = null;
    }
  }, [
    isStreaming, 
    generateId, 
    messages, 
    conversationUuid, 
    todos,
    briefs,
    uploadedMedia,
    tools, 
    config, 
    apiUrl, 
    getApiEndpoint,
    updateAssistantMessage,
    processStreamEvent
  ]);

  // Process streaming response from the API
  const processStreamingResponse = useCallback(async (response: Response) => {
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
            const event: StreamEvent = JSON.parse(jsonData);
            processStreamEvent(event);
          } catch (parseError) {
            console.error('Failed to parse event:', parseError);
          }
        }
      }
    }
  }, [processStreamEvent]);

  // Stop generation
  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
      setStreamingStatus('');
      setIsThinking(false);
      setReasoningContent('');
    }
  }, []);

  // Clear chat
  const clearChat = useCallback(() => {
    setMessages(initialMessages);
    setConversationUuid(null);
    setToolResults([]);
    setTodos([]);
    setBriefs([]);
    setUploadedMedia([]);
    setStreamingStatus('');
    setIsThinking(false);
    setReasoningContent('');
    console.log('Chat cleared');
  }, [initialMessages]);

  // Build CSS classes without external library
  const buildClasses = (...classes: (string | undefined | false)[]): string => {
    return classes.filter(Boolean).join(' ');
  };

  const containerClasses = buildClasses(
    'chat-wrapper',
    `chat-wrapper--${config.mode}`,
    config.position && `chat-wrapper--${config.position}`,
    config.theme && `chat-wrapper--${config.theme}`
  );

  // Render modal overlay if needed
  const renderModalOverlay = () => {
    if (config.mode === 'modal') {
      return <div className="chat-wrapper-overlay" />;
    }
    return null;
  };

  // Render thinking indicator
  const renderThinkingIndicator = () => {
    if (!isThinking || !reasoningContent) return null;
    
    return (
      <div className="chat-wrapper__thinking">
        <div className="chat-wrapper__thinking-content">
          <span className="chat-wrapper__thinking-spinner" />
          <span>{reasoningContent}</span>
        </div>
      </div>
    );
  };

  // Render tool results panel (if enabled)
  const renderToolResults = () => {
    if (!config.features?.showToolResults || toolResults.length === 0) return null;

    return (
      <div className="chat-wrapper__tool-results">
        <h4>Tool Results</h4>
        <div className="chat-wrapper__tool-results-list">
          {toolResults.map((result) => (
            <div key={result.id} className="chat-wrapper__tool-result">
              <div className="chat-wrapper__tool-result-title">{result.title}</div>
              {result.description && (
                <div className="chat-wrapper__tool-result-description">
                  {result.description}
                </div>
              )}
              <div className="chat-wrapper__tool-result-meta">
                Status: {result.status || 'completed'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {renderModalOverlay()}
      <div className={containerClasses} style={config.customStyles}>
        <div className="chat-wrapper__header">
          <h2 className="chat-wrapper__title">{config.appName}</h2>
          {streamingStatus && (
            <div className="chat-wrapper__status">
              {streamingStatus}
            </div>
          )}
        </div>
        
        {renderThinkingIndicator()}
        
        <div className="chat-wrapper__messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-wrapper__message chat-wrapper__message--${message.role}`}
            >
              <div className="chat-wrapper__message-content">
                {message.content}
                {message.isStreaming && (
                  <span className="chat-wrapper__streaming-indicator">...</span>
                )}
              </div>
              <div className="chat-wrapper__message-timestamp">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {renderToolResults()}
        
        <MessageInput
          onSend={handleSubmit}
          disabled={isStreaming}
          placeholder={config.placeholder || 'Type a message...'}
          value={input}
          onChange={setInput}
          onStop={stopGeneration}
          onClear={clearChat}
          showStopButton={isStreaming}
          showClearButton={messages.length > 0}
        />
        
        {config.onError && (
          <div className="chat-wrapper__error-boundary" />
        )}
      </div>
    </>
  );
}