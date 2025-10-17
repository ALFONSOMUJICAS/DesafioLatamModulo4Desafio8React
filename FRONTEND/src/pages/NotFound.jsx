import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container my-5 text-center">
      <h1 className="display-6">404</h1>
      <p>Página no encontrada</p>
      <Link className="btn btn-primary" to="/">Volver al inicio</Link>
    </div>
  );
};

export default NotFound;
