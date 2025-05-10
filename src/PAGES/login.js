import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/profil"); // Redirect to the profile page after login
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>
      {error && <p>{error}</p>}
      
      <div class="form-group">
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label for="email">Email</label>
      </div>


      <div class="form-group">
      <input
        type="password"
        id="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label for="Password">Password</label>
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;