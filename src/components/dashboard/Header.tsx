// restaurant-service-dashboard/src/components/dashboard/Header.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { FaBell, FaUserCircle, FaSignOutAlt, FaUtensils, FaCashRegister, FaConciergeBell } from "react-icons/fa";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpa os dados do usuário (ex: token)
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Redireciona para a tela de login
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>Dashboard do Restaurante</h1>
        <div className={styles.quickStats}>
          <div className={styles.stat}>
            <FaUtensils className={styles.icon} />
            <span>Mesas ocupadas: 12</span>
          </div>
          <div className={styles.stat}>
            <FaConciergeBell className={styles.icon} />
            <span>Pedidos pendentes: 7</span>
          </div>
          <div className={styles.stat}>
            <FaCashRegister className={styles.icon} />
            <span>Faturamento: R$ 3.450,00</span>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <button className={styles.notificationBtn}>
          <FaBell />
        </button>
        <div className={styles.profile}>
          <FaUserCircle className={styles.avatar} />
          <span>Admin</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </header>
  );
};
