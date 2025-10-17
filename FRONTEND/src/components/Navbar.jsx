import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useUser } from "../context/UserContext.jsx";

const Navbar = () => {
  const { total } = useCart();
  const { logout, token } = useUser();

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          🍕 Mamma Mía
        </Link>

        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            {token && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
            )}

            {!token && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  <span role="img" aria-label="lock">
                    🔒
                  </span>
                  Login
                </NavLink>
              </li>
            )}
            {token && (
              <li className="nav-item">
                <button
                  className="nav-link d-flex align-items-center gap-2"
                  onClick={logout}
                >
                  <span role="img" aria-label="lock">
                    🔒
                  </span>
                  Logout
                </button>
              </li>
            )}
            {!token && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  <span role="img" aria-label="lock">
                    🔒
                  </span>
                  Register
                </NavLink>
              </li>
            )}
          </ul>

          <NavLink className="btn btn-danger" to="/cart">
            🛒 Total: ${total.toLocaleString("es-CL")}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
