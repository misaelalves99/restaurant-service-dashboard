// restaurant-service-dashboard/src/components/customers/CustomerForm.tsx
import React, { useState } from "react";
import { useCustomers } from "../../hooks/useCustomers";
import styles from "./CustomerForm.module.css";

export const CustomerForm: React.FC = () => {
  const { addCustomer } = useCustomers();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Name and email are required!");
      return;
    }
    addCustomer(form);
    setForm({ name: "", email: "", phone: "", address: "" });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Full name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
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
