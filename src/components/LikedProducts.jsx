import React from 'react';
import { useLanguage, useTheme, useCart } from '../context/AppContext';
import { translations } from '../i18n/translations';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './LikedProducts.css';

const LikedProducts = () => {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const { likedItems } = useCart();
  const t = translations[language];

  const likedProducts = products.filter(p => likedItems.includes(p.id));

  return (
    <div className={`liked-products-section ${isDark ? 'dark' : 'light'}`}>
      <h2 className="section-title">❤️ Sevimli Mahsulotlar</h2>
      
      {likedProducts.length > 0 ? (
        <div className="liked-products-grid">
          {likedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-icon">💔</p>
          <p className="empty-text">Hali sevimli mahsulot yo'q</p>
          <p className="empty-hint">Mahsulotlarni sevish uchun ❤️ bosing</p>
        </div>
      )}
    </div>
  );
};

export default LikedProducts;
