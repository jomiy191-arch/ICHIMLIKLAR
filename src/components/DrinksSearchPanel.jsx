import React from 'react';
import { useLanguage, useSearch } from '../context/AppContext';
import { products } from '../data/products';
import { translations } from '../i18n/translations';
import './DrinksSearchPanel.css';

const categoryEmojis = {
  juice: '🧃',
  smoothie: '🍓',
  energy: '⚡',
  soda: '🥤',
  tea: '🍵',
  coffee: '☕',
};

const drinkCategories = ['juice','smoothie','energy','soda','tea','coffee'];

export default function DrinksSearchPanel({ visible }) {
  const { language } = useLanguage();
  const { query, setQuery } = useSearch();

  if (!visible) return null;

  const q = (query || '').toLowerCase();

  const grouped = drinkCategories.map(cat => {
    const items = products
      .filter(p => p.category === cat)
      .filter(p => {
        if (!q) return true;
        const name = p[`name${language === 'uz' ? 'Uz' : language === 'en' ? 'En' : 'Ru'}`] || '';
        return name.toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q);
      });
    return { id: cat, items };
  }).filter(g => g.items.length > 0);

  return (
    <div className="drinks-panel" role="dialog" aria-label="Drink search">
      <div className="drinks-panel-inner">
        <div className="drinks-search-input">
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Ichimliklarni qidiring..." />
        </div>

        <div className="drinks-list">
          {grouped.length === 0 ? (
            <div className="no-results">Hech nima topilmadi</div>
          ) : (
            grouped.map(group => (
              <div key={group.id} className="drink-group">
                <div className="group-title">{categoryEmojis[group.id] || ''} {group.id}</div>
                <ul>
                  {group.items.map(i => (
                    <li key={i.id} className="drink-item">
                      <img src={i.image} alt="" />
                      <div className="drink-meta">
                        <div className="drink-name">{i[`name${language === 'uz' ? 'Uz' : language === 'en' ? 'En' : 'Ru'}`]}</div>
                        <div className="drink-price">{i.price.toLocaleString()} сўм</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
