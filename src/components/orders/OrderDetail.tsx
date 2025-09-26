// src/components/orders/OrderDetail.tsx
import React from "react";
import { Order } from "../../types/order";
import styles from "./OrderDetail.module.css";

interface Props { order: Order }

export const OrderDetail: React.FC<Props> = ({ order }) => {
  return (
    <div className={styles.container}>
      <h3>Order #{order.id}</h3>
      <p>Customer ID: {order.customerId}</p>
      <p>Total: ${order.total}</p>
      <p>Status: {order.status}</p>
      <p>Created At: {order.createdAt}</p>
    </div>
  );
};
