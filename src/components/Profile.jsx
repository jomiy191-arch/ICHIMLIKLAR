import React, { useState } from 'react';
import { useLanguage, useTheme, useAuth } from '../context/AppContext';
import { translations } from '../i18n/translations';
import Login from './Login';
import './Profile.css';

const Profile = () => {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const { user, setUser } = useAuth();
  const t = translations[language];
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className={`profile-section ${isDark ? 'dark' : 'light'}`}>
      {user ? (
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">👤</div>
            <h2>{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            {user.phone && <p className="profile-phone">{user.phone}</p>}
          </div>

          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">📧 Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            {user.phone && (
              <div className="info-item">
                <span className="info-label">📱 Telefon:</span>
                <span className="info-value">{user.phone}</span>
              </div>
            )}
            {user.address && (
              <div className="info-item">
                <span className="info-label">📍 Manzil:</span>
                <span className="info-value">{user.address}</span>
              </div>
            )}
          </div>

          <button
            className="logout-btn"
            onClick={() => setUser(null)}
          >
            🚪 Chiqish
          </button>
        </div>
      ) : (
        <div className="login-container">
          <div className="login-message">
            <p className="message-icon">🔐</p>
            <p className="message-text">Profilingizni ko'rish uchun kirish qiling</p>
          </div>

          {!showLogin ? (
            <button
              className="login-btn"
              onClick={() => setShowLogin(true)}
            >
              Kirish
            </button>
          ) : (
            <Login onClose={() => setShowLogin(false)} />
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
