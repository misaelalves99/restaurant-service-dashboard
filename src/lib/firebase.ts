// restaurant-service-dashboard/src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

// Validação rápida das envs — ajuda a achar erro de config na Vercel
const must = (v: string | undefined, name: string) => {
  if (!v || v.includes("SEU_") || v.includes("COLE_SEU")) {
    throw new Error(`[Env] ${name} ausente/placeholder. Configure nas variáveis de ambiente da Vercel.`);
  }
  return v;
};

const firebaseConfig = {
  apiKey: must(import.meta.env.VITE_FIREBASE_API_KEY, "VITE_FIREBASE_API_KEY"),
  authDomain: must(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, "VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: must(import.meta.env.VITE_FIREBASE_PROJECT_ID, "VITE_FIREBASE_PROJECT_ID"),
  storageBucket: must(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, "VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: must(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, "VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: must(import.meta.env.VITE_FIREBASE_APP_ID, "VITE_FIREBASE_APP_ID"),
  // measurementId é opcional; pode remover se não usar analytics:
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
// Persistência de sessão (evita sumir login ao recarregar)
setPersistence(auth, browserLocalPersistence);

// Providers sociais
export const googleProvider = new GoogleAuthProvider();
// Força escolha de conta – evita cachear a conta errada
googleProvider.setCustomParameters({ prompt: "select_account" });

export const facebookProvider = new FacebookAuthProvider();
