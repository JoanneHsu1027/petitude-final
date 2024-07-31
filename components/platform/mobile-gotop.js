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
          <div
            style={{
              backgroundColor: '#F5D553',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
            }}
          >
            <img
              src="/funeral/image_44.png"
              alt="Scroll to top"
              style={{
                width: '45px',
                height: '45px',
                padding: '3px',
                marginLeft: '2px',
                transform: 'rotate(-20deg)',
                color: '#F5D553',
              }}
            />
          </div>
          <span
            style={{ fontSize: '14px', color: '#bbbbbb', fontWeight: '900' }}
          >
            Top
          </span>
        </button>
      </div>
    </>
  )
}
