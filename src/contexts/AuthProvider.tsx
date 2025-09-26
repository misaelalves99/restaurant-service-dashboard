// restaurant-service-dashboard/src/contexts/AuthProvider.tsx

import React, { useState, useEffect, ReactNode } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";
import { User } from "../types/customer";

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, _password: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const fakeUser = { id: "1", name: "Demo User", email };
        setUser(fakeUser);
        localStorage.setItem("authUser", JSON.stringify(fakeUser));
        resolve();
      }, 1000); // simula tempo de requisição
    });
  };

  const register = async (name: string, email: string, _password: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const fakeUser = { id: "2", name, email };
        setUser(fakeUser);
        localStorage.setItem("authUser", JSON.stringify(fakeUser));
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const value: AuthContextType = { user, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
