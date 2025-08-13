import { Routes, Route } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
import RegisterScreen from "../pages/RegisterScreen";
import RecoveryPassScreen from "../pages/RecoveryPassScreen";
import Error404 from "../pages/error404";
import PlanesPage from "../pages/PlanesPage";
import FormularioPlanes from "../components/FormularioPlanes";

const PrincipalRoutes = () => {
  return (
    <Routes>
      <Route path="/cards" element={<PlanesPage />} />
      <Route path="/" element={<HomeScreen />} />
      <Route path="/signup" element={<RegisterScreen />} />
      <Route path="/recovery" element={<RecoveryPassScreen />} />
      <Route path="*" element={<Error404 />} />
      <Route path="/formularioplanes" element={<FormularioPlanes />} />
      {/* <Route path="/about" element={<AboutScreen />} />
      <Route path="/planes" element={<Planes />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default PrincipalRoutes;