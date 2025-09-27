// restaurant-service-dashboard/src/components/menu/MenuDelete.tsx
import React from "react";
import styles from "./MenuDelete.module.css";

interface Props {
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const MenuDelete: React.FC<Props> = ({ itemName, onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>🛑 Confirmar remoção</h3>
        <p>Tem certeza que deseja remover o item <strong>{itemName}</strong>?</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};
