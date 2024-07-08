/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Layout1 from '../../components/layout/layout1'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import styles from '@/styles/estore/productList.module.css'

export default function ProjectList() {
  return (
    <Layout1>
      <main className={`flex-shrink-0 pt-5 ${styles.full}`}>
        <div className="container-fluid list">
          <div className="row">
            {/* <!-- side-bar 這裡開始 --> */}
            <div className="col-md-3 d-md-block d-none my-4 sideBar">
              <div
                className={`bg-white ${styles.rounded5} px-3 pt-4 d-flex flex-column justify-content-between h-100`}
              >
                <div className="d-flex flex-column">
                  <form className="d-flex mb-5">
                    <input
                      className={`border-end-del form-control border-success border-end-0 ${styles.searchL}`}
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button
                      className={`border-start-del btn btn-outline-success border-start-0 ${styles.searchR}`}
                      type="submit"
                    >
                      <i className="bi bi-search"></i>
                    </button>
                  </form>

                  <button
                    type="button"
                    className={`${styles.borderCoffee} ${styles.btnHover} btn btn-outline-dark mb-2`}
                  >
                    主題分類
                  </button>
                  <button
                    type="button"
                    className={`${styles.borderCoffee} ${styles.btnHover} btn btn-outline-dark mb-2`}
                  >
                    熱門討論
                  </button>
                  <button
                    type="button"
                    className={`${styles.borderCoffee} ${styles.btnHover} btn btn-outline-dark mb-2`}
                  >
                    最新文章
                  </button>
                  <button
                    type="button"
                    className={`${styles.borderCoffee} ${styles.btnHover} btn btn-outline-dark mb-2`}
                  >
                    文章收藏
                  </button>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <a className={`${styles.goTopBtn} mb-2`} href="#">
                    Go Top <i className="bi bi-triangle-fill"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- side-bar 這裡結束 --> */}
            {/* <!-- section 這裡開始 --> */}
            <div className="col-md-9 col-12">
              {/* <!-- 商品區 --> */}
              <div className="row mt-2 pt-2 mb-1 pb-1 d-flex justify-content-start">
                <div className="col-6 col-lg-4 col-xl-3 my-2">
                  <div className="card">
                    <img
                      src="/estore/狗.png"
                      className="card-img-top w-100"
                      alt="..."
                    />
                    <div className="card-body">
                      <h6 className="card-title">
                        雞腿絨毛啾啾玩具 (17公分) (貓玩具)(狗玩具)
                      </h6>
                      <div className="row mt-5 mx-0">
                        <div className="col-9 p-0 d-flex justify-content-start align-items-center">
                          $1.490
                        </div>
                        <div className="col-3 p-0 d-flex justify-content-end">
                          <button className={styles.cart}>
                            <i className="bi bi-bag-fill cartItem"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-4 col-xl-3 my-2">
                  <div className="card">
                    <img
                      src="/estore/狗.png"
                      className="card-img-top w-100"
                      alt="..."
                    />
                    <div className="card-body">
                      <h6 className="card-title">
                        雞腿絨毛啾啾玩具 (17公分) (貓玩具)(狗玩具)
                      </h6>
                      <div className="row mt-5 mx-0">
                        <div className="col-9 p-0 d-flex justify-content-start align-items-center">
                          $1.490
                        </div>
                        <div className="col-3 p-0 d-flex justify-content-end">
                          <button className={styles.cart}>
                            <i className="bi bi-bag-fill cartItem"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-4 col-xl-3 my-2">
                  <div className="card">
                    <img
                      src="/estore/狗.png"
                      className="card-img-top w-100"
                      alt="..."
                    />
                    <div className="card-body">
                      <h6 className="card-title">
                        雞腿絨毛啾啾玩具 (17公分) (貓玩具)(狗玩具)
                      </h6>
                      <div className="row mt-5 mx-0">
                        <div className="col-9 p-0 d-flex justify-content-start align-items-center">
                          $1.490
                        </div>
                        <div className="col-3 p-0 d-flex justify-content-end">
                          <button className={styles.cart}>
                            <i className="bi bi-bag-fill cartItem"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-4 col-xl-3 my-2">
                  <div className="card">
                    <img
                      src="/estore/狗.png"
                      className="card-img-top w-100"
                      alt="..."
                    />
                    <div className="card-body">
                      <h6 className="card-title">
                        雞腿絨毛啾啾玩具 (17公分) (貓玩具)(狗玩具)
                      </h6>
                      <div className="row mt-5 mx-0">
                        <div className="col-9 p-0 d-flex justify-content-start align-items-center">
                          $1.490
                        </div>
                        <div className="col-3 p-0 d-flex justify-content-end">
                          <button className={styles.cart}>
                            <i className="bi bi-bag-fill cartItem"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-4 col-xl-3 my-2">
                  <div className="card">
                    <img
                      src="/estore/狗.png"
                      className="card-img-top w-100"
                      alt="..."
                    />
                    <div className="card-body">
                      <h6 className="card-title">
                        雞腿絨毛啾啾玩具 (17公分) (貓玩具)(狗玩具)
                      </h6>
                      <div className="row mt-5 mx-0">
                        <div className="col-9 p-0 d-flex justify-content-start align-items-center">
                          $1.490
                        </div>
                        <div className="col-3 p-0 d-flex justify-content-end">
                          <button className={styles.cart}>
                            <i className="bi bi-bag-fill cartItem"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-4 col-xl-3 my-2">
                  <div className="card">
                    <img
                      src="/estore/狗.png"
                      className="card-img-top w-100"
                      alt="..."
                    />
                    <div className="card-body">
                      <h6 className="card-title">
                        雞腿絨毛啾啾玩具 (17公分) (貓玩具)(狗玩具)
                      </h6>
                      <div className="row mt-5 mx-0">
                        <div className="col-9 p-0 d-flex justify-content-start align-items-center">
                          $1.490
                        </div>
                        <div className="col-3 p-0 d-flex justify-content-end">
                          <button className={styles.cart}>
                            <i className="bi bi-bag-fill cartItem"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- 商品區 --> */}
              <div className="row">
                <div className={styles.pagination}>
                  <button className={`${styles.btnNav} left-btn`}>
                    <i className="bi bi-arrow-left"></i>
                  </button>
                  <div className={`${styles.pageNumbers} rounded-circle`}>
                    <button className={`${styles.btnPage} rounded-circle`}>
                      1
                    </button>
                    <button className={`${styles.btnPage} rounded-circle`}>
                      2
                    </button>
                    <button
                      className={`${styles.btnPage} ${styles.btnSelected} rounded-circle`}
                    >
                      3
                    </button>
                    <button className={`${styles.btnPage} rounded-circle`}>
                      4
                    </button>
                    <button className={`${styles.btnPage} rounded-circle`}>
                      5
                    </button>
                    <button className={`${styles.btnPage} rounded-circle`}>
                      6
                    </button>
                    <span className={styles.dots}>...</span>
                    <button className={`${styles.btnPage} rounded-circle`}>
                      23
                    </button>
                  </div>
                  <button className={`${styles.btnNav} right-btn`}>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
              {/* <!-- section 這裡結束 --> */}
            </div>
          </div>
        </div>
      </main>
    </Layout1>
  )
}
