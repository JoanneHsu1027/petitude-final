/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import styles from '../../styles/estore/productList.module.css'
import SideBarPc from '@/components/estore/side-bar-pc'
import SideBarMobile from '@/components/estore/side-bar-mobile'
import Link from 'next/link'
import { ProductList } from '@/configs/estore/api-path'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles2 from '@/styles/estore/side-bar-style.module.css'
import { BsFillTriangleFill } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import styles3 from '@/styles/platform/platform-style.module.css'

export default function ProjectList() {
  const router = useRouter()
  const [data, setData] = useState({
    success: false,
    rows: [],
    page: 1,
    totalPages: 1,
  })

  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('')

  const fetchData = async () => {
    const page = router.query.page || 1
    try {
      setData((prevData) => ({ ...prevData, success: false }))
      const res = await axios.get(ProductList, {
        params: {
          page: page,
          keyword: searchTerm,
          category: category,
        },
      })
      const myData = res.data
      console.log('Received data:', myData)
      if (myData.success) {
        setData(myData)
      } else {
        console.error('API request was not successful:', myData)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
      if (error.response) {
        console.error('Response data:', error.response.data)
        console.error('Response status:', error.response.status)
      }
      setData((prevData) => ({ ...prevData, success: false }))
    }
  }

  useEffect(() => {
    if (router.isReady) {
      const queryKeyword = router.query.keyword
      const queryCategory = router.query.category
      if (queryKeyword) {
        setSearchKeyword(queryKeyword)
        setSearchTerm(queryKeyword)
      }
      if (queryCategory) {
        setCategory(queryCategory)
      }
      fetchData()
    }
  }, [router.isReady, router.query])

  useEffect(() => {
    if (router.isReady) {
      fetchData()
    }
  }, [category, searchTerm, router.query.page])

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory)
    router.push({
      pathname: router.pathname,
      query: { ...router.query, category: selectedCategory, page: 1 },
    })
  }

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setSearchTerm(searchKeyword)
    router.push({
      pathname: router.pathname,
      query: { ...router.query, keyword: searchKeyword, page: 1 },
    })
  }

  return (
    <Layout title="商品列表" pageName="index">
      <main className={`flex-shrink-0 pt-5 ${styles.full}`}>
        <div
          className="container-fluid list"
          style={{ padding: 0 + 'px ' + ' ' + 60 + 'px' }}
        >
          <div className="row">
            {/* <!-- side-bar 这里开始 --> */}
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
                    />
                    <button
                      className={`${styles2.BorderStartDel} btn btn-outline-success border-start-0`}
                      type="submit"
                    >
                      <BsSearch />
                    </button>
                  </form>
                  <Link
                    href="/estore"
                    type="button"
                    className={`${styles2.AReset} ${styles2.BorderCoffee} ${styles2.BtnHover} btn btn-outline-dark mb-2`}
                  >
                    全部產品
                  </Link>
                  <button
                    type="submit"
                    category="dog"
                    className={`${styles2.AReset} ${styles2.BorderCoffee} ${styles2.BtnHover} btn btn-outline-dark mb-2`}
                    onClick={() => handleCategoryClick('dog')}
                  >
                    犬類食品
                  </button>
                  <button
                    type="submit"
                    category="cat"
                    className={`${styles2.AReset} ${styles2.BorderCoffee} ${styles2.BtnHover} btn btn-outline-dark mb-2`}
                    onClick={() => handleCategoryClick('cat')}
                  >
                    貓類食品
                  </button>
                  <button
                    type="submit"
                    category="adult"
                    className={`${styles2.AReset} ${styles2.BorderCoffee} ${styles2.BtnHover} btn btn-outline-dark mb-2`}
                    onClick={() => handleCategoryClick('adult')}
                  >
                    成貓成犬
                  </button>
                  <button
                    type="submit"
                    category="young"
                    className={`${styles2.AReset} ${styles2.BorderCoffee} ${styles2.BtnHover} btn btn-outline-dark mb-2`}
                    onClick={() => handleCategoryClick('young')}
                  >
                    幼貓幼犬
                  </button>
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
            {/* 手機版 */}
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
                  className={`${styles3.BorderEndDel} form-control border-success border-end-0`}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="keyword"
                  value={searchKeyword}
                  onChange={handleSearchInputChange}
                />
                <button
                  className={`${styles3.BorderStartDel} btn btn-outline-success border-start-0`}
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
                  href=""
                  type="button"
                  className={`${styles3.AReset} p-3 text-black ${styles3.MobileBtnHover}`}
                >
                  全部商品
                </Link>
                <Link
                  href=""
                  type="button"
                  className={`${styles3.AReset} p-3 text-black ${styles3.MobileBtnHover}`}
                  category="dog"
                  onClick={() => handleCategoryClick('dog')}
                >
                  犬類食品
                </Link>

                <Link
                  href=""
                  type="button"
                  className={`${styles3.AReset} p-3 text-black ${styles3.MobileBtnHover}`}
                  category="cat"
                  onClick={() => handleCategoryClick('cat')}
                >
                  貓類食品
                </Link>
                <Link
                  href=""
                  type="button"
                  className={`${styles3.AReset} p-3 text-black ${styles3.MobileBtnHover}`}
                  category="adult"
                  onClick={() => handleCategoryClick('adult')}
                >
                  成貓成犬
                </Link>
                <Link
                  href=""
                  type="button"
                  className={`${styles3.AReset} p-3 text-black ${styles3.MobileBtnHover}`}
                  category="young"
                  onClick={() => handleCategoryClick('young')}
                >
                  幼貓幼犬
                </Link>
              </div>
            </div>
            {/* <!-- side-bar 这里结束 --> */}
            {/* <!-- section 这里开始 --> */}
            <div className="col-md-9 col-12">
              {/* <!-- 商品区 --> */}
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
              {/* <!-- 商品区 --> */}
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
              {/* <!-- section 这里结束 --> */}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
