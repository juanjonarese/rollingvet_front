import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PrincipalRoutes from './routes/PrincipalRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <PrincipalRoutes />
    </BrowserRouter>
  );
};

export default App;