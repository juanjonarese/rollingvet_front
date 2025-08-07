import { Routes, Route } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
import RegisterScreen from "../pages/RegisterScreen";
import RecoveryPassMailScreen from "../pages/RecoveryPassScreen";
import LoginScreen from "../pages/LoginScreen";
import ProductsScreen from "../pages/ProductsScreen";
import OneProductScreen from "../pages/OneProductScreen";
import ChangePassScreen from "../pages/ChangePassScreen";
import AdminUsersScreen from "../pages/AdminUsersScreen";
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
  );
};

export default PrincipalRoutes;