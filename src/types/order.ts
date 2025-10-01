// restaurant-service-dashboard/src/types/order.ts

export type OrderStatus = "pending" | "completed" | "cancelled";

export type OrderItem = {
  menuItemId: string;
  quantity: number;
};

export type Order = {
  id: string;
  customerId: string;
  total: number;
  status?: OrderStatus;
  createdAt: string;
  items: OrderItem[];
};
