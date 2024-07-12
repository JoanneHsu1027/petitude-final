import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/platform/platform-style.module.css'
import { BsFillTriangleFill, BsSearch } from 'react-icons/bs'
import Link from 'next/link'

export default function SideBarPc() {
  const router = useRouter()
  const [activeLink, setActiveLink] = useState('')
  const [sidebarOffset, setSidebarOffset] = useState(150) // 设置初始偏移量为 300px

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

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.outerHeight + window.scrollY >= document.body.offsetHeight
      setSidebarOffset(isBottom ? -15 : 150) // 滚动到底部时向上移动 100px
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="col-xl-3 d-none d-xl-block mb-0">
      <div
        className={`bg-white ${styles.W10} ${styles.Rounded5} ${styles.H70} px-3 pt-4 position-fixed d-flex flex-column justify-content-between`}
        style={{ top: `${sidebarOffset}px`, transition: 'top 0.3s ease' }}
      >
        <div className="d-flex flex-column">
          <form className="d-flex mb-5">
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
              <BsSearch />
            </button>
          </form>
          <Link
            href="/platform"
            type="button"
            className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} ${activeLink === '' ? styles.PageSelect : ''} btn btn-outline-dark mb-2`}
          >
            論壇首頁
          </Link>
          <Link
            href="/platform/class-list"
            type="button"
            className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} ${activeLink === 'class-list' ? styles.PageSelect : ''} btn btn-outline-dark mb-2`}
          >
            主題分類
          </Link>
          <Link
            href="/platform/article-list"
            type="button"
            className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} ${activeLink === 'article-list' ? styles.PageSelect : ''} btn btn-outline-dark mb-2`}
          >
            最新文章
          </Link>
          <Link
            href="/platform/favorites"
            type="button"
            className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} ${activeLink === 'favorites' ? styles.PageSelect : ''} btn btn-outline-dark mb-2`}
          >
            文章收藏
          </Link>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <a className={`${styles.AReset} ${styles.GoTopBtn} mb-2`} href="#">
            Go Top <BsFillTriangleFill />
          </a>
        </div>
      </div>
    </div>
  )
}
