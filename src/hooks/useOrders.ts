// src/hooks/useOrders.ts
import { useState, useCallback } from "react";
import { Order } from "../types/order";
import { fetchOrders, createOrder, updateOrder, deleteOrder } from "../api/orders";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const loadOrders = useCallback(async (customerId?: string) => {
    setLoading(true);
    const data = await fetchOrders(customerId);
    setOrders(data);
    setLoading(false);
  }, []);

  const addOrder = async (order: Omit<Order, "id" | "createdAt">) => {
    const newOrder = await createOrder(order);
    setOrders(prev => [...prev, newOrder]);
  };

  const editOrder = async (id: string, updates: Partial<Order>) => {
    const updated = await updateOrder(id, updates);
    if (updated) setOrders(prev => prev.map(o => o.id === id ? updated : o));
  };

  const removeOrder = async (id: string) => {
    const ok = await deleteOrder(id);
    if (ok) setOrders(prev => prev.filter(o => o.id !== id));
  };

  return { orders, loading, loadOrders, addOrder, editOrder, removeOrder };
};
