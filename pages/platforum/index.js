import React from 'react'
import Layout from '@/components/layout/layout'
import styles from './platforum-style.module.css'
import SideBarPc from '@/components/layout/side-bar-pc'
import { BsPlusCircleFill } from 'react-icons/bs'
import ClassBlock from './class-block'

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

                <ClassBlock></ClassBlock>
              </div>
              {/* section 這裡結束 */}
            </div>
          </div>
        </Layout>
      </section>
    </>
  )
}
