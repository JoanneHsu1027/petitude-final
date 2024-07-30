import React from 'react'
import Layout from '@/components/layout/layout'
import styles from '../../styles/platform/platform-style.module.css'
import SideBarPc from '@/components/platform/side-bar-pc'
import NewsSection from '../../components/platform/index-page/news-section'
import LostSection from '../../components/platform/index-page/lost-section'
import ClassSection from '../../components/platform/index-page/class-section'
import { useRouter } from 'next/router'

export default function Platform() {
  const router = useRouter()
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 平滑滚动
    })
  }

  const handleSearch = (keyword) => {
    // 跳转到 ArticleList 页面并带上搜索关键字
    router.push(`/platform/article?keyword=${encodeURIComponent(keyword)}`)
  }

  return (
    <>
      <section
        className={`d-flex flex-column h-100 ${styles.BgImg} ${styles.AllFont}`}
      >
        <Layout title="貓狗論壇" pageName="platform">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-12">
                <SideBarPc onSearch={handleSearch} />
              </div>
              {/* section 這裡開始 */}
              <div className="col-xl-9 col-lg-12">
                <NewsSection />
                <LostSection />
                <ClassSection />
              </div>
              {/* section 這裡結束 */}
            </div>
          </div>
          <div className="d-flex d-xl-none d-xxl-block d-xxl-none">
            <button
              onClick={scrollToTop}
              style={{
                position: 'fixed',
                bottom: '2rem',
                right: '1.2rem',
                backgroundColor: 'transparent',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '0',
              }}
            >
              <img
                src="/forum-pic/mobile-gotop.png"
                alt="Scroll to top"
                style={{
                  width: '60px',
                  height: '60px',
                  transform: 'rotate(-20deg)',
                }}
              />
              <span
                style={{
                  fontSize: '14px',
                  color: '#bbbbbb',
                  fontWeight: '900',
                }}
              >
                Top
              </span>{' '}
            </button>
          </div>
        </Layout>
      </section>
    </>
  )
}
