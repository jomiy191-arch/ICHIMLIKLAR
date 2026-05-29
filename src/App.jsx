import React, { useState } from 'react'
import { LanguageProvider, ThemeProvider, CartProvider, AuthProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import HeaderSlider from './components/HeaderSlider'
import ProductGrid from './components/ProductGrid'
import LikedProducts from './components/LikedProducts'
import Cart from './components/Cart'
import Profile from './components/Profile'
import Partners from './components/Partners'
import MobileTabNav from './components/MobileTabNav'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <LanguageProvider>
      <ThemeProvider>
        <CartProvider>
          <AuthProvider>
            <div className="app">
              <Navbar />
              
              <div className="content-wrapper">
                {activeTab === 'products' && (
                  <>
                    <HeaderSlider />
                    <ProductGrid />
                    <Partners />
                  </>
                )}
                {activeTab === 'liked' && <LikedProducts />}
                {activeTab === 'cart' && <Cart />}
                {activeTab === 'profile' && <Profile />}
              </div>

              <footer className="footer">
                <p>&copy; 2026 Ichimlik Markazi. Barcha huquqlar himoyalangan.</p>
              </footer>

              <MobileTabNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </AuthProvider>
        </CartProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
