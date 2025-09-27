// restaurant-service-dashboard/src/components/menu/MenuEdit.tsx

import React, { useState } from "react";
import styles from "./MenuEdit.module.css";

interface MenuItem {
  id: string;
  name: string;
  category?: string;
  price: number;
  description?: string;
}

interface Props {
  item: MenuItem | null;
  onSave: (updatedItem: MenuItem) => void;
  onClose: () => void;
}

export const MenuEdit: React.FC<Props> = ({ item, onSave, onClose }) => {
  const [formData, setFormData] = useState<MenuItem>(
    item || { id: "", name: "", category: "", price: 0, description: "" }
  );

  if (!item) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "price" ? parseFloat(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>✏️ Editar Item</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Nome:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>

          <label>
            Categoria:
            <input type="text" name="category" value={formData.category || ""} onChange={handleChange} />
          </label>

          <label>
            Preço:
            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
          </label>

          <label>
            Descrição:
            <textarea name="description" value={formData.description || ""} onChange={handleChange} />
          </label>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancelar</button>
            <button type="submit" className={styles.saveBtn}>Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
