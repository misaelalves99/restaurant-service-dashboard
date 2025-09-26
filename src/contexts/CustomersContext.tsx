// src/contexts/CustomersContext.tsx
import { createContext, useContext } from "react";
import { Customer } from "../types/customer";

export interface CustomersContextType {
  customers: Customer[];
  loading: boolean;
  loadCustomers: () => Promise<void>;
  addCustomer: (customer: Omit<Customer, "id" | "createdAt">) => Promise<Customer>;
  editCustomer: (id: string, updates: Partial<Customer>) => Promise<void>;
  removeCustomer: (id: string) => Promise<void>;
}

export const CustomersContext = createContext<CustomersContextType | undefined>(undefined);

export const useCustomersContext = () => {
  const context = useContext(CustomersContext);
  if (!context) throw new Error("useCustomersContext must be used within a CustomersProvider");
  return context;
};
