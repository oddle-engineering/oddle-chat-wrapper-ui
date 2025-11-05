/**
 * Base API Service with common functionality
 * Provides consistent error handling, authentication, and request patterns
 */

export interface ApiRequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
}

export interface AuthOptions {
  userMpAuthToken?: string;
  chatServerKey?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

export class BaseApiService {
  protected readonly baseUrl: string;
  protected readonly defaultTimeout: number = 10000;
  protected readonly defaultRetries: number = 3;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, ""); // Remove trailing slash
  }

  /**
   * Build standardized headers with authentication
   */
  protected buildHeaders(
    authOptions?: AuthOptions,
    customHeaders?: Record<string, string>
  ): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    // Add authentication headers
    if (authOptions?.userMpAuthToken) {
      headers["x-oddle-mp-auth-token"] = authOptions.userMpAuthToken;
    }
    if (authOptions?.chatServerKey) {
      headers["x-oddle-chat-server-key"] = authOptions.chatServerKey;
    }

    return headers;
  }

  /**
   * Build full URL with base URL and endpoint
   */
  protected buildUrl(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const versionedEndpoint = cleanEndpoint.startsWith("/api/v1")
      ? cleanEndpoint
      : `/api/v1${cleanEndpoint}`;
    return `${this.baseUrl}${versionedEndpoint}`;
  }

  /**
   * Make HTTP request with standardized error handling and retries
   */
  protected async request<T = any>(
    endpoint: string,
    config: ApiRequestConfig = {},
    authOptions?: AuthOptions
  ): Promise<T> {
    const {
      method = "GET",
      headers: customHeaders,
      body,
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
    } = config;

    const url = this.buildUrl(endpoint);
    const headers = this.buildHeaders(authOptions, customHeaders);

    // Build fetch options
    const fetchOptions: RequestInit = {
      method,
      headers,
      signal: AbortSignal.timeout(timeout),
    };

    // Add body for non-GET requests
    if (body && method !== "GET") {
      fetchOptions.body =
        typeof body === "string" ? body : JSON.stringify(body);
    }

    // Retry logic
    let lastError: Error = new Error("Request failed");
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        console.log(
          `API Request [${method}] ${url}${
            attempt > 0 ? ` (attempt ${attempt + 1})` : ""
          }`
        );

        const response = await fetch(url, fetchOptions);

        // Handle HTTP errors
        if (!response.ok) {
          const errorData = await this.parseErrorResponse(response);
          throw new ApiError(
            errorData.error ||
              `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            errorData.code,
            url
          );
        }

        // Parse and return response
        const data = await response.json();
        console.log(`API Response [${method}] ${url}: Success`);
        return data;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Don't retry on authentication errors or client errors (4xx)
        if (
          error instanceof ApiError &&
          error.status >= 400 &&
          error.status < 500
        ) {
          break;
        }

        // Don't retry on last attempt
        if (attempt === retries) {
          break;
        }

        // Exponential backoff delay
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
        console.warn(`API Request failed, retrying in ${delay}ms...`, error);
        await this.delay(delay);
      }
    }

    console.error(
      `API Request [${method}] ${url}: Failed after ${retries + 1} attempts`,
      lastError
    );
    throw lastError;
  }

  /**
   * Parse error response from server
   */
  private async parseErrorResponse(
    response: Response
  ): Promise<{ error?: string; code?: string }> {
    try {
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return await response.json();
      }
      return { error: await response.text() };
    } catch {
      return { error: `HTTP ${response.status}: ${response.statusText}` };
    }
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * GET request helper
   */
  protected async get<T>(
    endpoint: string,
    authOptions?: AuthOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" }, authOptions);
  }

  /**
   * POST request helper
   */
  protected async post<T>(
    endpoint: string,
    body?: any,
    authOptions?: AuthOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { method: "POST", body }, authOptions);
  }

  /**
   * PUT request helper
   */
  protected async put<T>(
    endpoint: string,
    body?: any,
    authOptions?: AuthOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { method: "PUT", body }, authOptions);
  }

  /**
   * DELETE request helper
   */
  protected async delete<T>(
    endpoint: string,
    authOptions?: AuthOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" }, authOptions);
  }
}

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly url?: string
  ) {
    super(message);
    this.name = "ApiError";
  }

  /**
   * Check if error is authentication related
   */
  isAuthError(): boolean {
    return (
      this.status === 401 ||
      this.code === "AUTH_INVALID" ||
      this.code === "AUTH_MISSING"
    );
  }

  /**
   * Check if error is a client error (4xx)
   */
  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  /**
   * Check if error is a server error (5xx)
   */
  isServerError(): boolean {
    return this.status >= 500;
  }
}
