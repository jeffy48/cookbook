import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));

    if (data) {
      setErrors(data);
    }
  };

  const handleDemo = async (e) => {
    e.preventDefault();
    dispatch(login('demo@aa.io', "password"));
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Sign in to Cookbook</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li style={{color:"red"}} key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="login-buttons" type="submit">Log In</button>
        </form>
        <button style={{marginTop:15}} className="login-buttons" onClick={handleDemo}>Demo Login</button>
        <NavLink exact to="/signup">New User? Sign Up Instead!</NavLink>
      </div>
    </div>
  );
}

export default LoginFormPage;
