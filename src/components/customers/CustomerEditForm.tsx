// src/components/customers/CustomerEditForm.tsx

import React, { useState } from "react";
import { Customer } from "../../types/customer";
import styles from "./CustomerEditForm.module.css";

interface Props {
  customer: Customer;
  onSave: (updatedCustomer: Customer) => void;
  onCancel: () => void;
}

export const CustomerEditForm: React.FC<Props> = ({
  customer,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Customer>({ ...customer });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>✏️ Edit Customer</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone || ""}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            rows={3}
            value={formData.address || ""}
            onChange={handleChange}
          />

          <div className={styles.actions}>
            <button type="button" className={styles.cancel} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={styles.save}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
