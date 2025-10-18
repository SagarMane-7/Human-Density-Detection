import React, { useEffect} from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import Home from './Pages/Home/Home'
import Auth from './Pages/Auth/Auth'
import Dashboard from './Pages/Dashboard/Dashboard'
import Specific_Room from './Pages/Specific_Room/Specific_Room'
import RoomSetup from './Pages/RoomSetup/RoomSetup.jsx'
import Alerts from './Pages/Alerts/Alerts'
import Help from './Pages/Help/Help';
import { AuthProvider } from './context/AuthContext';

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
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/authentication' element={<Auth />} />
          <Route path='/dashboard/:id' element={<Specific_Room />} />
          <Route path='/roomsetup' element={<RoomSetup />} />
          <Route path='/alerts' element={<Alerts />} />
          <Route path='/help' element={<Help />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}


export default App
