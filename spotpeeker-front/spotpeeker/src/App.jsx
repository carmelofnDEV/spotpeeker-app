import { env } from "./env";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Auth/Login";
import { Register } from "./Pages/Auth/Register";
import Cookies from "js-cookie";
import { Perfil } from "./Pages/Perfil";
import { useEffect, useState } from "react";


export const App = () => {
  const SERVER_URL = env.SERVER_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkSession = async () => {
    
    const authToken = {
      "auth_token":Cookies.get("auth_token"),
    };


    try {
        const response = await fetch(`${SERVER_URL}/verify-cookie/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authToken),
      });
      const data = await response.json();

      setIsLoggedIn( data.valid);
    } catch (error) {
      console.error("Server Error:", error);
      setIsLoggedIn( false);
    }
  };

  useEffect(() => {
    checkSession();
  }, [navigate]);

  return (
    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={<Perfil />} />
      ) : (
        <Route path="/" element={<Home />} />
      )}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
