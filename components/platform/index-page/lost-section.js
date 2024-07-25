import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from '../../../styles/platform/platform-style.module.css'
import { BsPlusCircleFill } from 'react-icons/bs'

function LostSection() {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    vertical: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
          infinite: true,
        },
      },
    ],
  }
  return (
    <div className={`container my-5 slider-container ${styles.AllFont}`}>
      <div className="row">
        <div className="col p-0">
          <Slider {...settings} className="p-0">
            <div>
              <a
                className={`${styles.AReset}`}
                href="http://localhost:3000/platform/article/2"
              >
                <img className="img-fluid" src="/forum-pic/lost-img1.png" />
              </a>
            </div>
            <div>
              <a className={`${styles.AReset}`} href="#">
                <img className="img-fluid" src="/forum-pic/lost-img2.png" />
              </a>
            </div>
            <div>
              <a
                className={`${styles.AReset}`}
                href="http://localhost:3000/platform/article/4"
              >
                <img className="img-fluid" src="/forum-pic/lost-img3.png" />
              </a>
            </div>
            <div>
              <a className={`${styles.AReset}`} href="#">
                <img className="img-fluid" src="/forum-pic/lost-img2.png" />
              </a>
            </div>
          </Slider>
          <div className="d-flex flex-column align-items-end me-4">
            <a
              className={`${styles.AReset}`}
              style={{ color: 'black' }}
              href=""
            >
              <span style={{ color: '#f6d554' }}>
                <BsPlusCircleFill />
              </span>
              &nbsp;View more
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LostSection
