// restaurant-service-dashboard/src/components/menu/MenuTable.tsx

import React from "react";
import { FiTrash2, FiEye, FiEdit } from "react-icons/fi";
import styles from "./MenuTable.module.css";
import { MenuItem } from "../../types/menu";

interface Props {
  items: MenuItem[];
  onView: (item: MenuItem) => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
  categories: string[];
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export const MenuTable: React.FC<Props> = ({
  items,
  onView,
  onEdit,
  onDelete,
  categories,
  categoryFilter,
  onCategoryChange,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const formatPriceBRL = (price: number) => {
    return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <div className={styles.container}>
      {/* Filtro */}
      <div className={styles.filter}>
        <label htmlFor="categoryFilter">Filtrar por categoria:</label>
        <select
          id="categoryFilter"
          value={categoryFilter}
          onChange={(e) => {
            onCategoryChange(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Tabela */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category || "—"}</td>
                  <td>{formatPriceBRL(item.price)}</td>
                  <td className={styles.actions}>
                    <button
                      className={styles.detailsBtn}
                      onClick={() => onView(item)}
                      title="Ver detalhes"
                    >
                      <FiEye />
                    </button>
                    <button
                      className={styles.editBtn}
                      onClick={() => onEdit(item)}
                      title="Editar item"
                    >
                      <FiEdit />
                    </button>
                    <button
                      className={styles.removeBtn}
                      onClick={() => onDelete(item)} // ✅ agora recebe MenuItem
                      title="Remover item"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className={styles.noData}>
                  Nenhum item encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};
