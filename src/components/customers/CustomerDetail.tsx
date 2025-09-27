// src/components/customers/CustomerDetail.tsx

import React from "react";
import { Customer } from "../../types/customer";
import styles from "./CustomerDetail.module.css";
import { FiX } from "react-icons/fi";

interface Props {
  customer: Customer;
  onClose: () => void; // ✅ Adiciona a prop onClose
}

export const CustomerDetail: React.FC<Props> = ({ customer, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FiX />
        </button>
        <h3>📌 {customer.name}</h3>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Phone:</strong> {customer.phone || "N/A"}</p>
        <p><strong>Address:</strong> {customer.address || "N/A"}</p>
        <p><strong>Created At:</strong> {customer.createdAt}</p>
      </div>
    </div>
  );
};
