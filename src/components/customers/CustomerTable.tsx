// restaurant-service-dashboard/src/components/customers/CustomerTable.tsx

import React, { useState, useEffect } from "react";
import { Customer } from "../../types/customer";
import { useCustomers } from "../../hooks/useCustomers";
import { CustomerDetail } from "./CustomerDetail";
import { CustomerForm } from "./CustomerForm";
import { CustomerEditForm } from "./CustomerEditForm";
import { CustomerDelete } from "./CustomerDelete";
import styles from "./CustomerTable.module.css";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

export const CustomerTable: React.FC = () => {
  const { customers, loading, loadCustomers, editCustomer, removeCustomer } = useCustomers();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [mode, setMode] = useState<"view" | "edit" | "delete" | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSave = async (updatedCustomer: Customer) => {
    await editCustomer(updatedCustomer.id, updatedCustomer);
    setSelectedCustomer(null);
    setMode(null);
  };

  const handleDelete = async () => {
    if (selectedCustomer) {
      await removeCustomer(selectedCustomer.id);
      setSelectedCustomer(null);
      setMode(null);
    }
  };

  return (
    <div className={styles.container}>
      <h2>👥 Gestão de Clientes</h2>

      {/* Formulário para adicionar cliente */}
      <CustomerForm />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.detailsBtn}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setMode("view");
                    }}
                  >
                    <FiEye />
                  </button>
                  <button
                    className={styles.editBtn}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setMode("edit");
                    }}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className={styles.removeBtn}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setMode("delete");
                    }}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal Detalhes */}
      {selectedCustomer && mode === "view" && (
        <CustomerDetail
          customer={selectedCustomer}
          onClose={() => {
            setSelectedCustomer(null);
            setMode(null);
          }}
        />
      )}

      {/* Modal Edição */}
      {selectedCustomer && mode === "edit" && (
        <CustomerEditForm
          customer={selectedCustomer}
          onSave={handleSave}
          onCancel={() => {
            setSelectedCustomer(null);
            setMode(null);
          }}
        />
      )}

      {/* Modal Exclusão */}
      {selectedCustomer && mode === "delete" && (
        <CustomerDelete
          customerName={selectedCustomer.name}
          onConfirm={handleDelete}
          onCancel={() => {
            setSelectedCustomer(null);
            setMode(null);
          }}
        />
      )}
    </div>
  );
};
