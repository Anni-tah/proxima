import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginLayout from './LoginLayout';
import Register from './Register';
import Dashboard from './Dashboard';

function ProximaRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginLayout />} />
        <Route path="/login" element={<LoginLayout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default ProximaRouter;
