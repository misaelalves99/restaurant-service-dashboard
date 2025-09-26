// restaurant-service-dashboard/src/components/orders/OrderEditForm.tsx
import React, { useState } from "react";
import { Order, OrderStatus } from "../../types/order";
import styles from "./OrderEditForm.module.css";

interface Props {
  order: Order;
  onSave: (order: Order) => void;
  onCancel: () => void;
}

export const OrderEditForm: React.FC<Props> = ({ order, onSave, onCancel }) => {
  const [status, setStatus] = useState<OrderStatus>(order.status || "pending");
  const [total, setTotal] = useState(order.total);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...order, status, total });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Edit Order #{order.id}</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Total ($):
            <input
              type="number"
              value={total}
              min={0}
              step={0.01}
              onChange={(e) => setTotal(Number(e.target.value))}
              required
            />
          </label>

          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value as OrderStatus)}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
