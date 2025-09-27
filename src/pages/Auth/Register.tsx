// restaurant-service-dashboard/src/pages/Auth/Register.tsx
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Toast } from "../../components/ui/Toast";
import { FaGoogle, FaFacebook, FaUtensils } from "react-icons/fa"; // ⬅ adicionado FaUtensils
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
    if (!name || !email || !password)
      return setError("⚠️ Todos os campos são obrigatórios");

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
    <div className={styles.page}>
      {/* Logo / Marca padronizada igual ao Login */}
      <h1 className={styles.logo}>
        <FaUtensils className={styles.icon} /> Restaurant Service
      </h1>

      <div className={styles.container}>
        <h2 className={styles.title}>Criar Conta</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Crie uma senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

          {error && <p className={styles.error}>{error}</p>}
        </form>

        <div className={styles.links}>
          <p>
            Já tem conta? <Link to="/auth/login">Entre aqui</Link>
          </p>
        </div>

        <div className={styles.divider}>Ou cadastre-se com</div>
        <div className={styles.socialButtons}>
          <button className={`${styles.iconButton} ${styles.google}`}>
            <FaGoogle />
          </button>
          <button className={`${styles.iconButton} ${styles.facebook}`}>
            <FaFacebook />
          </button>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
};
