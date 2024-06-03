import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Auth/Login";
import { Register } from "./Pages/Auth/Register";
import { Perfil } from "./Pages/Perfil";
import { useAuth } from "./Hooks/Auth/useAuth";
import { Navbar } from "./Pages/Navbar";
import { Publicar } from "./Pages/Publicar";
import { Descubrir } from "./Pages/Descubrir";

export const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
        <Navbar />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/perfil" element={<Perfil logged={isLoggedIn} />} />
              <Route path="/publicar" element={<Publicar />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          )}
          <Route
            path="/usuario/:username"
            element={<Perfil logged={isLoggedIn} />}
          />
          <Route path="/" element={<Home logged={isLoggedIn} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/descubrir"
            element={<Descubrir logged={isLoggedIn} />}
          />
        </Routes>
    </>
  );
};
