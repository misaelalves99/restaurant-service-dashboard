// restaurant-service-dashboard/src/pages/Dashboard/Customers.tsx

import React from "react";
import { CustomerTable } from "../../components/customers/CustomerTable";
import styles from "./Customers.module.css";

export const CustomersPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <CustomerTable/>
    </div>
  );
};
