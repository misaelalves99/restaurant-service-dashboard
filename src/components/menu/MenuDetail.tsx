// restaurant-service-dashboard/src/components/menu/MenuDetail.tsx

import React from "react";
import styles from "./MenuDetail.module.css";

interface MenuItem {
  id: string;
  name: string;
  category?: string;
  price: number;
  description?: string;
}

interface Props {
  item: MenuItem | null;
  onClose: () => void;
}

export const MenuDetail: React.FC<Props> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>📄 Detalhes do Item</h2>
        <div className={styles.content}>
          <p><strong>ID:</strong> {item.id}</p>
          <p><strong>Nome:</strong> {item.name}</p>
          <p><strong>Categoria:</strong> {item.category || "Sem categoria"}</p>
          <p><strong>Preço:</strong> {item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
          {item.description && <p><strong>Descrição:</strong> {item.description}</p>}
        </div>
        <div className={styles.actions}>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};
