// restaurant-service-dashboard/src/components/menu/MenuList.tsx

import React from "react";
import { MenuItemForm } from "../../components/menu/MenuItemForm";
import { MenuList } from "../../components/menu/MenuList";
import styles from "./Menu.module.css";

export const MenuPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>🍽️ Menu Management</h2>
      <MenuItemForm />
      <MenuList />
    </div>
  );
};
