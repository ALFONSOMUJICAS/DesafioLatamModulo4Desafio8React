import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import Header from "../components/Header";

/**
 * RegisterPage
 * - Email, Password, Confirm Password
 * - Validaciones mínimas + required en inputs
 */
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState(null); // { type: 'success' | 'danger', text: string }
  const { register, login } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailTrim = (email || "").trim();
    const passwordTrim = (password || "").trim();
    const confirmTrim = (confirm || "").trim();

    if (!emailTrim || !passwordTrim || !confirmTrim) {
      setMessage({
        type: "danger",
        text: "Todos los campos son obligatorios.",
      });
      return;
    }
    if (passwordTrim.length < 6) {
      setMessage({
        type: "danger",
        text: "La contraseña debe tener al menos 6 caracteres.",
      });
      return;
    }
    if (passwordTrim !== confirmTrim) {
      setMessage({
        type: "danger",
        text: "La contraseña y su confirmación deben ser iguales.",
      });
      return;
    }
    setMessage({ type: "success", text: "Registro exitoso." });
    register({ email: emailTrim, password: passwordTrim });
    login({ emailTrim, passwordTrim });
  };

  return (
    <div className="container my-5" style={{ maxWidth: 480 }}>
      <Header />
      <h2 className="mb-4 text-center">Registro</h2>
      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="regEmail" className="form-label">
            Email
          </label>
          <input
            id="regEmail"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="regPass" className="form-label">
            Contraseña
          </label>
          <input
            id="regPass"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            minLength={6}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="regConfirm" className="form-label">
            Confirmar contraseña
          </label>
          <input
            id="regConfirm"
            type="password"
            className="form-control"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repite tu contraseña"
            minLength={6}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Crear cuenta
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
