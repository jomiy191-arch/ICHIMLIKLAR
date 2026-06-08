import React, { useEffect, useState } from 'react';
import './AdVideoModal.css';

export default function AdVideoModal() {
  const [visible, setVisible] = useState(false);
  const [showAlways, setShowAlways] = useState(false);

  useEffect(() => {
    try {
      const hidden = localStorage.getItem('ad_video_seen');
      if (!hidden) {
        // show after a small delay so layout is ready
        const t = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(t);
      }
    } catch (e) {
      setVisible(true);
    }
  }, []);

  const srcLocal = '/ads/drink-ad.mp4';
  const fallback = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

  function close(save) {
    setVisible(false);
    if (save) {
      try { localStorage.setItem('ad_video_seen', '1'); } catch (e) {}
    }
  }

  if (!visible) return null;

  return (
    <div className="ad-modal" role="dialog" aria-modal="true">
      <div className="ad-inner">
        <div className="ad-video-wrap">
          <video
            className="ad-video"
            src={srcLocal}
            poster="/ads/drink-poster.jpg"
            playsInline
            autoPlay
            muted
            loop
            onError={(e)=>{ e.currentTarget.src = fallback }}
          />
        </div>

        <div className="ad-controls">
          <label className="ad-checkbox">
            <input type="checkbox" checked={showAlways} onChange={(e)=>setShowAlways(e.target.checked)} />
            Sahifaga har safar ko'rsatmasin
          </label>

          <div className="ad-buttons">
            <button className="ad-close" onClick={() => close(false)}>Yopish</button>
            <button className="ad-close primary" onClick={() => { close(showAlways); }}>Davom etish</button>
          </div>
        </div>
      </div>
    </div>
  );
}
