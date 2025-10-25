import { useState, useCallback, useEffect } from "react";
import { App } from '../types';
import { getAgentConfiguration, updateAgentConfiguration, AgentConfiguration } from '../utils/agentConfigApi';

interface DevSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  app: App;
  apiUrl: string;
}

export const DevSettings = ({
  isOpen,
  onClose,
  app,
  apiUrl,
}: DevSettingsProps) => {
  const [config, setConfig] = useState<AgentConfiguration | null>(null);
  const [tempPromptPath, setTempPromptPath] = useState("");
  const [tempVersionUuid, setTempVersionUuid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch configuration when modal opens
  useEffect(() => {
    if (isOpen && !config) {
      fetchConfiguration();
    }
  }, [isOpen]);

  const fetchConfiguration = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const configuration = await getAgentConfiguration(apiUrl, app);
      setConfig(configuration);
      setTempPromptPath(configuration.promptPath);
      setTempVersionUuid(configuration.versionUuid);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch configuration');
      console.error('Error fetching agent configuration:', err);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, app]);

  const handleSave = useCallback(async () => {
    if (!config) return;
    
    setLoading(true);
    setError(null);
    try {
      const updatedConfig = await updateAgentConfiguration(apiUrl, app, {
        promptPath: tempPromptPath,
        versionUuid: tempVersionUuid,
        isDefault: config.isDefault,
      });
      setConfig(updatedConfig);
      onClose();
      
      // Reload the page to reinitialize with new configuration
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update configuration');
      console.error('Error updating agent configuration:', err);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, app, tempPromptPath, tempVersionUuid, config, onClose]);

  const handleCancel = useCallback(() => {
    if (config) {
      setTempPromptPath(config.promptPath);
      setTempVersionUuid(config.versionUuid);
    }
    setError(null);
    onClose();
  }, [config, onClose]);

  if (!isOpen) return null;

  return (
    <div className="chat-wrapper__dev-settings-overlay">
      <div className="chat-wrapper__dev-settings-popup">
        <div className="chat-wrapper__dev-settings-header">
          <h3>Developer Settings</h3>
          <button
            className="chat-wrapper__dev-settings-close"
            onClick={handleCancel}
            title="Close settings"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        
        <div className="chat-wrapper__dev-settings-content">
          {loading && (
            <div className="chat-wrapper__dev-settings-loading">
              Loading configuration...
            </div>
          )}
          
          {error && (
            <div className="chat-wrapper__dev-settings-error">
              <p>Error: {error}</p>
              <button 
                onClick={fetchConfiguration}
                className="chat-wrapper__dev-settings-retry"
              >
                Retry
              </button>
            </div>
          )}
          
          {config && !loading && (
            <>
              <div className="chat-wrapper__dev-settings-field">
                <label htmlFor="agent-prompt-path">Prompt Path:</label>
                <input
                  id="agent-prompt-path"
                  type="text"
                  value={tempPromptPath}
                  onChange={(e) => setTempPromptPath(e.target.value)}
                  placeholder="e.g., /prompts/custom-agent.md"
                  className="chat-wrapper__dev-settings-input"
                  disabled={loading}
                />
                <p className="chat-wrapper__dev-settings-help">
                  Path to the agent prompt file.
                </p>
              </div>
              
              <div className="chat-wrapper__dev-settings-field">
                <label htmlFor="version-uuid">Version UUID:</label>
                <input
                  id="version-uuid"
                  type="text"
                  value={tempVersionUuid}
                  onChange={(e) => setTempVersionUuid(e.target.value)}
                  placeholder="e.g., 123e4567-e89b-12d3-a456-426614174000"
                  className="chat-wrapper__dev-settings-input"
                  disabled={loading}
                />
                <p className="chat-wrapper__dev-settings-help">
                  Version UUID for the agent configuration.
                </p>
              </div>
              
              <div className="chat-wrapper__dev-settings-info">
                <p><strong>App:</strong> {app}</p>
              </div>
            </>
          )}
        </div>
        
        <div className="chat-wrapper__dev-settings-footer">
          <button
            className="chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--cancel"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save"
            onClick={handleSave}
            disabled={loading || !config}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};