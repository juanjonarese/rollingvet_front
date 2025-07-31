import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarApp from "./components/NavbarApp";
import FooterApp from "./components/FooterApp";
import PrincipalRoutes from "./routes/PrincipalRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <NavbarApp />
      <PrincipalRoutes />
      <FooterApp />
    </BrowserRouter>
  );
};

export default App;
