import { useState } from 'react';
import { ChatWrapper, ChatWrapperProps } from "@oddle/chat-wrapper-ui";
import { apiConfig } from '../config/apiConfig';

export function EnhancedBriefPlannerDemo() {
  const [todos, setTodos] = useState<any[]>([]);
  const [briefs, setBriefs] = useState<any[]>([]);

  const chatProps: ChatWrapperProps = {
    apiUrl: apiConfig.baseUrl,
    config: {
      mode: "embedded",
      appName: "Middle Child Bar Brief Planner",
      theme: "light",
      placeholder: "Ask about Middle Child Bar planning, create todos, or generate briefs...",
      endpoint: "brief-planner",
      promptPath: "briefPlanner",
      features: {
        showToolResults: true,
        messageHistory: true,
      },
      onToolResult: (tool: string, result: any) => {
        console.log(`Tool result from ${tool}:`, result);
        if (tool === 'todos') {
          setTodos(result);
        }
        if (tool === 'briefs') {
          setBriefs(result);
        }
      },
      onStreamingStatusChange: (status: string) => {
        console.log('Streaming status:', status);
      },
      onError: (error) => {
        console.error("Brief Planner error:", error);
      },
    },
    initialMessages: [{
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
    }],
    tools: {
      create_todo: (title: string, description: string, status: string = 'pending') => {
        console.log('Creating todo:', { title, description, status });
        return { success: true, todoId: Date.now().toString() };
      },
      create_brief: (title: string, content: string, type: string = 'marketing') => {
        console.log('Creating brief:', { title, content, type });
        return { success: true, briefId: Date.now().toString() };
      },
      get_brand_info: (category: string = 'general') => {
        console.log('Getting brand info for:', category);
        return { 
          category, 
          info: 'Middle Child Bar brand information',
          established: '2019',
          location: 'Philadelphia'
        };
      },
    },
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ 
        padding: '12px 16px', 
        background: '#f8fafc', 
        borderBottom: '1px solid #e2e8f0',
        fontSize: '14px',
        color: '#718096'
      }}>
        {apiConfig.useMockApi ? 'Mock API Mode' : 'Real API Mode'} - Using refactored ChatWrapper
      </div>
      <div style={{ flex: 1 }}>
        <ChatWrapper {...chatProps} />
      </div>
      
      {/* Tool Results Display */}
      {(todos.length > 0 || briefs.length > 0) && (
        <div style={{ 
          borderTop: '1px solid #e2e8f0', 
          padding: '16px',
          background: '#f8fafc',
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          {todos.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>
                Todos ({todos.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {todos.map((todo, index) => (
                  <div key={index} style={{ 
                    padding: '6px 8px', 
                    backgroundColor: '#ffffff', 
                    borderRadius: '4px',
                    fontSize: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ fontWeight: 600 }}>{todo.title}</div>
                    <div style={{ color: '#718096' }}>{todo.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {briefs.length > 0 && (
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>
                Briefs ({briefs.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {briefs.map((brief, index) => (
                  <div key={index} style={{ 
                    padding: '6px 8px', 
                    backgroundColor: '#ffffff', 
                    borderRadius: '4px',
                    fontSize: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ fontWeight: 600 }}>{brief.title}</div>
                    <div style={{ color: '#718096' }}>{brief.word_count} words</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}