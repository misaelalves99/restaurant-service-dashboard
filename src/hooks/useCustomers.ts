// src/hooks/useCustomers.ts
import { useState } from "react";
import { Customer } from "../types/customer";
import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../api/customers";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCustomers = async () => {
    setLoading(true);
    const result = await fetchCustomers();
    setCustomers(result.data);
    setLoading(false);
  };

  const addCustomer = async (customer: Omit<Customer, "id" | "createdAt">) => {
    const newCustomer = await createCustomer(customer);
    setCustomers((prev) => [...prev, newCustomer]);
  };

  const editCustomer = async (id: string, updated: Partial<Customer>) => {
    const updatedCustomer = await updateCustomer(id, updated);
    if (updatedCustomer) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === id ? updatedCustomer : c))
      );
    }
  };

  const removeCustomer = async (id: string) => {
    const ok = await deleteCustomer(id);
    if (ok) setCustomers((prev) => prev.filter((c) => c.id !== id));
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
