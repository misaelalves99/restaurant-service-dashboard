// restaurant-service-dashboard/src/pages/dashboard/DashboardHome.tsx
import React from 'react';
import styles from './DashboardHome.module.css';
import { FaUtensils, FaConciergeBell, FaCashRegister } from 'react-icons/fa';

export const DashboardHome: React.FC = () => {
    return (
        <div className={styles.container}>
            {/* Carousel de promoções/pratos do dia */}
            <div className={styles.carousel}>
                <div className={styles.slide}>🍕 Pizza do Dia - 20% OFF!</div>
                <div className={styles.slide}>🥗 Salada Caesar - Frescor Garantido!</div>
                <div className={styles.slide}>🍝 Massas Artesanais - Sabor Inigualável!</div>
            </div>

            {/* Indicadores rápidos */}
            <div className={styles.quickStats}>
                <div className={styles.stat}>
                    <FaUtensils className={styles.icon}/>
                    <span>Mesas Ocupadas: 12</span>
                </div>
                <div className={styles.stat}>
                    <FaConciergeBell className={styles.icon}/>
                    <span>Pedidos Pendentes: 7</span>
                </div>
                <div className={styles.stat}>
                    <FaCashRegister className={styles.icon}/>
                    <span>Faturamento Hoje: R$ 3.450,00</span>
                </div>
            </div>

            {/* Cards de atalhos */}
            <div className={styles.cards}>
                <div className={styles.card}>📋 Ver Pedidos</div>
                <div className={styles.card}>👥 Gerenciar Clientes</div>
                <div className={styles.card}>🍽️ Gerenciar Menu</div>
                <div className={styles.card}>💰 Relatórios</div>
            </div>
        </div>
    );
};
