// restaurant-service-dashboard/src/pages/Auth/Register.tsx
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../components/ui/Toast";
import styles from "./Register.module.css";

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) return setError("⚠️ Todos os campos são obrigatórios");
    setLoading(true);

    try {
      await register(name, email, password);
      setToast("✅ Cadastro criado com sucesso!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError("⚠️ Falha ao criar cadastro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
};
