import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/profil"); // Redirect to profile page
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create an account</h2>
      {error && <p>{error}</p>}

      <div class="form-group">
      <input
        type="text"
        id="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label for="Name">Name</label>
      </div>


      <div class="form-group">
      <input
        type="email"
        id="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label for="Email">Email</label>
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
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;