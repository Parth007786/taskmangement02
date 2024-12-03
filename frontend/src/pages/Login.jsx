// src/components/Login.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/authService";
import { useNavigate } from "react-router-dom";
import "../index.css";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser(credentials));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/dash");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
