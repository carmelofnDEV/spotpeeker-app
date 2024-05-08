import { env } from "./env";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Auth/Login";
import { Register } from "./Pages/Auth/Register";
import { Perfil } from "./Pages/Perfil";
import { useEffect, useState } from "react";
import { useAuth } from "./Hooks/Auth/useAuth";
import { Navbar } from "./Pages/Navbar";

export const App = () => {
  const SERVER_URL = env.SERVER_URL;

  const {  isLoggedIn } = useAuth();



  return (
    <>
        <Navbar />
        <Routes>
          {isLoggedIn ? (
          <>
            <Route path="/perfil" element={<Perfil />} />
          </>
          ) : (
            <Route path="/perfil" element={<Home />} />
          )}

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </>
  )
};
