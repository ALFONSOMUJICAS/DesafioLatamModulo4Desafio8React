import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const currency = (n) =>
  n?.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

/**
 * Pizza.jsx (Hito 4 - versión fija p001)
 * - Consume: GET http://localhost:5000/api/pizzas/p001
 * - useEffect para la petición
 * - Renderiza: nombre, precio, ingredientes, imagen, descripción
 * - Botón "Añadir al carrito" sin funcionalidad
 * - Sin react-router-dom; no modifica tus estilos ni layout
 */
const Pizza = () => {
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { id } = useParams();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/pizzas/${id}`);
        if (!res.ok) throw new Error("No se pudo obtener la pizza");
        const data = await res.json();
        setPizza(data);
      } catch (err) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    fetchPizza();
  }, [id]); // ✅ se ejecuta una vez al montar

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!pizza) return null;

  const { name, price, ingredients, img, desc } = pizza;

  const handleAddToCart = () => {
    addToCart(pizza);
  };

  return (
    <section style={{ maxWidth: 980, margin: "0 auto", padding: "0 16px" }}>
      <Header />
      <Link to="/" className="small text-decoration-underline text-primary">
        &larr; Volver
      </Link>

      <article
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
      >
        {img && (
          <img
            src={img}
            alt={name}
            style={{
              width: "100%",
              height: 320,
              objectFit: "cover",
              borderRadius: 12,
            }}
          />
        )}
        <div>
          <h2 style={{ margin: "0 0 8px", textTransform: "capitalize" }}>
            {name}
          </h2>
          <p style={{ color: "#555" }}>{desc}</p>
          <h4 style={{ marginTop: 12 }}>Ingredientes</h4>
          <ul style={{ marginTop: 6, paddingLeft: 18 }}>
            {ingredients?.map((ing, i) => (
              <li key={i}>• {ing}</li>
            ))}
          </ul>
          <p style={{ marginTop: 12 }}>
            <strong>{currency(price)}</strong>
          </p>
          <button style={{ marginTop: 8 }} onClick={handleAddToCart}>
            Añadir al carrito
          </button>
        </div>
      </article>
    </section>
  );
};

export default Pizza;
