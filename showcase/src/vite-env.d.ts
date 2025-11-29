/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TOLGEE_API_URL: string
  readonly VITE_APP_TOLGEE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  interface Window {
    __VITE_APP_TOLGEE_API_URL__?: string
    __VITE_APP_TOLGEE_API_KEY__?: string
  }
}