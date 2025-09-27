// restaurant-service-dashboard/src/components/customers/CustomerTable.tsx
import React, { useState, useEffect } from "react";
import { Customer } from "../../types/customer";
import { useCustomers } from "../../hooks/useCustomers";
import { CustomerDetail } from "./CustomerDetail";
import { CustomerForm } from "./CustomerForm";
import { CustomerEditForm } from "./CustomerEditForm";
import styles from "./CustomerTable.module.css";
import { FiEye, FiEdit, FiTrash2, FiX } from "react-icons/fi";

export const CustomerTable: React.FC = () => {
  const { customers, loading, loadCustomers, editCustomer, removeCustomer } = useCustomers();

  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const customer = customers.find(c => c.id === selectedCustomer) || null;

  const handleSave = async (updatedCustomer: Customer) => {
    await editCustomer(updatedCustomer.id, updatedCustomer);
    setSelectedCustomer(null);
    setEditMode(false);
  };

  const handleDelete = async () => {
    if (selectedCustomer) {
      await removeCustomer(selectedCustomer);
      setSelectedCustomer(null);
      setDeleteMode(false);
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
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.detailsBtn}
                    onClick={() => {
                      setSelectedCustomer(customer.id);
                      setEditMode(false);
                      setDeleteMode(false);
                    }}
                  >
                    <FiEye />
                  </button>
                  <button
                    className={styles.editBtn}
                    onClick={() => {
                      setSelectedCustomer(customer.id);
                      setEditMode(true);
                      setDeleteMode(false);
                    }}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className={styles.removeBtn}
                    onClick={() => {
                      setSelectedCustomer(customer.id);
                      setDeleteMode(true);
                      setEditMode(false);
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
            <h3>⚠️ Confirmar Exclusão</h3>
            <p>
              Tem certeza que deseja excluir <strong>{customer.name}</strong>?
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => {
                  setSelectedCustomer(null);
                  setDeleteMode(false);
                }}
              >
                Cancelar
              </button>
              <button className={styles.confirmDeleteBtn} onClick={handleDelete}>
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
