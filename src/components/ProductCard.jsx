import React from 'react';
import { useLanguage, useTheme, useCart } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { sendProductImage } from '../utils/telegram';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const { addToCart, likedItems, toggleLike } = useCart();
  const t = translations[language];

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

  return (
    <div className={`product-card ${isDark ? 'dark' : 'light'}`}>
      <div className="product-image-wrapper">
        <img src={product.image} alt={name} className="product-image" />
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
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
            title={t.addToCart}
          >
            🛒 {t.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
