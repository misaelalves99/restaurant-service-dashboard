// restaurant-service-dashboard/src/components/menu/MenuItemForm.tsx
import React, { useState } from "react";
import { useMenuContext } from "../../contexts/MenuProvider";
import { FaPlus } from "react-icons/fa";
import styles from "./MenuItemForm.module.css";

export const MenuItemForm: React.FC = () => {
  const { addMenuItem } = useMenuContext();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price <= 0) return alert("Nome e preço válidos são obrigatórios");
    await addMenuItem({ name, price });
    setName("");
    setPrice(0);
    alert("Item adicionado com sucesso!");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do item"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
      />
      <button type="submit" className={styles.addButton}>
        <FaPlus /> Adicionar
      </button>
    </form>
  );
};
