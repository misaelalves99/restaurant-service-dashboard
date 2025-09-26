// restaurant-service-dashboard/src/components/dashboard/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
    return (
        <aside className={styles.sidebar}>
            <h2>Dashboard</h2>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/dashboard/orders"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/customers"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            Customers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/menu"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            Menu
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};
