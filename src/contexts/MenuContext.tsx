// src/contexts/MenuContext.tsx
import { createContext, useContext } from "react";
import { MenuItem } from "../types/menu";

export interface MenuContextType {
  menu: MenuItem[];
  loading: boolean;
  loadMenu: () => Promise<void>;
  addMenuItem: (item: Omit<MenuItem, "id">) => Promise<void>;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => Promise<void>; // <-- atualizado
  removeMenuItem: (id: string) => Promise<void>;
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenuContext = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext deve ser usado dentro de um MenuProvider");
  }
  return context;
};
