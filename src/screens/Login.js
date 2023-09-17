import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token to local storage and redirect
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('token', json.authToken);
      navigate('/');
    } else {
      alert('Enter Valid Credentials');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <div>
        <Navbar />
      </div>
      <div className="login-form-container">
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <img src="" alt="" />
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone.
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              name="password"
            />
          </div>
          <div className='buttons'>
          <button type="submit" className=" btn btn-light text-black">
            Login
          </button>
          <Link to="/signup" className="btn btn-light text-black">
            Create New Account
          </Link>
          </div>
          
        </form>
      </div>
    </div>
  );
}
