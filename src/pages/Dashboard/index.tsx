// restaurant-service-dashboard/src/pages/Dashboard/index.tsx
import React from 'react';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { Header } from '../../components/dashboard/Header';
import styles from './index.module.css';
import { Outlet } from 'react-router-dom';

export const Dashboard: React.FC = () => {
    return (
        <div className={styles.dashboard}>
            <Sidebar />
            <div className={styles.main}>
                <Header />
                <Outlet /> {/* Aqui será renderizada a página específica: Orders, Customers ou Menu */}
            </div>
        </div>
    );
};
