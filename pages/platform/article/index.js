import React, { useState, useEffect } from 'react'
import Layout from '@/components/layout/layout'
import styles from '../../../styles/platform/platform-style.module.css'
import SideBarPc from '@/components/platform/side-bar-pc'
import SideBarMobile from '@/components/platform/side-bar-mobile'
import ArticleBlock from '@/components/platform/article-block'
import LoginModal from '@/components/member/LoginModal'
import { useAuth } from '@/contexts/member/auth-context'
import { useRouter } from 'next/router'
import swal from 'sweetalert2'
import MobileGotop from '@/components/platform/mobile-gotop'
import CartIcon from '@/components/estore/carticon'

export default function ArticleList() {
  const router = useRouter()
  const { auth } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState(router.query.keyword || '')

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword)
    router.push(`/platform/article?keyword=${encodeURIComponent(keyword)}`)
  }

  useEffect(() => {
    // 从 URL 查询参数中获取搜索关键字
    if (router.query.keyword) {
      setSearchKeyword(router.query.keyword)
    }
  }, [router.query.keyword])

  const handleCreateArticle = () => {
    if (!auth.b2c_id) {
      swal
        .fire({
          text: '請先登入會員！',
          icon: 'error',
        })
        .then(() => {
          setShowModal(true) // 在警告框关闭后显示登录窗口
        })
    } else {
      router.push('/platform/article/create') // 确保路径正确
    }
  }

  return (
    <>
      <section className={`${styles.BgImg} ${styles.AllFont}`}>
        <Layout title="貓狗論壇" pageName="article-list">
          <div className="container mb-5">
            <div className="row">
              <div className="col-xl-3 col-lg-12">
                <SideBarPc onSearch={handleSearch} />
              </div>
              <div className="col-xl-9 col-lg-12">
                <div
                  className={`container card my-3 ${styles.Rounded5} border-0 h-100`}
                >
                  <div className="row">
                    <div
                      style={{ minHeight: '80vh' }}
                      className="col-lg-12 col-md-12 d-flex flex-column m-1"
                    >
                      <SideBarMobile onSearch={handleSearch} />
                      <button
                        onClick={handleCreateArticle}
                        className={`${styles.BtnReset} d-flex flex-row-reverse me-2`}
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
          <MobileGotop />
          <CartIcon />
        </Layout>
      </section>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  )
}
