// restaurant-service-dashboard/src/components/menu/MenuPage.tsx

import React, { useState } from "react";
import { MenuItemForm } from "../../components/menu/MenuItemForm";
import { MenuTable } from "../../components/menu/MenuTable";
import { MenuDetail } from "../../components/menu/MenuDetail";
import { MenuEdit } from "../../components/menu/MenuEdit";
import { MenuDelete } from "../../components/menu/MenuDelete";
import { useMenuContext } from "../../contexts/MenuContext";
import { MenuItem } from "../../types/menu";
import styles from "./Menu.module.css";

export const MenuPage: React.FC = () => {
  const { menu, removeMenuItem, updateMenuItem, loading } = useMenuContext();

  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const itemsPerPage = 10;
  const categories: string[] = Array.from(
    new Set(menu.map((item) => item.category || "Outros"))
  );

  const filteredMenu = categoryFilter
    ? menu.filter((item) => item.category === categoryFilter)
    : menu;

  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);
  const paginatedMenu = filteredMenu.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p>Carregando menu...</p>;

  const handleView = (item: MenuItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setSelectedItem(item);
    setIsEditOpen(true);
  };

  const handleDelete = (item: MenuItem) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  return (
    <div className={styles.container}>
      <h2>🍽️ Gerenciamento de cardápio</h2>

      <MenuItemForm />

      <MenuTable
        items={paginatedMenu}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        categories={categories}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/* Modal de Detalhes */}
      {isDetailOpen && selectedItem && (
        <MenuDetail
          item={selectedItem}
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedItem(null);
          }}
        />
      )}

      {/* Modal de Edição */}
      {isEditOpen && selectedItem && (
        <MenuEdit
          item={selectedItem}
          onSave={(updatedItem) => {
            updateMenuItem(updatedItem.id, updatedItem);
            setIsEditOpen(false);
            setSelectedItem(null);
          }}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedItem(null);
          }}
        />
      )}

      {/* Modal de Deleção */}
      {isDeleteOpen && selectedItem && (
        <MenuDelete
          itemName={selectedItem.name}
          onConfirm={() => {
            removeMenuItem(selectedItem.id);
            setIsDeleteOpen(false);
            setSelectedItem(null);
          }}
          onCancel={() => {
            setIsDeleteOpen(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
};
