import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function NewsSection() {
  return (
    <div className="container mt-3 mb-5 px-0">
      <div className="row border border-3 border-dark rounded-3">
        <div className="p-0 col-md-8 news-block-img1">
          <a href="http://localhost:3000/platform/article/22">
            <img className="img-fluid" src="/forum-pic/news-00.jpg" />
          </a>
        </div>

        <div className="p-0 col-md-4 d-flex flex-md-column">
          <div className="">
            <a href="http://localhost:3000/platform/article/16">
              <img className="img-fluid" src="/forum-pic/news-01.jpg" />
            </a>
          </div>
          <div className="">
            <a href="http://localhost:3000/platform/article/31">
              <img className="img-fluid" src="/forum-pic/news-02.jpg" />
            </a>
          </div>
          <div>
            <a href="http://localhost:3000/platform/article/9">
              <img className="img-fluid" src="/forum-pic/news-03.jpg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsSection
