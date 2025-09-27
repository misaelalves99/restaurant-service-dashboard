// restaurant-service-dashboard/src/components/dashboard/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { FaHome, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';

export const Sidebar: React.FC = () => {
    return (
        <aside className={styles.sidebar}>
            <h2>Dashboard</h2>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/dashboard"
                            end  // ← adiciona isso
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            <FaHome className={styles.icon}/> Início
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/orders"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            <FaShoppingCart className={styles.icon}/> Pedidos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/customers"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            <FaUsers className={styles.icon}/> Clientes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/menu"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            <FaUtensils className={styles.icon}/> Menu
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};
