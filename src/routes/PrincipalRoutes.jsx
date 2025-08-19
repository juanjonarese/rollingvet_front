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
import PlanesPage from "../pages/PlanesPage";
import LoginPage from "../pages/LoginPage";
import SobreNosotros from "../pages/SobreNosotros";
import AdminProductsScreen from "../pages/AdminProductsScreen.jsx";
import PacientesScreen from "../pages/PacientesScreen.jsx";
import TurnosScreen from "../pages/TurnosScreen.jsx";

const PrincipalRoutes = () => {
  return (
    <Routes>
      <Route path="/cards" element={<PlanesPage />} />
      <Route path="/" element={<HomeScreen />} />
      <Route path="/products" element={<ProductsScreen />} />
      <Route path="/product/:id" element={<OneProductScreen />} />
      <Route path="/aboutuspage" element={<SobreNosotros />} />
      <Route path="/turnos" element={<TurnosScreen />} />
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
