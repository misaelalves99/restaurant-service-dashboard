// restaurant-service-dashboard/src/pages/Dashboard/Orders.tsx

import React, { useState, useEffect } from "react";
import { useOrders } from "../../hooks/useOrders";
import { useCustomers } from "../../hooks/useCustomers";
import { Order } from "../../types/order";
import { OrderTable } from "../../components/orders/OrderTable";
import { OrderSearch } from "../../components/orders/OrderSearch";
import { OrderCreateForm } from "../../components/orders/OrderCreateForm";
import { OrderEditForm } from "../../components/orders/OrderEditForm";
import { OrderDetail } from "../../components/orders/OrderDetail";
import { OrderDelete } from "../../components/orders/OrderDelete";
import styles from "./Orders.module.css";
import { FiPlus, FiX } from "react-icons/fi";

export const OrdersPage: React.FC = () => {
  const { orders, removeOrder, editOrder, addOrder, loadOrders } = useOrders();
  const { customers, loadCustomers } = useCustomers();

  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [mode, setMode] = useState<"view" | "edit" | "create" | "delete" | null>(null);

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

  // Criar pedido
  const handleCreate = async (newOrder: Omit<Order, "id" | "createdAt">) => {
    await addOrder(newOrder);
    setMode(null);
  };

  // Atualizar pedido
  const handleSave = async (updatedOrder: Omit<Order, "createdAt">) => {
    await editOrder(updatedOrder.id, updatedOrder);
    setSelectedOrder(null);
    setMode(null);
  };

  // Excluir pedido
  const handleDelete = async () => {
    if (selectedOrder) {
      await removeOrder(selectedOrder.id);
      setSelectedOrder(null);
      setMode(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>🛒 Pedidos</h2>
        <button className={styles.newOrderBtn} onClick={() => setMode("create")}>
          <FiPlus /> Novo Pedido
        </button>
      </div>

      <div className={styles.searchWrapper}>
        <OrderSearch search={search} onChange={setSearch} />
      </div>

      <OrderTable
        orders={filteredOrders}
        customers={customers}
        onView={(order: Order) => {
          setSelectedOrder(order);
          setMode("view");
        }}
        onEdit={(order: Order) => {
          setSelectedOrder(order);
          setMode("edit");
        }}
        onDelete={(order: Order) => {
          setSelectedOrder(order);
          setMode("delete");
        }}
      />

      {/* Modal de Criação */}
      {mode === "create" && (
        <OrderCreateForm
          onCreate={handleCreate}
          onCancel={() => setMode(null)}
        />
      )}

      {/* Modal de Detalhes */}
      {selectedOrder && mode === "view" && (
        <div className={styles.overlay} onClick={() => setMode(null)}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setMode(null)}>
              <FiX />
            </button>
            <OrderDetail order={selectedOrder} customers={customers} />
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      {selectedOrder && mode === "edit" && (
        <OrderEditForm
          order={selectedOrder}
          customers={customers}
          onSave={handleSave}
          onCancel={() => setMode(null)}
        />
      )}

      {/* Modal de Exclusão */}
      {selectedOrder && mode === "delete" && (
        <OrderDelete
          orderId={selectedOrder.id}
          onConfirm={handleDelete}
          onCancel={() => setMode(null)}
        />
      )}
    </div>
  );
};
