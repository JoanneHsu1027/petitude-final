import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 平滑滚动
    })
  }

  return (
    <div className="d-flex">
      <button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '0px',
          backgroundColor: 'transparent',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: '0',
        }}
      >
        <img
          src="/funeral/image_44.png"
          alt="Scroll to top"
          style={{ width: '30px', height: '30px', transform: 'rotate(-20deg)' }}
        />
        <span style={{ fontSize: '12px', color: '#bbbbbb' }}>Top</span>{' '}
      </button>
    </div>
  )
}
