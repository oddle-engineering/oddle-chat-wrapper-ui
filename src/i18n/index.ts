/**
 * i18n module - Translation support for ChatWrapper
 */

export { TranslationProvider, useTranslations, useI18next } from './TranslationProvider';
export { fetchTranslations } from './translationApi';
export type {
  TranslationResources,
  TranslationContextValue,
  TranslationProviderProps,
} from './types';
