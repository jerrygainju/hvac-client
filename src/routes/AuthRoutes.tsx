import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signin from '../pages/user/SignIn';
import Signup from '../pages/user/Signup';

const AuthRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Signin />} />
    <Route path="/signup" element={<Signup/>} />
  </Routes>
);

export default AuthRoutes;
