import React, { useState } from 'react';
import { useLanguage, useTheme, useCart, useAuth } from '../context/AppContext';
import { translations } from '../i18n/translations';
import Cart from './Cart';
import Login from './Login';
import './Navbar.css';

const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const { isDark, setIsDark } = useTheme();
  const { cartItems } = useCart();
  const { user, setUser } = useAuth();
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const t = translations[language];

  const languages = ['uz', 'en', 'ru'];

  return (
    <>
      <nav className={`navbar ${isDark ? 'dark' : 'light'}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/src/assets/heroga1.jpg" alt="Logo" className="logo-img" />
            <h1>{t.appName}</h1>
          </div>

          <div className="nav-center">
            <input type="text" placeholder={`🔍 ${t.search}`} className="search-input" />
          </div>

          <div className="nav-right">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="language-select"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang.toUpperCase()}</option>
              ))}
            </select>

            <button 
              className="theme-btn"
              onClick={() => setIsDark(!isDark)}
              title={isDark ? t.lightMode : t.darkMode}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <button 
              className="cart-btn desktop-only"
              onClick={() => setShowCart(!showCart)}
            >
              🛒 <span className="cart-badge">{cartItems.length}</span>
            </button>

            {user ? (
              <div className="user-menu desktop-only">
                <span>👤 {user.name}</span>
                <button onClick={() => setUser(null)} className="logout-btn">❌ {t.logout}</button>
              </div>
            ) : (
              <button 
                className="login-btn desktop-only"
                onClick={() => setShowLogin(!showLogin)}
              >
                🔐 {t.login}
              </button>
            )}
          </div>
        </div>

        {showCart && <Cart />}
        {showLogin && <Login onClose={() => setShowLogin(false)} />}
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className={`mobile-nav ${isDark ? 'dark' : 'light'}`}>
        <button 
          className="mobile-nav-btn"
          onClick={() => setShowCart(!showCart)}
          title="Savat"
        >
          🛒
          {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
        </button>

        <button 
          className="mobile-nav-btn"
          onClick={() => setShowLogin(!showLogin)}
          title={user ? 'Profil' : 'Kirish'}
        >
          {user ? '👤' : '🔐'}
        </button>
      </div>
    </>
  );
};

export default Navbar;
