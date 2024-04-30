import { Home } from "./Pages/Home";
import { env } from "./env";
import {Router, Routes, Route} from 'react-router-dom'

export const App = () => {
  const SERVER_URL = env.SERVER_URL;

  return (
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
  );
};
