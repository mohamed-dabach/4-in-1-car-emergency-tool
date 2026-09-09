/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL ديال Google Apps Script لي كيستقبل الطلبات */
  readonly VITE_ORDERS_WEBHOOK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
