import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Signin from '../pages/user/SignIn';
import Signup from '../pages/user/Signup';
import Dashboard from '../pages/homepage/home';

const AuthRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/signup" element={<Signup/>} />
  </Routes>
);

export default AuthRoutes;
