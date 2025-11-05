// /src/pages/Auth/Register.tsx

import React, { useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Toast } from "../../components/ui/Toast";
import { FaGoogle, FaFacebook, FaUtensils, FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Register.module.css";

// Se você exportou mapAuthError do AuthProvider, usamos ele; senão caímos no fallback local
import { mapAuthError as mapAuthErrorFromProvider } from "../../contexts/AuthProvider";

type ToastState = { message: string; type: "success" | "error" | "info" } | null;

const mapAuthErrorLocal = (code?: string) => {
  switch (code) {
    case "auth/invalid-email":
      return "E-mail inválido.";
    case "auth/email-already-in-use":
      return "Este e-mail já está cadastrado.";
    case "auth/weak-password":
      return "A senha deve ter pelo menos 6 caracteres.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente mais tarde.";
    default:
      return "Falha ao criar cadastro. Tente novamente.";
  }
};

export const Register: React.FC = () => {
  const { register, loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [loading, setLoading] = useState(false);

  const mapAuthError = useMemo(
    () => mapAuthErrorFromProvider ?? mapAuthErrorLocal,
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const nameTrim = name.trim();
    const emailTrim = email.trim();
    const passTrim = password.trim();

    if (!nameTrim || !emailTrim || !passTrim) {
      setToast({ message: "⚠️ Todos os campos são obrigatórios.", type: "error" });
      return;
    }
    if (passTrim.length < 6) {
      setToast({ message: "⚠️ A senha deve ter pelo menos 6 caracteres.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      await register(nameTrim, emailTrim, passTrim);
      setToast({ message: "✅ Cadastro criado com sucesso!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err: any) {
      const msg = mapAuthError(err?.code);
      setToast({ message: `⚠️ ${msg}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await loginWithGoogle();
      setToast({ message: "✅ Cadastro/Login com Google realizado!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err: any) {
      setToast({ message: `⚠️ ${mapAuthError(err?.code)}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookRegister = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await loginWithFacebook();
      setToast({ message: "✅ Cadastro/Login com Facebook realizado!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err: any) {
      setToast({ message: `⚠️ ${mapAuthError(err?.code)}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const isDisabled = loading || !name.trim() || !email.trim() || password.trim().length < 6;

  return (
    <div className={styles.page}>
      <h1 className={styles.logo}>
        <FaUtensils className={styles.icon} /> Restaurant Service
      </h1>

      <div className={styles.container}>
        <h2 className={styles.title}>Criar Conta</h2>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
            aria-label="Nome completo"
          />

          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputMode="email"
            autoComplete="email"
            required
            aria-label="E-mail"
          />

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Crie uma senha (mín. 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              aria-label="Senha"
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={togglePassword}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              aria-pressed={showPassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" disabled={isDisabled}>
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
            aria-label="Cadastrar com Google"
          >
            <FaGoogle />
          </button>
          <button
            className={`${styles.iconButton} ${styles.facebook}`}
            onClick={handleFacebookRegister}
            disabled={loading}
            aria-label="Cadastrar com Facebook"
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
