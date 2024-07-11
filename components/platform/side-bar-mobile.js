import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/platform/platform-style.module.css'
import { BsSearch } from 'react-icons/bs'
import Link from 'next/link'

export default function SideBarMobile() {
  const router = useRouter()
  const [activeLink, setActiveLink] = React.useState('')

  useEffect(() => {
    if (router.pathname.includes('class-list')) {
      setActiveLink('class-list')
    } else if (router.pathname.includes('article-list')) {
      setActiveLink('article-list')
    } else if (router.pathname.includes('hot-topics')) {
      setActiveLink('hot-topics')
    } else if (router.pathname.includes('favorites')) {
      setActiveLink('favorites')
    }
  }, [router.pathname])

  return (
    <>
      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
          overflow-x: hidden;
          overflow-y: hidden;
        }
      `}</style>
      <div className="d-flex mt-4 ms-3 ">
        <form className="d-flex mt-2 d-xl-none d-xxl-block d-xxl-none mb-3 p-0">
          <input
            className={`${styles.BorderEndDel} form-control border-success border-end-0`}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className={`${styles.BorderStartDel} btn btn-outline-success border-start-0`}
            type="submit"
          >
            <BsSearch></BsSearch>
          </button>
        </form>
      </div>
      <div
        style={{ height: 60 }}
        className="border-bottom border-dark bg-white position-sticky top-0 d-xl-none d-xxl-block d-xxl-none mb-3 p-0"
      >
        <div className={`d-flex text-nowrap overflow-scroll`}>
          <Link
            href="../../platform"
            type="button"
            className={`${styles.AReset} p-3 text-black ${activeLink === '' ? styles.MobilePageSelect : ''}`}
          >
            論壇首頁
          </Link>
          <Link
            href="../../platform/class-list"
            type="button"
            className={`${styles.AReset} p-3 text-black ${activeLink === 'class-list' ? styles.MobilePageSelect : ''}`}
          >
            主題分類
          </Link>

          <Link
            href="../../platform/article-list"
            type="button"
            className={`${styles.AReset} p-3 text-black ${activeLink === 'article-list' ? styles.MobilePageSelect : ''}`}
          >
            最新文章
          </Link>
          <Link
            href="../../platform/favorites"
            type="button"
            className={`${styles.AReset} p-3 text-black ${activeLink === 'favorites' ? styles.MobilePageSelect : ''}`}
          >
            文章收藏
          </Link>
        </div>
      </div>
    </>
  )
}
