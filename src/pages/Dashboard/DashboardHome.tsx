import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DashboardHome.module.css';
import { FaUtensils, FaConciergeBell, FaCashRegister } from 'react-icons/fa';
import { DashboardCarousel } from '../../components/dashboard/DashboardCarousel';

export const DashboardHome: React.FC = () => {
    return (
        <div className={styles.container}>
            {/* Carousel de promoções/pratos do dia */}
            <DashboardCarousel />

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
                <Link to="/dashboard/orders" className={styles.card}>📋 Ver Pedidos</Link>
                <Link to="/dashboard/customers" className={styles.card}>👥 Gerenciar Clientes</Link>
                <Link to="/dashboard/menu" className={styles.card}>🍽️ Gerenciar Menu</Link>
                <Link to="/dashboard/reports" className={styles.card}>💰 Relatórios</Link>
            </div>
        </div>
    );
};
