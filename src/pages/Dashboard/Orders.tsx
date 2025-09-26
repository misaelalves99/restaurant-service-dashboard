// restaurant-service-dashboard/src/pages/Dashboard/Orders.tsx

import React, { useState, useEffect } from "react";
import { useOrders } from "../../hooks/useOrders";
import { Order } from "../../types/order";
import { OrderDetail } from "../../components/orders/OrderDetail";
import { OrderEditForm } from "../../components/orders/OrderEditForm";
import styles from "./Orders.module.css";
import { FiEye, FiEdit, FiTrash2, FiX } from "react-icons/fi";

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

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSave = async (updatedOrder: Order) => {
    await editOrder(updatedOrder.id, updatedOrder);
    setSelectedOrder(null);
    setEditMode(false);
  };

  return (
    <div className={styles.container}>
      <h2>🛒 Orders</h2>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by Order ID or Customer ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Customer ID</th>
            <th>Total ($)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerId}</td>
              <td>{order.total.toFixed(2)}</td>
              <td className={styles[order.status || "pending"]}>
                {order.status?.toUpperCase()}
              </td>
              <td>
                <button
                  className={styles.detailsBtn}
                  onClick={() => {
                    setSelectedOrder(order);
                    setEditMode(false);
                  }}
                >
                  <FiEye />
                </button>
                <button
                  className={styles.editBtn}
                  onClick={() => {
                    setSelectedOrder(order);
                    setEditMode(true);
                  }}
                >
                  <FiEdit />
                </button>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeOrder(order.id)}
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
