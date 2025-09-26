// src/components/customers/CustomerList.tsx

import React, { useEffect, useState } from "react";
import { useCustomers } from "../../hooks/useCustomers";
import { CustomerDetail } from "./CustomerDetail";
import { CustomerForm } from "./CustomerForm";
import { CustomerEditForm } from "./CustomerEditForm";
import { Customer } from "../../types/customer";

// React Icons
import { FiEye, FiEdit, FiTrash2, FiX } from "react-icons/fi";

import styles from "./CustomerList.module.css";

export const CustomerList: React.FC = () => {
  const { customers, loading, loadCustomers, editCustomer, removeCustomer } = useCustomers();

  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const customer = customers.find((c) => c.id === selectedCustomer) || null;

  // Salvar edição
  const handleSave = async (updatedCustomer: Customer) => {
    await editCustomer(updatedCustomer.id, updatedCustomer);
    setSelectedCustomer(null);
    setEditMode(false);
  };

  // Confirmar exclusão
  const handleDelete = async () => {
    if (selectedCustomer) {
      await removeCustomer(selectedCustomer);
      setSelectedCustomer(null);
      setDeleteMode(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>👥 Customer Management</h2>

      {/* Não precisa mais passar onAdd, CustomerForm pega do contexto */}
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
                    setDeleteMode(false);
                  }}
                  className={styles.detailsBtn}
                >
                  <FiEye />
                </button>
                <button
                  onClick={() => {
                    setSelectedCustomer(customer.id);
                    setEditMode(true);
                    setDeleteMode(false);
                  }}
                  className={styles.editBtn}
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => {
                    setSelectedCustomer(customer.id);
                    setDeleteMode(true);
                    setEditMode(false);
                  }}
                  className={styles.removeBtn}
                >
                  <FiTrash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Drawer lateral para detalhes */}
      {selectedCustomer && customer && !editMode && !deleteMode && (
        <div className={styles.overlay} onClick={() => setSelectedCustomer(null)}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedCustomer(null)}>
              <FiX />
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

      {/* Modal central para confirmação de exclusão */}
      {selectedCustomer && customer && deleteMode && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>⚠️ Confirm Deletion</h3>
            <p>
              Are you sure you want to delete <strong>{customer.name}</strong>?
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => {
                  setSelectedCustomer(null);
                  setDeleteMode(false);
                }}
              >
                Cancel
              </button>
              <button className={styles.confirmDeleteBtn} onClick={handleDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
