// /src/pages/Auth/Login.tsx

import React, { useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Toast } from "../../components/ui/Toast";
import { FaGoogle, FaFacebookF, FaUtensils, FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Login.module.css";

// 👉 se você exportou mapAuthError no AuthProvider, use a linha abaixo.
//    Caso não tenha exportado, deixe o fallback local (mapAuthErrorLocal) que funciona igual.
import { mapAuthError as mapAuthErrorFromProvider } from "../../contexts/AuthProvider";

type ToastState = { message: string; type: "success" | "error" | "info" } | null;

// Fallback local (usado se o import acima não existir)
const mapAuthErrorLocal = (code?: string) => {
  switch (code) {
    case "auth/invalid-email":
      return "E-mail inválido.";
    case "auth/user-disabled":
      return "Usuário desativado.";
    case "auth/user-not-found":
      return "Usuário não encontrado.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "E-mail ou senha incorretos.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente mais tarde.";
    case "auth/unauthorized-domain":
      return "Domínio não autorizado nas configurações do Firebase.";
    default:
      return "Falha na autenticação. Tente novamente.";
  }
};

export const Login: React.FC = () => {
  const { login, loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [loading, setLoading] = useState(false);

  // Usa o map que veio do Provider, senão usa o fallback
  const mapAuthError = useMemo(
    () => mapAuthErrorFromProvider ?? mapAuthErrorLocal,
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const emailTrim = email.trim();
    const passTrim = password.trim();
    if (!emailTrim || !passTrim) {
      setToast({ message: "⚠️ Preencha e-mail e senha.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      await login(emailTrim, passTrim);
      setToast({ message: "✅ Login efetuado com sucesso!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err: any) {
      const msg = mapAuthError(err?.code);
      setToast({ message: `⚠️ ${msg}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await loginWithGoogle();
      setToast({ message: "✅ Login com Google efetuado com sucesso!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err: any) {
      setToast({ message: `⚠️ ${mapAuthError(err?.code)}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await loginWithFacebook();
      setToast({ message: "✅ Login com Facebook efetuado com sucesso!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err: any) {
      setToast({ message: `⚠️ ${mapAuthError(err?.code)}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const isDisabled = loading || !email.trim() || !password.trim();

  return (
    <div className={styles.page}>
      <h1 className={styles.logo}>
        <FaUtensils className={styles.icon} /> Restaurant Service
      </h1>

      <div className={styles.container}>
        <h2 className={styles.title}>Login</h2>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <input
            type="email"
            placeholder="Digite seu e-mail"
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
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
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

          <div className={styles.forgotPassword}>
            <Link to="/auth/forgot-password">Esqueceu a senha?</Link>
          </div>

          <button type="submit" disabled={isDisabled}>
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
            aria-label="Entrar com Google"
          >
            <FaGoogle />
          </button>
          <button
            className={`${styles.iconButton} ${styles.facebook}`}
            onClick={handleFacebookLogin}
            disabled={loading}
            aria-label="Entrar com Facebook"
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
