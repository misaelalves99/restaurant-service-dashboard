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
            <li
              key={customer.id}
              className={styles.item}
              onClick={() => setSelectedCustomer(customer.id)}
            >
              <span>{customer.name}</span>
              <span>{customer.email}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCustomer(customer.id);
                }}
              >
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedCustomer && (
        <CustomerDetail
          customer={
            customers.find((c) => c.id === selectedCustomer) || customers[0]
          }
        />
      )}
    </div>
  );
};
