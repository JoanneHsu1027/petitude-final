import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRouter } from 'next/router'

export default function ScrollToTopButton() {
  const router = useRouter()

  const handleCartClick = () => {
    const currentPath = router.asPath
    router.push({
      pathname: '/estore/cart',
      query: { from: currentPath },
    })
  }

  return (
    <div className="d-flex allFont">
      <button
        onClick={handleCartClick}
        style={{
          position: 'fixed',
          bottom: '7rem',
          right: '1.2rem',
          backgroundColor: '#f6d554',
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
          src="/estore/購物車.png"
          alt="Scroll to top"
          style={{ width: '45px', height: '45px' }}
        />
      </button>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC&display=swap');

        .allFont {
          font-family: 'Noto Serif TC', serif;
          font-weight: 900;
        }
      `}</style>
    </div>
  )
}
