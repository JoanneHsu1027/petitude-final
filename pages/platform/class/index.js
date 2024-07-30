import React from 'react'
import Layout from '@/components/layout/layout'
import styles from '../../../styles/platform/platform-style.module.css'
import SideBarPc from '@/components/platform/side-bar-pc'
import SideBarMobile from '@/components/platform/side-bar-mobile'
import { useEffect, useState } from 'react'
import { CLASS } from '@/configs/platform/api-path'
import { useRouter } from 'next/router'
import CartIcon from '@/components/estore/carticon'
import MobileGotop from '@/components/platform/mobile-gotop'

export default function ClassList() {
  const router = useRouter()

  const handleSearch = (keyword) => {
    router.push(`/platform/article?keyword=${encodeURIComponent(keyword)}`)
  }

  const [data, setData] = useState({
    success: false,
    rows: [],
  })

  useEffect(() => {
    fetch(`${CLASS}`)
      .then((r) => r.json())
      .then((myData) => {
        console.log(myData)
        setData(myData)
      })
  }, [])

  return (
    <>
      <section className={`${styles.BgImg} ${styles.AllFont}`}>
        <Layout title="貓狗論壇" pageName="pet-insurance">
          <div className="container mb-5">
            <div className="row">
              <SideBarPc onSearch={handleSearch} />
              {/* section 這裡開始 */}
              <div className="col-xl-9 col-lg-12">
                {/* class-block 這裡開始 */}
                <div
                  className={`container card my-3 ${styles.Rounded5} border-0 h-100`}
                >
                  <SideBarMobile onSearch={handleSearch} />

                  <div className="row">
                    <div className="col-lg-12 col-md-12 d-flex flex-column align-items-center justify-content-center mt-3 mb-5">
                      {data.rows.map((r) => {
                        return (
                          <div key={r.class_id} className="border-bottom w-75">
                            <a
                              href={`/platform/class/${r.class_id}`}
                              className={`${styles.AReset} mx-5 mt-4 d-flex ${styles.Hover}`}
                              data-img="p01"
                            >
                              <h3
                                className={`${styles.TitleOverHide} ${styles.W60} flex-grow-1`}
                              >
                                {r.class_name}
                              </h3>
                              <p
                                className={`d-flex align-items-end ${styles.LightGray} d-sm-none d-md-block d-none d-sm-block`}
                              >
                                {r.article_count}篇文章
                              </p>
                            </a>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                {/* class-block 這裡結束 */}
              </div>
              {/* section 這裡結束 */}
            </div>
          </div>
          <MobileGotop />
          <CartIcon />
        </Layout>
      </section>
    </>
  )
}
