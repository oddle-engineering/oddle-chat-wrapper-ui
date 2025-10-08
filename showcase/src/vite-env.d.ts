/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_MOCK_API: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_BRIEF_PLANNER_ENDPOINT: string
  readonly VITE_CONVERSATION_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}