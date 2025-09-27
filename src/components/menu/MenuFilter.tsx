// restaurant-service-dashboard/src/components/menu/MenuFilter.tsx

import React, { useState, useEffect } from "react";
import { MenuItem } from "../../types/menu";
import { MenuTable } from "./MenuTable";
import styles from "./MenuFilter.module.css";

interface MenuFilterProps {
  menu: MenuItem[];
  onView: (item: MenuItem) => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}

export const MenuFilter: React.FC<MenuFilterProps> = ({
  menu,
  onView,
  onEdit,
  onDelete,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const categories: string[] = Array.from(
    new Set(menu.map((item) => item.category || "Outros"))
  );

  // Filtragem por categoria
  const filteredMenu = categoryFilter
    ? menu.filter((item) => item.category === categoryFilter)
    : menu;

  // Paginação
  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);
  const paginatedMenu = filteredMenu.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Resetar página ao mudar filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter]);

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <label htmlFor="categoryFilter">Filtrar por categoria:</label>
        <select
          id="categoryFilter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <MenuTable
        items={paginatedMenu}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};
