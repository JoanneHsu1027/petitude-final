import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'next/image'
import ImageComponent from '../../component/common/image'

export default function Environment() {
  const environmentPic = [
    {
      src: '/pics/樹花葬區域.png',
      alt: '樹/花葬區',
      width: 540,
      height: 400,
    },
    {
      src: '/pics/家長休息區.png',
      alt: '家長休息區',
      width: 540,
      height: 400,
    },
    {
      src: '/pics/戶外玻璃法會區.png',
      alt: '戶外玻璃法會區',
      width: 540,
      height: 400,
    },
    {
      src: '/pics/戶外環境.png',
      alt: '戶外環境',
      width: 540,
      height: 400,
    },
    {
      src: '/pics/中西式溫馨花海告別廳.png',
      alt: '中/西式溫馨花海告別廳',
      width: 540,
      height: 400,
    },
    {
      src: '/pics/蓮花寶座區.png',
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
      <div className="container-fluid" style={{ backgroundColor: '#FFF5CF' }}>
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
              marginTop: '55px',
              marginBottom: '20px',
            }}
          >
            <h2
              className="title"
              style={{
                width: '100%',
                height: 'auto',
                textAlign: 'center',
                zIndex: 2,
                position: 'relative',
                marginBottom: '-10px',
              }}
            >
              寵物殯葬服務
            </h2>
            <div
              className="pattern"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: 'auto',
                position: 'relative',
                zIndex: 1,
                marginTop: '-50px', // 確保與標題重疊
              }}
            >
              {/* 綠色圖形 */}
              <ImageComponent
                className="lightYellow"
                src="/pics/Vector 433.png"
                alt=""
                width={250}
                height={80}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  zIndex: 1,
                  marginRight: '-60px', // 添加右側間距
                }}
              />
              {/* 深黃色圖形 */}
              <ImageComponent
                className="yellow"
                src="/pics/Vector 431.png"
                alt=""
                width={250}
                height={80}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  marginLeft: '-60px', // 添加左側間距
                }}
              />
            </div>
          </div>
          <div
            className="col-12 d-flex justify-content-center"
            style={{ margin: '10px 0px' }}
          >
            {/* 影片區塊 */}
            <div className="video">
              <iframe
                width="700"
                height="400"
                src="https://www.youtube.com/embed/q3OTetBQ3YQ?autoplay=1&mute=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <p className="d-flex justify-content-center align-items-center">
            {environmentPic.map((pic, index) => (
              <button
                key={index}
                className="btn btn-warning me-2"
                type="button"
                onClick={() => handleButtonClick(index)}
              >
                {pic.alt}
                <i className="bi bi-triangle-fill"></i>
              </button>
            ))}
          </p>
          <div className="col-12 py-3 d-flex justify-content-center">
            <Image
              src={selectedPic.src}
              alt={selectedPic.alt}
              width={selectedPic.width}
              height={selectedPic.height}
            />
          </div>
        </div>
      </div>
    </>
  )
}
