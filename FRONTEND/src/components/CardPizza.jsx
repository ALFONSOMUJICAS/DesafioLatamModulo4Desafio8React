import React from "react";

const currency = (n) =>
  n.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

const CardPizza = ({ img, name, price, ingredients, desc }) => {
  return (
    <div className="card">
      {img && <img src={img} alt={name} />}
      <div className="body">
        <h3 style={{ textTransform: "capitalize", margin: "4px 0 8px" }}>
          {name}
        </h3>
        <p style={{ color: "#555", minHeight: 48 }}>{desc || ""}</p>
        <h4>Ingredientes</h4>
        <ul className="ingredients">
          {ingredients?.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <strong>{currency(price)}</strong>
        </div>
      </div>
    </div>
  );
};
export default CardPizza;
