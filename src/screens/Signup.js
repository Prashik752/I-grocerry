import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Signup.css'; // Import the CSS file for Signup component

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location
      })
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      alert("Registration Successful. Please Login.");
      localStorage.setItem('token', json.authToken);
      navigate("/login");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  return (
    <div className="signup-container">
      <div>
        <Navbar />
      </div>

      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="location" className="form-label">Address</label>
            <input type="text" className="form-control" name="location" value={credentials.location} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={handleChange} name='password' />
          </div>
          <div>
            <button type="submit" className="btn btn-light text-black">Create Account</button>
            <Link to="/login" className="btn btn-light text-black">Login</Link>
          </div>

        </form>
      </div>
    </div>
  );
}
