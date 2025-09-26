// src/components/customers/CustomerList.tsx

import React, { useEffect, useState } from "react";
import { useCustomers } from "../../hooks/useCustomers";
import { CustomerDetail } from "./CustomerDetail";
import { CustomerForm } from "./CustomerForm";
import { CustomerEditForm } from "./CustomerEditForm";
import { Customer } from "../../types/customer";

import styles from "./CustomerList.module.css";

export const CustomerList: React.FC = () => {
  const { customers, loading, loadCustomers, removeCustomer, editCustomer } =
    useCustomers();

  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const customer = customers.find((c) => c.id === selectedCustomer) || null;

  const handleSave = async (updatedCustomer: Customer) => {
    await editCustomer(updatedCustomer.id, updatedCustomer);
    setSelectedCustomer(null);
    setEditMode(false);
  };

  return (
    <div className={styles.container}>
      <h2>👥 Customer Management</h2>

      <CustomerForm />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.list}>
          {customers.map((customer) => (
            <li key={customer.id} className={styles.item}>
              <span>{customer.name}</span>
              <span>{customer.email}</span>
              <div className={styles.actions}>
                <button
                  onClick={() => {
                    setSelectedCustomer(customer.id);
                    setEditMode(false);
                  }}
                  className={styles.detailsBtn}
                >
                  🔍 Details
                </button>
                <button
                  onClick={() => {
                    setSelectedCustomer(customer.id);
                    setEditMode(true);
                  }}
                  className={styles.editBtn}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => removeCustomer(customer.id)}
                  className={styles.removeBtn}
                >
                  ❌ Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Drawer lateral para detalhes */}
      {selectedCustomer && customer && !editMode && (
        <div
          className={styles.overlay}
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className={styles.drawer}
            onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro
          >
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedCustomer(null)}
            >
              ✖
            </button>
            <CustomerDetail customer={customer} />
          </div>
        </div>
      )}

      {/* Modal central para edição */}
      {selectedCustomer && customer && editMode && (
        <CustomerEditForm
          customer={customer}
          onSave={handleSave}
          onCancel={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
};
