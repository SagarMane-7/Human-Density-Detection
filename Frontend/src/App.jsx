import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import Home from './Pages/Home/Home'
import Auth from './Pages/Auth/Auth'
import Dashboard from './Pages/Dashboard/Dashboard'
import Specific_Room from './Pages/Specific_Room/Specific_Room'
import RoomSetup from './Pages/RoomSetup/RoomSetup.jsx'
import Alerts from './Pages/Alerts/Alerts'
import Help from './Pages/Help/Help';
import Logout from "./Component/Logout/Logout";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from "./context/ProtectedRoute";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/authentication' element={<Auth />} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/dashboard/:id' element={<ProtectedRoute><Specific_Room /></ProtectedRoute>} />
          <Route path='/roomsetup' element={<ProtectedRoute><RoomSetup /></ProtectedRoute>} />
          <Route path='/alerts' element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
          <Route path='/help' element={<Help />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}


export default App
