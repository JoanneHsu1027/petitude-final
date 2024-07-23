import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'
import styles from '../../../styles/platform/platform-style.module.css'
import SideBarPc from '@/components/platform/side-bar-pc'
import SideBarMobile from '@/components/platform/side-bar-mobile'
import { CLASS } from '@/configs/platform/api-path'

export default function ArticleList() {
  const router = useRouter()
  const { class_id } = router.query
  const [data, setData] = useState({
    success: false,
    rows: [],
  })

  useEffect(() => {
    if (class_id) {
      fetch(`${CLASS}/${class_id}`)
        .then((r) => r.json())
        .then((myData) => {
          console.log(myData)
          setData(myData)
        })
    }
  }, [class_id])

  return (
    <>
      <section className={`${styles.BgImg}`}>
        <Layout title="貓狗論壇" pageName="article-list">
          <div className="container mb-5">
            <div className="row">
              <SideBarPc></SideBarPc>
              {/* section 這裡開始 */}
              <div className="col-xl-9 col-lg-12">
                {/* article-block 這裡開始 */}
                <div
                  className={`container card my-3 ${styles.Rounded5} border-0 h-100`}
                >
                  <SideBarMobile></SideBarMobile>

                  <div className="row">
                    <div className="col-lg-12 col-md-12 d-flex flex-column align-items-center justify-content-center mt-3 mb-5">
                      {data.rows.map((r) => {
                        return (
                          <div
                            key={r.article_id}
                            className="border-bottom w-75"
                          >
                            <a
                              href={`/article/${r.article_id}`}
                              className={`${styles.AReset} mx-5 mt-4 d-flex ${styles.Hover}`}
                              data-img="p01"
                            >
                              <h3
                                className={`${styles.TitleOverHide} ${styles.W60} flex-grow-1`}
                              >
                                {r.article_name}
                              </h3>
                              <p
                                className={`d-flex align-items-end ${styles.LightGray} d-sm-none d-md-block d-none d-sm-block`}
                              >
                                {r.article_date}
                              </p>
                            </a>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                {/* article-block 這裡結束 */}
              </div>
              {/* section 這裡結束 */}
            </div>
          </div>
        </Layout>
      </section>
    </>
  )
}
