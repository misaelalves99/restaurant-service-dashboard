// src/api/menu.ts

import { MenuItem } from "../types/menu";

// Fake database ampliado (preços em reais, multiplicados por 5)
let menuItems: MenuItem[] = [
  { 
    id: "1", 
    name: "Pizza Margherita", 
    price: 125, category: "Pizza" 
  },

  { 
    id: "2", 
    name: "Hamburger Clássico", 
    price: 90, 
    category: "Sanduíches" 
  },

  { 
    id: "3", 
    name: "Salada Caesar", 
    price: 100, 
    category: "Saladas" 
  },

  { 
    id: "4", 
    name: "Spaghetti Bolognese", 
    price: 140, 
    category: "Massas" 
  },

  { 
    id: "5", 
    name: "Lasanha à Bolonhesa", 
    price: 150, category: "Massas"
  },

  { 
    id: "6", 
    name: "Frango Grelhado com Ervas", 
    price: 135, 
    category: "Carnes" 
  },

  { 
    id: "7", 
    name: "Sushi Mix", 
    price: 175, 
    category: "Sushi"
  },

  { 
    id: "8", 
    name: "Tacos Mexicanos", 
    price: 110, 
    category: "Tacos"
  },

  { 
    id: "9", 
    name: "Panqueca Americana", 
    price: 75, 
    category: "Sobremesas" 
  },

  { 
    id: "10", 
    name: "Risoto de Cogumelos", 
    price: 160, 
    category: "Massas"
  },
  { 
    id: "11", 
    name: "Camarão ao Alho e Óleo", 
    price: 190, 
    category: "Frutos do Mar" 
  },
  { 
    id: "12", 
    name: "Bife à Parmegiana", 
    price: 145, 
    category: "Carnes"
  },

  { 
    id: "13", 
    name: "Quiche de Espinafre", 
    price: 90, 
    category: "Saladas"
  },

  { 
    id: "14", 
    name: "Sanduíche Club", 
    price: 105, 
    category: "Sanduíches" 
  },
  { 
    id: "15", 
    name: "Sorvete Artesanal", 
    price: 60, 
    category: "Sobremesas"
  },
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

  // Gera ID sequencial
  const maxId = menuItems.length > 0 ? Math.max(...menuItems.map(i => Number(i.id))) : 0;
  const newId = (maxId + 1).toString();

  const newItem: MenuItem = { ...item, id: newId };
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
