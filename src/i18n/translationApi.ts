/**
 * Translation API service
 * Fetches translation JSON from the chat server based on locale
 */

import { TranslationResources } from './types';

interface FetchTranslationsParams {
  chatServerUrl: string;
  chatServerKey: string;
  mpAuthToken: string;
  locale: string;
}

/**
 * API response structure from /api/v1/translations/{locale}
 */
interface TranslationApiResponse {
  success: boolean;
  language: string;
  resolvedLanguage: string;
  translations: TranslationResources;
  metadata?: {
    cachedAt?: number;
    namespace?: string;
    responseTime?: number;
  };
}

/**
 * Fetches translation resources from the chat server
 *
 * @param params - Configuration for fetching translations
 * @returns Promise with translation resources
 * @throws Error if the fetch fails
 */
export async function fetchTranslations({
  chatServerUrl,
  chatServerKey,
  mpAuthToken,
  locale,
}: FetchTranslationsParams): Promise<TranslationResources> {
  // Normalize the URL - remove trailing slash and ensure https
  const baseUrl = chatServerUrl.replace(/\/$/, '').replace(/^ws(s)?:/, 'http$1:');
  const url = `${baseUrl}/api/v1/translations/${locale}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-oddle-chat-server-key': chatServerKey,
      'x-oddle-mp-auth-token': mpAuthToken,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    // If locale not found, try falling back to 'en'
    if (response.status === 404 && locale !== 'en') {
      console.warn(`Translations not found for locale '${locale}', falling back to 'en'`);
      return fetchTranslations({
        chatServerUrl,
        chatServerKey,
        mpAuthToken,
        locale: 'en',
      });
    }
    throw new Error(`Failed to fetch translations: ${response.status} ${response.statusText}`);
  }

  const data: TranslationApiResponse = await response.json();

  if (!data.success || !data.translations) {
    throw new Error('Invalid translation response: missing translations data');
  }

  return data.translations;
}
