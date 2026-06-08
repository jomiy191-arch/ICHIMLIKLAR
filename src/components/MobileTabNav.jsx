import React, { useState } from 'react';
import { useTheme, useCart } from '../context/AppContext';
import './MobileTabNav.css';

const promoImage = new URL('../assets/heroga1.jpg', import.meta.url).href;

const MobileTabNav = ({ activeTab, setActiveTab }) => {
  const { isDark } = useTheme();
  const { cartItems, likedItems } = useCart();
  const [showPromo, setShowPromo] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const tabs = [
    { id: 'home', icon: '⏻', label: 'Home', badge: null },
    { id: 'search', icon: '🔍', label: 'Qidirish', badge: null },
    { id: 'cart', icon: '🛍', label: 'Savat', badge: cartItems.length },
    { id: 'offers', icon: '🏷️', label: 'Takliflar', badge: likedItems.length > 0 ? likedItems.length : null },
    { id: 'profile', icon: '👤', label: 'Profil', badge: null },
  ];

  function handleClick(tab) {
    setActiveTab(tab.id);
    if (tab.id === 'offers') {
      setShowPromo(true);
    } else if (tab.id === 'profile') {
      setShowProfile(true);
    }
  }

  return (
    <>
      <div className={`mobile-tab-nav ${isDark ? 'dark' : 'light'}`}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleClick(tab)}
            title={tab.label}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.badge !== null && tab.badge > 0 && (
              <span className="tab-badge">{tab.badge}</span>
            )}
          </button>
        ))}
      </div>

      {showPromo && (
        <div className="promo-modal" onClick={() => setShowPromo(false)}>
          <div className="promo-content" onClick={(e) => e.stopPropagation()}>
            <button className="promo-close" onClick={() => setShowPromo(false)}>✕</button>
            <img src={promoImage} alt="Promo" />
          </div>
        </div>
      )}

      {showProfile && (
        <div className="profile-drawer" onClick={() => setShowProfile(false)}>
          <div className="profile-drawer-inner" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-top">
              <div className="drawer-login">Kirish / Ro'yxatdan o'tish</div>
            </div>
            <div className="drawer-menu">
              <button className="menu-item">📦 Buyurtmalarim</button>
              <button className="menu-item">❤️ Saralangan</button>
              <button className="menu-item">📍 Boshqa</button>
              <button className="menu-item">📦 Topshirish punkti</button>
              <hr />
              <button className="menu-item">❓ Savol-javoblar</button>
              <button className="menu-item">✉️ Biz bilan bog'lanish</button>
              <button className="menu-item">📱 Uzum ilovasi Uzum</button>
              <button className="menu-item">🌐 Sayt tili: O'zbekcha</button>
              <div className="drawer-footer">Biz haqimizda ▾ &nbsp; Hamkorlarga ▾</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileTabNav;
