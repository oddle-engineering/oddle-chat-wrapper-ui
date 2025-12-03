import React from "react";

/**
 * FileUploadService - Handles file upload operations with authentication and error handling
 */

export interface UploadResult {
  url: string;
  fileName?: string;
  type: string;
  success: boolean;
  thumbnailUrl?: string;
  cdnUrl?: string;
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
  private defaultMaxFileSize = 15 * 1024 * 1024; // 15MB

  constructor(config: FileUploadConfig) {
    this.config = {
      folder: this.defaultFolder,
      maxFileSize: this.defaultMaxFileSize,
      ...config,
    };
  }

  /**
   * Upload files with authentication and error handling
   * Single file: uses "file" field name
   * Multiple files: uses "files" field name in single request
   */
  async uploadFiles(
    files: File[],
    onProgress?: (progress: UploadProgress[]) => void
  ): Promise<string[]> {
    // Validate all files before upload
    files.forEach(file => this.validateFile(file));

    if (files.length === 1) {
      // Single file upload - use "file" field name
      return [await this.uploadSingleFile(files[0], onProgress ? (progress) => {
        const progressTracker: UploadProgress[] = [{
          file: files[0],
          progress,
          status: progress === 100 ? "completed" : "uploading"
        }];
        onProgress(progressTracker);
      } : undefined)];
    } else {
      // Multiple files in single request - use "files" field name
      return this.uploadMultipleFiles(files, onProgress);
    }
  }

  /**
   * Upload multiple files in a single request using "files" field name
   */
  private async uploadMultipleFiles(
    files: File[],
    onProgress?: (progress: UploadProgress[]) => void
  ): Promise<string[]> {
    const formData = new FormData();
    
    // Append all files with "files" field name (supports multiple)
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("folder", this.config.folder || this.defaultFolder);

    const headers = this.buildAuthHeaders();
    const progressTracker: UploadProgress[] = files.map((file) => ({
      file,
      progress: 0,
      status: "uploading" as const,
    }));

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = (event.loaded / event.total) * 100;
          // Update progress for all files equally since it's a batch upload
          progressTracker.forEach((tracker) => {
            tracker.progress = progress;
          });
          onProgress([...progressTracker]);
        }
      });

      xhr.addEventListener("load", async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const result = JSON.parse(xhr.responseText);
            
            // Handle response structure for multiple files
            // API returns: { success: true, data: [...] } for multiple files
            // API returns: { success: true, url: "...", cdnUrl: "..." } for single file
            let urls: string[];
            if (result.data && Array.isArray(result.data)) {
              // Multiple files: extract URLs from data array
              urls = result.data.map((item: any, index: number) => this.processUploadResult(files[index], item));
            } else if (Array.isArray(result)) {
              // Fallback: direct array response
              urls = result.map((item: any, index: number) => this.processUploadResult(files[index], item));
            } else {
              // Single file: process directly
              urls = [this.processUploadResult(files[0], result)];
            }
            
            // Mark all as completed
            progressTracker.forEach((tracker) => {
              tracker.status = "completed";
              tracker.progress = 100;
            });
            if (onProgress) {
              onProgress([...progressTracker]);
            }
            
            resolve(urls);
          } catch (error) {
            // Mark all as failed
            progressTracker.forEach((tracker) => {
              tracker.status = "error";
            });
            if (onProgress) {
              onProgress([...progressTracker]);
            }
            reject(new Error("Invalid response format"));
          }
        } else {
          // Mark all as failed
          progressTracker.forEach((tracker) => {
            tracker.status = "error";
          });
          if (onProgress) {
            onProgress([...progressTracker]);
          }
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", () => {
        progressTracker.forEach((tracker) => {
          tracker.status = "error";
        });
        if (onProgress) {
          onProgress([...progressTracker]);
        }
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
   * Process the upload result and return the CDN URL directly
   */
  private processUploadResult(_file: File, result: any): string {
    // Return the CDN URL directly for all file types
    return result.cdnUrl || result.url;
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
