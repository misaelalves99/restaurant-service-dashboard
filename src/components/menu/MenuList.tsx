// restaurant-service-dashboard/src/components/menu/MenuList.tsx
import React, { useState } from "react";
import { useMenuContext } from "../../contexts/MenuProvider";
import { FaTrash } from "react-icons/fa";
import styles from "./MenuList.module.css";

export const MenuList: React.FC = () => {
  const { menu, removeMenuItem, loading } = useMenuContext();
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const categories = Array.from(new Set(menu.map((item) => item.category || "Outros")));

  const filteredMenu = categoryFilter
    ? menu.filter((item) => item.category === categoryFilter)
    : menu;

  if (loading) return <p>Loading menu...</p>;

  return (
    <div className={styles.container}>
      <h2>📋 Menu Items</h2>

      <div className={styles.filter}>
        <label>Filtrar por categoria:</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <ul className={styles.list}>
        {filteredMenu.map((item) => (
          <li key={item.id} className={styles.item}>
            <div>
              <strong>{item.name}</strong> <span className={styles.category}>({item.category})</span>
            </div>
            <div>
              <span>${item.price.toFixed(2)}</span>
              <button
                className={styles.delete}
                onClick={() => removeMenuItem(item.id)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
