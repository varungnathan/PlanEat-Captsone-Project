import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

function Navbar({ isAuthenticated, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogoutAndRedirect = () => {
    handleLogout();
    navigate('/');
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
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link nav-text" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-text" to="/recipes">
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-text" to="/store">
                Store
              </Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link nav-text" to="/meal-planner">
                  Meal Planner
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link nav-text d-flex align-items-center" to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '8px' }} />
                Cart
              </Link>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle d-flex align-items-center"
                style={{ cursor: 'pointer' }}
                onClick={toggleDropdown}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/planeatscapstone.appspot.com/o/account_circle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?alt=media&token=8c321473-a6f7-4f99-83bc-f46473162123"
                  alt="Account Icon"
                  style={{
                    width: '24px',
                    height: '24px',
                    marginRight: '8px',
                  }}
                />
              </span>
              <ul
                className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}
                style={{
                  right: 0,
                  padding: '10px',
                  minWidth: '150px',
                  textAlign: 'left',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
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
                        onClick={handleLogoutAndRedirect}
                        style={{
                          border: 'none',
                          background: 'none',
                          padding: '8px 15px',
                          textAlign: 'left',
                          width: '100%',
                        }}
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
