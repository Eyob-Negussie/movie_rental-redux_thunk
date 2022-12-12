import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Ethio Movie
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink to="/movies" className="nav-item nav-link">
            Movies
          </NavLink>
          <NavLink to="/customers" className="nav-item nav-link">
            Customer
          </NavLink>
          <NavLink to="/rentals" className="nav-item nav-link">
            Rentals
          </NavLink>
          {!user && (
            <Fragment>
              <NavLink to="/login" className="nav-item nav-link">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-item nav-link">
                Register
              </NavLink>
            </Fragment>
          )}
          {user && (
            <Fragment>
              <NavLink to="/profile" className="nav-item nav-link">
                {user.name}
              </NavLink>
              <NavLink to="/logout" className="nav-item nav-link">
                Logout
              </NavLink>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
