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
  const [orders, setOrders] = useState([]);

  React.useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem('orders') || '[]');
      if (user && user.email) {
        const mine = all.filter(o => o.email === user.email);
        setOrders(mine);
      } else {
        setOrders([]);
      }
    } catch (e) {
      console.error('Orders load error', e);
      setOrders([]);
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result
      setUser({ ...user, avatar: dataUrl })
    }
    reader.readAsDataURL(file)
  }

  const removeAvatar = () => {
    setUser({ ...user, avatar: null })
  }

  return (
    <div className={`profile-section ${isDark ? 'dark' : 'light'}`}>
      {user ? (
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt="avatar" />
              ) : (
                <span className="avatar-emoji">👤</span>
              )}
            </div>
            <h2>{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            {user.phone && <p className="profile-phone">{user.phone}</p>}

            <div className="avatar-actions">
              <label className="upload-btn">
                Rasm yuklash
                <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
              </label>
              {user.avatar && (
                <button className="remove-avatar" onClick={removeAvatar}>Rasmni olib tashlash</button>
              )}
            </div>
          </div>

          <div className="profile-info">
            <h3>Buyurtmalaringiz</h3>
            {orders.length === 0 ? (
              <p>Sizda buyurtma topilmadi.</p>
            ) : (
              <div className="orders-list">
                {orders.map(o => (
                  <div key={o.id} className="order-card">
                    <div className="order-row">
                      <strong>#{o.id}</strong>
                      <span>{new Date(o.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="order-row">
                      <span>{o.items.length} ta mahsulot</span>
                      <strong>{o.total.toLocaleString()} сўм</strong>
                    </div>
                    <details>
                      <summary>Ko'proq</summary>
                      <ul className="order-items">
                        {o.items.map((it, i) => (
                          <li key={i}>{it.name} x{it.qty} — { (it.price*it.qty).toLocaleString() } сўм</li>
                        ))}
                      </ul>
                      <p><strong>Manzil:</strong> {o.address || '—'}</p>
                      <p><strong>Status:</strong> {o.status}</p>
                    </details>
                  </div>
                ))}
              </div>
            )}

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
