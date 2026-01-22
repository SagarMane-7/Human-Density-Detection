import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);

  const handleLogout = async () => {
  setShowAnimation(true);

  setTimeout(async () => {
    await logout();

    navigate("/authentication", {
      state: { fromLogout: true }
    });
  }, 3000);
};

  return (
    <button onClick={handleLogout} style={{backgroundColor:"#ff3b3b",color:"#fff",padding:"10% 10%",borderRadius:"6px",border:"none",cursor:"pointer",fontWeight:"600",fontSize:"18px"}}>
    Logout
    </button>
  );
};

export default Logout;
