import { Order } from "../types/order";

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

// Simula delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const fetchOrders = async (customerId?: string): Promise<Order[]> => {
  await delay(500);
  if (customerId) return orders.filter(o => o.customerId === customerId);
  return [...orders];
};

export const createOrder = async (order: Omit<Order, "id" | "createdAt">): Promise<Order> => {
  await delay(500);
  if (!order.customerId || order.total <= 0 || !order.items?.length) 
    throw new Error("Cliente, total e itens válidos são obrigatórios");

  const newOrder: Order = {
    ...order,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split("T")[0],
    status: order.status || "pending",
  };

  orders.push(newOrder);
  return newOrder;
};

export const updateOrder = async (id: string, updates: Partial<Order>): Promise<Order | null> => {
  await delay(500);
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return null;
  orders[index] = { ...orders[index], ...updates };
  return orders[index];
};

export const deleteOrder = async (id: string): Promise<boolean> => {
  await delay(400);
  const before = orders.length;
  orders = orders.filter(o => o.id !== id);
  return orders.length < before;
};
