import { Routes, Route } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
import RegisterScreen from "../pages/RegisterScreen";
import RecoveryPassScreen from "../pages/RecoveryPassScreen";
import FormularioPlanes from "../components/FormularioPlanes";
import Error404 from "../pages/error404";
import AboutUsPage from "../pages/AboutUsPage";
// import AboutScreen from "../pages/AboutScreen";
// import Planes from "../pages/Planes";
// import NotFound from "../pages/NotFound";

const PrincipalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/signup" element={<RegisterScreen />} />
      <Route path="/recovery" element={<RecoveryPassScreen />} />
      <Route path="/FormularioPlanes" element={<FormularioPlanes/>} />
      <Route path="/AboutUsPage" element={<AboutUsPage />} />
      <Route path="*" element={<Error404 />} />
      {/* <Route path="/about" element={<AboutScreen />} />
      <Route path="/planes" element={<Planes />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default PrincipalRoutes;