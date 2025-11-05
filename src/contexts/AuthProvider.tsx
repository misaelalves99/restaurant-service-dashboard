import React, { useState, useEffect, ReactNode } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";
import { User } from "../types/customer";
import { auth, googleProvider, facebookProvider } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from "firebase/auth";

interface Props {
  children: ReactNode;
}

/**
 * Utilitário para formatar o objeto do usuário da aplicação
 */
const toAppUser = (fbUser: FirebaseUser): User => ({
  id: fbUser.uid,
  name: fbUser.displayName ?? "",
  email: fbUser.email ?? "",
});

/**
 * (Opcional) Mapeia códigos comuns de erro para mensagens legíveis.
 * Use na UI se quiser exibir mensagens amigáveis.
 */
export const mapAuthError = (code?: string) => {
  switch (code) {
    case "auth/invalid-email":
      return "E-mail inválido.";
    case "auth/user-disabled":
      return "Usuário desativado.";
    case "auth/user-not-found":
      return "Usuário não encontrado.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "E-mail ou senha incorretos.";
    case "auth/email-already-in-use":
      return "Este e-mail já está cadastrado.";
    case "auth/weak-password":
      return "A senha deve ter pelo menos 6 caracteres.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente mais tarde.";
    case "auth/unauthorized-domain":
      return "Domínio não autorizado nas configurações do Firebase.";
    default:
      return "Falha na autenticação. Tente novamente.";
  }
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Observa mudanças de sessão (login/logout/atualização de perfil)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const u = toAppUser(firebaseUser);
        setUser(u);
        try {
          localStorage.setItem("authUser", JSON.stringify(u));
        } catch {
          /* ignore quota errors */
        }
      } else {
        setUser(null);
        try {
          localStorage.removeItem("authUser");
        } catch {
          /* ignore */
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // ---------- Autenticação por e-mail/senha ----------
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged cuidará do setUser
    } catch (err: any) {
      console.error("Email login error:", err?.code, err?.message);
      throw err; // repropaga para a tela decidir a mensagem usando mapAuthError
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (cred.user && name.trim()) {
        await updateProfile(cred.user, { displayName: name.trim() });
      }
      // onAuthStateChanged cuidará do setUser
    } catch (err: any) {
      console.error("Email register error:", err?.code, err?.message);
      throw err;
    }
  };

  // ---------- Autenticação social ----------
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error("Google sign-in error:", err?.code, err?.message);
      throw err;
    }
  };

  const loginWithFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
    } catch (err: any) {
      console.error("Facebook sign-in error:", err?.code, err?.message);
      throw err;
    }
  };

  // ---------- Logout ----------
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error("Sign-out error:", err?.code, err?.message);
      throw err;
    }
  };

  const value: AuthContextType & {
    loginWithGoogle: () => Promise<void>;
    loginWithFacebook: () => Promise<void>;
  } = {
    user,
    login,
    register,
    logout,
    loginWithGoogle,
    loginWithFacebook,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
