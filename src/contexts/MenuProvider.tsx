// src/contexts/MenuProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { MenuItem } from "../types/menu";

interface MenuContextType {
  menu: MenuItem[];
  loading: boolean;
  addMenuItem: (item: Omit<MenuItem, "id">) => Promise<void>;
  removeMenuItem: (id: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>([
    { id: "1", name: "Pizza Margherita", price: 25 },
    { id: "2", name: "Hamburger", price: 18 },
    { id: "3", name: "Pasta Carbonara", price: 30 },
  ]);
  const [loading, setLoading] = useState(false);

  const addMenuItem = async (item: Omit<MenuItem, "id">) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500)); // simula delay
    setMenu((prev) => [...prev, { ...item, id: Date.now().toString() }]);
    setLoading(false);
  };

  const removeMenuItem = (id: string) => {
    setMenu((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menu, loading, addMenuItem, removeMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenuContext must be used within MenuProvider");
  return context;
};
