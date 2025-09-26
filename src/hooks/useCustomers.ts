// src/hooks/useCustomers.ts
import { useContext } from "react";
import { CustomersContext } from "../contexts/CustomersContext";

export const useCustomers = () => {
  const context = useContext(CustomersContext);
  if (!context) throw new Error("useCustomersContext must be used within CustomersProvider");
  return context;
};
