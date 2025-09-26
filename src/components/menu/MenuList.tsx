// src/components/menu/MenuList.tsx
import React from "react";
import { useMenuContext } from "../../contexts/MenuProvider";
import styles from "./MenuList.module.css";

export const MenuList: React.FC = () => {
  const { menu, removeMenuItem, loading } = useMenuContext();

  if (loading) return <p>Loading menu...</p>;

  return (
    <div className={styles.container}>
      <h2>📋 Menu Items</h2>
      <ul>
        {menu.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
            <button onClick={() => removeMenuItem(item.id)}>❌ Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
