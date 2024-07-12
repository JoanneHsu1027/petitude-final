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

export default function ProjectList() {
  const router = useRouter()
  const [data, setData] = useState({
    success: false,
    rows: [],
    page: 1,
    totalPages: 1,
  })

  useEffect(() => {
    const fetchData = async () => {
      const page = router.query.page || 1
      const keyword = ''
      try {
        const res = await fetch(`${ProductList}?page=${page}`)
        const myData = await res.json()
        console.log(myData)
        setData(myData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }

      const searchKeyword = new URLSearchParams(keyword)

      const res = await axios.get(`${ProductList}?${searchKeyword.toString()}`)
    }
    fetchData()
  }, [router.query])

  // console.log('render-----------------')

  return (
    <Layout title="商品列表" pageName="index">
      <main className={`flex-shrink-0 pt-5 ${styles.full}`}>
        <div
          className="container-fluid list"
          style={{ padding: 0 + 'px ' + ' ' + 60 + 'px' }}
        >
          <div className="row">
            {/* <!-- side-bar 這裡開始 --> */}
            <SideBarPc></SideBarPc>
            <SideBarMobile></SideBarMobile>
            {/* <!-- side-bar 這裡結束 --> */}
            {/* <!-- section 這裡開始 --> */}
            <div className="col-md-9 col-12">
              {/* <!-- 商品區 --> */}
              <div className="row mt-2 pt-2 mb-1 pb-1 d-flex justify-content-start">
                {data.rows.map((r, i) => {
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
                })}
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
                  {/* <button className={`${styles.btnNav} left-btn`}>
                    <i className="bi bi-arrow-left"></i>
                  </button>
                  <div className={`${styles.pageNumbers} rounded-circle`}>
                    <button className={`${styles.btnPage} rounded-circle`}>
                      1
                    </button>
                    <button className={`${styles.btnPage} rounded-circle`}>
                      2
                    </button>
                    <button
                      className={`${styles.btnPage} ${styles.btnSelected} rounded-circle`}
                    >
                      3
                    </button>
                    <button className={`${styles.btnPage} rounded-circle`}>
                      4
                    </button>
                    <button className={`${styles.btnPage} rounded-circle`}>
                      5
                    </button>
                    <button className={`${styles.btnPage} rounded-circle`}>
                      6
                    </button>
                    <span className={styles.dots}>...</span>
                    <button className={`${styles.btnPage} rounded-circle`}>
                      23
                    </button>
                  </div>
                  <button className={`${styles.btnNav} right-btn`}>
                    <i className="bi bi-arrow-right"></i>
                  </button> */}
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
