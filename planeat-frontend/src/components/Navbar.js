import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Navbar({ isAuthenticated, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav style={{ backgroundColor: '#f7f7f7', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={toggleMenu}
          aria-label="Open Menu"
          style={{
            display: 'block',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
            PlanEat
          </Link>

          <div
            style={{
              display: isOpen ? 'block' : 'none',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
            {isAuthenticated ? (
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                <Link to="/signup" style={{ textDecoration: 'none' }}>Signup</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
