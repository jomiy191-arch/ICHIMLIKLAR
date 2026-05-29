import React, { useState } from 'react';
import { useLanguage, useTheme, useCart, useAuth } from '../context/AppContext';
import { translations } from '../i18n/translations';
import OrderModal from './OrderModal';
import './Cart.css';

const Cart = () => {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const { cartItems, removeFromCart } = useCart();
  const { user } = useAuth();
  const t = translations[language];
  const [showOrderModal, setShowOrderModal] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setShowOrderModal(true);
  };

  return (
    <>
      <div className={`cart-drawer ${isDark ? 'dark' : 'light'}`}>
        <div className="cart-header">
          <h2>🛒 {t.cart}</h2>
          <span className="cart-count">{cartItems.length}</span>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">📭 {t.empty}</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.nameUz} />
                <div className="item-details">
                  <h4>{item.nameUz}</h4>
                  <p className="item-price">💰 {item.price.toLocaleString()} сўм</p>
                  <p className="item-qty">📦 x{item.quantity}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  title={t.remove}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <strong>💵 {t.total}:</strong>
              <strong>{total.toLocaleString()} сўм</strong>
            </div>
            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              ✅ {t.checkout}
            </button>
          </div>
        )}
      </div>

      {showOrderModal && (
        <OrderModal
          cartItems={cartItems}
          total={total}
          onClose={() => setShowOrderModal(false)}
        />
      )}
    </>
  );
};

export default Cart;
