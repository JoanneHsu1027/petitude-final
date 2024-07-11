import React, { useState, useEffect } from 'react'
import styles from '@/styles/estore/side-bar-style.module.css'
import { BsFillTriangleFill } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ProductList } from '@/configs/estore/api-path'

export default function SideBarPc() {
  return (
    <>
      <div className="col-md-3 d-md-flex d-none my-4 justify-content-center">
        <div
          className={`bg-white ${styles.Rounded5} ${styles.H70} px-3 pt-4 d-flex flex-column justify-content-between`}
          style={{ width: 'auto' }}
        >
          <div className="d-flex flex-column">
            <form className="d-flex mb-5">
              <input
                className={`${styles.BorderEndDel} form-control border-success border-end-0`}
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="keyword"
              />
              <button
                className={`${styles.BorderStartDel} btn btn-outline-success border-start-0`}
                type="submit"
              >
                <BsSearch />
              </button>
            </form>
            <Link
              href="../../platform/class-list"
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
              href="../../platform/article-list"
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
