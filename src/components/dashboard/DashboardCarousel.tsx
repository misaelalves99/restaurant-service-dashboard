// restaurant-service-dashboard/src/components/dashboard/DashboardCarousel.tsx
import React, { useEffect, useState } from "react";
import styles from "./DashboardCarousel.module.css";

const slides = [
  "🍕 Pizza do Dia - 20% OFF!",
  "🥗 Salada Caesar - Frescor Garantido!",
  "🍝 Massas Artesanais - Sabor Inigualável!",
];

export const DashboardCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); // troca a cada 4s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.carousel}>
      <div
        className={styles.slides}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((text, index) => (
          <div key={index} className={styles.slide}>
            {text}
          </div>
        ))}
      </div>

      {/* Indicadores */}
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${current === index ? styles.active : ""}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};
