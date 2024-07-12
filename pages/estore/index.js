/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useCallback } from 'react'
import Layout from '../../components/layout/layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import styles from '../../styles/estore/productList.module.css'
import SideBarMobile from '@/components/estore/side-bar-mobile'
import Link from 'next/link'
import { ProductList } from '@/configs/estore/api-path'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles2 from '@/styles/estore/side-bar-style.module.css'
import { BsFillTriangleFill } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'

export default function ProjectList() {
  const router = useRouter()
  const [data, setData] = useState({
    success: false,
    rows: [],
    page: 1,
    totalPages: 1,
  })

  // 用於存儲選中的類別的狀態
  const [selectedCategories, setSelectedCategories] = useState([])
  //用來儲存關鍵字的狀態
  const [searchKeyword, setSearchKeyword] = useState('')

  const fetchData = useCallback(async () => {
    const page = router.query.page || 1
    try {
      setData((prevData) => ({ ...prevData, success: false })) // 設置加載狀態
      const res = await axios.get(`${ProductList}`, {
        params: {
          page: page,
          code_desc: selectedCategories.join('-'),
          keyword: searchKeyword,
        },
      })
      const myData = res.data
      console.log(myData)
      setData(myData)
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setData((prevData) => ({ ...prevData, success: false }))
    }
  }, [router.query, selectedCategories, searchKeyword])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // 處理類別選擇變化的函數(使用checkbox進行篩選)
  const handleCategoryChange = (code_desc, isChecked) => {
    console.log('handleCategoryChange called:', code_desc, isChecked)
    setSelectedCategories((prev) => {
      // 如果有選擇類別，就加入陣列，沒有就移除
      const newSelectedCategories = isChecked
        ? [...prev, code_desc]
        : prev.filter((cat) => cat !== code_desc)

      console.log('New selected categories:', newSelectedCategories)
      return newSelectedCategories
    })
  }

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    fetchData()
  }

  return (
    <Layout title="商品列表" pageName="index">
      <main className={`flex-shrink-0 pt-5 ${styles.full}`}>
        <div
          className="container-fluid list"
          style={{ padding: 0 + 'px ' + ' ' + 60 + 'px' }}
        >
          <div className="row">
            {/* <!-- side-bar 這裡開始 --> */}
            <div className="col-md-3 d-md-flex d-none my-4 justify-content-center">
              <div
                className={`bg-white ${styles2.Rounded5} ${styles2.H70} px-3 pt-4 d-flex flex-column justify-content-between`}
                style={{ width: 'auto' }}
              >
                <div className="d-flex flex-column">
                  <form className="d-flex mb-5" onSubmit={handleSearchSubmit}>
                    <input
                      className={`${styles2.BorderEndDel} form-control border-success border-end-0`}
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      name="keyword"
                      value={searchKeyword}
                      onChange={handleSearchInputChange}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleSearchSubmit(e)
                        }
                      }}
                    />
                    <button
                      className={`${styles2.BorderStartDel} btn btn-outline-success border-start-0`}
                      type="button"
                      onClick={handleSearchSubmit}
                    >
                      <BsSearch />
                    </button>
                  </form>
                  <Link
                    href="../../platform/class-list"
                    type="button"
                    className={`${styles2.AReset} ${styles2.BorderCoffee} ${styles2.BtnHover} btn btn-outline-dark mb-2`}
                  >
                    主題分類
                  </Link>
                  <Link
                    href=""
                    type="button"
                    className={`${styles2.AReset} ${styles2.BorderCoffee} ${styles2.BtnHover} btn btn-outline-dark mb-2`}
                  >
                    熱門討論
                  </Link>
                  <Link
                    href="../../platform/article-list"
                    type="button"
                    className={`${styles2.AReset} ${styles2.BorderCoffee} ${styles2.BtnHover} btn btn-outline-dark mb-2`}
                  >
                    最新文章
                  </Link>
                  <Link
                    href=""
                    type="button"
                    className={`${styles2.AReset} ${styles2.BorderCoffee} ${styles2.BtnHover} btn btn-outline-dark mb-2`}
                  >
                    文章收藏
                  </Link>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <Link
                    className={`${styles2.AReset} ${styles2.GoTopBtn} mb-2`}
                    href="#"
                  >
                    Go Top <BsFillTriangleFill />
                  </Link>
                </div>
              </div>
            </div>
            <style jsx>{`
              ::-webkit-scrollbar {
                display: none;
                overflow-x: hidden;
                overflow-y: hidden;
              }
            `}</style>
            <div className="d-flex mt-4 ms-3 d-md-none justify-content-center">
              <form
                className="d-flex mt-2 d-md-none mb-3 p-0 justify-content-center"
                onSubmit={handleSearchSubmit}
              >
                <input
                  className={`${styles.BorderEndDel} form-control border-success border-end-0`}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="keyword"
                  value={searchKeyword}
                  onChange={handleSearchInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSearchSubmit(e)
                    }
                  }}
                />
                <button
                  className={`${styles.BorderStartDel} btn btn-outline-success border-start-0`}
                  type="button"
                  onClick={handleSearchSubmit}
                >
                  <BsSearch></BsSearch>
                </button>
              </form>
            </div>
            <div
              style={{ height: 60 }}
              className="border-bottom border-dark bg-white top-0 d-md-none mb-3 p-0 d-flex justify-content-center"
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
            {/* <!-- side-bar 這裡結束 --> */}
            {/* <!-- section 這裡開始 --> */}
            <div className="col-md-9 col-12">
              {/* <!-- 商品區 --> */}
              <div className="row mt-2 pt-2 mb-1 pb-1 d-flex justify-content-start">
                {data.success ? (
                  data.rows.map((r, i) => {
                    return (
                      <div
                        className="col-6 col-lg-4 col-xl-3 my-2"
                        key={r.pk_product_id}
                      >
                        <Link
                          href={`/estore/product/${r.pk_product_id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <div className="card">
                            <img
                              src="/estore/狗.png"
                              className="card-img-top w-100"
                              alt="..."
                            />
                            <div className="card-body">
                              <h4 className={`card-title ${styles.textStyle}`}>
                                {r.product_name}
                              </h4>
                              <div className="row mt-5 mx-0">
                                <div className="col-9 p-0 d-flex justify-content-start align-items-center fs-4">
                                  $ {r.product_price}
                                </div>
                                <div className="col-3 p-0 d-flex justify-content-end">
                                  <button className={styles.cart}>
                                    <i className="bi bi-bag-fill cartItem"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                  })
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              {/* <!-- 商品區 --> */}
              <div className="row">
                <div className={styles.pagination}>
                  <div className={`${styles.pageNumbers} rounded-circle`}>
                    {Array(11)
                      .fill(1)
                      .map((v, i) => {
                        const p = data.page - 5 + i
                        if (p < 1 || p > data.totalPages) return null
                        return (
                          <Link
                            className={
                              data.page === p
                                ? `${styles.btnPage} active rounded-circle`
                                : `${styles.btnPage} rounded-circle`
                            }
                            href={`?page=${p}`}
                            key={p}
                            style={{
                              textDecoration: 'none',
                              verticalAlign: 'middle',
                            }}
                          >
                            {p}
                          </Link>
                        )
                      })}
                  </div>
                </div>
              </div>
              <div className="row"></div>
              {/* <!-- section 這裡結束 --> */}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
