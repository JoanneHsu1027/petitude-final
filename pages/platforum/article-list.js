import React from 'react'
import Layout from '@/components/layout/layout'
import styles from '../../styles/platforum/platforum-style.module.css'
import SideBarPc from '@/components/layout/side-bar-pc'
import SideBarMobile from '@/components/layout/side-bar-mobile'
import ArticleBlock from '@/components/platforum/article-block'

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
                {/* class-block 這裡開始 */}
                <div
                  className={`container card my-3 ${styles.Rounded5} border-0 h-100`}
                >
                  <div className="row">
                    <div class="col-lg-12 col-md-12 d-flex flex-column m-1">
                      <SideBarMobile></SideBarMobile>

                      <a
                        href="./creat-article.html"
                        className="AReset d-flex text-black-50 flex-row-reverse me-2"
                      >
                        <h5 className="fw-bold">+ 建立文章</h5>
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
