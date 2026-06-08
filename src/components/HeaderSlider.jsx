import React, { useState, useEffect } from 'react';
import { useTheme, useLanguage } from '../context/AppContext';
import { translations } from '../i18n/translations';
import './HeaderSlider.css';

// Load header images via Vite so they resolve correctly after build
const images = [
  new URL('../assets/heroga1.jpg', import.meta.url).href,
  new URL('../assets/heroga2.jpg', import.meta.url).href,
  new URL('../assets/heroga3.jpg', import.meta.url).href,
  new URL('../assets/heroga4.jpg', import.meta.url).href,
  new URL('../assets/heroga5.jpg', import.meta.url).href,
];

const HeaderSlider = ({ title, subtitle, accentColor }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  const titleText = title ?? t.heroTitle;
  const subtitleText = subtitle ?? t.heroSubtitle;
  const ctaText = t.heroCTA || 'Explore now';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className={`header-slider ${isDark ? 'dark' : 'light'}`}>
      <div className="slider-container">
        <div className="slider-track">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`slide ${idx === currentSlide ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${img})`,
                transform: `translateX(${(idx - currentSlide) * 100}%)`,
              }}
            />
          ))}
        </div>

        <button
          className="slider-btn prev"
          onClick={() => setCurrentSlide(prev => (prev - 1 + images.length) % images.length)}
          aria-label="Previous slide"
        >
          ◀
        </button>

        <button
          className="slider-btn next"
          onClick={() => setCurrentSlide(prev => (prev + 1) % images.length)}
          aria-label="Next slide"
        >
          ▶
        </button>

        {/* Responsive dots rebuilt with Tailwind utilities */}
        <div className="absolute left-1/2 bottom-6 transform -translate-x-1/2 z-40 flex gap-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={
                `rounded-full transition-all duration-200 focus:outline-none ` +
                (idx === currentSlide
                  ? 'w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 shadow-[0_0_14px_rgba(255,107,107,0.28)]'
                  : 'w-3 h-3 bg-white/30')
              }
            />
          ))}
        </div>

        <div
          className="slider-content"
          key={currentSlide}
          style={accentColor ? { ['--accent-color']: accentColor } : undefined}
        >
          <span className="hero-label">{t.promoLabel}</span>
          <h2 className="hero-title">{titleText}</h2>
          <p className="hero-subtitle">{subtitleText}</p>
          <button type="button" className="hero-cta">{ctaText}</button>
        </div>
      </div>
    </div>
  );
};

export default HeaderSlider;
