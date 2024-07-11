import React from 'react'
import styles from '../../styles/platform/platform-style.module.css'
import { BsSearch } from 'react-icons/bs'

export default function SideBarMobile() {
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
          <a
            href="../../platform/class-list"
            type="button"
            className={`${styles.AReset} p-3 ${styles.MobileSidebar} text-black`}
          >
            主題分類
          </a>
          <a
            href=""
            type="button"
            className={`${styles.AReset} p-3 ${styles.MobileSidebar} text-black`}
          >
            熱門討論
          </a>
          <a
            href="../../platform/article-list"
            type="button"
            className={`${styles.AReset} p-3 ${styles.MobileSidebar} text-black`}
          >
            最新文章
          </a>
          <a
            href="./favorite-article.html"
            type="button"
            className={`${styles.AReset} p-3 ${styles.MobileSidebar} text-black`}
          >
            文章收藏
          </a>
        </div>
      </div>
    </>
  )
}
