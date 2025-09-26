// src/hooks/useCustomers.ts
import { useState } from "react";
import { Customer } from "../types/customer";
import { fetchCustomers } from "../api/customers"; // fetch apenas para load inicial

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  // Carregar clientes iniciais
  const loadCustomers = async () => {
    setLoading(true);
    const result = await fetchCustomers();
    setCustomers(result.data || []);
    setLoading(false);
  };

  // Adicionar cliente localmente
  const addCustomer = async (customer: Omit<Customer, "id" | "createdAt">) => {
    // Criar ID e data localmente (simula backend)
    const newCustomer: Customer = {
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      ...customer,
    };
    setCustomers((prev) => [...prev, newCustomer]);
    return newCustomer;
  };

  // Editar cliente
  const editCustomer = async (id: string, updated: Partial<Customer>) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  // Remover cliente
  const removeCustomer = async (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    customers,
    loading,
    loadCustomers,
    addCustomer,
    editCustomer,
    removeCustomer,
  };
};
