/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly HVAC_BASE_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }