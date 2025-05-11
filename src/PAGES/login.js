import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const captchaRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!captchaVerified) {
      setError("Please verify you're not a robot");
      return;
    }

    try {
      await login(email, password);
      navigate("/profil");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login.");
      // Reset CAPTCHA on error
      captchaRef.current.reset();
      setCaptchaVerified(false);
    }
  };

  const onChangeCaptcha = (value) => {
    setCaptchaVerified(!!value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>
      {error && <p className="error">{error}</p>}
      
      <div className="form-group">
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
      </div>

      <div className="form-group">
        <input
          type="password"
          id="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="Password">Password</label>
      </div>

      <ReCAPTCHA
        ref={captchaRef}
        sitekey="6LeNsDUrAAAAAOhqV_rzgEL_T7KnYMDv5sIwvClu"
        onChange={onChangeCaptcha}
      />

      <button type="submit" disabled={!captchaVerified}>Login</button>
    </form>
  );
}

export default Login;