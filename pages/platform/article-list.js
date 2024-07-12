import React from 'react'
import Layout from '@/components/layout/layout'
import styles from '../../styles/platform/platform-style.module.css'
import SideBarPc from '@/components/platform/side-bar-pc'
import SideBarMobile from '@/components/platform/side-bar-mobile'
import ArticleBlock from '@/components/platform/article-block'

export default function ArticleList() {
  return (
    <>
      <section className={`${styles.BgImg}`}>
        <Layout title="貓狗論壇" pageName="pet-insurance">
          <div className="container mb-5">
            <div className="row">
              <SideBarPc></SideBarPc>
              {/* section 這裡開始 */}
              <div className="col-xl-9 col-lg-12">
                {/* article-list 這裡開始 */}
                <div
                  className={`container card my-3 ${styles.Rounded5} border-0 h-100`}
                >
                  <div className="row">
                    <div className="col-lg-12 col-md-12 d-flex flex-column m-1">
                      <SideBarMobile></SideBarMobile>

                      <a
                        href="./create-article"
                        className={`${styles.AReset} d-flex  flex-row-reverse me-2`}
                      >
                        <h5 className={`${styles.CreatArticle} me-3 fw-bold`}>
                          + 建立文章
                        </h5>
                      </a>
                      <ArticleBlock></ArticleBlock>
                      <ArticleBlock></ArticleBlock>
                      <ArticleBlock></ArticleBlock>
                      <ArticleBlock></ArticleBlock>
                      <ArticleBlock></ArticleBlock>
                      <ArticleBlock></ArticleBlock>
                    </div>
                  </div>
                </div>
                {/* article-list 這裡結束 */}
              </div>
              {/* section 這裡結束 */}
            </div>
          </div>
        </Layout>
      </section>
    </>
  )
}
