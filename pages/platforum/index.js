import React from 'react'
import Layout from '@/components/layout/layout'
import styles from './platforum-style.module.css'

export default function Platforum() {
  return (
    <>
      <section className={`${styles.BgImg}`}>
        <Layout title="貓狗論壇" pageName="pet-insurance">
          <div className="container">
            <div className="row">
              {/* side-bar 這裡開始 */}
              <div className="col-xl-3 d-lg-none d-xl-block d-md-none d-lg-block d-sm-none d-md-block d-none d-sm-block mb-0">
                <div
                  className={`bg-white ${styles.W10} ${styles.Rounded5} ${styles.H70} px-3 pt-4 position-fixed d-flex flex-column justify-content-between`}
                >
                  <div className="d-flex flex-column">
                    <form className="d-flex mb-5">
                      <input
                        className={`${styles.BorderEndDel} form-control border-success border-end-0`}
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button
                        className={`${styles.BorderStartDel} btn btn-outline-success border-start-0`}
                        type="submit"
                      >
                        <i className="bi bi-search" />
                      </button>
                    </form>
                    <a
                      href="./class-list.html"
                      type="button"
                      className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} btn btn-outline-dark mb-2`}
                    >
                      主題分類
                    </a>
                    <a
                      href=""
                      type="button"
                      className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} btn btn-outline-dark mb-2`}
                    >
                      熱門討論
                    </a>
                    <a
                      href="./article-list.html"
                      type="button"
                      className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} btn btn-outline-dark mb-2`}
                    >
                      最新文章
                    </a>
                    <a
                      href="./favorite-article.html"
                      type="button"
                      className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} btn btn-outline-dark mb-2`}
                    >
                      文章收藏
                    </a>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <a
                      className={`${styles.AReset} ${styles.GoTopBtn} mb-2`}
                      href="#"
                    >
                      Go Top <i className="bi bi-triangle-fill" />
                    </a>
                  </div>
                </div>
              </div>
              {/* side-bar 這裡結束 */}
              {/* section 這裡開始 */}
              <div className="col-xl-9 col-lg-12">
                {/* news-block 這裡開始 */}
                <div className="container mt-3 mb-5 px-0">
                  <div className="row border border-2 border-dark rounded-3">
                    <div className="p-0 col-md-8 news-block-img1">
                      <a className="AReset" href="#">
                        <img
                          className="img-fluid"
                          src="./pet_img/news-00.jpg"
                        />
                      </a>
                    </div>
                    <div className="p-0 col-md-4">
                      <section className="news-carousel">
                        <div>
                          <a className="AReset" href="#">
                            <img
                              className="img-fluid"
                              src="./pet_img/news-01.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <a className="AReset" href="#">
                            <img
                              className="img-fluid"
                              src="./pet_img/news-02.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <a className="AReset" href="#">
                            <img
                              className="img-fluid"
                              src="./pet_img/news-03.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <a className="AReset" href="#">
                            <img
                              className="img-fluid"
                              src="./pet_img/news-01.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <a className="AReset" href="#">
                            <img
                              className="img-fluid"
                              src="./pet_img/news-02.jpg"
                            />
                          </a>
                        </div>
                        <div>
                          <a className="AReset" href="#">
                            <img
                              className="img-fluid"
                              src="./pet_img/news-03.jpg"
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
                          <a className="AReset" href="#">
                            <img src="./pet_img/lost-img1.png" />
                          </a>
                        </div>
                        <div>
                          <a className="AReset" href="#">
                            <img src="./pet_img/lost-img2.png" />
                          </a>
                        </div>
                        <div>
                          <a className="AReset" href="#">
                            <img src="./pet_img/lost-img3.png" />
                          </a>
                        </div>
                        <div>
                          <a className="AReset" href="#">
                            <img src="./pet_img/lost-img2.png" />
                          </a>
                        </div>
                      </section>
                      <div className="d-flex flex-column align-items-end me-4">
                        <a
                          className="AReset"
                          style={{ color: 'black' }}
                          href=""
                        >
                          <i
                            style={{ color: '#f6d554' }}
                            className="bi bi-plus-circle-fill"
                          />
                          View more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* lost-block 這裡結束 */}
                {/* class-block 這裡開始 */}
                <div className="card my-5 Rounded5 border-5 BorderCoffee">
                  <div className="mx-5 mt-4">
                    <nav className="nav border-bottom">
                      <a
                        className="AReset nav-change nav-link MyActive text-black"
                        href="#"
                        data-target="#tab1"
                      >
                        寵物遺失
                      </a>
                      <a
                        className="AReset nav-change nav-link text-black"
                        href="#"
                        data-target="#tab2"
                      >
                        飼養心得
                      </a>
                      <a
                        className="AReset nav-change nav-link text-black"
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
                      className="content-change DisplayChange tab-content active"
                    >
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-5 d-md-none d-lg-block d-sm-none d-md-block d-none d-sm-block class-content px-0 pt-5">
                            <img
                              className="ps-5 img-fluid"
                              id="main-img1"
                              src="./pet_img/p01.png"
                              alt="p01"
                            />
                          </div>
                          <div className="col-lg-7 col-md-12 d-flex flex-column align-items-center justify-content-center">
                            <div className="hover-change border-bottom W80">
                              <a
                                className="AReset ms-1"
                                href="#"
                                data-img="p01"
                              >
                                <p className="ps-4 Hover">
                                  我的狗狗不見了，有人見過嗎？
                                </p>
                              </a>
                            </div>
                            <div className="hover-change border-bottom W80">
                              <a
                                className="AReset ms-1"
                                href="#"
                                data-img="p02"
                              >
                                <p className="ps-4 Hover">
                                  貓咪走失，懇請大家幫忙找尋
                                </p>
                              </a>
                            </div>
                            <div className="hover-change border-bottom W80">
                              <a
                                className="AReset ms-1"
                                href="#"
                                data-img="p03"
                              >
                                <p className="ps-4 Hover">
                                  小兔子不見了，急尋！
                                </p>
                              </a>
                            </div>
                            <div className="hover-change border-bottom W80">
                              <a
                                className="AReset ms-1"
                                href="#"
                                data-img="p04"
                              >
                                <p className="ps-4 Hover">
                                  小鳥飛走了，懇請幫忙找尋
                                </p>
                              </a>
                            </div>
                            <div className="hover-change border-bottom W80">
                              <a
                                className="AReset ms-1"
                                href="#"
                                data-img="p05"
                              >
                                <p className="ps-4 Hover">三花虎斑貓走失</p>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="tab2"
                      className="content-change DisplayChange tab-content"
                    >
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-5 d-md-none d-lg-block d-sm-none d-md-block d-none d-sm-block class-content px-0 pt-5">
                            <img
                              className="ps-5 img-fluid"
                              id="main-img2"
                              src="./pet_img/p01.png"
                              alt="p01"
                            />
                          </div>
                          <div className="col-lg-7 col-md-12 d-flex flex-column align-items-center justify-content-center">
                            <div className="hover-change border-bottom W80">
                              <a
                                className="AReset ms-1"
                                href="#"
                                data-img="p01"
                              >
                                <p className="ps-4 Hover">飼養貓咪的那些事</p>
                              </a>
                            </div>
                            <div className="hover-change border-bottom W80">
                              <a
                                className="AReset ms-1"
                                href="#"
                                data-img="p02"
                              >
                                <p className="ps-4 Hover">
                                  飼養狗狗的快樂與挑戰
                                </p>
                              </a>
                            </div>
                            <div className="hover-change border-bottom W80">
                              <a
                                className="AReset ms-1"
                                href="#"
                                data-img="p03"
                              >
                                <p className="ps-4 Hover">
                                  初次飼養兔子的經驗分享
                                </p>
                              </a>
                            </div>
                            <div className="hover-change border-bottom W80">
                              <a
                                className="AReset ms-1"
                                href="#"
                                data-img="p04"
                              >
                                <p className="ps-4 Hover">養倉鼠的甜蜜時光</p>
                              </a>
                            </div>
                            <div className="hover-change border-bottom W80">
                              <a
                                className="AReset ms-1"
                                href="#"
                                data-img="p05"
                              >
                                <p className="ps-4 Hover">
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
                      className="content-change DisplayChange tab-content"
                    >
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-5 d-md-none d-lg-block d-sm-none d-md-block d-none d-sm-block class-content px-0 pt-5">
                            <img
                              className="ps-5 img-fluid"
                              id="main-img3"
                              src="./pet_img/p01.png"
                              alt="p01"
                            />
                          </div>
                          <div className="col-lg-7 col-md-12 d-flex flex-column align-items-center justify-content-center">
                            <div className="hover-change border-bottom W80">
                              <a
                                className="AReset ms-1"
                                href="#"
                                data-img="p01"
                              >
                                <p className="ps-4 Hover">
                                  大家都在養什麼寵物？
                                </p>
                              </a>
                            </div>
                            <div className="hover-change border-bottom W80">
                              <a
                                className="AReset ms-1"
                                href="#"
                                data-img="p02"
                              >
                                <p className="ps-4 Hover">
                                  如何選擇適合自己的寵物？
                                </p>
                              </a>
                            </div>
                            <div className="hover-change border-bottom W80">
                              <a
                                className="AReset ms-1"
                                href="#"
                                data-img="p03"
                              >
                                <p className="ps-4 Hover">
                                  養狗新手第一次去寵物展
                                </p>
                              </a>
                            </div>
                            <div className="hover-change border-bottom W80">
                              <a
                                className="AReset ms-1"
                                href="#"
                                data-img="p04"
                              >
                                <p className="ps-4 Hover">
                                  飼養多種寵物的經驗分享
                                </p>
                              </a>
                            </div>
                            <div className="hover-change border-bottom W80">
                              <a
                                className="AReset ms-1"
                                href="#"
                                data-img="p05"
                              >
                                <p className="ps-4 Hover">寵物行為問題討論</p>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-end mt-4 me-5 mb-2">
                      <a
                        className="AReset"
                        style={{ color: 'black' }}
                        href="./class-list.html"
                      >
                        <i
                          style={{ color: '#f6d554' }}
                          className="bi bi-plus-circle-fill"
                        />
                        View more
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
