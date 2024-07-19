import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Environment() {
  const environmentPic = [
    {
      src: '/funeral/樹花葬區域.png',
      alt: '樹/花葬區',
      width: 540,
      height: 400,
    },
    {
      src: '/funeral/家長休息區.png',
      alt: '家長休息區',
      width: 540,
      height: 400,
    },
    {
      src: '/funeral/戶外玻璃法會區.png',
      alt: '戶外玻璃法會區',
      width: 540,
      height: 400,
    },
    {
      src: '/funeral/戶外環境.png',
      alt: '戶外環境',
      width: 540,
      height: 400,
    },
    {
      src: '/funeral/中西式溫馨花海告別廳.png',
      alt: '中/西式溫馨花海告別廳',
      width: 540,
      height: 400,
    },
    {
      src: '/funeral/蓮花寶座區.png',
      alt: '蓮花寶座區',
      width: 540,
      height: 400,
    },
  ]

  const [selectedPic, setSelectedPic] = useState(environmentPic[0])

  const handleButtonClick = (index) => {
    setSelectedPic(environmentPic[index])
  }

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          {/* 上方文字+圖形區塊 */}
          <div
            className="headSection"
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: '25px',
              marginBottom: '80px',
            }}
          >
            <h2
              className="title"
              style={{
                textAlign: 'center',
                zIndex: 2,
                position: 'relative',
                marginTop: '20px',
              }}
            >
              園區環境介紹
            </h2>
            <div
              className="pattern"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '80%',
                height: 'auto',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* 綠色圖形 */}
              <img className="green" src="/funeral/Vector 433.png" alt="" />
              {/* 深黃色圖形 */}
              <img className="yellow" src="/funeral/Vector 431.png" alt="" />
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center">
            {/* 影片區塊 */}
            <div
              className="video-container"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/q3OTetBQ3YQ?autoplay=1&mute=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ margin: '20px', width: '900px', height: '500px' }}
              ></iframe>
            </div>
          </div>
          <p className="d-flex justify-content-center align-items-center flex-wrap">
            {environmentPic.map((pic, index) => (
              <button
                key={index}
                className="btn btn-warning"
                type="button"
                onClick={() => handleButtonClick(index)}
                style={{ marginRight: '10px', marginTop: '10px' }}
              >
                {pic.alt}
              </button>
            ))}
          </p>
          <div className="col-12 py-3 d-flex justify-content-center">
            <img
              src={selectedPic.src}
              alt={selectedPic.alt}
              width={selectedPic.width}
              height={selectedPic.height}
              className="environment-image"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .yellow {
          position: absolute;
          width: 25%;
          height: auto;
          margin-left: 120px;
          margin-bottom: 50px;
          max-width: 100%;
        }
        .green {
          position: absolute;
          width: 22%;
          height: auto;
          margin-right: 120px;
          margin-bottom: 50px;
          max-width: 100%;
        }

        @media (max-width: 812px) {
          .iframe {
            width: 70%;
            padding: 20px;
          }
          .environment-image {
            width: 80%;
            height: auto;
          }

          .yellow {
            position: absolute;
            width: 35%;
            height: auto;
            margin-left: 100px;
            margin-bottom: 50px; /* 在較小的螢幕上調整成合適的大小 */
          }
          .green {
            position: absolute;
            width: 30%;
            height: auto;
            margin-right: 100px;
            margin-bottom: 50px;
          }
          .btn.btn-warning {
            font-size: 0.8rem;
            margin-right: 10px;
            margin-top: 10px;
          }
        }
        @media (max-width: 576px) {
          .iframe {
            width: 50%;
            padding: 20px;
          }
          .environment-image {
            width: 80%;
            height: auto;
          }
          .yellow {
            position: absolute;
            width: 40%;
            height: auto;
            margin-left: 90px;
            margin-bottom: 50px; /* 在較小的螢幕上調整成合適的大小 */
          }
          .green {
            position: absolute;
            width: 37%;
            height: auto;
            margin-right: 90px;
            margin-bottom: 50px;
          }
          .btn.btn-warning {
            font-size: 0.8rem;
            margin-right: 10px;
            margin-top: 10px;
          }
        }
      `}</style>
    </>
  )
}
