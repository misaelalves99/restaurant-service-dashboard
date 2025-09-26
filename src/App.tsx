// restaurant-service-dashboard/src/App.tsx

import React from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthProvider";
import { CustomersProvider } from "./contexts/CustomersProvider";
import { MenuProvider } from "./contexts/MenuProvider";
import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <AuthProvider>
        <CustomersProvider>
          <MenuProvider>
            <AppRoutes />
          </MenuProvider>
        </CustomersProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
