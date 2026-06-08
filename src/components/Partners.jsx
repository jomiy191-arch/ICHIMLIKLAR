import React from 'react';
import { useTheme } from '../context/AppContext';
import './Partners.css';

const asset = (path) => new URL(path, import.meta.url).href;

const partners = [
  { name: 'Coca Cola', image: asset('../assets/sharbat1.jpg'), desc: 'Klassik ta\'mi' },
  { name: 'Pepsi', image: asset('../assets/gazli1.jpg'), desc: 'Gazli ichimlik' },
  { name: 'Fanta', image: asset('../assets/gazli2.jpg'), desc: 'Rangli gazli' },
  { name: 'Sprite', image: asset('../assets/gazli3.jpg'), desc: 'Limon-laym' },
  { name: 'Red Bull', image: asset('../assets/energetik1.jpg'), desc: 'Energiya ichimlig' },
  { name: 'Monster', image: asset('../assets/energetik2.jpg'), desc: 'Ekstra kuchli' },
  { name: 'Tropicana', image: asset('../assets/sharbat3.jpg'), desc: 'Natural meva' },
  { name: 'Minute Maid', image: asset('../assets/sharbat4.jpg'), desc: 'Yangi vitaminlar' },
  { name: 'Gatorade', image: asset('../assets/energetik3.jpg'), desc: 'Sport ichimlig' },
  { name: 'Powerade', image: asset('../assets/energetik4.jpg'), desc: 'Faol energiya' },
  { name: 'Mountain Dew', image: asset('../assets/energetik5.jpg'), desc: 'Ekstra kuchlary' },
  { name: 'Fanta Orange', image: asset('../assets/gazli5.jpg'), desc: 'Apelsin ta\'mi' },
];

const Partners = () => {
  const { isDark } = useTheme();

  return (
    <div className={`partners-section ${isDark ? 'dark' : 'light'}`}>
      <h2>🤝 Bizning Hamkorlar</h2>
      <p className="partners-subtitle">💼 Yetakchi ichimlik brendlari</p>
      <div className="partners-grid">
        {partners.map((partner, idx) => (
          <div key={idx} className="partner-card">
            <img src={partner.image} alt={partner.name} className="partner-image" />
            <h4>{partner.name}</h4>
            <p>{partner.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
