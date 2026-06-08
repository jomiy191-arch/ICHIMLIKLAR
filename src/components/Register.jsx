import React, { useState } from 'react'
import { useLanguage, useTheme, useAuth } from '../context/AppContext'
import { translations } from '../i18n/translations'
import { sendRegistration } from '../utils/telegram'
import './Register.css'

const reverseGeocode = async (lat, lon) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } })
    const data = await res.json()
    return data.display_name || ''
  } catch (e) {
    console.error('Reverse geocode error', e)
    return ''
  }
}

const Register = ({ onClose }) => {
  const { language } = useLanguage()
  const { isDark } = useTheme()
  const { setUser } = useAuth()
  const t = translations[language]

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [coords, setCoords] = useState(null)
  const [loadingLocation, setLoadingLocation] = useState(false)

  const captureLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation mavjud emas')
      return
    }
    setLoadingLocation(true)
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      setCoords({ lat, lon })
      const addr = await reverseGeocode(lat, lon)
      setAddress(addr)
      setLoadingLocation(false)
    }, (err) => {
      console.error('Geo error', err)
      setLoadingLocation(false)
      alert('Lokatsiya olinmadi: ' + err.message)
    }, { enableHighAccuracy: true, timeout: 10000 })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!name || !email) {
      alert('Iltimos ism va emailni kiriting')
      return
    }

    // Set user locally
    setUser({ name, email, phone, address })

    // Send to Telegram
    await sendRegistration({ name, email, phone }, { address, ...(coords || {}) })

    // Close modal
    onClose()
  }

  return (
    <div className={`register-modal ${isDark ? 'dark' : 'light'}`}>
      <div className="register-container">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>➕ {t.signup}</h2>

        <form onSubmit={handleRegister}>
          <div className="form-row">
            <label>Ism</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-row">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-row">
            <label>Telefon</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="form-row location-row">
            <label>Manzil</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Manzilingizni kiriting yoki Lokatsiyani ishlating" />
            <button type="button" className="loc-btn" onClick={captureLocation} disabled={loadingLocation}>
              {loadingLocation ? '...' : 'Lokatsiyani ishlat'}
            </button>
          </div>

          <button type="submit" className="register-submit">{t.signup}</button>
        </form>
      </div>
    </div>
  )
}

export default Register
