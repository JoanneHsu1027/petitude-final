import React, { useState } from 'react'
import Layout from '@/components/layout/layout'
import styles from '../../../styles/platform/platform-style.module.css'
import SideBarPc from '@/components/platform/side-bar-pc'
import SideBarMobile from '@/components/platform/side-bar-mobile'
import ArticleBlock from '@/components/platform/article-block'
import LoginModal from '@/components/member/LoginModal'
import { useAuth } from '@/contexts/member/auth-context'
import { useRouter } from 'next/router'
import swal from 'sweetalert2'

export default function ArticleList() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const { auth } = useAuth()
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword)
  }

  return (
    <>
      <section className={`${styles.BgImg}`}>
        <Layout title="貓狗論壇" pageName="pet-insurance">
          <div className="container mb-5">
            <div className="row">
              <SideBarPc onSearch={handleSearch} />
              <div className="col-xl-9 col-lg-12">
                <div
                  className={`container card my-3 ${styles.Rounded5} border-0 h-100`}
                >
                  <div className="row">
                    <div className="col-lg-12 col-md-12 d-flex flex-column m-1">
                      <SideBarMobile onSearch={handleSearch} />
                      <button
                        onClick={() => {
                          if (!auth.b2c_id) {
                            swal
                              .fire({
                                text: '請先登入會員！',
                                icon: 'error',
                              })
                              .then(() => {
                                setShowModal(true) // 在警告框關閉後顯示登入視窗
                              })
                          } else {
                            router.push('./create-article')
                          }
                        }}
                        className={`${styles.BtnReset} d-flex  flex-row-reverse me-2`}
                      >
                        <h5 className={`${styles.CreatArticle} me-3 fw-bold`}>
                          + 建立文章
                        </h5>
                      </button>
                      <ArticleBlock keyword={searchKeyword} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </section>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  )
}
