import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("access_token") !== null;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            ClashInsight
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/my-accounts">
                  My Accounts
                </Link>
              </li>

              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/change-password">
                    Change Password
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link className="nav-link" to="/admin/images">
                  Image Gallery
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/unlock-vip">
                  Unlock VIP
                </Link>
              </li>
            </ul>
          </div>
          {isLoggedIn ? (
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link className="btn btn-outline-primary" to="/login">
              Login
            </Link>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
