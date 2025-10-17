import { useEffect } from "react";
import { useUser } from "../context/UserContext";

function Profile() {
  const { email, getProfile, logout } = useUser();

  useEffect(() => {
    if (!email) {
      getProfile();
    }
  }, [email, getProfile]);

  return (
    <div className="container mt-5">
      <div
        className="mx-auto p-4 border rounded shadow-sm"
        style={{ maxWidth: 720 }}
      >
        <h2 className="display-6 fw-bold mb-4">Perfil</h2>

        {email ? (
          <>
            <p className="text-dark mb-3">
              Has iniciado sesión como:{" "}
              <span className="fw-semibold">{email}</span>
            </p>

            <button onClick={logout} className="btn btn-danger">
              Cerrar sesión{" "}
              <span role="img" aria-label="candado">
                🔒
              </span>
            </button>
          </>
        ) : (
          <p className="text-muted">Cargando información…</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
