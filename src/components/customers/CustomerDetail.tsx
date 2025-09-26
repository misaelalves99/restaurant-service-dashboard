// src/components/customers/CustomerDetail.tsx

import React from "react";
import { Customer } from "../../types/customer";
import styles from "./CustomerDetail.module.css";

interface Props {
  customer: Customer;
}

export const CustomerDetail: React.FC<Props> = ({ customer }) => {
  return (
    <div className={styles.card}>
      <h3>📌 {customer.name}</h3>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone || "N/A"}</p>
      <p><strong>Address:</strong> {customer.address || "N/A"}</p>
      <p><strong>Created At:</strong> {customer.createdAt}</p>
    </div>
  );
};
