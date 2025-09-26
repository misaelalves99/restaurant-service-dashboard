// restaurant-service-dashboard/src/components/orders/OrderSearch.tsx

import React from "react";
import styles from "./OrderSearch.module.css";

interface Props {
  search: string;
  onChange: (value: string) => void;
}

export const OrderSearch: React.FC<Props> = ({ search, onChange }) => {
  return (
    <div className={styles.controls}>
      <input
        type="text"
        placeholder="Search by Order ID or Customer ID..."
        value={search}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
