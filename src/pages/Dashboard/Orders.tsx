// restaurant-service-dashboard/src/pages/Dashboard/Orders.tsx

import React from "react";
import { useOrders } from "../../hooks/useOrders";
import styles from "./Orders.module.css";

export const OrdersPage: React.FC = () => {
  const { orders } = useOrders();

  return (
    <div className={styles.container}>
      <h2>🛒 Orders</h2>
      <ul className={styles.list}>
        {orders.map((o) => (
          <li key={o.id} className={styles.item}>
            <span>#{o.id} - Customer: {o.customerId}</span>
            <span>Total: ${o.total}</span>
            <span className={styles[o.status || "pending"]}>
              {o.status?.toUpperCase()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
