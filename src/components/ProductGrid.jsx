import React, { useState } from 'react';
import { useLanguage, useTheme, useCart, useSearch } from '../context/AppContext';
import { translations } from '../i18n/translations';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './ProductGrid.css';

const ProductGrid = () => {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const { likedItems } = useCart();
  const t = translations[language];
  const images = import.meta.glob('../assets/*.{jpg,jpeg,png}', { eager: true, query: '?url', import: 'default' });
  const resolveImage = (imgPath) => {
    if (!imgPath) return '';
    const key = imgPath.startsWith('/src/assets/') ? imgPath.replace('/src/assets/', '../assets/') : imgPath;
    return images[key] || imgPath;
  };
  const { query } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);

  const categories = [
    { id: 'all', label: t.allProducts, icon: '📦' },
    { id: 'juice', label: t.juice, icon: '🧃' },
    { id: 'smoothie', label: t.smoothie, icon: '🍓' },
    { id: 'energy', label: t.energy, icon: '⚡' },
    { id: 'soda', label: t.soda, icon: '🥤' },
    { id: 'tea', label: t.tea, icon: '🍵' },
    { id: 'coffee', label: t.coffee, icon: '☕' },
  ];

  let filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  if (showOnlyLiked) {
    filteredProducts = filteredProducts.filter(p => likedItems.includes(p.id));
  }

  if (query && query.trim() !== '') {
    const q = query.toLowerCase();
    filteredProducts = filteredProducts.filter((p) => {
      const name = p[`name${language === 'uz' ? 'Uz' : language === 'en' ? 'En' : 'Ru'}`] || '';
      const desc = (p.description || '').toLowerCase();
      return name.toLowerCase().includes(q) || desc.includes(q);
    });
  }

  const promoProduct = products.find(p => p.category === 'juice') || products[0];
  const promoImage = resolveImage(promoProduct.image);

  return (
    <div className={`product-grid-section ${isDark ? 'dark' : 'light'}`}>
      <div className="promo-header">
        <div>
          <span className="promo-tag">Yozgi chegirmalar</span>
          <h2 className="section-title">Haftaning eng zo‘r takliflari</h2>
        </div>
        <div className="promo-timer">
          <span>47</span><span>:</span><span>48</span><span>:</span><span>35</span>
        </div>
      </div>

      <div
        className="promo-banner"
        style={{
          backgroundImage: `linear-gradient(rgba(19, 20, 39, 0.45), rgba(19, 20, 39, 0.15)), url(${promoImage})`,
        }}
      >
        <div className="promo-banner-text">
          <p>Haftaning barcha foydali takliflari bitta to‘plamda</p>
          <h3>10% gacha chegirmalar</h3>
        </div>
        <div className="promo-cta">Tez yetkazib berish</div>
      </div>

      <div className="filter-controls compact">
        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        <button
          className={`liked-filter-btn ${showOnlyLiked ? 'active' : ''}`}
          onClick={() => setShowOnlyLiked(!showOnlyLiked)}
          title="Sevimli mahsulotlar"
        >
          ❤️ Sevimli ({likedItems.length})
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="empty-message">
            <p>😢 Mahsulot topilmadi</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
