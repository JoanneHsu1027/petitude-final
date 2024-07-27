import React from 'react'
import Layout from '@/components/layout/layout'
import styles from '../../../styles/platform/platform-style.module.css'
import SideBarPc from '@/components/platform/side-bar-pc'
import SideBarMobile from '@/components/platform/side-bar-mobile'
import FavoriteBlock from '@/components/platform/favorite-block'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

export default function FavoriteList() {
  const router = useRouter()
  const [searchKeyword, setSearchKeyword] = useState(router.query.keyword || '')

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword)
    router.push(`/platform/article?keyword=${encodeURIComponent(keyword)}`)
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
                    <div className="col-lg-12 col-md-12 d-flex flex-column m-1">
                      <SideBarMobile onSearch={handleSearch} />

                      <FavoriteBlock keyword={searchKeyword} />
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
