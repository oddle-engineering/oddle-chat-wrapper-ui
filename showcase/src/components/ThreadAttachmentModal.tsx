import { useState, useCallback, useEffect } from "react";
import { updateThread } from "@oddle/chat-wrapper-ui";
import "./ThreadAttachmentModal.css";

interface ThreadAttachmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerResId: string | null;
  apiUrl: string;
  userMpAuthToken?: string;
  chatServerKey?: string;
}

export const ThreadAttachmentModal = ({
  isOpen,
  onClose,
  providerResId,
  apiUrl,
  userMpAuthToken,
  chatServerKey,
}: ThreadAttachmentModalProps) => {
  const [tempEntityId, setTempEntityId] = useState("");
  const [tempEntityType, setTempEntityType] = useState<"BRAND" | "ACCOUNT" | "">("BRAND");
  const [tempTag, setTempTag] = useState("");
  const [tempMetadata, setTempMetadata] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTempEntityId("");
      setTempEntityType("BRAND");
      setTempTag("");
      setTempMetadata("");
      setError(null);
      setSuccessMessage(null);
    }
  }, [isOpen]);

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

      // Build updates object
      const updates: {
        entityId?: string | null;
        entityType?: string | null;
        tag?: string | null;
        metadata?: any;
      } = {};

      if (tempEntityId) {
        updates.entityId = tempEntityId;
        updates.entityType = tempEntityType || null;
      }
      if (tempTag) {
        updates.tag = tempTag;
      }
      if (parsedMetadata) {
        updates.metadata = parsedMetadata;
      }

      // Call update API
      await updateThread(
        apiUrl,
        providerResId,
        updates,
        {
          userMpAuthToken,
          chatServerKey,
        }
      );

      setSuccessMessage("Thread attached successfully!");
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to attach thread");
    } finally {
      setLoading(false);
    }
  }, [apiUrl, providerResId, tempEntityId, tempEntityType, tempTag, tempMetadata, userMpAuthToken, chatServerKey, onClose]);

  if (!isOpen) return null;

  return (
    <div className="thread-modal-overlay" onClick={onClose}>
      <div className="thread-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="thread-modal-header">
          <h2>Thread Attachment</h2>
          <button className="thread-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="thread-modal-body">
          <div className="thread-modal-info">
            <p><strong>Provider Resource ID:</strong> {providerResId || "No active conversation"}</p>
          </div>

          {error && (
            <div className="thread-modal-error">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="thread-modal-success">
              {successMessage}
            </div>
          )}

          <div className="thread-modal-form">
            <div className="thread-modal-form-group">
              <label htmlFor="entityId">Entity ID</label>
              <input
                id="entityId"
                type="text"
                value={tempEntityId}
                onChange={(e) => setTempEntityId(e.target.value)}
                placeholder="e.g., brand_123"
                disabled={loading || !providerResId}
              />
            </div>

            <div className="thread-modal-form-group">
              <label htmlFor="entityType">Entity Type</label>
              <select
                id="entityType"
                value={tempEntityType}
                onChange={(e) => setTempEntityType(e.target.value as "BRAND" | "ACCOUNT" | "")}
                disabled={loading || !providerResId}
              >
                <option value="">-- Select Type --</option>
                <option value="BRAND">BRAND</option>
                <option value="ACCOUNT">ACCOUNT</option>
              </select>
            </div>

            <div className="thread-modal-form-group">
              <label htmlFor="tag">Tag (Optional)</label>
              <input
                id="tag"
                type="text"
                value={tempTag}
                onChange={(e) => setTempTag(e.target.value)}
                placeholder="e.g., customer-support"
                disabled={loading || !providerResId}
              />
            </div>

            <div className="thread-modal-form-group">
              <label htmlFor="metadata">Metadata (Optional JSON)</label>
              <textarea
                id="metadata"
                value={tempMetadata}
                onChange={(e) => setTempMetadata(e.target.value)}
                placeholder='{"priority": "high", "category": "billing"}'
                disabled={loading || !providerResId}
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="thread-modal-footer">
          <button
            onClick={onClose}
            disabled={loading}
            className="thread-modal-button thread-modal-button-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleThreadAttachment}
            disabled={loading || !providerResId}
            className="thread-modal-button thread-modal-button-primary"
          >
            {loading ? "Attaching..." : "Attach Thread"}
          </button>
        </div>
      </div>
    </div>
  );
};
