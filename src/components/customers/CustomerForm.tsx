// restaurant-service-dashboard/src/components/customers/CustomerForm.tsx

import React, { useState } from "react";
import styles from "./CustomerForm.module.css";
import { useCustomersContext } from "../../contexts/CustomersContext";
import { FaPlus } from "react-icons/fa";

export const CustomerForm: React.FC = () => {
  const { addCustomer } = useCustomersContext(); // ✅ Usa contexto global
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Nome e e-mail são obrigatórios!");
      return;
    }

    try {
      await addCustomer({
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
      }); // Adiciona no contexto global

      setForm({ name: "", email: "", phone: "", address: "" }); // Limpa formulário
    } catch (err: any) {
      alert(err.message || "Erro ao adicionar cliente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Nome completo"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="E-mail"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Telefone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Endereço"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <button type="submit">
        <FaPlus /> Adicionar
      </button>
    </form>
  );
};
