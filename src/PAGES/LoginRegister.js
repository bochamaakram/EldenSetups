import React from "react";
import Login from "./login";
import Register from "./Register";
import "../CSS/AuthStyles.css"; // Import your CSS file for styling

const LoginRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <Login />
      </div>
      <div className="auth-form">
        <Register />
      </div>
    </div>
  );
};

export default LoginRegister;