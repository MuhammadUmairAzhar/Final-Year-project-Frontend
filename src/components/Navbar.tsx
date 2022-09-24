import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authentication";
import { UserRoles } from "./enums/roles.enum";

const Navbar = () => {
  const navigate = useNavigate();
  const { removeAuthState, getAuthState, getRole } = useContext(AuthContext);

  const handleLogout = (e: any) => {
    e.preventDefault();
    removeAuthState();
    navigate('/home');
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light mb-3" style={{marginTop: '50px !important'}}>
      <div className="container">
        <span className="navbar-brand fw-bold">Szabist FYP Portal</span>
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
        <div className="collapse navbar-collapse d-flex" id="navbarNav">
          <ul className="navbar-nav">
            {(getAuthState() == "") && <li className="nav-item">
              <Link className="nav-link text-dark" aria-current="page" to="/home">
                Home
              </Link>
            </li>}
            {(getAuthState() != "" && getAuthState() != undefined) &&
            (<>
              <li className="nav-item">
                <Link className="nav-link text-dark" aria-current="page" to='/home' onClick={(e) => handleLogout(e)}>
                  Logout
                </Link>
              </li>
              {getRole() === UserRoles.ADMIN && <li className="nav-item">
                <Link className="nav-link text-dark" aria-current="page" to='/admin/dashboard'>
                  Home
                </Link>
              </li>}
              {getRole() === UserRoles.ADVISOR && <li className="nav-item">
                <Link className="nav-link text-dark" aria-current="page"  to='/advisor/dashboard'>
                  Home
                </Link>
              </li>}
              {getRole() === UserRoles.PANEL && <li className="nav-item">
                <Link className="nav-link text-dark" aria-current="page"  to='/panel/dashboard'>
                  Home
                </Link>
              </li>}
              {getRole() === UserRoles.STUDENT && <li className="nav-item">
                <Link className="nav-link text-dark" aria-current="page"  to='/student/dashboard'>
                  Home
                </Link>
              </li>}
            </>)}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
