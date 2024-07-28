import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Environment() {
  const environmentPic = [
    {
      src: '/funeral/樹花葬區.png',
      alt: '樹/花葬區',
    },
    {
      src: '/funeral/家長休息區.png',
      alt: '家長休息區',
    },
    {
      src: '/funeral/戶外玻璃法會區.png',
      alt: '戶外玻璃法會區',
    },
    {
      src: '/funeral/戶外環境.png',
      alt: '戶外環境',
    },
    {
      src: '/funeral/中西式溫馨花海告別廳.png',
      alt: '中/西式溫馨花海告別廳',
    },
    {
      src: '/funeral/蓮花寶座區.png',
      alt: '蓮花寶座區',
    },
  ]

  const [selectedPic, setSelectedPic] = useState(environmentPic[0])
  const [hoveredPic, setHoveredPic] = useState(null)

  const handleButtonClick = (index) => {
    setSelectedPic(environmentPic[index])
  }

  const handleButtonHover = (index) => {
    setHoveredPic(environmentPic[index])
  }

  const handleButtonLeave = () => {
    setHoveredPic(null)
  }

  return (
    <>
      <div className="container-fluid mt-5 allFont">
        <div className="row">
          {/* 上方文字+圖形區塊 */}
          <div className="headSection">
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
            <div className="titleText">
              <h2 className="title" style={{ fontWeight: '900' }}>
                園區環境介紹
              </h2>
            </div>
          </div>

          <div className="video-wrapper col-12 d-flex justify-content-center radio-16x9">
            {/* 影片區塊 */}
            <iframe
              src="https://www.youtube.com/embed/q3OTetBQ3YQ?autoplay=1&mute=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <div className="picArea d-flex justify-content-center align-items-center">
              {environmentPic.map((pic, index) => (
                <button
                  key={index}
                  className="custom-btn"
                  type="button"
                  onClick={() => handleButtonClick(index)}
                  onMouseEnter={() => handleButtonHover(index)}
                  onMouseLeave={handleButtonLeave}
                >
                  {pic.alt}
                </button>
              ))}
            </div>
            <img
              src={(hoveredPic || selectedPic).src}
              alt={(hoveredPic || selectedPic).alt}
              width={(hoveredPic || selectedPic).width}
              height={(hoveredPic || selectedPic).height}
              className="environment-image mt-3"
            />
          </div>
        </div>
        <style jsx>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC&display=swap');

            .allFont {
              font-family: 'Noto Serif TC', serif;
              font-weight: 900;
            }
            .headSection {
              position: relative;
              width: 100%;
              height: auto;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              margin-top: 5rem;
              margin-bottom: 5rem;
            }
            .yellow {
              position: absolute;
              width: 17%;
              height: auto;
              margin-left: 130px;
              margin-bottom: 50px;
              max-width: 100%;
            }
            .green {
              position: absolute;
              width: 15%;
              height: auto;
              margin-right: 150px;
              margin-bottom: 50px;
              max-width: 100%;
            }

            .titleText {
              position: absolute;
              transform: translateY(-50%);
              z-index: 2;
            }
            .title {
              text-align: center;
              z-index: 2;
              position: relative;
            }
            .video-wrapper {
              position: relative;
              width: 100%;
              max-width: 1000px;
              margin: 0 auto;
              padding-bottom: 30%;
              height: 0;
              overflow: hidden;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              border-radius: 15px;
              transition:
                transform 0.3s ease,
                box-shadow 0.3s ease;
            }

            .video-wrapper iframe {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border: 0;
              border-radius: 15px;
            }

            .video-wrapper:hover {
              transform: scale(1.02);
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
            }

            .picArea {
              display: flex;
              flex-wrap: wrap;
              gap: 1rem;
              justify-content: center;
              margin-top: 2rem;
              width: 100%;
            }

            .custom-btn {
              background-color: #6a513d;
              font-weight: 500;
              color: #fff;
              border: none;
              border-radius: 30px;
              padding: 10px 20px;
              font-size: 18px;
              margin-bottom: 1rem;
              cursor: pointer;
              transition:
                background-color 0.3s ease,
                transform 0.3s ease;
            }

            .custom-btn:hover {
              background-color: #f6d554;
              font-weight: 600;
              color: #6a513d;
              transform: scale(1.05);
            }

            .environment-image {
              width: 60%;
              height: auto;
              transition: opacity 0.5s ease-in-out;
              opacity: 1;
            }

            .environment-image.fade {
              opacity: 0;
            }

            @media (max-width: 576px) {
              .headSection {
                position: relative;
                width: 100%;
                height: auto;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                margin-top: 5rem;
                margin-bottom: 5rem;
              }
              .yellow {
                position: absolute;
                width: 50%;
                height: auto;
                margin-left: 80px;
                margin-bottom: 0px;
                max-width: 100%;
              }
              .green {
                position: absolute;
                width: 48%;
                height: auto;
                margin-right: 90px;
                margin-bottom: 0px;
                max-width: 100%;
              }

              .titleText {
                position: absolute;
                transform: translateY(-50%);
                z-index: 2;
                margin-top: 3rem;
              }
              .title {
                text-align: center;
                z-index: 2;
                position: relative;
              }
              .video-wrapper {
                position: relative;
                width: 80%;
                max-width: 500px;
                margin: 0 auto;
                padding-bottom: 50%;
                height: 0;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                border-radius: 15px;
                transition:
                  transform 0.3s ease,
                  box-shadow 0.3s ease;
              }

              .video-wrapper iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border: 0;
                border-radius: 15px;
              }

              .video-wrapper:hover {
                transform: scale(1.02);
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
              }

              .picArea {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                justify-content: center;
                margin-top: 2rem;
                margin-bottom: 1rem;
                width: 100%;
              }

              .custom-btn {
                width: 30%;
                background-color: #6a513d;
                font-weight: 500;
                color: #fff;
                border: none;
                border-radius: 5px;
                font-size: 0.6rem;
                margin: 0;
                cursor: pointer;
                transition:
                  background-color 0.3s ease,
                  transform 0.3s ease;
              }

              .custom-btn:hover {
                background-color: #f6d554;
                font-weight: 600;
                color: #6a513d;
                transform: scale(1.05);
              }
              .environment-image {
                width: 70%;
                height: 60%;
                transition: opacity 0.5s ease-in-out;
                opacity: 1;
              }

              .environment-image.fade {
                opacity: 0;
              }
            }
          `}
        </style>
      </div>
    </>
  )
}
