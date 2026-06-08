import React, { useRef, useState, useEffect } from 'react'
import './ModernSlider.css'

const ModernSlider = ({ children, peek = 0, gap = 16, aos = 'fade-up' }) => {
  const trackRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const onDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX ?? e.touches?.[0]?.pageX
    scrollLeft.current = trackRef.current.scrollLeft
    trackRef.current.classList.add('dragging')
  }

  const onMove = (e) => {
    if (!isDragging.current) return
    const x = e.pageX ?? e.touches?.[0]?.pageX
    const dx = x - startX.current
    trackRef.current.scrollLeft = scrollLeft.current - dx
  }

  const onUp = () => {
    isDragging.current = false
    trackRef.current.classList.remove('dragging')
  }

  return (
    <div className="modern-slider-wrapper">
      <div
        className="modern-slider-track"
        ref={trackRef}
        style={{ gap: `${gap}px`, paddingLeft: `${peek}px`, paddingRight: `${peek}px` }}
        onMouseDown={(e) => !isTouch && onDown(e)}
        onMouseMove={(e) => !isTouch && onMove(e)}
        onMouseUp={() => !isTouch && onUp()}
        onMouseLeave={() => !isTouch && onUp()}
        onTouchStart={(e) => onDown(e)}
        onTouchMove={(e) => onMove(e)}
        onTouchEnd={() => onUp()}
      >
        {React.Children.map(children, (child, idx) => (
          <div className="modern-slide" key={idx} data-aos={aos} data-aos-delay={idx * 40}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ModernSlider
