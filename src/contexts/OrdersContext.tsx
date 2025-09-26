// src/contexts/OrdersContext.tsx
import { createContext } from "react";
import { Order } from "../types/order";

export interface OrdersContextType {
  orders: Order[];
  loading: boolean;
  loadOrders: (customerId?: string) => Promise<void>;
  addOrder: (order: Omit<Order, "id" | "createdAt">) => Promise<Order>; // ✅ retorna Order
  editOrder: (id: string, updates: Partial<Order>) => Promise<void>;
  removeOrder: (id: string) => Promise<void>;
}

export const OrdersContext = createContext<OrdersContextType | undefined>(undefined);
