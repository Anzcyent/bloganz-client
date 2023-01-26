import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { getRequest } from '../../Utils/Fetch/fetchData';
import { Rings } from "react-loader-spinner"
import "./Navbar.css"

const Navbar = ({ responsive, isLoading }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.authReducer);
  const [menu, setMenu] = useState(false)
  const access_token = localStorage.getItem('access_token');


  const logout = async () => {
    const res = await getRequest('auth/logout');
    localStorage.removeItem('access_token');
    window.location.reload();
  }

  return (
    <nav>
      <h1 className="navbar-title">
        <NavLink to="/">BlogAnz</NavLink>
      </h1>

      <ul className="navbar-list">
        <li className={`navbar-list-item ${(pathname === "/dashboard" || pathname === "/dashboard/create-article" || pathname === "/dashboard/my-articles") && "navbar-active"}`}>
          <NavLink
            to={`${pathname === "/dashboard/create-article" ? "/dashboard/create-article" : pathname === "/dashboard/my-articles" ? "/dashboard/my-articles" : "/dashboard"}`}
            style={{ color: `${(pathname === "/dashboard" || pathname === "/dashboard/create-article" || pathname === "/dashboard/my-articles") ? "var(--primary-color)" : "#fff"}`, textDecoration: "none" }}>Dashboard</NavLink>
        </li>
        <li className={`navbar-list-item ${(pathname === "/articles" || pathname === "/") && "navbar-active"}`} >
          <NavLink to="/articles" style={{ color: `${(pathname === "/articles" || pathname === "/") ? "var(--primary-color)" : "#fff"}`, textDecoration: "none" }}>Articles</NavLink>
        </li>
        <li className={`navbar-list-item ${pathname === "/about" && "navbar-active"}`} >
          <NavLink to="/about" style={{ color: `${pathname === "/about" ? "var(--primary-color)" : "#fff"}`, textDecoration: "none" }}>About</NavLink>
        </li>
      </ul>

      {responsive ?
        <i onClick={() => setMenu(true)} className="fa-sharp fa-solid fa-user" id="menu-icon"></i>
        :
        access_token ?
          <div className="auth-menu">
            <span>{isLoading ? <Rings color="#fff" width="50" /> : user.name}</span>
            <i onClick={() => logout()} className="fa-solid fa-right-from-bracket"></i>
          </div> :
          <ul className="navbar-auth-list">
            <li onClick={() => navigate("/login")} className={`navbar-auth-list-item auth-btn ${pathname === "/login" && "active"}`}>Login</li>
            <li onClick={() => navigate("/register")} className={`navbar-auth-list-item auth-btn ${pathname === "/register" && "active"}`}>Register</li>
          </ul>}

      {responsive && menu &&
        <ul className={`responsive-navbar-auth-list animate__animated animate__fadeInDown ${access_token && "active"}`}>
          {access_token && <li className="navbar-auth-list-item">{user.name}</li>}
          {!access_token && <li onClick={() => navigate("/login")} className={`navbar-auth-list-item auth-btn ${pathname === "/login" && "active"}`}>Login</li>}
          {!access_token && <li onClick={() => navigate("/register")} className={`navbar-auth-list-item auth-btn ${pathname === "/register" && "active"}`}>Register</li>}

          <li className="navbar-auth-list-item" style={{ fontSize: 14 }}>
            <i className="fas fa-times" onClick={() => setMenu(false)}></i>
            {access_token && <i onClick={() => logout()} style={{ marginLeft: 10 }} className="fa-solid fa-right-from-bracket"></i>}
          </li>
        </ul>
      }

    </nav>
  )
}

export default Navbar