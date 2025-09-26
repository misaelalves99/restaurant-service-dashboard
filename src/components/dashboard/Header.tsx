// restaurant-service-dashboard/src/components/dashboard/Header.tsx

import React from 'react';
import styles from './Header.module.css';

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <h1>Restaurant Dashboard</h1>
        </header>
    );
};
