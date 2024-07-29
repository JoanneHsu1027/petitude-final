import React, { useState } from 'react'
import Layout from '@/components/layout/layout'
import styles from '../../../styles/platform/platform-style.module.css'
import SideBarPc from '@/components/platform/side-bar-pc'
import SideBarMobile from '@/components/platform/side-bar-mobile'
import FavoriteBlock from '@/components/platform/favorite-block'
import { useRouter } from 'next/router'

export default function FavoriteList() {
  const [activeTab, setActiveTab] = useState('tab1')
  const router = useRouter()
  const [searchKeyword, setSearchKeyword] = useState(router.query.keyword || '')

  const handleTabClick = (event) => {
    event.preventDefault()
    const targetTab = event.currentTarget.getAttribute('data-target')
    setActiveTab(targetTab)
  }

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword)
    router.push(`/platform/article?keyword=${encodeURIComponent(keyword)}`)
  }

  return (
    <>
      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
          overflow-x: hidden;
          overflow-y: hidden;
        }
      `}</style>
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
                      <div className="mx-5 mt-4 pt-2">
                        <nav
                          className={`border-bottom d-flex text-nowrap overflow-scroll`}
                        >
                          <a
                            className={`py-3 px-3 ${styles.AReset} nav-change nav-link ${activeTab === 'tab1' ? styles.MyActive : ''} text-black`}
                            href="#"
                            onClick={handleTabClick}
                            data-target="tab1"
                          >
                            收藏文章
                          </a>
                          <a
                            className={`py-3 px-3 ${styles.AReset} nav-change nav-link ${activeTab === 'tab2' ? styles.MyActive : ''} text-black`}
                            href="#"
                            onClick={handleTabClick}
                            data-target="tab2"
                          >
                            我的文章
                          </a>
                        </nav>
                      </div>
                      <div className="mt-2 mb-4 mx-2">
                        <div
                          id="tab1"
                          className={`content-change tab-content ${activeTab === 'tab1' ? 'd-block' : 'd-none'}`}
                        >
                          <FavoriteBlock keyword={searchKeyword} />
                        </div>
                        <div
                          id="tab2"
                          className={`content-change tab-content ${activeTab === 'tab2' ? 'd-block' : 'd-none'}`}
                        >
                          <FavoriteBlock keyword={searchKeyword} />
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
