import { Routes, Route } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
import RegisterScreen from "../pages/RegisterScreen";
import RecoveryPassMailScreen from "../pages/RecoveryPassScreen";
import ProductsScreen from "../pages/ProductsScreen";
import OneProductScreen from "../pages/OneProductScreen";
import ChangePassScreen from "../pages/ChangePassScreen";
import AdminUsersScreen from "../pages/AdminUsersScreen";
import AdminProducts from "../pages/AdminProductsScreen.jsx";
// import AboutUsPage from "../pages/AboutUsPage";
import Error404 from "../pages/error404.jsx";
import FormularioPlanes from "../components/FormularioPlanes.jsx";
import FooterApp from "../components/FooterApp.jsx";

import LoginPage from "../pages/LoginPage";
import SobreNosotros from "../pages/SobreNosotros";
import PacientesScreen from "../pages/PacientesScreen"

const PrincipalRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/products" element={<ProductsScreen />} />
        <Route path="/product/:id" element={<OneProductScreen />} />
        <Route path="/aboutuspage" element={<SobreNosotros />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterScreen />} />
        <Route path="/recoverymail" element={<RecoveryPassMailScreen />} />
        <Route path="/changepass" element={<ChangePassScreen />} />
        <Route path="/adminusers" element={<AdminUsersScreen />} />
        <Route path="/error404" element={<Error404 />} />
        <Route path="/footerapp" element={<FooterApp />} />
        <Route path="/adminproducts" element={<AdminProducts />} />
        <Route path="/FormularioPlanes" element={<FormularioPlanes />} />
        <Route path="/pacientes" element={<PacientesScreen/>}/>

        {/* <Route path="/about" element={<AboutScreen />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default PrincipalRoutes;
