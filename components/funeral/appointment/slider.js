import React from 'react'
import Slider from 'react-slick'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'

export default function Slider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }
  return (
    <Slider {...settings}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image src="/pics/appointment1.jpg" alt="" width={1440} height={850} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image src="/pics/appointment2.jpg" alt="" width={1440} height={850} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image src="/pics/appointment3.jpg" alt="" width={1440} height={850} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image src="/pics/appointment4.jpg" alt="" width={1440} height={850} />
      </div>
    </Slider>
  )
}
