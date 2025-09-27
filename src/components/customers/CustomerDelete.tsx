// restaurant-service-dashboard/src/components/customers/CustomerDelete.tsx

import React from "react";
import styles from "./CustomerDelete.module.css";

interface Props {
  customerName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const CustomerDelete: React.FC<Props> = ({ customerName, onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>⚠️ Confirmar Exclusão</h3>
        <p>
          Tem certeza que deseja excluir <strong>{customerName}</strong>?
        </p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Sim, Excluir
          </button>
        </div>
      </div>
    </div>
  );
};
