// restaurant-service-dashboard/src/pages/Dashboard/Customers.tsx

import React from "react";
import { CustomerList } from "../../components/customers/CustomerList";
import styles from "./Customers.module.css";

export const CustomersPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>👥 Customers</h2>
      <CustomerList />
    </div>
  );
};
