import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/AppContext';
import './HeaderSlider.css';

// Load header images via Vite so they resolve correctly after build
const _imgs = import.meta.glob('../assets/heroga*.jpg', { eager: true, query: '?url', import: 'default' });
const images = Object.values(_imgs).slice(0, 5);

const HeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isDark } = useTheme();

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

        <div className="slider-dots">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="slider-content">
          <h2> Mazali Ichimliklar Katalogi</h2>
          <p>Toza, tabiiy va sog'lom ichimliklar</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderSlider;
