// src/api/customers.ts

import { Customer } from "../types/customer";

// Fake database em memória
let customers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "(11) 99999-1111",
    address: "Av. Paulista, 123 - São Paulo/SP",
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "(21) 98888-2222",
    address: "Rua das Flores, 45 - Rio de Janeiro/RJ",
    createdAt: "2025-02-15",
  },
  {
    id: "3",
    name: "Carlos Silva",
    email: "carlos@example.com",
    phone: "(31) 97777-3333",
    address: "Av. Contorno, 987 - Belo Horizonte/MG",
    createdAt: "2025-03-10",
  },
];

// Simula delay de rede
const simulateDelay = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * Busca lista de clientes com paginação e filtro
 */
export const fetchCustomers = async (
  search: string = "",
  page: number = 1,
  limit: number = 5
): Promise<{ data: Customer[]; total: number; page: number; pages: number }> => {
  await simulateDelay(800);

  let filtered = customers;

  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        (c.phone && c.phone.includes(term))
    );
  }

  const total = filtered.length;
  const pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: filtered.slice(start, end),
    total,
    page,
    pages,
  };
};

/**
 * Busca cliente por ID
 */
export const getCustomerById = async (id: string): Promise<Customer | null> => {
  await simulateDelay(500);
  return customers.find((c) => c.id === id) || null;
};

/**
 * Cria um novo cliente
 */
export const createCustomer = async (
  customer: Omit<Customer, "id" | "createdAt">
): Promise<Customer> => {
  await simulateDelay(1000);

  // Validações simples
  if (!customer.name || !customer.email) {
    throw new Error("Nome e e-mail são obrigatórios");
  }
  if (customers.some((c) => c.email === customer.email)) {
    throw new Error("Já existe um cliente com este e-mail");
  }

  const newCustomer: Customer = {
    ...customer,
    id: String(customers.length + 1),
    createdAt: new Date().toISOString().split("T")[0],
  };

  customers.push(newCustomer);
  return newCustomer;
};

/**
 * Atualiza um cliente
 */
export const updateCustomer = async (
  id: string,
  updates: Partial<Customer>
): Promise<Customer | null> => {
  await simulateDelay(1000);
  const index = customers.findIndex((c) => c.id === id);
  if (index === -1) return null;

  // Impede duplicidade de e-mails
  if (
    updates.email &&
    customers.some((c) => c.email === updates.email && c.id !== id)
  ) {
    throw new Error("Já existe outro cliente com este e-mail");
  }

  customers[index] = { ...customers[index], ...updates };
  return customers[index];
};

/**
 * Remove um cliente
 */
export const deleteCustomer = async (id: string): Promise<boolean> => {
  await simulateDelay(800);
  const initialLength = customers.length;
  customers = customers.filter((c) => c.id !== id);
  return customers.length < initialLength;
};
