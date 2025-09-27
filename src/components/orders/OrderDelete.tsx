// restaurant-service-dashboard/src/components/orders/OrderDelete.tsx

import React from "react";
import styles from "./OrderDelete.module.css";

interface Props {
  orderId: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const OrderDelete: React.FC<Props> = ({ orderId, onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>⚠️ Confirmar Exclusão</h3>
        <p>Tem certeza que deseja excluir o pedido <strong>{orderId}</strong>?</p>
        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={onCancel}>Cancelar</button>
          <button className={styles.confirmBtn} onClick={onConfirm}>Excluir</button>
        </div>
      </div>
    </div>
  );
};
