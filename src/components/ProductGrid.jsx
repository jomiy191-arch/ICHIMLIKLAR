import React, { useState } from 'react';
import { useLanguage, useTheme, useCart } from '../context/AppContext';
import { translations } from '../i18n/translations';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './ProductGrid.css';

const ProductGrid = () => {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const { likedItems } = useCart();
  const t = translations[language];
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

  return (
    <div className={`product-grid-section ${isDark ? 'dark' : 'light'}`}>
      <h2 className="section-title">📋 {t.categories}</h2>

      <div className="filter-controls">
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
