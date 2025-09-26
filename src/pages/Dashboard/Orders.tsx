// restaurant-service-dashboard/src/pages/Dashboard/Orders.tsx

import React, { useState, useEffect } from "react";
import { useOrders } from "../../hooks/useOrders";
import { Order } from "../../types/order";
import { OrderDetail } from "../../components/orders/OrderDetail";
import { OrderEditForm } from "../../components/orders/OrderEditForm";
import { OrderTable } from "../../components/orders/OrderTable";
import { OrderSearch } from "../../components/orders/OrderSearch";
import styles from "./Orders.module.css";
import { FiX } from "react-icons/fi";

export const OrdersPage: React.FC = () => {
  const { orders, removeOrder, editOrder, loadOrders } = useOrders();
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editMode, setEditMode] = useState(false);

  const filteredOrders = orders.filter(
    (o) =>
      o.customerId.includes(search) ||
      o.id.includes(search) ||
      o.status?.includes(search.toLowerCase() || "")
  );

  useEffect(() => { loadOrders(); }, []);

  const handleSave = async (updatedOrder: Order) => {
    await editOrder(updatedOrder.id, updatedOrder);
    setSelectedOrder(null);
    setEditMode(false);
  };

  return (
    <div className={styles.container}>
      <h2>🛒 Orders</h2>

      <OrderSearch search={search} onChange={setSearch} />

      <OrderTable
        orders={filteredOrders}
        onView={(order) => { setSelectedOrder(order); setEditMode(false); }}
        onEdit={(order) => { setSelectedOrder(order); setEditMode(true); }}
        onDelete={(id) => removeOrder(id)}
      />

      {selectedOrder && !editMode && (
        <div className={styles.overlay} onClick={() => setSelectedOrder(null)}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedOrder(null)}>
              <FiX />
            </button>
            <OrderDetail order={selectedOrder} />
          </div>
        </div>
      )}

      {selectedOrder && editMode && (
        <OrderEditForm
          order={selectedOrder}
          onSave={handleSave}
          onCancel={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};
