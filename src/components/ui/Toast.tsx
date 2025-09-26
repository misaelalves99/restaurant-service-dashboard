// restaurant-service-dashboard/src/components/ui/Toast.tsx

import React, { useEffect } from "react";
import styles from "./Toast.module.css";

interface Props {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<Props> = ({ message, type = "success", onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`${styles.toast} ${type === "success" ? styles.success : styles.error}`}>
      {message}
      <button onClick={onClose}>✖</button>
    </div>
  );
};
