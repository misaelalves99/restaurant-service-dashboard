// restaurant-service-dashboard/src/pages/Dashboard/Orders.tsx

import React, { useState, useEffect } from "react";
import { useOrders } from "../../hooks/useOrders";
import { useCustomers } from "../../hooks/useCustomers";
import { Order } from "../../types/order";
import { OrderDetail } from "../../components/orders/OrderDetail";
import { OrderEditForm } from "../../components/orders/OrderEditForm";
import { OrderTable } from "../../components/orders/OrderTable";
import { OrderSearch } from "../../components/orders/OrderSearch";
import { OrderCreateForm } from "../../components/orders/OrderCreateForm";
import styles from "./Orders.module.css";
import { FiX, FiPlus } from "react-icons/fi";

export const OrdersPage: React.FC = () => {
  const { orders, removeOrder, editOrder, addOrder, loadOrders } = useOrders();
  const { customers, loadCustomers } = useCustomers();

  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);

  // Filtragem por ID, nome do cliente ou status
  const filteredOrders = orders.filter((o) => {
    const customer = customers.find((c) => c.id === o.customerId);
    const customerName = customer ? customer.name.toLowerCase() : "";
    return (
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      customerName.includes(search.toLowerCase()) ||
      o.status?.toLowerCase().includes(search.toLowerCase() || "")
    );
  });

  useEffect(() => {
    loadOrders();
    loadCustomers();
  }, []);

  // Atualizar pedido
  const handleSave = async (updatedOrder: Omit<Order, "createdAt">) => {
    await editOrder(updatedOrder.id, updatedOrder);
    setSelectedOrder(null);
    setEditMode(false);
  };

  // Criar pedido
  const handleCreate = async (newOrder: Omit<Order, "id" | "createdAt">) => {
    await addOrder(newOrder);
    setCreateMode(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>🛒 Pedidos</h2>
        <button
          className={styles.newOrderBtn}
          onClick={() => setCreateMode(true)}
        >
          <FiPlus /> Novo Pedido
        </button>
      </div>

      <div className={styles.searchWrapper}>
        <OrderSearch search={search} onChange={setSearch} />
      </div>

      <OrderTable
        orders={filteredOrders}
        customers={customers}
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
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedOrder(null)}
            >
              <FiX />
            </button>
            <OrderDetail
              order={selectedOrder}
              customers={customers}
            />
          </div>
        </div>
      )}

      {/* Modal de edição */}
      {selectedOrder && editMode && (
        <OrderEditForm
          order={selectedOrder}
          customers={customers}
          onSave={handleSave}
          onCancel={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};
