import React, { useState } from 'react';
import { useLanguage, useTheme, useAuth } from '../context/AppContext';
import { translations } from '../i18n/translations';
import './Login.css';

const Login = ({ onClose }) => {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const { setUser } = useAuth();
  const t = translations[language];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setUser({ name: email.split('@')[0], email });
      setEmail('');
      setPassword('');
      onClose();
    }
  };

  return (
    <div className={`login-modal ${isDark ? 'dark' : 'light'}`}>
      <div className="login-container">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>🔐 {t.login}</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>📧 {t.email}</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>🔑 {t.password}</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <label className="remember-label">
            <input type="checkbox" /> ✓ {t.remember}
          </label>
          <button type="submit" className="login-submit-btn">🚀 {t.login}</button>
        </form>

        <div className="login-footer">
          <p className="forgot-password">❓ {t.forgotPassword}</p>
          <p className="signup-link">➕ {t.signup}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
