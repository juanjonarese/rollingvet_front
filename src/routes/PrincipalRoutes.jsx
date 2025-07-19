import { Routes, Route } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
// import AboutScreen from "../pages/AboutScreen";
// import Planes from "../pages/Planes";
// import NotFound from "../pages/NotFound";

const PrincipalRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        {/* <Route path="/about" element={<AboutScreen />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default PrincipalRoutes;
