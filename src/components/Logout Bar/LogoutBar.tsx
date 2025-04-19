import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./logout-bar.css";

const LogoutBar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef(null);

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/login");
  };

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPopup]);

  return (
    <div className="logout-bar" style={{ position: "relative" }}>
      <Sidebar />
      <div
        className="logout-button"
        onClick={() => setShowPopup((prev) => !prev)}
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          padding: "10px",
        }}
      >
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>

      {showPopup && (
        <div
          ref={popupRef}
          style={{
            position: "absolute",
            top: 60,
            right: 20,
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            borderRadius: "8px",
            padding: "10px 20px",
            zIndex: 1000,
          }}
        >
          <p
            onClick={handleLogout}
            style={{
              margin: 0,
              cursor: "pointer",
              fontWeight: "500",
              color: "#F44336",
            }}
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default LogoutBar;
