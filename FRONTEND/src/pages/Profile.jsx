import React from 'react';

const Profile = () => {
  const email = 'usuario@ejemplo.com'; // estático según requerimiento
  return (
    <div className="container my-4">
      <h2>Perfil</h2>
      <p>Email: <strong>{email}</strong></p>
      <button className="btn btn-outline-secondary btn-sm">Cerrar sesión</button>
    </div>
  );
};

export default Profile;
