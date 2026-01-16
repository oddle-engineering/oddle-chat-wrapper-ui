/**
 * TranslationProvider - Provides i18n translations to child components
 *
 * Fetches translations from the chat server API and initializes i18next.
 * Provides a loading state while translations are being fetched.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { fetchTranslations } from "./translationApi";
import {
  TranslationContextValue,
  TranslationProviderProps,
  TranslationResources,
} from "./types";

// Create a separate i18n instance for this component library
// This prevents conflicts with host application's i18n setup
const createI18nInstance = () => {
  const instance = i18n.createInstance();
  instance.use(initReactI18next);
  return instance;
};

const TranslationContext = createContext<TranslationContextValue | null>(null);

// Default translations to use while loading or if fetch fails
// Structure matches the API response format
const defaultTranslations: TranslationResources = {
  chat: {
    connection: {
      reconnecting: "Reconnecting...",
    },
    errors: {
      authentication:
        "Authentication error. Please refresh the page and try again.",
      connection:
        "Connection error. Please check your internet connection and try again.",
      retry: "Retry",
      timeout: "Request timed out. Please try again.",
      unexpected: "An unexpected error occurred. Please try again.",
    },
    fileUpload: {
      maxFilesExceeded: "Maximum {{maxFiles}} files allowed",
      sizeLimitExceeded: "File size must be less than {{maxSize}}MB",
      typeNotAllowed: "Only image files are allowed",
    },
    input: {
      placeholder: "What would you like to know?",
    },
    tools: {
      completed: "Completed",
      executing: "Executing...",
      failed: "Failed",
    },
    reasoning: {
      thinking: "Thinking...",
      thought: "Thought",
      completed: "Completed",
      error: "Error",
      processing: "Processing",
      duration: {
        for: "for",
        second: "second",
        seconds: "seconds",
      },
    },
  },
};

export function TranslationProvider({
  children,
  locale = "en",
  chatServerUrl,
  chatServerKey,
  mpAuthToken,
  fallback,
}: TranslationProviderProps) {
  const [i18nInstance] = useState(() => createI18nInstance());
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Track if translations have been successfully loaded (prevents re-fetching)
  const hasLoadedRef = useRef(false);

  // Initialize i18next with fetched translations
  const initializeI18n = useCallback(
    async (translations: TranslationResources, lang: string) => {
      if (!i18nInstance.isInitialized) {
        await i18nInstance.init({
          lng: lang,
          fallbackLng: "en",
          resources: {
            [lang]: {
              translation: translations,
            },
          },
          interpolation: {
            escapeValue: false, // React already escapes values
          },
          react: {
            useSuspense: false,
          },
        });
      } else {
        // If already initialized, add the resources and change language
        i18nInstance.addResourceBundle(
          lang,
          "translation",
          translations,
          true,
          true
        );
        await i18nInstance.changeLanguage(lang);
      }
    },
    [i18nInstance]
  );

  // Fetch and load translations (only once)
  useEffect(() => {
    // Skip if already successfully loaded
    if (hasLoadedRef.current) {
      return;
    }

    let isMounted = true;

    const loadTranslations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const translations = await fetchTranslations({
          chatServerUrl,
          chatServerKey,
          mpAuthToken,
          locale,
        });

        if (!isMounted) return;

        await initializeI18n(translations, locale);
        hasLoadedRef.current = true; // Mark as loaded to prevent re-fetching
        setIsReady(true);
      } catch (err) {
        if (!isMounted) return;

        console.error("Failed to load translations:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to load translations")
        );

        // Initialize with default translations as fallback
        await initializeI18n(defaultTranslations, "en");
        hasLoadedRef.current = true; // Also mark as loaded on fallback
        setIsReady(true);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTranslations();

    return () => {
      isMounted = false;
    };
  }, [locale, chatServerUrl, chatServerKey, mpAuthToken, initializeI18n]);

  // Translation function with fallback
  const t = useCallback(
    (key: string, options?: Record<string, string | number>): string => {
      if (!i18nInstance.isInitialized) {
        // Return the key itself if i18n is not ready
        return key;
      }
      return i18nInstance.t(key, options) || key;
    },
    [i18nInstance]
  );

  const contextValue = useMemo<TranslationContextValue>(
    () => ({
      t,
      locale,
      isLoading,
      isReady,
      error,
    }),
    [t, locale, isLoading, isReady, error]
  );

  // Show fallback while loading (optional)
  if (isLoading && fallback) {
    return <>{fallback}</>;
  }

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
}

/**
 * Hook to access translation functions and state
 *
 * @returns Translation context with t function, locale, and loading state
 * @throws Error if used outside TranslationProvider
 *
 * @example
 * ```tsx
 * function ChatHeader() {
 *   const { t, isReady } = useTranslations();
 *   return <h1>{t('chat.title')}</h1>;
 * }
 * ```
 */
export function useTranslations(): TranslationContextValue {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error(
      "useTranslations must be used within TranslationProvider. " +
        "Make sure your component is wrapped with <TranslationProvider>."
    );
  }

  return context;
}

/**
 * Hook to access the underlying i18next t function from react-i18next
 * Use this if you need more advanced i18next features
 */
export function useI18next() {
  return useTranslation();
}
