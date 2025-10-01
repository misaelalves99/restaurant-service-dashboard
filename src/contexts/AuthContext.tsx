// restaurant-service-dashboard/src/contexts/AuthContext.tsx
import { createContext } from "react";
import { User } from "../types/customer";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
