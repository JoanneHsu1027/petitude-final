import React from 'react'
import ImageComponent from '@/components/common/funeral/image'
import Layout from '@/components/layout/layout'
import MasonryCard from '@/components/funeral/funeral/masonry/masonry-card'
import Project from './project'
import Service from './service'

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
                  src="/funeral/Vector 436.png"
                  alt="Description of the image"
                  width={1440}
                  height={100}
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
            {/* 底部文字 */}
            <div>
              <div
                style={{
                  zIndex: '1',
                  position: 'absolute',
                  top: '480px',
                  left: '800px',
                }}
              >
                <h2 style={{ marginBottom: '20px' }}>守護每一段回憶</h2>
                <h2 style={{ marginLeft: '60px' }}>圓滿最美好的緣分</h2>
              </div>
              {/* 底下波浪圖 */}
              <ImageComponent
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
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '180px' }}>
        <Project />
      </div>
      <Service />
    </>
  )
}
