// restaurant-service-dashboard/src/components/menu/MenuItemForm.tsx
import React, { useState } from "react";
import { useMenuContext } from "../../contexts/MenuContext";
import { FaPlus } from "react-icons/fa";

import styles from "./MenuItemForm.module.css";

const categories = [
  "Pizza",
  "Sanduíches",
  "Saladas",
  "Massas",
  "Carnes",
  "Sushi",
  "Tacos",
  "Sobremesas",
  "Frutos do Mar",
  "Outros"
];

export const MenuItemForm: React.FC = () => {
  const { addMenuItem } = useMenuContext();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price <= 0 || !category) {
      alert("Nome, preço e categoria são obrigatórios");
      return;
    }
    await addMenuItem({ name, price, category });
    setName("");
    setPrice(0);
    setCategory("");
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
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Selecione a categoria</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit" className={styles.addButton}>
        <FaPlus /> Adicionar
      </button>
    </form>
  );
};
