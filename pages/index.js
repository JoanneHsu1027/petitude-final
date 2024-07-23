import React from 'react'
import Layout from '@/components/layout/layout'
import Funeral from '@/components/funeral/homeFuneral'
import ClassSection from '@/components/platform/index-page/class-section'
export default function home() {
  return (
    <>
      <style jsx>{`
        .TopCenter {
          position: absolute;
          top: 30px !important;
          z-index: 999999;
        }
      `}</style>
      <Layout>
        <Funeral />
        <div className="container my-5">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-10 col-lg-12 position-relative">
              <img
                className="TopCenter start-50 translate-middle"
                src="../forum-pic/forum-title.png"
                alt=""
              />
              <ClassSection />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
