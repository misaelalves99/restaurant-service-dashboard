// restaurant-service-dashboard/src/pages/Dashboard/Orders.tsx

import React, { useState, useEffect } from "react";
import { useOrders } from "../../hooks/useOrders";
import { Order } from "../../types/order";
import { OrderDetail } from "../../components/orders/OrderDetail";
import { OrderEditForm } from "../../components/orders/OrderEditForm";
import { OrderTable } from "../../components/orders/OrderTable";
import { OrderSearch } from "../../components/orders/OrderSearch";
import { OrderCreateForm } from "../../components/orders/OrderCreateForm"; // Import do form
import styles from "./Orders.module.css";
import { FiX, FiPlus } from "react-icons/fi";

export const OrdersPage: React.FC = () => {
  const { orders, removeOrder, editOrder, addOrder, loadOrders } = useOrders();
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false); // Novo estado para criar pedido

  const filteredOrders = orders.filter(
    (o) =>
      o.customerId.includes(search) ||
      o.id.includes(search) ||
      o.status?.includes(search.toLowerCase() || "")
  );

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSave = async (updatedOrder: Order) => {
    await editOrder(updatedOrder.id, updatedOrder);
    setSelectedOrder(null);
    setEditMode(false);
  };

  const handleCreate = async (newOrder: Omit<Order, "id" | "createdAt">) => {
    await addOrder(newOrder);
    setCreateMode(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>🛒 Orders</h2>
        <button
          className={styles.newOrderBtn}
          onClick={() => setCreateMode(true)}
        >
          <FiPlus /> Novo Pedido
        </button>
      </div>

      <OrderSearch search={search} onChange={setSearch} />

      <OrderTable
        orders={filteredOrders}
        onView={(order) => { setSelectedOrder(order); setEditMode(false); }}
        onEdit={(order) => { setSelectedOrder(order); setEditMode(true); }}
        onDelete={(id) => removeOrder(id)}
      />

      {/* Modal de criação */}
      {createMode && (
        <OrderCreateForm
          onCreate={handleCreate}
          onCancel={() => setCreateMode(false)}
        />
      )}

      {/* Drawer lateral para detalhes */}
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

      {/* Modal central para edição */}
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
