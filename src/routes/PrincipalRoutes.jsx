import { Routes, Route } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
import RegisterScreen from "../pages/RegisterScreen";
import RecoveryPassScreen from "../pages/RecoveryPassScreen";
import LoginScreen from "../pages/LoginScreen";
// import AboutScreen from "../pages/AboutScreen";
// import Planes from "../pages/Planes";
// import NotFound from "../pages/NotFound";

const PrincipalRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<RegisterScreen />} />
        <Route path="/recovery" element={<RecoveryPassScreen />} />
        {/* <Route path="/about" element={<AboutScreen />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default PrincipalRoutes;
