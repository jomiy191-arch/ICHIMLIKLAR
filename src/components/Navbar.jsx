import React, { useState } from 'react';
import { useLanguage, useTheme, useCart, useAuth, useSearch } from '../context/AppContext';
import { translations } from '../i18n/translations';
import Cart from './Cart';
import Login from './Login';
import DrinksSearchPanel from './DrinksSearchPanel';
import './Navbar.css';

const logoImage = new URL('../assets/heroga1.jpg', import.meta.url).href;

const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const { isDark, setIsDark } = useTheme();
  const { cartItems, lastAddedAt } = useCart();
  const { user, setUser } = useAuth();
  const { query, setQuery } = useSearch();
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [animateBadge, setAnimateBadge] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileSection, setIsProfileSection] = useState(false);
  const t = translations[language];

  const languages = ['uz', 'en', 'ru'];

  React.useEffect(() => {
    if (!lastAddedAt) return;
    setAnimateBadge(true);
    const t = setTimeout(() => setAnimateBadge(false), 900);
    return () => clearTimeout(t);
  }, [lastAddedAt]);

  React.useEffect(() => {
    try {
      const p = typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : '';
      setIsProfileSection(p.includes('profile') || p.includes('kabinet'));
    } catch (e) {
      setIsProfileSection(false);
    }
  }, []);

  return (
    <>
      <nav className={`navbar ${isDark ? 'dark' : 'light'}`}>
        <div className="nav-container">
          <div className="nav-logo">
            {/* resolve logo path for production */}
            <img src={logoImage} alt="FLOW logo" className="logo-img" />
            <h1>FLOW</h1>
          </div>

          <div className="nav-center">
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(()=>setIsSearchFocused(false), 160)}
                type="text"
                placeholder={`🔍 ${t.search}`}
                className="search-input"
              />
            </form>
          </div>

          <DrinksSearchPanel visible={isSearchFocused || (query && query.length>0)} />

          <div className="nav-right">
              {isProfileSection && (
                <button className="hamburger-btn" onClick={() => setShowMobileMenu(true)} aria-label="Open menu">☰</button>
              )}
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
              🛒 <span className={`cart-badge ${animateBadge ? 'pulse' : ''}`}>{cartItems.length}</span>
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
        {showMobileMenu && (
          <div className={`mobile-menu ${isDark ? 'dark' : ''} open`} onClick={() => setShowMobileMenu(false)}>
            <div className="mobile-menu-inner" onClick={(e) => e.stopPropagation()}>
              <div style={{display:'flex', justifyContent:'flex-end'}}>
                <button className="hamburger-btn" onClick={() => setShowMobileMenu(false)} aria-label="Close menu">✕</button>
              </div>
              <div className="mobile-menu-inner">
                <div className="menu-row">
                  <button className="menu-item">📦 Buyurtmalarim</button>
                  <button className="menu-item">❤️ Saralangan</button>
                  <button className="menu-item">📍 Boshqa</button>
                  <button className="menu-item">📦 Topshirish punkti</button>
                </div>

                <hr />

                <div className="menu-row">
                  <button className="menu-item">❓ Savol-javoblar</button>
                  <button className="menu-item">✉️ Biz bilan bog'lanish</button>
                  <button className="menu-item">📱 Uzum ilovasi Uzum</button>
                  <button className="menu-item">🌐 Sayt tili: O'zbekcha</button>
                </div>

                <div style={{padding:'12px 8px', color:'#777', fontSize:'0.95rem'}}>Biz haqimizda ▾ &nbsp; Hamkorlarga ▾</div>
              </div>
            </div>
          </div>
        )}
      </nav>

    </>
  );
};

export default Navbar;
