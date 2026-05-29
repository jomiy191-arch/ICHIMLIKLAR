import React, { useState } from 'react';
import { useLanguage, useTheme, useAuth } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { sendToTelegram } from '../utils/telegram';
import './OrderModal.css';

const OrderModal = ({ cartItems, total, onClose }) => {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const { user, setUser } = useAuth();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert('❌ Iltimos, ism va telefon raqamni kiriting!');
      return;
    }

    setIsLoading(true);

    try {
      const success = await sendToTelegram(cartItems, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      });

      if (success) {
        setOrderSuccess(true);
        setUser({ name: formData.name, email: formData.email });
        
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 2000);
      } else {
        alert('❌ Buyurtmani jo\'natishda xatolik yuz berdi!');
      }
    } catch (error) {
      console.error('Xatolik:', error);
      alert('❌ Xatolik yuz berdi!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`order-modal-overlay ${isDark ? 'dark' : 'light'}`}>
      <div className={`order-modal ${isDark ? 'dark' : 'light'}`}>
        <button className="close-btn" onClick={onClose}>✕</button>

        {!orderSuccess ? (
          <>
            <h2>📦 Buyurtmani Tasdiqla</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>👤 {t.email}</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ismingiz"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>📧 {t.email}</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>📱 Telefon Raqami</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+998 (XX) XXX-XX-XX"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>📍 Manzil</label>
                <textarea
                  name="address"
                  placeholder="Yetkazib berish manzili"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="order-summary">
                <h3>📋 Buyurtma Xulosasi</h3>
                {cartItems.map((item, idx) => (
                  <div key={idx} className="summary-item">
                    <span>{item.nameUz} x{item.quantity}</span>
                    <span>{(item.price * item.quantity).toLocaleString()} сўм</span>
                  </div>
                ))}
                <div className="summary-total">
                  <strong>Jami:</strong>
                  <strong>{total.toLocaleString()} сўм</strong>
                </div>
              </div>

              <button
                type="submit"
                className={`submit-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? '⏳ Jo\'natilmoqda...' : '✅ Buyurtmani Yuborish'}
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h2>Buyurtma Qabul Qilindi!</h2>
            <p>🎉 Sizning buyurtmangiz muvaffaqiyatli jo\'natildi.</p>
            <p>📞 Tez orada siz bilan bog\'lanamiz.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
