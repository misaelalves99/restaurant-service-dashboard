// src/contexts/OrdersProvider.tsx
import React, { ReactNode, useEffect, useContext } from "react";
import { OrdersContext, OrdersContextType } from "./OrdersContext";
import { useOrders } from "../hooks/useOrders";

interface Props { children: ReactNode }

export const OrdersProvider: React.FC<Props> = ({ children }) => {
  const { orders, loading, loadOrders, addOrder, editOrder, removeOrder } = useOrders();

  useEffect(() => { loadOrders(); }, []);

  const value: OrdersContextType = { orders, loading, loadOrders, addOrder, editOrder, removeOrder };

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

export const useOrdersContext = () => {
  const context = useContext(OrdersContext);
  if (!context) throw new Error("useOrdersContext must be used within OrdersProvider");
  return context;
};
