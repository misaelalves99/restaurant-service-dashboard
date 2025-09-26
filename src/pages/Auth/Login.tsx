// restaurant-service-dashboard/src/pages/Auth/Login.tsx

import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Toast } from "../../components/ui/Toast";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import styles from "./Login.module.css";

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      setToast("✅ Login efetuado com sucesso!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError("⚠️ Falha ao efetuar login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Logo / Marca do sistema */}
      <h1 className={styles.logo}>🍴 Restaurant Dashboard</h1>

      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* alinhado no final do form */}
          <div className={styles.forgotPassword}>
            <Link to="/auth/forgot-password">Esqueceu a senha?</Link>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>

        <div className={styles.links}>
          <Link to="/auth/register">Não tem uma conta? Cadastre-se!</Link>
        </div>

        <div className={styles.divider}>ou entre com</div>

        <div className={styles.socialButtons}>
          <button className={styles.iconButton + " " + styles.google}>
            <FaGoogle />
          </button>
          <button className={styles.iconButton + " " + styles.facebook}>
            <FaFacebookF />
          </button>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
};
