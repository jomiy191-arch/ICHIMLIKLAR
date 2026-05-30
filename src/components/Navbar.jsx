import React, { useState } from 'react';
import { useLanguage, useTheme, useCart, useAuth, useSearch } from '../context/AppContext';
import { translations } from '../i18n/translations';
import Cart from './Cart';
import Login from './Login';
import './Navbar.css';

const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const { isDark, setIsDark } = useTheme();
  const { cartItems } = useCart();
  const { user, setUser } = useAuth();
  const { query, setQuery } = useSearch();
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const t = translations[language];

  const languages = ['uz', 'en', 'ru'];

  return (
    <>
      <nav className={`navbar ${isDark ? 'dark' : 'light'}`}>
        <div className="nav-container">
          <div className="nav-logo">
            {/* resolve logo path for production */}
            <img src={Object.values(import.meta.glob('../assets/heroga1.jpg', { eager: true, query: '?url', import: 'default' }))[0]} alt="Logo" className="logo-img" />
            <h1>{t.appName}</h1>
          </div>

          <div className="nav-center">
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder={`🔍 ${t.search}`}
                className="search-input"
              />
            </form>
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

            <button
              className="hamburger-btn"
              onClick={() => setShowMobileMenu((s) => !s)}
              aria-label="Open mobile menu"
              title="Menu"
            >
              ☰
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

        {showMobileMenu && (
          <div className={`mobile-menu ${isDark ? 'dark' : 'light'}`}>
            <div className="mobile-menu-inner">
              <div className="menu-row">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder={`🔍 ${t.search}`}
                  className="search-input mobile-search"
                />
              </div>

              <div className="menu-row">
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  className="language-select"
                >
                  {['uz','en','ru'].map(lang => (
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
              </div>

              <div className="menu-row menu-actions">
                <button 
                  className="cart-btn"
                  onClick={() => { setShowCart(true); setShowMobileMenu(false); }}
                >
                  🛒 {t.cart} <span className="cart-badge">{cartItems.length}</span>
                </button>

                {user ? (
                  <button className="login-btn" onClick={() => { setUser(null); setShowMobileMenu(false); }}>
                    👤 {user.name}
                  </button>
                ) : (
                  <button className="login-btn" onClick={() => { setShowMobileMenu(true); /* opens login modal via existing state if needed */ }}>
                    🔐 {t.login}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
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
