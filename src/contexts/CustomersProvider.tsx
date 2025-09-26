// src/contexts/CustomersProvider.tsx
import React, { useState, ReactNode, useEffect } from 'react';
import { CustomersContext } from './CustomersContext';
import { Customer } from '../types/customer';
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from '../api/customers';

interface Props { children: ReactNode }

export const CustomersProvider: React.FC<Props> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  // Carrega lista de clientes
  const loadCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetchCustomers();
      setCustomers(res.data);
    } catch (err: any) {
      console.error("Erro ao carregar clientes:", err.message || err);
    } finally {
      setLoading(false);
    }
  };

  // Adiciona novo cliente
  const addCustomer = async (customer: Omit<Customer, "id" | "createdAt">) => {
    setLoading(true);
    try {
      const newCustomer = await createCustomer(customer);
      setCustomers(prev => [...prev, newCustomer]);
      return newCustomer;
    } catch (err: any) {
      throw new Error(err.message || "Erro ao adicionar cliente");
    } finally {
      setLoading(false);
    }
  };

  // Edita cliente existente
  const editCustomer = async (id: string, updates: Partial<Customer>) => {
    setLoading(true);
    try {
      const updated = await updateCustomer(id, updates);
      if (!updated) throw new Error("Cliente não encontrado");
      setCustomers(prev => prev.map(c => c.id === id ? updated : c));
    } catch (err: any) {
      throw new Error(err.message || "Erro ao atualizar cliente");
    } finally {
      setLoading(false);
    }
  };

  // Remove cliente
  const removeCustomer = async (id: string) => {
    setLoading(true);
    try {
      const success = await deleteCustomer(id);
      if (!success) throw new Error("Cliente não encontrado");
      setCustomers(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      throw new Error(err.message || "Erro ao remover cliente");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <CustomersContext.Provider
      value={{ customers, loading, loadCustomers, addCustomer, editCustomer, removeCustomer }}
    >
      {children}
    </CustomersContext.Provider>
  );
};
