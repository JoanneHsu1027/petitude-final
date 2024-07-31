import React from 'react'
import Layout from '@/components/layout/layout'
import Funeral from '@/components/funeral/homeFuneral'
import InsuranceSection from '@/components/insurance/insurance-section'
import Estore from '@/components/estore/indexPage'
import ClassSection from '@/components/platform/index-page/class-section'
import Slider from '@/components/layout/slick'
import ScrollToTopButton from '@/components/funeral/scrollToTop'
import CartIcon from '@/components/estore/carticon'

export default function home() {
  return (
    <>
      <div
        className="AllFont"
        style={{ backgroundImage: 'url(/index/bg-img.png)' }}
      >
        <Layout>
          <ScrollToTopButton />
          <Slider />
          <Estore />
          <InsuranceSection />
          <Funeral />
          {/* 論壇區塊 start */}
          <div className="container my-5">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-9 col-lg-10 col-md-12 position-relative d-sm-none d-md-block d-md-none d-lg-block d-lg-none d-xl-block d-xl-none d-xxl-block d-xxl-none">
                <a href="./platform">
                  <img
                    className="TopCenter start-50 translate-middle"
                    src="../index/forum-title.png"
                    alt=""
                    style={{ width: '66%' }}
                  />
                </a>
                <ClassSection />
              </div>

              <div className="col-xl-9 col-lg-10 col-md-12 position-relative  d-none d-sm-block">
                <a href="./platform">
                  <img
                    className="TopCenter start-50 translate-middle"
                    src="../index/forum-title.png"
                    alt=""
                  />
                </a>
                <ClassSection />
              </div>
            </div>
          </div>
          {/* 論壇區塊 end */}
          <CartIcon />
          <ScrollToTopButton />
        </Layout>
      </div>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700&display=swap');
        .AllFont {
          font-family: 'Noto Serif TC', serif;
          font-weight: 900;
        }

        .TopCenter {
          position: absolute;
          top: 30px !important;
          z-index: 999999;
        }
      `}</style>
    </>
  )
}
