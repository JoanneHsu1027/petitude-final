import React from 'react'
import styles from '../../styles/platforum/platforum-style.module.css'
import { BsFillTriangleFill } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import Link from 'next/link'

export default function SideBarPc() {
  return (
    <>
      <div className="col-xl-3 d-lg-none d-xl-block d-md-none d-lg-block d-sm-none d-md-block d-none d-sm-block mb-0">
        <div
          className={`bg-white ${styles.W10} ${styles.Rounded5} ${styles.H70} px-3 pt-4 position-fixed d-flex flex-column justify-content-between`}
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
              href="../../platforum/class-list"
              type="button"
              className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} btn btn-outline-dark mb-2`}
            >
              主題分類
            </Link>
            <Link
              href=""
              type="button"
              className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} btn btn-outline-dark mb-2`}
            >
              熱門討論
            </Link>
            <Link
              href="../../platforum/article-list"
              type="button"
              className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} btn btn-outline-dark mb-2`}
            >
              最新文章
            </Link>
            <Link
              href=""
              type="button"
              className={`${styles.AReset} ${styles.BorderCoffee} ${styles.BtnHover} btn btn-outline-dark mb-2`}
            >
              文章收藏
            </Link>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Link
              className={`${styles.AReset} ${styles.GoTopBtn} mb-2`}
              href="#"
            >
              Go Top <BsFillTriangleFill />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
