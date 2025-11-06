import React from "react";

/**
 * FileUploadService - Handles file upload operations with authentication and error handling
 */

export interface UploadResult {
  url: string;
  fileName?: string;
  type: string;
  success: boolean;
}

export interface UploadError {
  file: File;
  error: string;
  fallbackData?: string;
}

export interface FileUploadConfig {
  apiUrl: string;
  userMpAuthToken: string;
  chatServerKey: string;
  folder?: string;
  maxFileSize?: number; // in bytes
  allowedTypes?: string[];
}

export interface UploadProgress {
  file: File;
  progress: number;
  status: "uploading" | "completed" | "error";
}

export class FileUploadService {
  private config: FileUploadConfig;
  private defaultFolder = "chat-uploads";
  private defaultMaxFileSize = 10 * 1024 * 1024; // 10MB

  constructor(config: FileUploadConfig) {
    this.config = {
      folder: this.defaultFolder,
      maxFileSize: this.defaultMaxFileSize,
      ...config,
    };
  }

  /**
   * Upload multiple files with authentication and error handling
   */
  async uploadFiles(
    files: File[],
    onProgress?: (progress: UploadProgress[]) => void
  ): Promise<string[]> {
    const results: string[] = [];
    const progressTracker: UploadProgress[] = files.map((file) => ({
      file,
      progress: 0,
      status: "uploading",
    }));

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        // Validate file before upload
        this.validateFile(file);

        // Update progress
        if (onProgress) {
          progressTracker[i].progress = 0;
          onProgress([...progressTracker]);
        }

        const result = await this.uploadSingleFile(file, (progress) => {
          if (onProgress) {
            progressTracker[i].progress = progress;
            onProgress([...progressTracker]);
          }
        });

        results.push(result);
        progressTracker[i].status = "completed";
        progressTracker[i].progress = 100;
      } catch (error) {
        console.error(`❌ Upload failed for ${file.name}:`, error);
        progressTracker[i].status = "error";

        // Attempt fallback for images
        const fallbackResult = await this.handleUploadFallback(file);
        if (fallbackResult) {
          results.push(fallbackResult);
        }
      }

      if (onProgress) {
        onProgress([...progressTracker]);
      }
    }

    return results;
  }

  /**
   * Upload a single file with authentication
   */
  private async uploadSingleFile(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", this.config.folder || this.defaultFolder);

    const headers = this.buildAuthHeaders();

    // Create XMLHttpRequest for progress tracking
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      });

      xhr.addEventListener("load", async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const result = JSON.parse(xhr.responseText);
            const mediaUrl = this.processUploadResult(file, result);
            resolve(mediaUrl);
          } catch (error) {
            reject(new Error("Invalid response format"));
          }
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Network error during upload"));
      });

      xhr.open("POST", `${this.config.apiUrl}/api/v1/upload`);

      // Set headers
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.send(formData);
    });
  }

  /**
   * Process the upload result and return appropriate media URL
   */
  private processUploadResult(file: File, result: any): string {
    if (file.type.startsWith("image/")) {
      return result.url;
    } else {
      // For non-image files, create a data URL format with metadata
      return `data:${file.type};name=${encodeURIComponent(
        result.fileName || file.name
      )};url=${encodeURIComponent(result.url)}`;
    }
  }

  /**
   * Handle upload failure with fallback strategies
   */
  private async handleUploadFallback(file: File): Promise<string | null> {
    if (file.type.startsWith("image/")) {
      // Fallback to base64 encoding for images
      try {
        return await this.convertToBase64(file);
      } catch (error) {
        console.error("Base64 conversion failed:", error);
        return null;
      }
    } else {
      // For other files, store metadata with filename
      return `data:${file.type};name=${encodeURIComponent(
        file.name
      )};base64,placeholder`;
    }
  }

  /**
   * Convert file to base64 data URL
   */
  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Validate file before upload
   */
  private validateFile(file: File): void {
    // Check file size
    if (file.size > (this.config.maxFileSize || this.defaultMaxFileSize)) {
      throw new Error(
        `File ${file.name} is too large. Maximum size is ${this.formatFileSize(
          this.config.maxFileSize || this.defaultMaxFileSize
        )}`
      );
    }

    // Check file type if allowedTypes is specified
    if (this.config.allowedTypes && this.config.allowedTypes.length > 0) {
      const isAllowed = this.config.allowedTypes.some(
        (type) =>
          file.type.startsWith(type) || file.name.toLowerCase().endsWith(type)
      );

      if (!isAllowed) {
        throw new Error(`File type ${file.type} is not allowed`);
      }
    }
  }

  /**
   * Build authentication headers
   */
  private buildAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};

    if (this.config.userMpAuthToken) {
      headers["x-oddle-mp-auth-token"] = this.config.userMpAuthToken;
    }

    if (this.config.chatServerKey) {
      headers["x-oddle-chat-server-key"] = this.config.chatServerKey;
    }

    return headers;
  }

  /**
   * Format file size for display
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<FileUploadConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get current configuration
   */
  getConfig(): FileUploadConfig {
    return { ...this.config };
  }
}

/**
 * Hook for using FileUploadService with React
 */
export function useFileUpload(config: FileUploadConfig) {
  const [uploadProgress, setUploadProgress] = React.useState<UploadProgress[]>(
    []
  );
  const [isUploading, setIsUploading] = React.useState(false);

  const service = React.useMemo(
    () => new FileUploadService(config),
    [
      config.apiUrl,
      config.userMpAuthToken,
      config.chatServerKey,
      config.folder,
      config.maxFileSize,
    ]
  );

  const uploadFiles = React.useCallback(
    async (files: File[]): Promise<string[]> => {
      setIsUploading(true);
      setUploadProgress([]);

      try {
        const results = await service.uploadFiles(files, setUploadProgress);
        return results;
      } finally {
        setIsUploading(false);
      }
    },
    [service]
  );

  return {
    uploadFiles,
    uploadProgress,
    isUploading,
    service,
  };
}
