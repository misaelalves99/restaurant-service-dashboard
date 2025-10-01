// restaurant-service-dashboard/src/pages/Auth/Login.tsx

import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Toast } from "../../components/ui/Toast";
import { FaGoogle, FaFacebookF, FaUtensils } from "react-icons/fa";
import styles from "./Login.module.css";

type ToastState = { message: string; type: "success" | "error" | "info" } | null;

export const Login: React.FC = () => {
  const { login, loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<ToastState>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      setToast({ message: "✅ Login efetuado com sucesso!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch {
      setToast({ message: "⚠️ Falha ao efetuar login.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      setToast({ message: "✅ Login com Google efetuado com sucesso!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch {
      setToast({ message: "⚠️ Falha ao entrar com Google.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    try {
      await loginWithFacebook();
      setToast({ message: "✅ Login com Facebook efetuado com sucesso!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch {
      setToast({ message: "⚠️ Falha ao entrar com Facebook.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.logo}>
        <FaUtensils className={styles.icon} /> Restaurant Service
      </h1>

      <div className={styles.container}>
        <h2 className={styles.title}>Login</h2>
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

          <div className={styles.forgotPassword}>
            <Link to="/auth/forgot-password">Esqueceu a senha?</Link>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className={styles.links}>
          <p>
            Não tem uma conta? <Link to="/auth/register">Cadastre-se!</Link>
          </p>
        </div>

        <div className={styles.divider}>ou entre com</div>

        <div className={styles.socialButtons}>
          <button
            className={`${styles.iconButton} ${styles.google}`}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FaGoogle />
          </button>
          <button
            className={`${styles.iconButton} ${styles.facebook}`}
            onClick={handleFacebookLogin}
            disabled={loading}
          >
            <FaFacebookF />
          </button>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
