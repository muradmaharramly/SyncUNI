import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import './Navbar.scss';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <nav className="navbar">
      <div className="container navbar__container">
        <Link to="/" className="navbar__logo">
          Sync<span>UNI</span>
        </Link>
        
        <div className="navbar__menu hide-mobile" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          {!user && location.pathname === '/' && (
             <>
               <a href="#features" className="navbar__link">Xidmətlər</a>
               <a href="#about" className="navbar__link">Biz Kimik</a>
               <a href="#partners" className="navbar__link">Partnyorlar</a>
             </>
          )}
        </div>

        <div className="navbar__actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="navbar__theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          
          {user ? (
            <div className="navbar__user">
              <span className="navbar__user-role">{user.role}</span>
              <span className="navbar__user-name">{user.name}</span>
              <button className="btn btn--outline" onClick={handleLogout}>
                <FiLogOut /> Çıxış
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn--primary">Giriş</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
