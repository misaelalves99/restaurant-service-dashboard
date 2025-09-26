// restaurant-service-dashboard/src/components/orders/OrderDetail.tsx
import React from "react";
import { Order } from "../../types/order";
import { Customer } from "../../types/customer";
import { MenuItem } from "../../types/menu";
import styles from "./OrderDetail.module.css";

interface Props {
  order: Order;
  customers?: Customer[]; // Para mostrar nome do cliente
  menuItems?: MenuItem[]; // Para mostrar nome e preço do item
}

export const OrderDetail: React.FC<Props> = ({ order, customers = [], menuItems = [] }) => {
  const customer = customers.find(c => c.id === order.customerId);

  return (
    <div className={styles.container}>
      <h3>Order #{order.id}</h3>

      <div className={styles.section}>
        <h4>Customer</h4>
        <p>{customer ? `${customer.name} (${customer.email})` : order.customerId}</p>
      </div>

      <div className={styles.section}>
        <h4>Items</h4>
        {order.items && order.items.length > 0 ? (
          <ul className={styles.itemsList}>
            {order.items.map((item, index) => {
              const menu = menuItems.find(m => m.id === item.menuItemId);
              return (
                <li key={index} className={styles.item}>
                  <span className={styles.itemName}>{menu ? menu.name : item.menuItemId}</span>
                  <span className={styles.itemQty}>x{item.quantity}</span>
                  <span className={styles.itemPrice}>${menu ? (menu.price * item.quantity).toFixed(2) : "0.00"}</span>
                </li>
              );
            })}
          </ul>
        ) : <p>No items added</p>}
      </div>

      <div className={styles.section}>
        <h4>Status</h4>
        <span className={`${styles.status} ${styles[order.status || "pending"]}`}>
          {order.status?.toUpperCase()}
        </span>
      </div>

      <div className={styles.section}>
        <h4>Total</h4>
        <p className={styles.total}>${order.total.toFixed(2)}</p>
      </div>

      <div className={styles.section}>
        <h4>Created At</h4>
        <p>{new Date(order.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};
