// restaurant-service-dashboard/src/contexts/AuthProvider.tsx

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

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Observa mudanças de sessão
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const formattedUser: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "",
          email: firebaseUser.email || "",
        };
        setUser(formattedUser);
        localStorage.setItem("authUser", JSON.stringify(formattedUser));
      } else {
        setUser(null);
        localStorage.removeItem("authUser");
      }
    });
    return () => unsubscribe();
  }, []);

  // Login com email e senha
  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Registro com email e senha
  const register = async (name: string, email: string, password: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (cred.user) {
      await updateProfile(cred.user, { displayName: name });
    }
  };

  // Login social
  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const loginWithFacebook = async () => {
    await signInWithPopup(auth, facebookProvider);
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
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
