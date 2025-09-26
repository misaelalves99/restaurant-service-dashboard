// restaurant-service-dashboard/src/pages/index.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Welcome to Restaurant Dashboard</h1>
            <div className={styles.links}>
                <Link to="/auth/login">Login</Link>
                <Link to="/auth/register">Register</Link>
            </div>
        </div>
    );
};
