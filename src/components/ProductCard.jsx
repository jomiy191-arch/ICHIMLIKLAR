import React from 'react';
import { useLanguage, useTheme, useCart } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { sendProductImage } from '../utils/telegram';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const { addToCart, likedItems, toggleLike, cart, updateCartQuantity } = useCart();
  const t = translations[language];
  const btnRef = React.useRef(null);
  const [showModal, setShowModal] = React.useState(false);
  
  // Find product quantity in cart
  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = (product) => {
    const btn = btnRef.current;
    if (btn) {
      btn.classList.remove('ripple');
      // trigger reflow
      void btn.offsetWidth;
      btn.classList.add('ripple');
      setTimeout(() => btn.classList.remove('ripple'), 700);
    }
    addToCart(product);
  };
  
  const handleIncrement = () => {
    updateCartQuantity(product.id, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      updateCartQuantity(product.id, quantity - 1);
    } else {
      updateCartQuantity(product.id, 0);
    }
  };

  const name = product[`name${language === 'uz' ? 'Uz' : language === 'en' ? 'En' : 'Ru'}`];
  const isLiked = likedItems.includes(product.id);

  const handleSendToTelegram = async () => {
    const success = await sendProductImage(product);
    if (success) {
      alert('✅ Telegram ga yuborildi!');
    } else {
      alert('❌ Xato bola!');
    }
  };

  const categoryEmojis = {
    juice: '🧃',
    smoothie: '🍓',
    energy: '⚡',
    soda: '🥤',
    tea: '🍵',
    coffee: '☕',
  };

  // Resolve local asset paths to proper URLs for Vite build
  const images = import.meta.glob('../assets/*.{jpg,jpeg,png}', { eager: true, query: '?url', import: 'default' });
  const resolveImage = (imgPath) => {
    if (!imgPath) return '';
    if (imgPath.startsWith('/src/assets/')) {
      const key = imgPath.replace('/src/assets/', '../assets/');
      return images[key] || imgPath;
    }
    return imgPath;
  };

  return (
    <div className={`product-card ${isDark ? 'dark' : 'light'}`}>
      <div className="product-image-wrapper">
        <img 
          src={resolveImage(product.image)} 
          alt={name} 
          className="product-image"
          onClick={() => setShowModal(true)}
          style={{ cursor: 'pointer' }}
        />
        <button
          className="view-btn"
          onClick={() => setShowModal(true)}
          title="View details"
        >
          👁️
        </button>
        <button
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          onClick={() => toggleLike(product.id)}
          title={isLiked ? t.unlike : t.like}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
        <span className="category-badge">
          {categoryEmojis[product.category]} {product.category}
        </span>
      </div>

      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">💰 {product.price.toLocaleString()} сўм</span>
          {quantity === 0 ? (
            <button
              ref={btnRef}
              className="add-to-cart-btn"
              onClick={() => handleAdd(product)}
              title={t.addToCart}
            >
              🛒 {t.addToCart}
            </button>
          ) : (
            <div className="quantity-controls">
              <button className="qty-btn minus" onClick={handleDecrement}>−</button>
              <span className="qty-display">{quantity}</span>
              <button className="qty-btn plus" onClick={handleIncrement}>+</button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className={`product-modal-overlay ${isDark ? 'dark' : 'light'}`} onClick={() => setShowModal(false)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            
            <div className="modal-content">
              <div className="modal-image">
                <img src={resolveImage(product.image)} alt={name} />
              </div>
              
              <div className="modal-info">
                <h2 className="modal-title">{name}</h2>
                <p className="modal-category">
                  {categoryEmojis[product.category]} {product.category}
                </p>
                <p className="modal-description">{product.description}</p>
                
                <div className="modal-price-section">
                  <div className="modal-price">💰 {product.price.toLocaleString()} сўм</div>
                  <div className="modal-stock">✓ Mavjud</div>
                </div>
                
                <div className="modal-actions">
                  {quantity === 0 ? (
                    <button
                      className="modal-add-btn"
                      onClick={() => {
                        handleAdd(product);
                        setShowModal(false);
                      }}
                    >
                      🛒 Savat qo'shish
                    </button>
                  ) : (
                    <div className="modal-quantity">
                      <button className="qty-btn" onClick={handleDecrement}>−</button>
                      <span className="qty-count">{quantity}</span>
                      <button className="qty-btn" onClick={handleIncrement}>+</button>
                    </div>
                  )}
                  
                  <button 
                    className={`modal-like-btn ${isLiked ? 'liked' : ''}`}
                    onClick={() => toggleLike(product.id)}
                  >
                    {isLiked ? '❤️ Sevimlilarda' : '🤍 Sevimlilarga qo\'shish'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
