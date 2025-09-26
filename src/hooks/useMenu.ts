// src/hooks/useMenu.ts
import { useState, useCallback } from "react";
import { MenuItem } from "../types/menu";
import { fetchMenu, createMenuItem, updateMenuItem, deleteMenuItem } from "../api/menu";

export const useMenu = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMenu = useCallback(async () => {
    setLoading(true);
    const items = await fetchMenu();
    setMenu(items);
    setLoading(false);
  }, []);

  const addMenuItem = async (item: Omit<MenuItem, "id">) => {
    const newItem = await createMenuItem(item);
    setMenu(prev => [...prev, newItem]);
  };

  const editMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    const updated = await updateMenuItem(id, updates);
    if (updated) setMenu(prev => prev.map(i => i.id === id ? updated : i));
  };

  const removeMenuItem = async (id: string) => {
    const ok = await deleteMenuItem(id);
    if (ok) setMenu(prev => prev.filter(i => i.id !== id));
  };

  return { menu, loading, loadMenu, addMenuItem, editMenuItem, removeMenuItem };
};
