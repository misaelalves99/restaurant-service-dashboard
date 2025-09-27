// restaurant-service-dashboard/src/components/orders/OrderCreateForm.tsx
import React, { useState, useEffect } from "react";
import { MenuItem } from "../../types/menu";
import { Order } from "../../types/order";
import { fetchMenu } from "../../api/menu";
import styles from "./OrderCreateForm.module.css";
import { useCustomers } from "../../hooks/useCustomers";

interface Props {
  onCreate: (order: Omit<Order, "id" | "createdAt">) => Promise<void>;
  onCancel?: () => void;
}

interface OrderItem {
  menuItemId: string;
  quantity: number;
}

export const OrderCreateForm: React.FC<Props> = ({ onCreate, onCancel }) => {
  const { customers } = useCustomers();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<Order["status"]>("pending");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string>("");

  useEffect(() => {
    const loadMenu = async () => {
      const menuData = await fetchMenu();
      setMenuItems(menuData);
    };
    loadMenu();
  }, []);

  useEffect(() => {
    const sum = orderItems.reduce((acc, item) => {
      const menu = menuItems.find((m) => m.id === item.menuItemId);
      return menu ? acc + menu.price * item.quantity : acc;
    }, 0);
    setTotal(sum);
  }, [orderItems, menuItems]);

  const handleAddItem = () => setOrderItems([...orderItems, { menuItemId: "", quantity: 1 }]);
  const handleItemChange = (index: number, field: "menuItemId" | "quantity", value: any) => {
    const items = [...orderItems];
    if (field === "quantity") items[index][field] = Math.max(1, Number(value));
    else items[index][field] = value;
    setOrderItems(items);
  };
  const handleRemoveItem = (index: number) => setOrderItems(orderItems.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId) return setErrors("Selecione um cliente.");
    if (orderItems.length === 0) return setErrors("Adicione pelo menos um item ao pedido.");
    if (orderItems.some((item) => !item.menuItemId)) return setErrors("Selecione todos os itens do menu.");

    setErrors("");
    setLoading(true);

    try {
      await onCreate({
        customerId: selectedCustomerId,
        total,
        status,
        items: orderItems
      });
      setSelectedCustomerId("");
      setOrderItems([]);
      setStatus("pending");
      if (onCancel) onCancel();
    } catch (err: any) {
      setErrors(err.message || "Erro ao criar pedido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {onCancel && (
          <button
            className={styles.closeBtn}
            onClick={onCancel}
            type="button"
            aria-label="Fechar"
          >
            ✕
          </button>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>🆕 Criar Novo Pedido</h3>

          {errors && <p className={styles.error}>{errors}</p>}

          <div className={styles.field}>
            <label>Cliente</label>
            <select value={selectedCustomerId} onChange={(e) => setSelectedCustomerId(e.target.value)}>
              <option value="">Selecione um cliente</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.email})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label>Itens do Pedido</label>
            {orderItems.map((item, index) => (
              <div key={index} className={styles.orderItem}>
                <select
                  value={item.menuItemId}
                  onChange={(e) => handleItemChange(index, "menuItemId", e.target.value)}
                >
                  <option value="">Selecione o item do menu</option>
                  {menuItems.map((menu) => (
                    <option key={menu.id} value={menu.id}>
                      {menu.name} (R${menu.price.toFixed(2)})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                />
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => handleRemoveItem(index)}
                  aria-label="Remover item"
                >
                  ✕
                </button>
              </div>
            ))}
            <button type="button" className={styles.addBtn} onClick={handleAddItem}>
              + Adicionar Item
            </button>
          </div>

          <div className={styles.field}>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as Order["status"])}>
              <option value="pending">Pendente</option>
              <option value="completed">Concluído</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>

          <div className={styles.total}>
            Total: <strong>R${total.toFixed(2)}</strong>
          </div>

          <button type="submit" className={styles.saveBtn} disabled={loading}>
            {loading ? "Salvando..." : "Criar Pedido"}
          </button>
        </form>
      </div>
    </div>
  );
};
