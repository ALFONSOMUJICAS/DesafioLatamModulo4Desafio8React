import React from "react";
import { useCart } from "../context/CartContext.jsx";
import { useUser } from "../context/UserContext.jsx"; // IMPORTA useUser
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css"; // tus estilos después

const Cart = () => {
  const { items, total, increase, decrease, remove } = useCart();
  const { token } = useUser(); // OBTIENE token del contexto

  if (items.length === 0) {
    return (
      <div className="container my-4">
        <div className="alert alert-info">
          Tu carrito está vacío. Agrega pizzas desde la Home.
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-3">Carrito</h2>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th style={{ width: 180 }}>Cantidad</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td className="d-flex align-items-center gap-2">
                  {it.img ? (
                    <img
                      src={it.img}
                      alt={it.name}
                      style={{
                        width: 56,
                        height: 56,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  ) : null}
                  <span>{it.name}</span>
                </td>
                <td>${it.price?.toLocaleString("es-CL")}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => decrease(it.id)}
                    >
                      -
                    </button>
                    <button className="btn btn-outline-secondary" disabled>
                      {it.qty}
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => increase(it.id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>${(it.qty * it.price).toLocaleString("es-CL")}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => remove(it.id)}
                  >
                    Quitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total + botón Pagar siempre visible */}
      <div className="d-flex flex-column align-items-end">
        <h4 className="mb-2">Total: ${total.toLocaleString("es-CL")}</h4>
        {items.length > 0 && (
          <button
            disabled={!token} // DESHABILITA si no hay token
            type="button"
            className="btn btn-success"
            style={{
              backgroundColor: "#198754",
              borderColor: "#198754",
              color: "#fff",
            }}
            onClick={() => console.log("Pagar (placeholder)")}
          >
            PAGAR
          </button>
        )}
        {!token && (
          <p className="small text-danger mt-2">
            Debes iniciar sesión para completar tu compra.
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
