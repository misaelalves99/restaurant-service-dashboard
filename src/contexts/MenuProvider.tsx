// src/contexts/MenuProvider.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { MenuItem } from "../types/menu";
import { fetchMenu, createMenuItem, updateMenuItem, deleteMenuItem } from "../api/menu";

interface MenuContextType {
  menu: MenuItem[];
  loading: boolean;
  loadMenu: () => Promise<void>;
  addMenuItem: (item: Omit<MenuItem, "id">) => Promise<void>;
  editMenuItem: (id: string, updates: Partial<MenuItem>) => Promise<void>;
  removeMenuItem: (id: string) => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMenu = async () => {
    setLoading(true);
    try {
      const data = await fetchMenu();
      setMenu(data);
    } catch (err) {
      console.error("Erro ao carregar menu:", err);
    } finally {
      setLoading(false);
    }
  };

  const addMenuItem = async (item: Omit<MenuItem, "id">) => {
    setLoading(true);
    try {
      const newItem = await createMenuItem(item);
      setMenu((prev) => [...prev, newItem]);
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar item");
    } finally {
      setLoading(false);
    }
  };

  const editMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    setLoading(true);
    try {
      const updated = await updateMenuItem(id, updates);
      if (updated) {
        setMenu((prev) => prev.map((m) => (m.id === id ? updated : m)));
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar item");
    } finally {
      setLoading(false);
    }
  };

  const removeMenuItem = async (id: string) => {
    setLoading(true);
    try {
      const success = await deleteMenuItem(id);
      if (success) {
        setMenu((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao remover item");
    } finally {
      setLoading(false);
    }
  };

  // Carrega o menu ao montar o provider
  useEffect(() => {
    loadMenu();
  }, []);

  return (
    <MenuContext.Provider value={{ menu, loading, loadMenu, addMenuItem, editMenuItem, removeMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenuContext must be used within a MenuProvider");
  return context;
};
