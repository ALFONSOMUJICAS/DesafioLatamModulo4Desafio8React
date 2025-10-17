import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import CardPizza from "../components/CardPizza";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Home = () => {
  const { addToCart } = useCart();
  const [pizzas, setPizzas] = useState([]);

  const getPizzas = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/pizzas");
      const data = await res.json();
      setPizzas(data);
    } catch (error) {
      console.error("Error al obtener las pizzas:", error);
    }
  };

  useEffect(() => {
    getPizzas();
  }, []);

  return (
    <div className="container">
      <Header />
      <h2 className="section my-3">Nuestras Pizzas</h2>
      <div className="row g-3">
        {pizzas.map((p) => (
          <div className="col-12 col-sm-6 col-md-4" key={p.id}>
            {/* Tu card original */}
            <CardPizza {...p} />

            {/* Botón Añadir (Context) sin tocar tu backend */}
            <div className="d-flex gap-2 mt-1">
              <button className="btn btn-primary" onClick={() => addToCart(p)}>
                Añadir
              </button>

              {/* si quieres navegar al detalle */}
              <Link to={`/pizza/${p.id}`} className="btn btn-outline-primary">
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
