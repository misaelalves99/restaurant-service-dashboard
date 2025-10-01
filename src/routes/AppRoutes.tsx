// restaurant-service-dashboard/src/routes/AppRoutes.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages";
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import { Dashboard } from "../pages/Dashboard";
import { OrdersPage } from "../pages/Dashboard/Orders";
import { CustomersPage } from "../pages/Dashboard/Customers";
import { MenuPage } from "../pages/Dashboard/Menu";
import { DashboardHome } from "../pages/Dashboard/DashboardHome";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Página inicial pública */}
        <Route path="/" element={<Home />} />

        {/* Autenticação */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Dashboard protegido */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Página inicial do dashboard */}
          <Route path="" element={<DashboardHome />} />

          {/* Rotas internas do dashboard */}
          <Route path="orders" element={<OrdersPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="menu" element={<MenuPage />} />

          {/* Qualquer rota inválida dentro do dashboard redireciona para home do dashboard */}
          <Route path="*" element={<Navigate to="" replace />} />
        </Route>

        {/* Qualquer rota inválida na aplicação redireciona para home pública */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};
