import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function SimpleSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  }
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img
            src="/estore/slider1.jpg"
            alt="Slide 1"
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <img
            src="/estore/slider2.jpg"
            alt="Slide 2"
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <img
            src="/estore/slider3.jpg"
            alt="Slide 3"
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <img
            src="/estore/slider4.jpg"
            alt="Slide 4"
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <img
            src="/estore/slider5.jpg"
            alt="Slide 5"
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <img
            src="/estore/slider6.jpg"
            alt="Slide 6"
            style={{ width: '100%' }}
          />
        </div>
      </Slider>
    </div>
  )
}
