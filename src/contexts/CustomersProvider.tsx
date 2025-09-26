// restaurant-service-dashboard/src/contexts/CustomersProvider.tsx

import React, { useState, ReactNode } from 'react';
import { CustomersContext, CustomersContextType } from './CustomersContext';
import { Customer } from '../types/customer';

interface Props {
    children: ReactNode;
}

export const CustomersProvider: React.FC<Props> = ({ children }) => {
    const [customers, setCustomers] = useState<Customer[]>([]);

    const fetchCustomers = async () => {
        setCustomers([{ id: '1', name: 'John Doe', email: 'john@example.com' }]);
    };

    const value: CustomersContextType = { customers, fetchCustomers };

    return <CustomersContext.Provider value={value}>{children}</CustomersContext.Provider>;
};
