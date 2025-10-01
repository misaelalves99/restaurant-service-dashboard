// restaurant-service-dashboard/src/components/ui/Toast.tsx

import React, { useEffect, useState } from "react";
import styles from "./Toast.module.css";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType; // tipo da mensagem
  duration?: number; // tempo em ms para fechar automaticamente
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // espera animação desaparecer
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${visible ? styles.show : styles.hide}`}
    >
      <p>{message}</p>
      <button className={styles.closeButton} onClick={() => setVisible(false)}>
        ×
      </button>
    </div>
  );
};
