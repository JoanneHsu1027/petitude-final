import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout/layout'
import styles from '../../../styles/platform/platform-style.module.css'
import SideBarPc from '@/components/platform/side-bar-pc'
import {
  BsChevronLeft,
  BsFillPencilFill,
  BsBookmarkFill,
  BsFillShareFill,
} from 'react-icons/bs'
import { useRouter } from 'next/router'
import { ARTICLE_PAGE } from '@/configs/platform/api-path'
import moment from 'moment-timezone'

export default function ArticleId() {
  const router = useRouter()
  const [articleData, setArticleData] = useState({})
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (!router.isReady) return

    fetch(`${ARTICLE_PAGE}/${router.query.article_id}`)
      .then((r) => r.json())
      .then((myData) => {
        console.log(myData)
        setArticleData(myData.article)
        setMessages(myData.messages)
      })
      .catch((error) => {
        console.error('Error fetching article:', error)
      })
  }, [router])

  return (
    <>
      <section className={`${styles.BgImg}`}>
        <Layout title={articleData.article_name} pageName="platform">
          <div className="container mb-5">
            <div className="row">
              <SideBarPc></SideBarPc>
              <div className="col-xl-9 col-lg-12">
                <div
                  className={`container card my-1 ${styles.Rounded5} border-0 h-100 px-3`}
                >
                  <div className="row">
                    <div className="col-lg-12 col-md-12 d-flex flex-column justify-content-center mt-4">
                      {/* 返回按鈕 */}
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          top: '240px',
                          left: '12px',
                        }}
                        className="border rounded bg-white d-flex justify-content-center align-items-center position-fixed d-xl-none d-xxl-block d-xxl-none"
                      >
                        <a className={`${styles.AReset}`} href="../article">
                          <BsChevronLeft></BsChevronLeft>
                        </a>
                      </div>

                      {/* 文章內容 */}
                      <div>
                        <section>
                          <div className="border-bottom border-secondary mt-3 mx-2">
                            <h2 className="ms-2">{articleData.article_name}</h2>
                            <div className="d-flex me-3 ms-2">
                              <div className="m-2 d-flex flex-grow-1 word-wrap">
                                <a className={`${styles.AReset}`} href="">
                                  <p className="border border-dark rounded-3 me-2 word-wrap">
                                    {articleData.class_name}
                                  </p>
                                </a>
                                <p className="me-1 word-wrap">
                                  {articleData.article_date}
                                </p>
                              </div>
                              <a
                                href={`../edit-article/${router.query.article_id}`}
                                className={`${styles.AReset} ${styles.LightGray}`}
                              >
                                <BsFillPencilFill
                                  className={`mb-1`}
                                ></BsFillPencilFill>
                                編輯
                              </a>
                            </div>
                          </div>

                          {/* 主內容 */}
                          <div className="mx-4 my-4">
                            <p>{articleData.article_content}</p>
                          </div>

                          {/* 功能連結 */}
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

                        {/* 留言區塊 */}
                        <section>
                          {messages.length > 0 ? (
                            messages.map((message) => {
                              const dateFormat = moment(
                                message.message_date,
                              ).format('YYYY-MM-DD HH:MM')
                              return (
                                <>
                                  <div
                                    key={message.message_id}
                                    className="d-flex border-bottom mt-4 mb-2 mx-1 px-2"
                                  >
                                    <div className="mx-2">
                                      <img src="/forum-pic/avatar.png" alt="" />
                                    </div>
                                    <div className="flex-grow-1 me-2">
                                      <p>{message.b2c_name}</p>
                                      <p>{message.message_content}</p>
                                      <div className="d-flex ms-4">
                                        <p className="me-4">{dateFormat}</p>
                                        <a
                                          className={`${styles.AReset} ${styles.LightGray}`}
                                          href="#"
                                        >
                                          回覆
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )
                            })
                          ) : (
                            <p>目前沒有留言。</p>
                          )}
                        </section>

                        {/* 回覆留言區塊 */}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </section>
    </>
  )
}
