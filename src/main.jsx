import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './index.css'
import App from './App.jsx'

const Root = () => {
  useEffect(() => {
    AOS.init({
      duration: 1400,
      delay: 60,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 120,
    })
  }, [])

  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
