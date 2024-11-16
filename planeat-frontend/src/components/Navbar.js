import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

function Navbar({ isAuthenticated, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link
          className="navbar-brand meow-script-regular"
          to="/"
          style={{ fontSize: '2rem', fontWeight: 'bold' }}
        >
          PlanEat
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipes" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/store" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                Store
              </Link>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle d-flex align-items-center"
                style={{ cursor: 'pointer', fontSize: '1.25rem', fontWeight: 'bold' }}
                onClick={toggleDropdown}
              >
                <span className="material-symbols-outlined">person</span>
              </span>
              <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} style={{ right: 0 }}>
                {!isAuthenticated ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/signup">
                        Signup
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/account">
                        Account Management
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleLogout}
                        style={{ border: 'none', background: 'none', padding: 0 }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
