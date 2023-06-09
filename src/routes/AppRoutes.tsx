import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Errands from '../pages/ListErrands';
import Register from '../pages/Register';
import RegisterErrands from '../pages/RegisterErrands';

const AppRoutes = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/list-errands" element={<Errands/>}/>
          <Route path="/register-errands" element={<RegisterErrands/>}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default AppRoutes;
