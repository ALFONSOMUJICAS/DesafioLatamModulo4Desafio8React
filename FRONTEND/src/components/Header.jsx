/**
 * Fecha: 2025-08-18 20:30:23
 * Descripción: Sección hero (encabezado visual) con imagen de fondo y overlay.
 * Funcionalidad: Presentación y mensaje de bienvenida.
 * Conecta: Usado dentro de <Home />. Sus estilos viven en Header.css.
 * Notas: Solo comentarios añadidos.
 */
import React from 'react'
import './Header.css'
function Header() {
  return (
    <section className="header-hero">
      <div className="overlay">
        <h1>Bienvenido a Pizzería Mamma Mía</h1>
        <p>Las mejores pizzas artesanales, ingredientes frescos y masa al estilo napolitano.</p>
      </div>
    </section>
  )
}

export default Header
