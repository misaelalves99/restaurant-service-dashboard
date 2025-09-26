import React from "react";
import styles from "./MetricsPanel.module.css";

interface Metric {
  title: string;
  value: number;
  icon: string;
}

export const MetricsPanel: React.FC = () => {
  const metrics: Metric[] = [
    { title: "Customers", value: 24, icon: "👥" },
    { title: "Orders", value: 15, icon: "🛒" },
    { title: "Menu Items", value: 12, icon: "🍽️" },
    { title: "Revenue", value: 4200, icon: "💰" },
  ];

  return (
    <div className={styles.panel}>
      {metrics.map((m) => (
        <div key={m.title} className={styles.card}>
          <span className={styles.icon}>{m.icon}</span>
          <div className={styles.info}>
            <h3>{m.value}</h3>
            <p>{m.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
