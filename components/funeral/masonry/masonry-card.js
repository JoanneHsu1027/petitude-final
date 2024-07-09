import React, { useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import Styles from './masonry-card.module.css'

export default function MasonryCard() {
  const [hoverIndex, setHoverIndex] = useState(null)

  const images = [
    // r1c2
    {
      front: '/funeral/7.jpg',
      back: '/funeral/14.jpg',
      width: 200,
      height: 200,
    },
    // r1c3
    {
      front: '/funeral/7.jpg',
      back: '/funeral/19.jpg',
      width: 200,
      height: 200,
    },
    // r1c4
    {
      front: '/funeral/7.jpg',
      back: '/funeral/19.jpg',
      width: 200,
      height: 200,
    },
    // r1c1
    {
      front: '/funeral/7.jpg',
      back: '/funeral/19.jpg',
      width: 280,
      height: 230,
    },
    // r2c2
    {
      front: '/funeral/8.jpg',
      back: '/funeral/13.jpg',
      width: 200,
      height: 200,
    },
    // r2c3
    {
      front: '/funeral/8.jpg',
      back: '/funeral/13.jpg',
      width: 200,
      height: 200,
    },
    // r2c4
    {
      front: '/funeral/8.jpg',
      back: '/funeral/13.jpg',
      width: 200,
      height: 200,
    },
  ]
  const SVGComponent = () => (
    <svg
      width="157"
      height="124"
      viewBox="0 0 157 124"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M114.776 47.4208C122.803 67.5457 113.036 90.3511 92.9611 98.358C72.8861 106.365 50.1051 96.5414 42.0782 76.4165C34.0514 56.2915 43.8183 33.4861 63.8933 25.4792C83.9682 17.4723 106.749 27.2958 114.776 47.4208Z"
        fill="#EAD4B0"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M105.341 33.4705C119.91 30.7704 130.363 31.575 132.292 36.4106C135.535 44.5413 113.451 60.9894 82.9652 73.1485C52.4798 85.3077 25.1376 88.5734 21.8947 80.4427C19.9738 75.6266 26.9395 67.892 39.2741 59.8592C39.1994 58.8267 39.5662 56.6653 40.0804 55.467C45.885 51.8705 50.3479 49.3545 55.2658 46.8734C28.0527 60.4442 10.6555 77.6785 14.8831 88.2779C19.8241 100.666 52.4329 99.3 87.7168 85.2269C123.001 71.1538 147.599 49.7028 142.658 37.3148C139.315 28.9332 123.306 26.8478 102.373 30.7343L105.341 33.4705ZM96.6505 31.9186C94.5131 32.4051 92.3348 32.949 90.123 33.5499C92.1912 32.9963 94.3416 32.4594 96.6505 31.9186Z"
        fill="#C9B392"
      />
    </svg>
  )
  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={{ 580: 2, 955: 3, 1100: 4 }}>
        {/* 翻轉圖片區 */}
        <Masonry
          style={{
            height: '100%',
            position: 'relative',
            marginTop: '100px',
            marginLeft: '50px',
          }}
        >
          {/* 左上方星球+文字 */}
          <div
            className="justify-content-center align-items-center"
            style={{ position: 'relative', marginTop: '-22px' }}
          >
            <div>
              <SVGComponent />
            </div>
            <div>
              <h1
                style={{
                  position: 'relative',
                  color: 'gray',
                  fontSize: '32px',
                  textAlign: 'center',
                  fontWeight: 'bolder',

                  marginBottom: '30px',
                }}
              >
                寵物生命禮儀
              </h1>
            </div>
          </div>
          {images.map((image, i) => (
            <div
              key={i}
              className={`${Styles.imageContainer} ${hoverIndex === i ? Styles.flipped : ''}`}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{
                width: `${image.width}px`,
                height: `${image.height}px`,
                maxWidth: '100%',
                marginBottom: '10px',
                boxSizing: 'border-box',
                position: 'relative',
                overflow: 'hidden',
                zIndex: '3',
              }}
            >
              <div className={Styles.imageSide}>
                <img
                  src={image.front}
                  alt=""
                  width={image.width}
                  height={image.height}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className={`${Styles.imageSide} ${Styles.back}`}>
                <img
                  src={image.back}
                  alt=""
                  width={image.width}
                  height={image.height}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          ))}
          {/* 底部文字 */}
          <div>
            <div
              style={{
                zIndex: '1',
                position: 'absolute',
                top: '450px',
                left: '730px',
              }}
            >
              <h2 style={{ marginBottom: '20px' }}>守護每一段回憶</h2>
              <h2 style={{ marginLeft: '60px' }}>圓滿最美好的緣分</h2>
            </div>
            {/* 底下波浪圖 */}
            {/* <img
                src="/funeral/Vector 436.png"
                alt=""
                width={1440}
                height={150}
                style={{
                  maxWidth: '100%',
                  zIndex: '0',
                  position: 'absolute',
                  top: '450px',
                  overFlow: 'hidden',
                }}
              /> */}
          </div>
        </Masonry>
      </ResponsiveMasonry>
    </>
  )
}
