import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { login } = useUser();
  const navigate = useNavigate();

  async function sendData(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      alert("Por favor completa ambos campos");
      return;
    }

    await login({ email, password });

    navigate("/profile");
  }

  return (
    <div className="container mt-5">
      <div className="d-flex flex-column mx-auto p-4" style={{ maxWidth: 800 }}>
        <h2 className="display-6 mb-4">Iniciar sesión</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            sendData(formData); // tu función
          }}
          className="d-flex flex-column gap-3"
        >
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="tuemail@ejemplo.com"
            className="form-control"
            required
          />

          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="ingresa tu contraseña"
            minLength={6}
            className="form-control"
            required
          />

          <button type="submit" className="btn btn-primary mt-3">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
