// restaurant-service-dashboard/src/components/dashboard/DashboardCarousel.tsx
import React, { useEffect, useState } from "react";
import styles from "./DashboardCarousel.module.css";

const slides = [
  {
    id: 1,
    text: "🍕 Pizza do Dia - 20% OFF!",
    img: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg",
  },
  {
    id: 2,
    text: "🥗 Salada Caesar - Frescor Garantido!",
    img: "https://cdn.pixabay.com/photo/2015/07/14/03/48/salad-dish-844144_1280.jpg",
  },
  {
    id: 3,
    text: "🍝 Massas Artesanais - Sabor Inigualável!",
    img: "https://cdn.pixabay.com/photo/2014/04/22/02/55/pasta-329521_1280.jpg",
  },
];

export const DashboardCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  // Rotação automática
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); // troca a cada 4s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.carousel}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${
            index === current ? styles.active : ""
          }`}
          style={{ backgroundImage: `url(${slide.img})` }}
        >
          <div className={styles.overlay}>
            <span>{slide.text}</span>
          </div>
        </div>
      ))}

      {/* Botões de navegação */}
      <div className={styles.controls}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={idx === current ? styles.activeDot : ""}
          />
        ))}
      </div>
    </div>
  );
};
