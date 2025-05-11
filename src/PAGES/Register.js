import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const captchaRef = useRef(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!captchaVerified) {
      setError("Please verify you're not a robot");
      return;
    }

    try {
      await register(name, email, password);
      navigate("/profil");
    } catch (err) {
      setError("Failed to register. Please try again.");
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
      <h2>Create an account</h2>
      {error && <p className="error">{error}</p>}

      <div className="form-group">
        <input
          type="text"
          id="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="Name">Name</label>
      </div>

      <div className="form-group">
        <input
          type="email"
          id="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="Email">Email</label>
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

      <button type="submit" disabled={!captchaVerified}>Register</button>
    </form>
  );
}

export default Register;