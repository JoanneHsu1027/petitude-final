import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from '@/components/funeral/project/card'

export default function Project() {
  return (
    <>
      <div className="container-fluid mt-5">
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
              <h2>禮儀方案</h2>
            </div>
            <h6>
              寵返星球是一群熱愛毛孩的年輕團隊，我們深深感受到陪伴與服務的重要性。
            </h6>
          </div>
          <Card />
        </div>
      </div>
    </>
  )
}
