import { Routes, Route } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
import RegisterScreen from "../pages/RegisterScreen";
import RecoveryPassMailScreen from "../pages/RecoveryPassScreen";
import ProductsScreen from "../pages/ProductsScreen";
import OneProductScreen from "../pages/OneProductScreen";
import ChangePassScreen from "../pages/ChangePassScreen";
import AdminUsersScreen from "../pages/AdminUsersScreen";
import Error404 from "../pages/error404.jsx";
import FormularioPlanes from "../components/FormularioPlanes.jsx";
import FooterApp from "../components/FooterApp.jsx";
import AdminRoute from "./AdminRoutes.jsx";

import LoginPage from "../pages/LoginPage";
import SobreNosotros from "../pages/SobreNosotros";
import CarritoPage from "../pages/CarritoPage";



const PrincipalRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/products" element={<ProductsScreen />} />
        <Route path="/product/:id" element={<OneProductScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<RegisterScreen />} />
        <Route path="/recoverymail" element={<RecoveryPassMailScreen />} />
        <Route path="/changepass" element={<ChangePassScreen />} />
        <Route path="/adminusers" element={<AdminUsersScreen />} />
        <Route path="/aboutuspage" element={<SobreNosotros />} />
        <Route path="/carritopage" element={<CarritoPage />} />
      </Routes>
    </BrowserRouter>

import AdminProductsScreen from "../pages/AdminProductsScreen.jsx";
import PacientesScreen from "../pages/PacientesScreen.jsx"

const PrincipalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/products" element={<ProductsScreen />} />
      <Route path="/product/:id" element={<OneProductScreen />} />
      <Route path="/aboutuspage" element={<SobreNosotros />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterScreen />} />
      <Route path="/recoverymail" element={<RecoveryPassMailScreen />} />
      <Route path="/changepass" element={<ChangePassScreen />} />
      <Route path="/error404" element={<Error404 />} />
      <Route path="/footerapp" element={<FooterApp />} />
      <Route path="/FormularioPlanes" element={<FormularioPlanes />} />

      {/* ✅ Rutas protegidas con wrapper */}
      <Route
        path="/admin/adminusers"
        element={
          <AdminRoute>
            <AdminUsersScreen />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/adminproducts"
        element={
          <AdminRoute>
            <AdminProductsScreen />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/pacientes"
        element={
          <AdminRoute>
            <PacientesScreen />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default PrincipalRoutes;
