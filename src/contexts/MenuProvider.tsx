// src/contexts/MenuProvider.tsx
import React, { useState, useEffect } from "react";
import {
  fetchMenu,
  createMenuItem as addMenuItemAPI,
  updateMenuItem as updateMenuItemAPI,
  deleteMenuItem as deleteMenuItemAPI,
} from "../api/menu";
import { MenuItem } from "../types/menu";
import { MenuContext } from "./MenuContext";

interface Props {
  children: React.ReactNode;
}

export const MenuProvider: React.FC<Props> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMenu = async () => {
    setLoading(true);
    try {
      const data = await fetchMenu();
      setMenu(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar o menu");
    } finally {
      setLoading(false);
    }
  };

  const addMenuItem = async (item: Omit<MenuItem, "id">) => {
    setLoading(true);
    try {
      const newItem = await addMenuItemAPI(item);
      setMenu((prev) => [...prev, newItem]);
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar item");
    } finally {
      setLoading(false);
    }
  };

  const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    setLoading(true);
    try {
      const updated = await updateMenuItemAPI(id, updates);
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
      const success = await deleteMenuItemAPI(id);
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

  useEffect(() => {
    loadMenu();
  }, []);

  return (
    <MenuContext.Provider
      value={{ menu, loading, loadMenu, addMenuItem, updateMenuItem, removeMenuItem }}
    >
      {children}
    </MenuContext.Provider>
  );
};
