// restaurant-service-dashboard/src/components/customers/CustomerList.tsx

import React, { useEffect, useState } from "react";
import { useCustomers } from "../../hooks/useCustomers";
import { CustomerDetail } from "./CustomerDetail";
import { CustomerForm } from "./CustomerForm";
import styles from "./CustomerList.module.css";

export const CustomerList: React.FC = () => {
  const { customers, loading, loadCustomers, removeCustomer } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

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
                  onClick={() => setSelectedCustomer(customer.id)}
                  className={styles.detailsBtn}
                >
                  🔍 Details
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

      {/* Painel lateral de detalhes */}
      {selectedCustomer && (
        <div className={styles.overlay} onClick={() => setSelectedCustomer(null)}>
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
            <CustomerDetail
              customer={
                customers.find((c) => c.id === selectedCustomer) || customers[0]
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};
