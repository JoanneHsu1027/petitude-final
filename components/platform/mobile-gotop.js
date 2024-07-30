import React from 'react'

export default function MobileGotop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 平滑滚动
    })
  }
  return (
    <>
      {' '}
      <div className="d-flex d-xl-none d-xxl-block d-xxl-none">
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '1.2rem',
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
            src="/forum-pic/mobile-gotop.png"
            alt="Scroll to top"
            style={{
              width: '60px',
              height: '60px',
              transform: 'rotate(-20deg)',
            }}
          />
          <span
            style={{
              fontSize: '14px',
              color: '#62615F',
              fontWeight: '900',
            }}
          >
            Top
          </span>{' '}
        </button>
      </div>
    </>
  )
}
