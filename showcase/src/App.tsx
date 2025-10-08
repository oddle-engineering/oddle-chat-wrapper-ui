import { useState, useEffect } from 'react';
import { ChatWrapper, ChatWrapperProps, ChatMode, ChatTheme, ChatPosition } from '@oddle/chat-wrapper-ui';
import { setupMockAPI } from './api/mockApi';
import { BriefPlannerDemo } from './components/BriefPlannerDemo';
import { apiConfig, getConfigSummary } from './config/apiConfig';

function App() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [customConfig, setCustomConfig] = useState({
    mode: 'sidebar' as ChatMode,
    theme: 'light' as ChatTheme,
    position: 'right' as ChatPosition,
    appName: 'Demo Chat',
    placeholder: 'Type your message...'
  });

  // Setup mock API on component mount
  useEffect(() => {
    const cleanup = setupMockAPI('http://localhost:3000');
    return cleanup;
  }, []);

  const demos = [
    {
      id: 'sidebar',
      title: 'Sidebar Chat',
      description: 'A chat interface positioned as a sidebar on the right side of the screen.',
      config: {
        mode: 'sidebar' as ChatMode,
        appName: 'Customer Support',
        theme: 'light' as ChatTheme,
        position: 'right' as ChatPosition,
        placeholder: 'How can we help you today?'
      }
    },
    {
      id: 'modal',
      title: 'Modal Chat',
      description: 'A centered modal dialog for focused conversations.',
      config: {
        mode: 'modal' as ChatMode,
        appName: 'AI Assistant',
        theme: 'dark' as ChatTheme,
        placeholder: 'Ask me anything...'
      }
    },
    {
      id: 'fullscreen',
      title: 'Fullscreen Chat',
      description: 'A full-screen chat experience for immersive conversations.',
      config: {
        mode: 'fullscreen' as ChatMode,
        appName: 'Premium Support',
        theme: 'light' as ChatTheme,
        placeholder: 'Welcome to premium support!'
      }
    },
    {
      id: 'embedded',
      title: 'Embedded Chat',
      description: 'An embedded chat that fits within your existing layout.',
      config: {
        mode: 'embedded' as ChatMode,
        appName: 'Help Center',
        theme: 'auto' as ChatTheme,
        placeholder: 'Search or ask a question...'
      }
    },
    {
      id: 'brief-planner',
      title: 'Brief Planner (Latitude Mock)',
      description: 'Advanced AI brief planner with todo management and Middle Child Bar brand knowledge.',
      config: {
        mode: 'embedded' as ChatMode,
        appName: 'Brief Planner',
        theme: 'light' as ChatTheme,
        placeholder: 'Create marketing briefs and manage tasks...'
      }
    }
  ];

  const renderDemo = (demo: typeof demos[0]) => {
    const chatProps: ChatWrapperProps = {
      apiUrl: apiConfig.baseUrl,
      config: {
        ...demo.config,
        onMessage: (message) => {
          console.log('Message received:', message);
        },
        onError: (error) => {
          console.error('Chat error:', error);
        },
        features: {
          fileUpload: true,
          messageHistory: true,
          exportChat: false,
        }
      }
    };

    return <ChatWrapper {...chatProps} />;
  };

  const renderCustomDemo = () => {
    const chatProps: ChatWrapperProps = {
      apiUrl: apiConfig.baseUrl,
      config: {
        ...customConfig,
        onMessage: (message) => {
          console.log('Custom demo message:', message);
        },
        onError: (error) => {
          console.error('Custom demo error:', error);
        },
        features: {
          fileUpload: true,
          messageHistory: true,
          exportChat: true,
        }
      }
    };

    return <ChatWrapper {...chatProps} />;
  };

  return (
    <div className="showcase-container">
      <div className="showcase-header">
        <h1 className="showcase-title">Chat Wrapper UI</h1>
        <p className="showcase-subtitle">
          A lightweight, customizable chat interface component built with pure CSS and React.
          Test different modes and configurations below.
        </p>
        
        {/* API Configuration Status */}
        <div style={{ 
          marginTop: '1rem', 
          padding: '12px 16px', 
          backgroundColor: apiConfig.useMockApi ? '#e6f3ff' : '#e6ffe6',
          border: `1px solid ${apiConfig.useMockApi ? '#b3d9ff' : '#b3ffb3'}`,
          borderRadius: '8px',
          maxWidth: '600px',
          margin: '1rem auto 0 auto'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 500
          }}>
            <span style={{ fontSize: '16px' }}>
              {apiConfig.useMockApi ? '🔧' : '🌐'}
            </span>
            <span>
              API Mode: {getConfigSummary().mode}
            </span>
            <span style={{ color: '#718096', fontWeight: 400 }}>
              → {getConfigSummary().baseUrl}
            </span>
          </div>
          {!apiConfig.useMockApi && (
            <div style={{ 
              fontSize: '12px', 
              color: '#718096', 
              textAlign: 'center', 
              marginTop: '4px' 
            }}>
              Make sure your API server is running at {apiConfig.baseUrl}
            </div>
          )}
        </div>
      </div>

      {/* Custom Configuration Panel */}
      <div className="controls-panel">
        <h3>Custom Configuration</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="control-group">
            <label>Mode</label>
            <select 
              value={customConfig.mode}
              onChange={(e) => setCustomConfig({...customConfig, mode: e.target.value as ChatMode})}
            >
              <option value="sidebar">Sidebar</option>
              <option value="modal">Modal</option>
              <option value="fullscreen">Fullscreen</option>
              <option value="embedded">Embedded</option>
            </select>
          </div>
          
          <div className="control-group">
            <label>Theme</label>
            <select 
              value={customConfig.theme}
              onChange={(e) => setCustomConfig({...customConfig, theme: e.target.value as ChatTheme})}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          
          {customConfig.mode === 'sidebar' && (
            <div className="control-group">
              <label>Position</label>
              <select 
                value={customConfig.position}
                onChange={(e) => setCustomConfig({...customConfig, position: e.target.value as ChatPosition})}
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
          )}
          
          <div className="control-group">
            <label>App Name</label>
            <input 
              type="text"
              value={customConfig.appName}
              onChange={(e) => setCustomConfig({...customConfig, appName: e.target.value})}
            />
          </div>
          
          <div className="control-group">
            <label>Placeholder</label>
            <input 
              type="text"
              value={customConfig.placeholder}
              onChange={(e) => setCustomConfig({...customConfig, placeholder: e.target.value})}
            />
          </div>
        </div>
        
        <button 
          className="demo-button" 
          style={{ marginTop: '1rem' }}
          onClick={() => setActiveDemo('custom')}
        >
          Launch Custom Demo
        </button>
      </div>

      {/* Predefined Demos */}
      <div className="showcase-grid">
        {demos.map((demo) => (
          <div key={demo.id} className="demo-card">
            <h3>{demo.title}</h3>
            <p>{demo.description}</p>
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span style={{ background: '#e2e8f0', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                Mode: {demo.config.mode}
              </span>
              <span style={{ background: '#e2e8f0', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                Theme: {demo.config.theme}
              </span>
              {demo.config.position && (
                <span style={{ background: '#e2e8f0', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                  Position: {demo.config.position}
                </span>
              )}
            </div>
            <button 
              className="demo-button"
              onClick={() => setActiveDemo(demo.id)}
            >
              Launch Demo
            </button>
          </div>
        ))}
      </div>

      {/* Brief Planner Demo Container */}
      {activeDemo === 'brief-planner' && (
        <div style={{ 
          position: 'fixed', 
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vw',
          maxWidth: '1000px',
          height: '80vh',
          zIndex: 1000,
          border: '2px solid #4299e1',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: 'white'
        }}>
          <BriefPlannerDemo />
        </div>
      )}

      {/* Embedded Demo Container */}
      {activeDemo === 'embedded' && (
        <div style={{ 
          position: 'fixed', 
          bottom: '20px', 
          right: '20px', 
          width: '400px', 
          height: '500px',
          zIndex: 1000,
          border: '2px solid #4299e1',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          {renderDemo(demos.find(d => d.id === 'embedded')!)}
        </div>
      )}

      {/* Active Demo Render */}
      {activeDemo && activeDemo !== 'embedded' && activeDemo !== 'brief-planner' && (
        <>
          {(activeDemo === 'modal' || activeDemo === 'fullscreen') && (
            <div className="active-demo-overlay" />
          )}
          
          <button 
            className="close-demo-button"
            onClick={() => setActiveDemo(null)}
          >
            Close Demo
          </button>

          {activeDemo === 'custom' ? renderCustomDemo() : (
            renderDemo(demos.find(d => d.id === activeDemo)!)
          )}
        </>
      )}

      {/* Close button for special demos */}
      {(activeDemo === 'embedded' || activeDemo === 'brief-planner') && (
        <>
          {activeDemo === 'brief-planner' && <div className="active-demo-overlay" />}
          <button 
            className="close-demo-button"
            onClick={() => setActiveDemo(null)}
          >
            {activeDemo === 'brief-planner' ? 'Close Brief Planner' : 'Close Embedded Demo'}
          </button>
        </>
      )}
    </div>
  );
}

export default App;