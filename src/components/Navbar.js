/* eslint-disable react/jsx-no-undef */

import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import './Navbar.css'


export default function Navbar(props) {
    const [cartView, setCartView] = useState(false);
    localStorage.setItem('temp', "first");
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    const loadCart = () => {
        setCartView(true);
    };
    
    const data = useCart();

    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-sticky" style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-3 fst-italic" to="/">
                       <span className='spanStyle'>I-groccery</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {(localStorage.getItem("token")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder">My Orders</Link>
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("token")) ?
                            <form className="d-flex">
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                            </form> :
                            <div>
                                <div className="btn bg-white text-success mx-2" onClick={loadCart}>
                                    MY Cart {" "}
                                    <Badge pill bg-white>
                                        {data.length}
                                    </Badge>
                                </div>

                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                                <button onClick={handleLogout} className="btn bg-white text-success">Logout</button>
                            </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
