// restaurant-service-dashboard/src/components/orders/OrderEditForm.tsx

import React, { useState } from "react";
import { Order } from "../../types/order";
import { Customer } from "../../types/customer";
import styles from "./OrderEditForm.module.css";

interface Props {
  order: Order;
  onSave: (order: Order) => Promise<void>;
  onCancel?: () => void;
  customers?: Customer[]; // Mantido
}

export const OrderEditForm: React.FC<Props> = ({ order, onSave, onCancel, customers = [] }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(order.customerId);
  const [status, setStatus] = useState<Order["status"]>(order.status || "pending");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ ...order, customerId: selectedCustomerId, status });
  };

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {onCancel && (
          <button className={styles.closeBtn} onClick={onCancel} type="button" aria-label="Close">
            ✕
          </button>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>Edit Order #{order.id}</h3>

          <div className={styles.field}>
            <label>Customer</label>
            <select value={selectedCustomerId} onChange={(e) => setSelectedCustomerId(e.target.value)}>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as Order["status"])}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <button type="submit" className={styles.saveBtn}>Save</button>
        </form>
      </div>
    </div>
  );
};
