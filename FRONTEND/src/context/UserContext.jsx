import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  //funcion login
  async function login({ email, password }) {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setToken(data.token);
      setEmail(data.email);
    } catch (error) {
      console.error("error", error.message);
    }
  }

  //funcion register

  async function register({ email, password }) {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setToken(data.token);
      setEmail(data.email);
    } catch (error) {
      console.error("error", error.message);
    }
  }

  //funcion getprofile
  async function getProfile() {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setEmail(data.email);
      return data;
    } catch (error) {
      console.error("error al traer el usuario", error.message);
    }
  }

  //funcion logout

  function logout() {
    setToken(null);
    setEmail(null);
  }

  const value = { token, logout, email, login, register, getProfile };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
