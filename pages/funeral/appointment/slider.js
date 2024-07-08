import React from 'react'
import Slider from 'react-slick'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ImageComponent from '../../../components/common/funeral/image'
import Navbar from '../../../components/layout/layout'
import Service from '../appointment/service'
import Environment from '../appointment/environment'
import Question from '../appointment/question'

export default function SimpleSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Slider {...settings}>
              <div>
                <ImageComponent
                  src="/funeral/appointment1.png"
                  alt=""
                  width={900}
                  height={450}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </div>
              <div>
                <ImageComponent
                  src="/funeral/appointment2.png"
                  alt=""
                  width={900}
                  height={450}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </div>
            </Slider>
          </div>
        </div>
      </div>

      {/* <Service />
      <Environment />
      <Question /> */}
    </>
  )
}
