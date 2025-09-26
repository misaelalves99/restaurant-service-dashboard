// restaurant-service-dashboard/src/components/orders/OrderDetail.tsx
import React from "react";
import { Order } from "../../types/order";
import styles from "./OrderDetail.module.css";

interface Props {
  order: Order;
}

export const OrderDetail: React.FC<Props> = ({ order }) => {
  return (
    <div className={styles.container}>
      <h3>Order #{order.id}</h3>
      <p><strong>Customer ID:</strong> {order.customerId}</p>
      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      <p><strong>Status:</strong> <span className={styles[order.status || "pending"]}>{order.status?.toUpperCase()}</span></p>
      <p><strong>Created At:</strong> {order.createdAt}</p>
    </div>
  );
};
