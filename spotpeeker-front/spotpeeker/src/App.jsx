import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Auth/Login";
import { Register } from "./Pages/Auth/Register";
import { Perfil } from "./Pages/Perfil";
import { useAuth } from "./Hooks/Auth/useAuth";
import { Navbar } from "./Pages/Navbar";
import { Publicar } from "./Pages/Publicar";

export const App = () => {

  const {  isLoggedIn } = useAuth();



  return (
    <>
        <Navbar />
        <Routes>
          {isLoggedIn ? (
          <>
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/publicar" element={<Publicar />} />
          </>
          ) : (
            <Route path="/perfil" element={<Home />} />
          )}
          <Route path="/usuario/:username" element={<Perfil />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </>
  )
};
