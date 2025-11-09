import { useState, useCallback, useEffect } from "react";
import { getAgentConfiguration, updateAgentConfiguration, AgentConfiguration } from '../utils/agentConfigApi';
import { updateThread, updateThreadMetadata } from '../utils/threadApi';
import { useUIStore } from '../store';

interface DevSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  apiUrl: string;
  userMpAuthToken?: string;
  chatServerKey?: string;
  app?: string; // Add app parameter to specify which configuration to load
}

export const DevSettings = ({
  isOpen,
  onClose,
  apiUrl,
  userMpAuthToken,
  chatServerKey,
  app = "UD21", // Default to UD21 if not specified
}: DevSettingsProps) => {
  // Agent configuration state
  const [config, setConfig] = useState<AgentConfiguration | null>(null);
  const [tempPromptPath, setTempPromptPath] = useState("");
  const [tempVersionUuid, setTempVersionUuid] = useState("");
  
  // Thread attachment state
  const providerResId = useUIStore((state) => state.providerResId);
  const [tempEntityId, setTempEntityId] = useState("");
  const [tempEntityType, setTempEntityType] = useState<"BRAND" | "ACCOUNT" | "">("BRAND");
  const [tempTag, setTempTag] = useState("");
  const [tempMetadata, setTempMetadata] = useState("");
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"agent" | "thread">("agent");

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
      const configuration = await getAgentConfiguration(apiUrl, {
        userMpAuthToken,
        chatServerKey,
      });
      
      if (!configuration) {
        throw new Error(`No configuration found for app: ${app}`);
      }
      
      setConfig(configuration);
      setTempPromptPath(configuration.promptPath);
      setTempVersionUuid(configuration.versionUuid);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch configuration');
      console.error('Error fetching agent configuration:', err);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, app, userMpAuthToken, chatServerKey]);

  const handleSave = useCallback(async () => {
    if (!config) return;
    
    setLoading(true);
    setError(null);
    try {
      const updatedConfig = await updateAgentConfiguration(apiUrl, {
        app: config.app,
        promptPath: tempPromptPath,
        versionUuid: tempVersionUuid,
        isDefault: config.isDefault,
      }, {
        userMpAuthToken,
        chatServerKey,
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
  }, [apiUrl, tempPromptPath, tempVersionUuid, config, onClose, userMpAuthToken, chatServerKey]);

  const handleThreadAttachment = useCallback(async () => {
    if (!providerResId) {
      setError("No active conversation to attach");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Parse metadata JSON if provided
      let parsedMetadata = undefined;
      if (tempMetadata.trim()) {
        try {
          parsedMetadata = JSON.parse(tempMetadata);
        } catch (e) {
          throw new Error("Invalid JSON in metadata field");
        }
      }

      // Separate entity updates from metadata updates
      const hasEntityUpdate = tempEntityId && tempEntityType;
      const hasMetadataUpdate = tempTag || parsedMetadata;

      // First, update entity if provided (rare - changing ownership)
      if (hasEntityUpdate) {
        await updateThread(
          apiUrl,
          providerResId,
          {
            entityId: tempEntityId,
            entityType: tempEntityType,
          },
          {
            userMpAuthToken,
            chatServerKey,
          }
        );
      }

      // Then, update metadata/tag if provided (common - business context)
      if (hasMetadataUpdate) {
        await updateThreadMetadata(
          apiUrl,
          providerResId,
          {
            tag: tempTag || undefined,
            metadata: parsedMetadata,
          },
          {
            userMpAuthToken,
            chatServerKey,
          }
        );
      }

      if (!hasEntityUpdate && !hasMetadataUpdate) {
        setError("Please provide at least one field to update");
        return;
      }

      setSuccessMessage("Thread updated successfully!");
      
      // Clear form after successful update
      setTimeout(() => {
        setTempEntityId("");
        setTempEntityType("BRAND");
        setTempTag("");
        setTempMetadata("");
        setSuccessMessage(null);
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update thread');
      console.error('Error updating thread:', err);
    } finally {
      setLoading(false);
    }
  }, [providerResId, apiUrl, tempEntityId, tempEntityType, tempTag, tempMetadata, userMpAuthToken, chatServerKey]);

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
        
        {/* Tabs */}
        <div className="chat-wrapper__dev-settings-tabs">
          <button
            className={`chat-wrapper__dev-settings-tab ${activeTab === "agent" ? "active" : ""}`}
            onClick={() => setActiveTab("agent")}
          >
            Agent Config
          </button>
          <button
            className={`chat-wrapper__dev-settings-tab ${activeTab === "thread" ? "active" : ""}`}
            onClick={() => setActiveTab("thread")}
          >
            Thread Attachment
          </button>
        </div>
        
        <div className="chat-wrapper__dev-settings-content">
          {successMessage && (
            <div className="chat-wrapper__dev-settings-success">
              {successMessage}
            </div>
          )}

          {loading && (
            <div className="chat-wrapper__dev-settings-loading">
              Loading configuration...
            </div>
          )}
          
          {error && (
            <div className="chat-wrapper__dev-settings-error">
              <p>Error: {error}</p>
              <button 
                onClick={activeTab === "agent" ? fetchConfiguration : undefined}
                className="chat-wrapper__dev-settings-retry"
              >
                Retry
              </button>
            </div>
          )}
          
          {/* Agent Config Tab */}
          {activeTab === "agent" && config && !loading && (
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
              
              <div className="chat-wrapper__dev-settings-field">
                <label htmlFor="app-name">App:</label>
                <input
                  id="app-name"
                  type="text"
                  value={config.app}
                  className="chat-wrapper__dev-settings-input"
                  disabled={true}
                  readOnly
                />
                <p className="chat-wrapper__dev-settings-help">
                  Application name for this agent configuration.
                </p>
              </div>
              
            </>
          )}

          {/* Thread Attachment Tab */}
          {activeTab === "thread" && !loading && (
            <>
              <div className="chat-wrapper__dev-settings-info">
                <p><strong>Provider Resource ID:</strong> {providerResId || "No active conversation"}</p>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                  Note: Entity ownership is typically set at initialization. Use this to update business context.
                </p>
              </div>

              {/* Business Context Section - Primary Use */}
              <div className="chat-wrapper__dev-settings-section">
                <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Update Business Context</h4>
                <p style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>
                  Update dynamic metadata like order IDs, table IDs, status, etc.
                </p>

                <div className="chat-wrapper__dev-settings-field">
                  <label htmlFor="tag">Tag:</label>
                  <input
                    id="tag"
                    type="text"
                    value={tempTag}
                    onChange={(e) => setTempTag(e.target.value)}
                    placeholder="e.g., customer-inquiry, support"
                    className="chat-wrapper__dev-settings-input"
                    disabled={loading || !providerResId}
                  />
                  <p className="chat-wrapper__dev-settings-help">
                    Optional tag for categorizing the thread.
                  </p>
                </div>

                <div className="chat-wrapper__dev-settings-field">
                  <label htmlFor="metadata">Metadata (JSON):</label>
                  <textarea
                    id="metadata"
                    value={tempMetadata}
                    onChange={(e) => setTempMetadata(e.target.value)}
                    placeholder='{"orderId": "order_789", "tableId": "table_5", "status": "pending"}'
                    className="chat-wrapper__dev-settings-input"
                    rows={4}
                    disabled={loading || !providerResId}
                  />
                  <p className="chat-wrapper__dev-settings-help">
                    App-specific business data (orderId, tableId, campaignId, etc.).
                  </p>
                </div>
              </div>

              {/* Separator */}
              <div style={{ borderTop: '1px solid #e0e0e0', margin: '20px 0' }}></div>

              {/* Entity Ownership Section - Advanced/Rare */}
              <details style={{ marginTop: '16px' }}>
                <summary style={{ cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#666' }}>
                  Advanced: Change Entity Ownership (Rare)
                </summary>
                <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                    ⚠️ Entity is typically set at initialization. Only change this if transferring conversation ownership.
                  </p>

                  <div className="chat-wrapper__dev-settings-field">
                    <label htmlFor="entity-id">Entity ID:</label>
                    <input
                      id="entity-id"
                      type="text"
                      value={tempEntityId}
                      onChange={(e) => setTempEntityId(e.target.value)}
                      placeholder="e.g., brand_123 or account_456"
                      className="chat-wrapper__dev-settings-input"
                      disabled={loading || !providerResId}
                    />
                    <p className="chat-wrapper__dev-settings-help">
                      The brand or account ID to attach this thread to.
                    </p>
                  </div>

                  <div className="chat-wrapper__dev-settings-field">
                    <label htmlFor="entity-type">Entity Type:</label>
                    <select
                      id="entity-type"
                      value={tempEntityType}
                      onChange={(e) => setTempEntityType(e.target.value as "BRAND" | "ACCOUNT" | "")}
                      className="chat-wrapper__dev-settings-input"
                      disabled={loading || !providerResId}
                    >
                      <option value="">-- Select Type --</option>
                      <option value="BRAND">BRAND</option>
                      <option value="ACCOUNT">ACCOUNT</option>
                    </select>
                    <p className="chat-wrapper__dev-settings-help">
                      Type of entity (BRAND or ACCOUNT).
                    </p>
                  </div>
                </div>
              </details>
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
          {activeTab === "agent" && (
            <button
              className="chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save"
              onClick={handleSave}
              disabled={loading || !config}
            >
              {loading ? 'Saving...' : 'Save & Reload'}
            </button>
          )}
          {activeTab === "thread" && (
            <button
              className="chat-wrapper__dev-settings-btn chat-wrapper__dev-settings-btn--save"
              onClick={handleThreadAttachment}
              disabled={loading || !providerResId}
            >
              {loading ? 'Updating...' : 'Update Thread'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};