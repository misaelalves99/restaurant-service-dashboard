// restaurant-service-dashboard/src/contexts/CustomersContext.tsx

import { createContext } from 'react';
import { Customer } from '../types/customer';

export interface CustomersContextType {
    customers: Customer[];
    fetchCustomers: () => Promise<void>;
}

export const CustomersContext = createContext<CustomersContextType | undefined>(undefined);
