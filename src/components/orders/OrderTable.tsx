// restaurant-service-dashboard/src/components/orders/OrderTable.tsx

import React from "react";
import { Order } from "../../types/order";
import { Customer } from "../../types/customer";
import styles from "./OrderTable.module.css";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

interface Props {
  orders: Order[];
  customers?: Customer[];
  onView: (order: Order) => void;
  onEdit: (order: Order) => void;
  onDelete: (id: string) => void;
}

export const OrderTable: React.FC<Props> = ({
  orders,
  customers = [],
  onView,
  onEdit,
  onDelete
}) => {
  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : customerId; // fallback para ID
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Pedido #</th>
          <th>Cliente</th> {/* Nome do cliente */}
          <th>Total (R$)</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{getCustomerName(order.customerId)}</td>
            <td>{order.total.toFixed(2)}</td>
            <td className={styles[order.status || "pending"]}>
              {order.status?.toUpperCase()}
            </td>
            <td className={styles.actions}>
              <button className={styles.detailsBtn} onClick={() => onView(order)}>
                <FiEye />
              </button>
              <button className={styles.editBtn} onClick={() => onEdit(order)}>
                <FiEdit />
              </button>
              <button className={styles.removeBtn} onClick={() => onDelete(order.id)}>
                <FiTrash2 />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
