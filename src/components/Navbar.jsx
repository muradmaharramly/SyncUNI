import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FiSun, FiMoon, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import './Navbar.scss';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout(navigate);
    setMobileOpen(false);
  };

  const isDashboard = location.pathname.startsWith('/dashboard');
  const isHome = location.pathname === '/';

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className="navbar">
      <div className={isDashboard ? 'navbar__dashboard-container' : 'container navbar__container'}>
        {}
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          Sync<span>UNI</span>
        </Link>

        {}
        <div className="navbar__menu hide-mobile" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          {!user && isHome && (
            <>
              <a href="#features" className="navbar__link">Xidmətlər</a>
              <a href="#about"    className="navbar__link">Biz Kimik</a>
              <a href="#partners" className="navbar__link">Partnyorlar</a>
            </>
          )}
        </div>

        {}
        <div className="navbar__actions hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="navbar__theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>

          {user ? (
            <div className="navbar__user">
              <span className="navbar__user-role">{user.role}</span>
              <span className="navbar__user-name">{user.name}</span>
              <button className="btn btn--outline logout" onClick={handleLogout}>
                <FiLogOut /> Çıxış
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn--primary">Giriş</Link>
          )}
        </div>

        {}
        <div className="navbar__mobile-controls show-mobile">
          <button className="navbar__theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <button className="navbar__hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Toggle Menu">
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {}
      {mobileOpen && (
        <div className="navbar__mobile-menu">
          {!user && isHome && (
            <>
              <a href="#features" className="mobile-link" onClick={closeMenu}>Xidmətlər</a>
              <a href="#about"    className="mobile-link" onClick={closeMenu}>Biz Kimik</a>
              <a href="#partners" className="mobile-link" onClick={closeMenu}>Partnyorlar</a>
            </>
          )}

          {user ? (
            <>
              <div className="mobile-user-info">
                <span className="navbar__user-role">{user.role}</span>
                <span className="navbar__user-name">{user.name}</span>
              </div>
              <button className="mobile-link mobile-link--danger" onClick={handleLogout}>
                <FiLogOut /> Çıxış
              </button>
            </>
          ) : (
            <Link to="/login" className="mobile-link mobile-link--primary" onClick={closeMenu}>
              Giriş
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
