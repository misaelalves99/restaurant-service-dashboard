// restaurant-service-dashboard/src/components/menu/MenuList.tsx
import React, { useState } from "react";
import { useMenuContext } from "../../contexts/MenuProvider";
import { FaTrash } from "react-icons/fa";
import styles from "./MenuList.module.css";

export const MenuList: React.FC = () => {
  const { menu, removeMenuItem, loading } = useMenuContext();
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categories = Array.from(new Set(menu.map((item) => item.category || "Outros")));

  const filteredMenu = categoryFilter
    ? menu.filter((item) => item.category === categoryFilter)
    : menu;

  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);
  const paginatedMenu = filteredMenu.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p>Loading menu...</p>;

  return (
    <div className={styles.container}>
      <h2>📋 Menu Items</h2>

      <div className={styles.filter}>
        <label>Filtrar por categoria:</label>
        <select
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <ul className={styles.list}>
        {paginatedMenu.map((item) => (
          <li key={item.id} className={styles.item}>
            <div>
              <strong>{item.name}</strong>{" "}
              <span className={styles.category}>({item.category})</span>
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

      {/* Paginação */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? styles.activePage : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};
