import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default function Carousel() {
  return (
    <>
      {/* <!-- carousel --> */}
      <div className="containerp-0">
        <div className="row m-0">
          <div className="col-12 p-0">
            <div
              id="carouselExampleSlidesOnly"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="1000" // 設置輪播速度為 1000 毫秒（1 秒）
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="/funeral/appointment1.png"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/funeral/appointment2.png"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- carousel --> */}
    </>
  )
}
