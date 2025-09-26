// restaurant-service-dashboard/src/components/customers/CustomerForm.tsx

import React, { useState } from "react";
import styles from "./CustomerForm.module.css";
import { useCustomersContext } from "../../contexts/CustomersContext";

export const CustomerForm: React.FC = () => {
  const { addCustomer } = useCustomersContext(); // ✅ Usa contexto global
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Name and email are required!");
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
        placeholder="Full name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <button type="submit">➕ Add Customer</button>
    </form>
  );
};
