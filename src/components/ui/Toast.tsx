// restaurant-service-dashboard/src/components/ui/Toast.tsx

import React, { useEffect } from "react";
import styles from "./Toast.module.css";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 2000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={styles.toast}>
      {message}
    </div>
  );
};
