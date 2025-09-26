// src/contexts/OrdersProvider.tsx
import React, { ReactNode, useEffect, useState } from "react";
import { OrdersContext } from "./OrdersContext";
import { Order } from "../types/order";
import { fetchOrders, createOrder, updateOrder, deleteOrder } from "../api/orders";

interface Props { children: ReactNode }

export const OrdersProvider: React.FC<Props> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Carrega todos os pedidos (opcionalmente filtra por customerId)
  const loadOrders = async (customerId?: string) => {
    setLoading(true);
    try {
      const data = await fetchOrders(customerId);
      setOrders(data);
    } catch (err: any) {
      console.error("Erro ao carregar pedidos:", err.message || err);
    } finally {
      setLoading(false);
    }
  };

  // Adiciona pedido
  const addOrder = async (order: Omit<Order, "id" | "createdAt">) => {
    setLoading(true);
    try {
      const newOrder = await createOrder(order);
      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (err: any) {
      throw new Error(err.message || "Erro ao criar pedido");
    } finally {
      setLoading(false);
    }
  };

  // Edita pedido
  const editOrder = async (id: string, updates: Partial<Order>) => {
    setLoading(true);
    try {
      const updated = await updateOrder(id, updates);
      if (!updated) throw new Error("Pedido não encontrado");
      setOrders(prev => prev.map(o => o.id === id ? updated : o));
    } catch (err: any) {
      throw new Error(err.message || "Erro ao atualizar pedido");
    } finally {
      setLoading(false);
    }
  };

  // Remove pedido
  const removeOrder = async (id: string) => {
    setLoading(true);
    try {
      const success = await deleteOrder(id);
      if (!success) throw new Error("Pedido não encontrado");
      setOrders(prev => prev.filter(o => o.id !== id));
    } catch (err: any) {
      throw new Error(err.message || "Erro ao remover pedido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <OrdersContext.Provider
      value={{ orders, loading, loadOrders, addOrder, editOrder, removeOrder }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
