// restaurant-service-dashboard/src/components/orders/OrderDetail.tsx
import React, { useEffect, useState } from "react";
import { Order } from "../../types/order";
import { Customer } from "../../types/customer";
import { MenuItem } from "../../types/menu";
import { fetchMenu } from "../../api/menu";
import styles from "./OrderDetail.module.css";

interface Props {
  order: Order;
  customers?: Customer[];   // Para mostrar nome do cliente
  menuItems?: MenuItem[];   // Para mostrar nome e preço do item
}

export const OrderDetail: React.FC<Props> = ({ order, customers = [], menuItems: initialMenuItems = [] }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

  useEffect(() => {
    if (initialMenuItems.length === 0) {
      const loadMenu = async () => {
        const data = await fetchMenu();
        setMenuItems(data);
      };
      loadMenu();
    }
  }, [initialMenuItems]);

  const customer = customers.find(c => c.id === order.customerId);

  const calculateItemTotal = (item: Order["items"][number]) => {
    const menu = menuItems.find(m => m.id === item.menuItemId);
    return menu ? menu.price * (item.quantity || 1) : 0;
  };

  const total = order.items?.reduce((sum, item) => sum + calculateItemTotal(item), 0) ?? 0;

  return (
    <div className={styles.container}>
      <h3>Pedido #{order.id}</h3>

      <div className={styles.section}>
        <h4>Cliente</h4>
        <p>{customer ? `${customer.name} (${customer.email})` : order.customerId}</p>
      </div>

      <div className={styles.section}>
        <h4>Itens do Pedido</h4>
        {order.items && order.items.length > 0 ? (
          <ul className={styles.itemsList}>
            {order.items.map((item, index) => {
              const menu = menuItems.find((m) => m.id === item.menuItemId);
              const itemName = menu ? menu.name : item.menuItemId; // fallback para ID
              const itemPrice = menu ? menu.price : 0;
              const itemTotal = itemPrice * (item.quantity || 1);

              return (
                <li key={index} className={styles.item}>
                  <span className={styles.itemName}>{itemName}</span>
                  <span className={styles.itemQty}>x{item.quantity || 1}</span>
                  <span className={styles.itemPrice}>R${itemTotal.toFixed(2)}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Nenhum item adicionado</p>
        )}
      </div>

      <div className={styles.section}>
        <h4>Status</h4>
        <span className={`${styles.status} ${styles[order.status || "pending"]}`}>
          {order.status?.toUpperCase() || "PENDENTE"}
        </span>
      </div>

      <div className={styles.section}>
        <h4>Total</h4>
        <p className={styles.total}>R${total.toFixed(2)}</p>
      </div>

      <div className={styles.section}>
        <h4>Criado em</h4>
        <p>{new Date(order.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};
