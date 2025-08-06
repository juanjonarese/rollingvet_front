import { Routes, Route } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
import RegisterScreen from "../pages/RegisterScreen";
import RecoveryPassMailScreen from "../pages/RecoveryPassScreen";
import LoginScreen from "../pages/LoginScreen";
import ProductsScreen from "../pages/ProductsScreen";
import OneProductScreen from "../pages/OneProductScreen";
import ChangePassScreen from "../pages/ChangePassScreen";
import AdminUsersScreen from "../pages/AdminUsersScreen";
import AboutUsPage from "../pages/AboutUsPage";
import FormularioPlanes from "../components/FormularioPlanes";
import AdminProductsScreen from "../pages/AdminProductsScreen";

const PrincipalRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/products" element={<ProductsScreen />} />
        <Route path="/product/:id" element={<OneProductScreen />} />
        <Route path="/aboutuspage" element={<AboutUsPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<RegisterScreen />} />
        <Route path="/recoverymail" element={<RecoveryPassMailScreen />} />
        <Route path="/changepass" element={<ChangePassScreen />} />
        <Route path="/adminusers" element={<AdminUsersScreen />} />
        <Route path="/adminproducts" element={<AdminProductsScreen />} />
        <Route path="/FormularioPlanes" element={<FormularioPlanes />} />
        {/* <Route path="/about" element={<AboutScreen />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default PrincipalRoutes;
