// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarritoMP from "./components/CarritoMp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/carritopage" element={<CarritoMP />} />
        {/* otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;