


import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

export default function NewsBlock() {
  return (
    <>
      <Swiper
      direction={'vertical'}
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}




















function NewsBlock() {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1000,
    vertical: true,
    draggable: true,
    verticalSwiping: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
          infinite: true,
          vertical: true,
        },
      },

      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
          infinite: true,
          vertical: false,
          verticalSwiping: false,
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
          vertical: false,
          verticalSwiping: false,
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
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  }
  return (
    <div className="container mt-3 mb-5 px-0">
      <div className="row border border-2 border-dark rounded-3">
        <div className="p-0 col-md-8 news-block-img1">
          <a href="#">
            <img className="img-fluid " src="/forum-pic/news-00.jpg" />
          </a>
        </div>

        <div className="p-0 col-md-4">
          <Slider {...settings}>
            <div>
              <a href="#">
                <img className="img-fluid" src="/forum-pic/news-01.jpg" />
              </a>
            </div>
            <div>
              <a href="#">
                <img className="img-fluid" src="/forum-pic/news-02.jpg" />
              </a>
            </div>
            <div>
              <a href="#">
                <img className="img-fluid" src="/forum-pic/news-03.jpg" />
              </a>
            </div>
            <div>
              <a href="#">
                <img className="img-fluid" src="/forum-pic/news-01.jpg" />
              </a>
            </div>
            <div>
              <a href="#">
                <img className="img-fluid" src="/forum-pic/news-02.jpg" />
              </a>
            </div>
            <div>
              <a href="#">
                <img className="img-fluid" src="/forum-pic/news-03.jpg" />
              </a>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default NewsBlock
