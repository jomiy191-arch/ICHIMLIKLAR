import React from 'react';
import { useTheme, useCart } from '../context/AppContext';
import './MobileTabNav.css';

const MobileTabNav = ({ activeTab, setActiveTab }) => {
  const { isDark } = useTheme();
  const { cartItems, likedItems } = useCart();

  const tabs = [
    { id: 'products', icon: '📦', label: 'Mahsulotlar', badge: null },
    { id: 'liked', icon: '❤️', label: 'Sevimli', badge: likedItems.length },
    { id: 'cart', icon: '🛒', label: 'Savat', badge: cartItems.length },
    { id: 'profile', icon: '👤', label: 'Profil', badge: null },
  ];

  return (
    <div className={`mobile-tab-nav ${isDark ? 'dark' : 'light'}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
          title={tab.label}
        >
          <span className="tab-icon">{tab.icon}</span>
          {tab.badge !== null && tab.badge > 0 && (
            <span className="tab-badge">{tab.badge}</span>
          )}
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MobileTabNav;
