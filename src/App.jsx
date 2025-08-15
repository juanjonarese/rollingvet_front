import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarritoMP from "./components/CarritoMp";

import { BrowserRouter } from "react-router-dom";
import NavbarApp from "./components/NavbarApp";
import FooterApp from "./components/FooterApp";
import PrincipalRoutes from "./routes/PrincipalRoutes";


function App() {
  return (

    <Router>
      <Routes>
        <Route path="/carritopage" element={<CarritoMP />} />
      </Routes>
    </Router>

    <BrowserRouter>
      <NavbarApp />
      <PrincipalRoutes />
      <FooterApp />
    </BrowserRouter>
  );
}

export default App;
