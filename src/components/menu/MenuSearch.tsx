// restaurant-service-dashboard/src/components/menu/MenuSearch.tsx
import React from "react";
import styles from "./MenuList.module.css";

interface Props {
  categoryFilter: string;
  categories: string[];
  onChange: (value: string) => void;
}

export const MenuSearch: React.FC<Props> = ({ categoryFilter, categories, onChange }) => {
  return (
    <div className={styles.filter}>
      <label>Filtrar por categoria:</label>
      <select
        value={categoryFilter}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Todas</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};
