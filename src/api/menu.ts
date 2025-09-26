// src/api/menu.ts
import { MenuItem } from "../types/menu";

// Fake database ampliado
let menuItems: MenuItem[] = [
  { id: "1", name: "Pizza Margherita", price: 25 },
  { id: "2", name: "Hamburger Clássico", price: 18 },
  { id: "3", name: "Salada Caesar", price: 20 },
  { id: "4", name: "Spaghetti Bolognese", price: 28 },
  { id: "5", name: "Lasanha à Bolonhesa", price: 30 },
  { id: "6", name: "Frango Grelhado com Ervas", price: 27 },
  { id: "7", name: "Sushi Mix", price: 35 },
  { id: "8", name: "Tacos Mexicanos", price: 22 },
  { id: "9", name: "Panqueca Americana", price: 15 },
  { id: "10", name: "Risoto de Cogumelos", price: 32 },
  { id: "11", name: "Camarão ao Alho e Óleo", price: 38 },
  { id: "12", name: "Bife à Parmegiana", price: 29 },
  { id: "13", name: "Quiche de Espinafre", price: 18 },
  { id: "14", name: "Sanduíche Club", price: 21 },
  { id: "15", name: "Sorvete Artesanal", price: 12 },
];

// Simula delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const fetchMenu = async (): Promise<MenuItem[]> => {
  await delay(500);
  return [...menuItems];
};

export const createMenuItem = async (item: Omit<MenuItem, "id">): Promise<MenuItem> => {
  await delay(500);
  if (!item.name || item.price <= 0) throw new Error("Nome e preço válidos são obrigatórios");
  const newItem: MenuItem = { ...item, id: Date.now().toString() };
  menuItems.push(newItem);
  return newItem;
};

export const updateMenuItem = async (id: string, updates: Partial<MenuItem>): Promise<MenuItem | null> => {
  await delay(500);
  const index = menuItems.findIndex(i => i.id === id);
  if (index === -1) return null;
  menuItems[index] = { ...menuItems[index], ...updates };
  return menuItems[index];
};

export const deleteMenuItem = async (id: string): Promise<boolean> => {
  await delay(400);
  const before = menuItems.length;
  menuItems = menuItems.filter(i => i.id !== id);
  return menuItems.length < before;
};
