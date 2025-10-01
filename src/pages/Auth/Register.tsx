// restaurant-service-dashboard/src/pages/Auth/Register.tsx

import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Toast } from "../../components/ui/Toast";
import { FaGoogle, FaFacebook, FaUtensils, FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Register.module.css";

type ToastState = { message: string; type: "success" | "error" | "info" } | null;

export const Register: React.FC = () => {
  const { register, loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // controle mostrar/ocultar senha
  const [toast, setToast] = useState<ToastState>(null);
  const [loading, setLoading] = useState(false);

  // Função para cadastro com e-mail
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setToast({ message: "⚠️ Todos os campos são obrigatórios", type: "error" });
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      setToast({ message: "✅ Cadastro criado com sucesso!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch {
      setToast({ message: "⚠️ Falha ao criar cadastro.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Cadastro social
  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      setToast({ message: "✅ Cadastro com Google efetuado com sucesso!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch {
      setToast({ message: "⚠️ Falha ao cadastrar com Google.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookRegister = async () => {
    setLoading(true);
    try {
      await loginWithFacebook();
      setToast({ message: "✅ Cadastro com Facebook efetuado com sucesso!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch {
      setToast({ message: "⚠️ Falha ao cadastrar com Facebook.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword(prev => !prev);

  return (
    <div className={styles.page}>
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

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className={styles.passwordToggle} onClick={togglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div className={styles.links}>
          <p>
            Já tem conta? <Link to="/auth/login">Entre aqui</Link>
          </p>
        </div>

        <div className={styles.divider}>Ou cadastre-se com</div>

        <div className={styles.socialButtons}>
          <button
            className={`${styles.iconButton} ${styles.google}`}
            onClick={handleGoogleRegister}
            disabled={loading}
          >
            <FaGoogle />
          </button>
          <button
            className={`${styles.iconButton} ${styles.facebook}`}
            onClick={handleFacebookRegister}
            disabled={loading}
          >
            <FaFacebook />
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
