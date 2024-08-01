import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BsFillTelephoneFill } from 'react-icons/bs'

const SlidingBanner = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // 根據螢幕寬度設定滾動閾值
      const scrollThreshold = window.innerWidth <= 767 ? 120 : 1500
      const hideThreshold = window.innerWidth <= 767 ? 800 : 2700

      if (window.scrollY > hideThreshold) {
        // 當滾動超過 hideThreshold 像素時隱藏橫幅
        setOpen(false)
      } else if (window.scrollY > scrollThreshold) {
        // 當滾動超過 scrollThreshold 像素時顯示橫幅
        setOpen(true)
      } else {
        // 當滾動回到 scrollThreshold 以下時隱藏橫幅
        setOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={`allFont banner ${open ? 'open' : ''}`}>
      <div>
        <p className="text">24小時接送服務</p>
        <hr />
        <p className="text1">
          <BsFillTelephoneFill />
          免付費電話 02-12345678
        </p>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC&display=swap');

        .allFont {
          font-family: 'Noto Serif TC', serif;
          font-weight: 900;
        }
        .banner {
          position: fixed;
          top: 20%;
          right: -300px;
          width: 160px;
          background-color: #def5d3;
          padding: 20px;
          border-radius: 5px;
          border: 1px solid #def5d3;
          color: #555f50;
          transition: right 0.5s ease-in-out;
          box-shadow: 0 0 0 rgba(255, 133, 0, 0.7);
        }
        .banner.open {
          right: 0;
          animation: blink-border 1s infinite;
        }
        .text {
          font-size: 26px;
          margin: 0;
          text-align: center;
          font-weight: 900;
        }
        .text1 {
          font-size: 16px;
          margin: 0;
          text-align: center;
          font-weight: 900;
        }
        @keyframes blink-border {
          0% {
            box-shadow: 0 0 10px rgba(73, 192, 17, 0.7);
          }
          50% {
            box-shadow: 0 0 20px rgba(73, 192, 17, 0.7);
          }
          100% {
            box-shadow: 0 0 10px rgba(73, 192, 17, 0.7);
          }
        }

        @media (max-width: 767px) {
          .banner {
            width: 80px;
            right: -100px;
            padding: 6px;
            background-color: #def5d3;
            border: 1px solid #def5d3;
            color: #555f50;
          }
          .banner.open {
            right: 0;
            animation: blink-border-mobile 1s infinite;
          }
          .text {
            font-size: 14px;
          }
          .text1 {
            font-size: 10px;
            margin-bottom: 5px;
          }
          @keyframes blink-border-mobile {
            0% {
              box-shadow: 0 0 10px rgba(73, 192, 17, 0.7);
            }
            50% {
              box-shadow: 0 0 20px rgba(73, 192, 17, 0.7);
            }
            100% {
              box-shadow: 0 0 10px rgba(73, 192, 17, 0.7);
            }
          }
        }
      `}</style>
    </div>
  )
}

export default SlidingBanner
