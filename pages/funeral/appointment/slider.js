import React from 'react'
import Slider from 'react-slick'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ImageComponent from '../../component/common/image'
import Navbar from '../../component/layout/navbar'

export default function SimpleSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  return (
    <>
      <Navbar />
      <Slider {...settings}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ImageComponent
            src="/pics/appointment1.jpg"
            alt=""
            width={1440}
            height={650}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ImageComponent
            src="/pics/appointment2.jpg"
            alt=""
            width={1440}
            height={650}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ImageComponent
            src="/pics/appointment3.jpg"
            alt=""
            width={1440}
            height={650}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ImageComponent
            src="/pics/appointment4.jpg"
            alt=""
            width={1440}
            height={650}
          />
        </div>
      </Slider>
    </>
  )
}
