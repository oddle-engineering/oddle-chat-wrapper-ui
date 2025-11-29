/**
 * Tolgee Integration Test Component
 * 
 * This component provides a comprehensive test interface for verifying
 * Tolgee translation integration with ChatWrapper
 */

import React, { useState, useEffect } from 'react';
import { ChatWrapper, ChatWrapperProps, EntityType } from '@oddle/chat-wrapper-ui';

interface TolgeeTestResult {
  name: string;
  status: 'pass' | 'fail' | 'pending';
  details: string;
  timestamp?: number;
}

interface TolgeeConfiguration {
  apiUrl?: string;
  apiKey?: string;
  isDetected: boolean;
}

const TolgeeTest: React.FC = () => {
  const [testResults, setTestResults] = useState<TolgeeTestResult[]>([]);
  const [tolgeeConfig, setTolgeeConfig] = useState<TolgeeConfiguration>({
    isDetected: false
  });
  const [isRunning, setIsRunning] = useState(false);
  const [showChatWrapper, setShowChatWrapper] = useState(false);

  // Detect Tolgee configuration from window globals
  const detectTolgeeConfig = (): TolgeeConfiguration => {
    const hasWindow = typeof window !== 'undefined';
    
    // Debug logging
    console.log('🔍 Detecting Tolgee config...');
    console.log('Has window:', hasWindow);
    
    if (hasWindow) {
      console.log('Window globals:', {
        API_URL: (window as any).__VITE_APP_TOLGEE_API_URL__,
        HAS_API_KEY: !!(window as any).__VITE_APP_TOLGEE_API_KEY__
      });
    }
    
    const apiUrl = hasWindow ? (window as any).__VITE_APP_TOLGEE_API_URL__ : undefined;
    const apiKey = hasWindow ? (window as any).__VITE_APP_TOLGEE_API_KEY__ : undefined;

    const config = {
      apiUrl,
      apiKey: apiKey ? `${apiKey.substring(0, 8)}...` : undefined, // Partially mask for security
      isDetected: !!(apiUrl && apiKey)
    };
    
    console.log('Detection result:', config);
    return config;
  };

  // Add test result
  const addTestResult = (name: string, status: 'pass' | 'fail', details: string) => {
    setTestResults(prev => [...prev, {
      name,
      status,
      details,
      timestamp: Date.now()
    }]);
  };

  // Run all Tolgee integration tests
  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    // Test 1: Environment Detection
    const config = detectTolgeeConfig();
    setTolgeeConfig(config);

    if (config.isDetected) {
      addTestResult(
        'Tolgee Configuration Detection',
        'pass',
        `Detected: API URL (${config.apiUrl}), API Key (${config.apiKey})`
      );
    } else {
      addTestResult(
        'Tolgee Configuration Detection',
        'fail',
        'No Tolgee configuration found in window globals. Check .env.local setup.'
      );
    }

    // Test 2: Window Globals Verification
    try {
      const windowGlobals = [
        '__VITE_APP_TOLGEE_API_URL__',
        '__VITE_APP_TOLGEE_API_KEY__'
      ];

      const presentGlobals = windowGlobals.filter(global => 
        typeof window !== 'undefined' && (window as any)[global] !== undefined
      );

      if (presentGlobals.length === windowGlobals.length) {
        addTestResult(
          'Window Globals Setup',
          'pass',
          `All required window globals are present: ${presentGlobals.join(', ')}`
        );
      } else {
        const missing = windowGlobals.filter(global => !presentGlobals.includes(global));
        addTestResult(
          'Window Globals Setup',
          'fail',
          `Missing window globals: ${missing.join(', ')}`
        );
      }
    } catch (error) {
      addTestResult(
        'Window Globals Setup',
        'fail',
        `Error checking window globals: ${error}`
      );
    }

    // Test 3: @tolgee/react Import Test
    try {
      // Try to dynamically import @tolgee/react to test if it's available
      const tolgeeModule = await import('@tolgee/react');
      if (tolgeeModule && tolgeeModule.TolgeeProvider) {
        addTestResult(
          '@tolgee/react Import',
          'pass',
          'Successfully imported @tolgee/react module'
        );
      } else {
        addTestResult(
          '@tolgee/react Import',
          'fail',
          '@tolgee/react module exists but missing expected exports'
        );
      }
    } catch (error) {
      addTestResult(
        '@tolgee/react Import',
        'fail',
        `Failed to import @tolgee/react: ${error}`
      );
    }

    // Test 4: Translation File Access Test
    try {
      // Test if we can fetch translation files
      const response = await fetch('/i18n/en_SG.json');
      if (response.ok) {
        const translations = await response.json();
        const requiredKeys = [
          'chat.loading',
          'chat.retry',
          'chat.thinking',
          'chat.send',
          'chat.placeholder'
        ];
        
        const presentKeys = requiredKeys.filter(key => key in translations);
        
        if (presentKeys.length === requiredKeys.length) {
          addTestResult(
            'Translation Files Access',
            'pass',
            `Successfully loaded en_SG.json with ${Object.keys(translations).length} keys`
          );
        } else {
          const missing = requiredKeys.filter(key => !presentKeys.includes(key));
          addTestResult(
            'Translation Files Access',
            'fail',
            `Missing required translation keys: ${missing.join(', ')}`
          );
        }
      } else {
        addTestResult(
          'Translation Files Access',
          'fail',
          'Could not fetch /i18n/en_SG.json - file may not be publicly accessible'
        );
      }
    } catch (error) {
      addTestResult(
        'Translation Files Access',
        'fail',
        `Error accessing translation files: ${error}`
      );
    }

    // Test 5: Network Connectivity Test (to Tolgee API)
    if (config.apiUrl) {
      try {
        // Basic connectivity test (won't actually authenticate)
        const response = await fetch(`${config.apiUrl}/health`, {
          method: 'GET',
          mode: 'no-cors' // To avoid CORS issues in test
        });
        
        addTestResult(
          'Tolgee API Connectivity',
          'pass',
          `Successfully reached Tolgee API at ${config.apiUrl}`
        );
      } catch (error) {
        addTestResult(
          'Tolgee API Connectivity',
          'fail',
          `Could not reach Tolgee API: ${error}`
        );
      }
    } else {
      addTestResult(
        'Tolgee API Connectivity',
        'fail',
        'No Tolgee API URL configured'
      );
    }

    setIsRunning(false);
  };

  // Test ChatWrapper props for Tolgee integration
  const testChatWrapperProps: ChatWrapperProps = {
    auth: {
      token: "test-token", 
      entityId: "test-entity",
      entityType: EntityType.BRAND
    },
    chatServerUrl: "http://localhost:3000",
    chatServerKey: "test-key",
    locale: "en_SG", // This should trigger Tolgee translations if configured
    config: {
      mode: "sidebar",
      theme: "light",
      position: "right",
      headerName: "Tolgee Test Chat",
      headerDescription: "Testing translation integration"
    },
    tools: []
  };

  useEffect(() => {
    // Auto-detect configuration on component mount
    const config = detectTolgeeConfig();
    setTolgeeConfig(config);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🧪 Tolgee Integration Test Dashboard</h1>
      
      {/* Configuration Overview */}
      <div style={{ 
        backgroundColor: tolgeeConfig.isDetected ? '#e6f7ff' : '#fff2e6', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px',
        border: `2px solid ${tolgeeConfig.isDetected ? '#1890ff' : '#fa8c16'}`
      }}>
        <h3>📊 Configuration Status</h3>
        <p><strong>Detection Status:</strong> {tolgeeConfig.isDetected ? '✅ Detected' : '❌ Not Detected'}</p>
        {tolgeeConfig.isDetected && (
          <>
            <p><strong>API URL:</strong> {tolgeeConfig.apiUrl}</p>
            <p><strong>API Key:</strong> {tolgeeConfig.apiKey}</p>
          </>
        )}
        {!tolgeeConfig.isDetected && (
          <p style={{ color: '#fa8c16' }}>
            ⚠️ No Tolgee configuration detected. Make sure:
            <br />• .env.local file exists with Tolgee credentials
            <br />• Window globals are set in main.tsx
            <br />• Development server is running
          </p>
        )}
      </div>

      {/* Test Controls */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={runTests}
          disabled={isRunning}
          style={{
            padding: '12px 24px',
            backgroundColor: isRunning ? '#ccc' : '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            marginRight: '10px',
            fontSize: '14px'
          }}
        >
          {isRunning ? '🔄 Running Tests...' : '▶️ Run Tolgee Tests'}
        </button>

        <button
          onClick={() => setShowChatWrapper(!showChatWrapper)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {showChatWrapper ? '🙈 Hide ChatWrapper' : '👀 Show ChatWrapper Test'}
        </button>
      </div>

      {/* Test Results */}
      <div style={{ marginBottom: '20px' }}>
        <h3>📝 Test Results</h3>
        {testResults.length === 0 && !isRunning && (
          <p style={{ color: '#999' }}>No tests run yet. Click "Run Tolgee Tests" to start.</p>
        )}
        
        {testResults.map((result, index) => (
          <div
            key={index}
            style={{
              padding: '10px',
              marginBottom: '8px',
              borderRadius: '4px',
              backgroundColor: result.status === 'pass' ? '#f6ffed' : '#fff1f0',
              border: `1px solid ${result.status === 'pass' ? '#b7eb8f' : '#ffa39e'}`
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontWeight: 'bold' }}>
                {result.status === 'pass' ? '✅' : '❌'} {result.name}
              </span>
              {result.timestamp && (
                <span style={{ fontSize: '12px', color: '#999' }}>
                  {new Date(result.timestamp).toLocaleTimeString()}
                </span>
              )}
            </div>
            <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
              {result.details}
            </p>
          </div>
        ))}
      </div>

      {/* ChatWrapper Test */}
      {showChatWrapper && (
        <div style={{ 
          border: '2px dashed #1890ff', 
          padding: '20px', 
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3>🗨️ ChatWrapper Translation Test</h3>
          <p>This ChatWrapper instance tests translation integration:</p>
          <ul>
            <li>Locale is set to "en_SG"</li>
            <li>Should display translated text if Tolgee is properly configured</li>
            <li>Should fall back to static text if Tolgee is not available</li>
          </ul>
          
          <div style={{ 
            height: '400px', 
            border: '1px solid #ccc', 
            borderRadius: '8px',
            position: 'relative'
          }}>
            <ChatWrapper
              {...testChatWrapperProps}
              devMode={true}
            />
          </div>
        </div>
      )}

      {/* Instructions */}
      <div style={{ 
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px'
      }}>
        <h3>📖 Test Instructions</h3>
        <ol>
          <li><strong>Environment Setup:</strong> Ensure .env.local exists with Tolgee credentials</li>
          <li><strong>Run Tests:</strong> Click "Run Tolgee Tests" to verify configuration</li>
          <li><strong>ChatWrapper Test:</strong> Click "Show ChatWrapper Test" to see translation in action</li>
          <li><strong>Network Test:</strong> Tests will verify API connectivity and file access</li>
          <li><strong>Translation Keys:</strong> Verify that required chat translation keys exist</li>
        </ol>
        
        <h4>🔧 Troubleshooting:</h4>
        <ul>
          <li>If "Configuration Detection" fails: Check .env.local file and main.tsx window globals setup</li>
          <li>If "Translation Files Access" fails: Ensure i18n/en_SG.json is in public directory or accessible</li>
          <li>If "API Connectivity" fails: Check network and Tolgee server status</li>
          <li>If ChatWrapper shows English text: Translation system is working (either Tolgee or fallback)</li>
        </ul>
      </div>
    </div>
  );
};

export default TolgeeTest;