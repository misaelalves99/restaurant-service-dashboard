// restaurant-service-dashboard/src/pages/menu/MenuPage.tsx

import React, { useState } from "react";
import { MenuItemForm } from "../../components/menu/MenuItemForm";
import { MenuFilter } from "../../components/menu/MenuFilter";
import { MenuDetail } from "../../components/menu/MenuDetail";
import { MenuEdit } from "../../components/menu/MenuEdit";
import { MenuDelete } from "../../components/menu/MenuDelete";
import { useMenuContext } from "../../contexts/MenuContext";
import { MenuItem } from "../../types/menu";
import styles from "./Menu.module.css";

export const MenuPage: React.FC = () => {
  const { menu, removeMenuItem, updateMenuItem, loading } = useMenuContext();

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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

      {/* Formulário de criação */}
      <MenuItemForm />

      {/* Filtro de categoria + Tabela (MenuFilter cuida de filtro, paginação e tabela) */}
      <MenuFilter
        menu={menu}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modais */}
      {isDetailOpen && selectedItem && (
        <MenuDetail
          item={selectedItem}
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedItem(null);
          }}
        />
      )}

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
