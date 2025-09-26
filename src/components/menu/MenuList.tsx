// restaurant-service-dashboard/src/components/menu/MenuList.tsx
import React from "react";
import { useMenuContext } from "../../contexts/MenuProvider";
import { FaTrash } from "react-icons/fa";
import styles from "./MenuList.module.css";

export const MenuList: React.FC = () => {
  const { menu, removeMenuItem, loading } = useMenuContext();

  if (loading) return <p>Loading menu...</p>;

  return (
    <div className={styles.container}>
      <h2>📋 Menu Items</h2>
      <ul className={styles.list}>
        {menu.map((item) => (
          <li key={item.id} className={styles.item}>
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
            <button
              className={styles.delete}
              onClick={() => removeMenuItem(item.id)}
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
