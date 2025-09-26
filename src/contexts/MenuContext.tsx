// src/contexts/MenuContext.tsx

import { createContext } from "react";
import { MenuItem } from "../types/menu";

export interface MenuContextType {
  menu: MenuItem[];
  loading: boolean;
  loadMenu: () => Promise<void>;
  addMenuItem: (item: Omit<MenuItem, "id">) => Promise<void>;
  editMenuItem: (id: string, updates: Partial<MenuItem>) => Promise<void>;
  removeMenuItem: (id: string) => Promise<void>;
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);
