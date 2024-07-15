import React from 'react'
import Layout from '@/components/layout/layout'
import styles from '../../../styles/platform/platform-style.module.css'
import SideBarPc from '@/components/platform/side-bar-pc'
import { BsChevronLeft } from 'react-icons/bs'
import { BsFillPencilFill } from 'react-icons/bs'
import { BsBookmarkFill } from 'react-icons/bs'
import { BsFillShareFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ARTICLE_PAGE } from '@/configs/platform/api-path'
import ReMessageBlock from '@/components/platform/re-message-block'

export default function ArticleId() {
  const router = useRouter()
  const [data, setData] = useState([])

  useEffect(() => {
    if (!router.isReady) return

    fetch(`${ARTICLE_PAGE}/${router.query.article_id}`)
      .then((r) => r.json())
      .then((myData) => {
        console.log(myData.data)
        setData(myData.data)
      })
  }, [router])
  return (
    <>
      <section className={`${styles.BgImg}`}>
        <Layout title="貓狗論壇" pageName="pet-insurance">
          <div className="container mb-5">
            <div className="row">
              <SideBarPc></SideBarPc>
              {/* section 這裡開始 */}
              <div className="col-xl-9 col-lg-12">
                {/* article-page 這裡開始 */}
                <div
                  className={`container card my-1 ${styles.Rounded5} border-0 h-100 px-3`}
                >
                  <div className="row">
                    <div className="col-lg-12 col-md-12 d-flex flex-column justify-content-center mt-4">
                      {/* mobile only go-back-page-btn */}
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          top: '240px',
                          left: '12px',
                        }}
                        className="border rounded bg-white d-flex justify-content-center align-items-center position-fixed d-xl-none d-xxl-block d-xxl-none"
                      >
                        <a className={`${styles.AReset}`} href="./article-list">
                          <BsChevronLeft></BsChevronLeft>
                        </a>
                      </div>

                      <div>
                        {/* article-content 這裡開始 */}
                        <section>
                          {/* head */}
                          <div className="border-bottom border-secondary mt-3 mx-2">
                            <h2 className="ms-2">{data.article_name}</h2>
                            <div className="d-flex me-3 ms-2">
                              <div className="m-2 d-flex flex-grow-1 word-wrap">
                                <a className={`${styles.AReset}`} href="">
                                  <p className="border border-dark rounded-3 me-2 word-wrap">
                                    主題名稱
                                  </p>
                                </a>
                                <p className="me-1 word-wrap">
                                  {data.article_date}
                                </p>
                              </div>
                              <a
                                className={`${styles.AReset} ${styles.LightGray}`}
                              >
                                <BsFillPencilFill
                                  className={`mb-1`}
                                ></BsFillPencilFill>
                                編輯
                              </a>
                            </div>
                          </div>

                          {/* main */}
                          <div className="mx-4 my-4">
                            <p>{data.article_content} </p>
                          </div>

                          {/* foot */}
                          <div className="border-bottom border-secondary d-flex justify-content-around pb-4">
                            <a
                              className={`${styles.AReset} ${styles.LightGray} ${styles.FavHover}`}
                            >
                              <BsBookmarkFill
                                className={`mb-1`}
                              ></BsBookmarkFill>
                              收藏
                            </a>
                            <a
                              className={`${styles.AReset} ${styles.LightGray}`}
                            >
                              <BsFillShareFill
                                className={`mb-1`}
                              ></BsFillShareFill>
                              分享
                            </a>
                          </div>
                        </section>
                        {/* article-content 這裡結束 */}
                        {/* message-content 這裡開始 */}
                        <section>
                          <ReMessageBlock></ReMessageBlock>
                          <ReMessageBlock></ReMessageBlock>
                          <ReMessageBlock></ReMessageBlock>
                          <ReMessageBlock></ReMessageBlock>
                        </section>
                        {/* message-content 這裡結束 */}
                        {/* re-message-block 這裡開始 */}
                        <div className="position-sticky bottom-0 ">
                          <div className="p-3 d-flex justify-content-center">
                            <input
                              style={{ height: '45px' }}
                              className={`card ${styles.W95} border-3 ${styles.BorderBlue} ${styles.SetPlaceholder}`}
                              type="text"
                              placeholder="回覆......"
                            />
                          </div>
                        </div>
                        {/* re-message-block 這裡結束 */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* article-page 這裡結束 */}
              </div>
              {/* section 這裡結束 */}
            </div>
          </div>
        </Layout>
      </section>
    </>
  )
}
