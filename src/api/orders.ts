// src/api/orders.ts

import { Order } from "../types/order";
import { MenuItem } from "../types/menu";
import { fetchMenu } from "./menu";

// Fake database
let orders: Order[] = [
  {
    id: "1",
    customerId: "1",
    total: 100,
    status: "pending",
    createdAt: "2025-04-01",
    items: [{ menuItemId: "101", quantity: 1 }],
  },
  {
    id: "2",
    customerId: "2",
    total: 250,
    status: "completed",
    createdAt: "2025-04-05",
    items: [{ menuItemId: "102", quantity: 2 }],
  },
  {
    id: "3",
    customerId: "3",
    total: 75,
    status: "cancelled",
    createdAt: "2025-04-10",
    items: [{ menuItemId: "103", quantity: 1 }],
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// ✅ Retorna todos os pedidos (opcionalmente filtra por customerId)
export const fetchOrders = async (customerId?: string): Promise<Order[]> => {
  await delay(500);
  if (customerId) return orders.filter((o) => o.customerId === customerId);
  return [...orders];
};

// ✅ Cria um novo pedido com ID sequencial
export const createOrder = async (
  order: Omit<Order, "id" | "createdAt" | "total">
): Promise<Order> => {
  await delay(500);

  if (!order.customerId || !order.items?.length) {
    throw new Error("Cliente e itens válidos são obrigatórios");
  }

  const menuItems: MenuItem[] = await fetchMenu();
  const total = order.items.reduce((sum, item) => {
    const menu = menuItems.find((m) => m.id === item.menuItemId);
    if (!menu) throw new Error(`Menu item ${item.menuItemId} não encontrado`);
    return sum + menu.price * item.quantity;
  }, 0);

  // ID sequencial
  const maxId = orders.length > 0 ? Math.max(...orders.map((o) => Number(o.id))) : 0;
  const newId = (maxId + 1).toString();

  const newOrder: Order = {
    ...order,
    id: newId,
    createdAt: new Date().toISOString().split("T")[0],
    total,
    status: order.status || "pending",
  };

  orders.push(newOrder);
  return newOrder;
};

// ✅ Atualiza pedido existente, recalculando total se os itens forem alterados
export const updateOrder = async (
  id: string,
  updates: Partial<Order>
): Promise<Order | null> => {
  await delay(500);

  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return null;

  if (updates.items) {
    const menuItems: MenuItem[] = await fetchMenu();
    updates.total = updates.items.reduce((sum, item) => {
      const menu = menuItems.find((m) => m.id === item.menuItemId);
      if (!menu) throw new Error(`Menu item ${item.menuItemId} não encontrado`);
      return sum + menu.price * item.quantity;
    }, 0);
  }

  orders[index] = { ...orders[index], ...updates };
  return orders[index];
};

// ✅ Remove pedido
export const deleteOrder = async (id: string): Promise<boolean> => {
  await delay(400);
  const before = orders.length;
  orders = orders.filter((o) => o.id !== id);
  return orders.length < before;
};
