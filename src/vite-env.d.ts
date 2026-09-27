/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** مشروع Firebase لي كيتسجلو فيه الطلبات (Firestore) */
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  readonly VITE_FIREBASE_API_KEY?: string;
  /** URL ديال Google Apps Script — احتياط إلا Firestore طاح */
  readonly VITE_ORDERS_WEBHOOK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
