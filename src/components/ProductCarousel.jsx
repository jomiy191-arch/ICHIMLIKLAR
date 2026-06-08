import React from 'react'
import ModernSlider from './ModernSlider'
import { products } from '../data/products'
import './ProductCarousel.css'

const ProductCard = ({ p }) => (
  <div className="product-card">
    <img src={p.image} alt={p.nameEn} />
    <div className="slide-body">
      <h4>{p.nameUz}</h4>
      <p>{p.price.toLocaleString()} so'm</p>
    </div>
  </div>
)

const ProductCarousel = ({ category }) => {
  const list = category ? products.filter(p => p.category === category) : products.slice(0, 12)

  return (
    <section className="product-carousel" data-aos="fade-up">
      <h3>Mahsulotlar</h3>
      <ModernSlider peek={32} gap={16} aos="zoom-in-up">
        {list.map(p => (
          <ProductCard p={p} key={p.id} />
        ))}
      </ModernSlider>
    </section>
  )
}

export default ProductCarousel
