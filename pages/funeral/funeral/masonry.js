import React from 'react'
import ImageComponent from '../../../components/funeral/common/image'
import Layout from '../../../components/layout/layout'
import Styles from '../../../components/funeral/funeral/masonry/masonry-card.module.css'
import MasonryCard from '../../../components/funeral/funeral/masonry/masonry-card'

export default function MasonryPage() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div>
              {/* 頂端圖片 */}
              <div>
                <ImageComponent
                  src="/pics/Vector 436.png"
                  alt="Description of the image"
                  width={1440}
                  height={200}
                  style={{
                    width: '100%',
                    height: 'auto',
                    transform: 'rotate(180deg)',
                    zIndex: '0',
                    position: 'relative',
                  }}
                />
              </div>
              {/* navbar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  zIndex: '1',
                }}
              >
                <Layout />
              </div>
            </div>
            <MasonryCard />
            {/* 底部圖片 */}
            <div>
              <div
                style={{
                  zIndex: '1',
                  position: 'absolute',
                  top: '600px',
                  left: '800px',
                }}
              >
                <h2 style={{ marginBottom: '20px' }}>守護每一段回憶</h2>
                <h2 style={{ marginLeft: '60px' }}>圓滿最美好的緣分</h2>
              </div>
              {/* 底下波浪圖 */}
              <ImageComponent
                src="/pics/Vector 436.png"
                alt=""
                width={1440}
                height={150}
                style={{
                  maxWidth: '100%',
                  zIndex: '0',
                  position: 'absolute',
                  top: '550px',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
