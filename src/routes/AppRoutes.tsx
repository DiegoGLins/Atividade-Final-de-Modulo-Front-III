import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Errands from '../pages/ListErrands';
import RegisterLogin from '../pages/RegisterLogin';
import EditErrands from '../pages/EditErrands';
import RegisterErrands from '../pages/RegisterErrands';

const AppRoutes = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/registerLogin" element={<RegisterLogin/>}/>
          <Route path="/list-errands" element={<Errands/>}/>
          <Route path="/edit-errands" element={<EditErrands/>}/>
          <Route path="/register-errands" element={<RegisterErrands/>}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default AppRoutes;
