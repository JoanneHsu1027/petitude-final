import React from 'react'
import Layout from '@/components/layout/layout'
import styles from './platforum-style.module.css'
import SideBarPc from '@/components/layout/side-bar-pc'
import { BsPlusCircleFill } from 'react-icons/bs'

export default function Platforum() {
  return (
    <>
      <section className={`${styles.BgImg}`}>
        <Layout title="貓狗論壇" pageName="pet-insurance">
          <div className="container">
            <div className="row">
              <SideBarPc></SideBarPc>
              {/* section 這裡開始 */}
              <div className="col-xl-9 col-lg-12">
                {/* news-block 這裡開始 */}
                <div className="container mt-3 mb-5 px-0">
                  <div className="row border border-2 border-dark rounded-3">
                    <div className="p-0 col-md-8 news-block-img1">
                      <a className={`${styles.AReset}`} href="#">
                        <img
                          className="img-fluid"
                          src="/forum-pic/news-00.jpg"
                        />
                      </a>
                    </div>
                    <div className="p-0 col-md-4">
                      <section className="news-carousel">
                        <div>
                          <a className={`${styles.AReset}`} href="#">
                            <img
                              className="img-fluid"
                              src="/forum-pic/news-01.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <a className={`${styles.AReset}`} href="#">
                            <img
                              className="img-fluid"
                              src="/forum-pic/news-02.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <a className={`${styles.AReset}`} href="#">
                            <img
                              className="img-fluid"
                              src="/forum-pic/news-03.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <a className={`${styles.AReset}`} href="#">
                            <img
                              className="img-fluid"
                              src="/forum-pic/news-01.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <a className={`${styles.AReset}`} href="#">
                            <img
                              className="img-fluid"
                              src="/forum-pic/news-02.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <a className={`${styles.AReset}`} href="#">
                            <img
                              className="img-fluid"
                              src="/forum-pic/news-03.jpg"
                            />
                          </a>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
                {/* news-block 這裡結束 */}
                {/* lost-block 這裡開始 */}
                <div className="container my-5">
                  <div className="row">
                    <div className="col">
                      <section className="lost-carousel">
                        <div>
                          <a className={`${styles.AReset}`} href="#">
                            <img src="/forum-pic/lost-img1.png" />
                          </a>
                        </div>
                        <div>
                          <a className={`${styles.AReset}`} href="#">
                            <img src="/forum-pic/lost-img2.png" />
                          </a>
                        </div>
                        <div>
                          <a className={`${styles.AReset}`} href="#">
                            <img src="/forum-pic/lost-img3.png" />
                          </a>
                        </div>
                        <div>
                          <a className={`${styles.AReset}`} href="#">
                            <img src="/forum-pic/lost-img2.png" />
                          </a>
                        </div>
                      </section>
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
                {/* lost-block 這裡結束 */}
                {/* class-block 這裡開始 */}
                <div
                  className={`card my-5 border-5 ${styles.Rounded5} ${styles.BorderCoffee}`}
                >
                  <div className="mx-5 mt-4">
                    <nav className="nav border-bottom">
                      <a
                        className={`${styles.AReset} nav-change nav-link ${styles.MyActive} text-black`}
                        href="#"
                        data-target="#tab1"
                      >
                        寵物遺失
                      </a>
                      <a
                        className={`${styles.AReset} nav-change nav-link text-black`}
                        href="#"
                        data-target="#tab2"
                      >
                        飼養心得
                      </a>
                      <a
                        className={`${styles.AReset} nav-change nav-link text-black`}
                        href="#"
                        data-target="#tab3"
                      >
                        聊天討論
                      </a>
                    </nav>
                  </div>
                  <div className="mt-2 mb-4 mx-2">
                    <div
                      id="tab1"
                      className={`content-change ${styles.DisplayChange} tab-content active`}
                    >
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-5 d-md-none d-lg-block d-sm-none d-md-block d-none d-sm-block class-content px-0 pt-5">
                            <img
                              className="ps-5 img-fluid"
                              id="main-img1"
                              src="/forum-pic/p01.png"
                              alt="p01"
                            />
                          </div>
                          <div className="col-lg-7 col-md-12 d-flex flex-column align-items-center justify-content-center">
                            <div
                              className={`hover-change border-bottom ${styles.W80}`}
                            >
                              <a
                                className={`${styles.AReset} ms-1`}
                                href="#"
                                data-img="p01"
                              >
                                <p className={`ps-4 ${styles.Hover}`}>
                                  我的狗狗不見了，有人見過嗎？
                                </p>
                              </a>
                            </div>
                            <div
                              className={`hover-change border-bottom ${styles.W80}`}
                            >
                              <a
                                className={`${styles.AReset} ms-1`}
                                href="#"
                                data-img="p02"
                              >
                                <p className={`ps-4 ${styles.Hover}`}>
                                  貓咪走失，懇請大家幫忙找尋
                                </p>
                              </a>
                            </div>
                            <div
                              className={`hover-change border-bottom ${styles.W80}`}
                            >
                              <a
                                className={`${styles.AReset} ms-1`}
                                href="#"
                                data-img="p03"
                              >
                                <p className={`ps-4 ${styles.Hover}`}>
                                  小兔子不見了，急尋！
                                </p>
                              </a>
                            </div>
                            <div
                              className={`hover-change border-bottom ${styles.W80}`}
                            >
                              <a
                                className={`${styles.AReset} ms-1`}
                                href="#"
                                data-img="p04"
                              >
                                <p className={`ps-4 ${styles.Hover}`}>
                                  小鳥飛走了，懇請幫忙找尋
                                </p>
                              </a>
                            </div>
                            <div
                              className={`hover-change border-bottom ${styles.W80}`}
                            >
                              <a
                                className={`${styles.AReset} ms-1`}
                                href="#"
                                data-img="p05"
                              >
                                <p className={`ps-4 ${styles.Hover}`}>
                                  三花虎斑貓走失
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="tab2"
                      className={`content-change ${styles.DisplayChange} tab-content`}
                    >
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-5 d-md-none d-lg-block d-sm-none d-md-block d-none d-sm-block class-content px-0 pt-5">
                            <img
                              className="ps-5 img-fluid"
                              id="main-img2"
                              src="/forum-pic/p01.png"
                              alt="p01"
                            />
                          </div>
                          <div className="col-lg-7 col-md-12 d-flex flex-column align-items-center justify-content-center">
                            <div
                              className={`hover-change border-bottom ${styles.W80}`}
                            >
                              <a
                                className={`${styles.AReset} ms-1`}
                                href="#"
                                data-img="p01"
                              >
                                <p className={`ps-4 ${styles.Hover}`}>
                                  飼養貓咪的那些事
                                </p>
                              </a>
                            </div>
                            <div
                              className={`hover-change border-bottom ${styles.W80}`}
                            >
                              <a
                                className={`${styles.AReset} ms-1`}
                                href="#"
                                data-img="p02"
                              >
                                <p className={`ps-4 ${styles.Hover}`}>
                                  飼養狗狗的快樂與挑戰
                                </p>
                              </a>
                            </div>
                            <div
                              className={`hover-change border-bottom ${styles.W80}`}
                            >
                              <a
                                className={`${styles.AReset} ms-1`}
                                href="#"
                                data-img="p03"
                              >
                                <p className={`ps-4 ${styles.Hover}`}>
                                  初次飼養兔子的經驗分享
                                </p>
                              </a>
                            </div>
                            <div
                              className={`hover-change border-bottom ${styles.W80}`}
                            >
                              <a
                                className={`${styles.AReset} ms-1`}
                                href="#"
                                data-img="p04"
                              >
                                <p className={`ps-4 ${styles.Hover}`}>
                                  養倉鼠的甜蜜時光
                                </p>
                              </a>
                            </div>
                            <div
                              className={`hover-change border-bottom ${styles.W80}`}
                            >
                              <a
                                className={`${styles.AReset} ms-1`}
                                href="#"
                                data-img="p05"
                              >
                                <p className={`ps-4 ${styles.Hover}`}>
                                  分辨優良貓舍的初步鋩角
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="tab3"
                      className={`content-change ${styles.DisplayChange} tab-content`}
                    >
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-5 d-md-none d-lg-block d-sm-none d-md-block d-none d-sm-block class-content px-0 pt-5">
                            <img
                              className="ps-5 img-fluid"
                              id="main-img3"
                              src="/forum-pic/p01.png"
                              alt="p01"
                            />
                          </div>
                          <div className="col-lg-7 col-md-12 d-flex flex-column align-items-center justify-content-center">
                            <div
                              className={`hover-change border-bottom ${styles.W80}`}
                            >
                              <a
                                className={`${styles.AReset} ms-1`}
                                href="#"
                                data-img="p01"
                              >
                                <p className={`ps-4 ${styles.Hover}`}>
                                  大家都在養什麼寵物？
                                </p>
                              </a>
                            </div>
                            <div
                              className={`hover-change border-bottom ${styles.W80}`}
                            >
                              <a
                                className={`${styles.AReset} ms-1`}
                                href="#"
                                data-img="p02"
                              >
                                <p className={`ps-4 ${styles.Hover}`}>
                                  如何選擇適合自己的寵物？
                                </p>
                              </a>
                            </div>
                            <div
                              className={`hover-change border-bottom ${styles.W80}`}
                            >
                              <a
                                className={`${styles.AReset} ms-1`}
                                href="#"
                                data-img="p03"
                              >
                                <p className={`ps-4 ${styles.Hover}`}>
                                  養狗新手第一次去寵物展
                                </p>
                              </a>
                            </div>
                            <div
                              className={`hover-change border-bottom ${styles.W80}`}
                            >
                              <a
                                className={`${styles.AReset} ms-1`}
                                href="#"
                                data-img="p04"
                              >
                                <p className={`ps-4 ${styles.Hover}`}>
                                  飼養多種寵物的經驗分享
                                </p>
                              </a>
                            </div>
                            <div
                              className={`hover-change border-bottom ${styles.W80}`}
                            >
                              <a
                                className={`${styles.AReset} ms-1`}
                                href="#"
                                data-img="p05"
                              >
                                <p className={`ps-4 ${styles.Hover}`}>
                                  寵物行為問題討論
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-end mt-4 me-5 mb-2">
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
                {/* class-block 這裡結束 */}
              </div>
              {/* section 這裡結束 */}
            </div>
          </div>
        </Layout>
      </section>
    </>
  )
}
