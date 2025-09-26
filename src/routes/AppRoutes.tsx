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
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Página inicial */}
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
          <Route path="orders" element={<OrdersPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="" element={<Navigate to="orders" replace />} />
        </Route>

        {/* Qualquer rota inválida */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};
