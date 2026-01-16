/**
 * Translation system types
 */

export interface TranslationResources {
  [key: string]: string | TranslationResources;
}

export interface TranslationContextValue {
  /** Translation function - returns translated string for given key */
  t: (key: string, options?: Record<string, string | number>) => string;
  /** Current locale */
  locale: string;
  /** Whether translations are still loading */
  isLoading: boolean;
  /** Whether translations are ready to use */
  isReady: boolean;
  /** Error if translation loading failed */
  error: Error | null;
}

export interface TranslationProviderProps {
  /** Children to render */
  children: React.ReactNode;
  /** Locale to use for translations (default: 'en') */
  locale?: string;
  /** Chat server URL for API calls */
  chatServerUrl: string;
  /** Chat server API key */
  chatServerKey: string;
  /** MP auth token for authentication */
  mpAuthToken: string;
  /** Fallback content to show while loading */
  fallback?: React.ReactNode;
}
