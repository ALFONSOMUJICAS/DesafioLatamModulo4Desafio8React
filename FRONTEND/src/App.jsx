import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Páginas (todas se mantienen)
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import NotFound from "./pages/NotFound.jsx";
import Pizza from "./pages/Pizza.jsx";
import Profile from "./dashboard/Profile.jsx";
import { useUser } from "./context/UserContext.jsx";
import { Navigate } from "react-router-dom";

const App = () => {
  const { token } = useUser();
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizza/:id" element={<Pizza />} />
        <Route path="/cart" element={<Cart />} />

        {/* si está logueado, no dejar entrar a login/register */}
        <Route
          path="/register"
          element={token ? <Navigate to="/" replace /> : <Register />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <Login />}
        />

        {/* proteger profile */}
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" replace />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
};

export default App;
