import movies from './movies.json'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import settings from "./settings";
import './slick-style.module.css'

function Slick() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <div className="App">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div className="wrap">
            <img src={movie.url} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Slick
