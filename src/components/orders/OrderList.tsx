// src/components/orders/OrderList.tsx
import React from "react";
import { useOrdersContext } from "../../contexts/OrdersProvider";
import styles from "./OrderList.module.css";

export const OrderList: React.FC = () => {
  const { orders, removeOrder, loading } = useOrdersContext();

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className={styles.container}>
      <h2>📦 Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            #{order.id} | Customer: {order.customerId} | Total: ${order.total} | Status: {order.status}
            <button onClick={() => removeOrder(order.id)}>❌ Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
