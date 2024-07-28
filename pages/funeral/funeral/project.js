import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from '@/components/funeral/project/card'

export default function Project() {
  return (
    <>
      <div className="container-fluid allFont">
        <div className="row justify-content-center" style={{ margin: '10px' }}>
          <div className="col-12">
            <div style={{ display: 'flex' }}>
              <img
                src="/funeral/Line 25.png"
                alt=""
                width={5}
                height={40}
                style={{ marginRight: '15px' }}
              />
              <h2 className="title">禮儀方案</h2>
            </div>
            <h5 className="text">
              寵返星球是一群熱愛毛孩的年輕團隊，我們深深感受到陪伴與服務的重要性
            </h5>
          </div>
          <Card />
        </div>
      </div>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC&display=swap');

        .allFont {
          font-family: 'Noto Serif TC', serif;
          font-weight: 900;
        }
        .title {
          font-size: 34px;
          margin-bottom: 1rem;
          font-weight: 900;
        }
        @media (max-width: 580px);{
          .container-fluid{
            margin-top: 5rem;
          }
          .title {
          font-size: 30px;
          margin-bottom: 1rem;
          font-weight: 900;
        }
        .text{
          font-size: 20px;
          font-weight: 900;
          line-height: 1.6;
        }
        }
      `}</style>
    </>
  )
}
