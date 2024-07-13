/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Layout from '@/components/layout/layout'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import styles from '../../../styles/funeral/cart.module.css'

export default function ProjectList() {
  const router = useRouter()

  return (
    <Layout>
      <main className={`flex-shrink-0 pt-5 ${styles.full}`}>
        <div className="container d-flex justify-content-center">
          <h1 className={styles.title}>購物車</h1>
        </div>
        <div className="container-fluid">
          <div
            className="row d-flex justify-content-center"
            style={{ backgroundColor: 'bisque' }}
          >
            <div className={`col-5 col-md-3 col-xl-2 ${styles.name1}`}>
              <p className={`fs-4 ${styles.name3}`}>網路商城</p>
            </div>
            <div className={`col-5 col-md-3 col-xl-2 ${styles.name2}`}>
              <p className={`fs-4 ${styles.name3}`}>生前契約</p>
            </div>
          </div>
        </div>
        {/* <!-- 生前契約 --> */}
        <div
          className={`container-fluid d-flex justify-content-center ${styles.alldetail}`}
        >
          <div className={`col-12 ${styles.cartdetail}`}>
            <div className={`row ${styles.cartName}`}>
              <div className="col-12 text-center" style={{ color: '#6A513D' }}>
                <p className="fs-2">購物車</p>
              </div>
            </div>
            {/* <!-- 方案區 --> */}
            {/* <!-- 細項 --> */}
            <div className="d-none d-md-block">
              {/* <!-- Desktop layout --> */}
              <div className="row align-items-center bd-highlight mb-3">
                <div className="col-3 col-md-3" style={{ width: 'auto' }}>
                  <img
                    src="/funeral/index_n5.png"
                    alt="..."
                    className={styles.productImage}
                  />
                </div>
                <div className="col-6 col-md-4" style={{ width: 'auto' }}>
                  <div className={`${styles.productName} fs-4`}>
                    尊榮寵物 - 個別羽化
                  </div>
                </div>
                <div className="col-3 col-md-3" style={{ width: 'auto' }}>
                  <div className="input-group justify-content-center">
                    <div className="input-group-prepend">
                      <button className={`btn ${styles.quantitySelector1}`}>
                        -
                      </button>
                    </div>
                    <input
                      type="text"
                      className={`form-control text-center ${styles.quantity}`}
                      value="1"
                      style={{ maxWidth: 40 + 'px' }}
                    />
                    <div className="input-group-append">
                      <button className={`btn ${styles.quantitySelector2}`}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className={`col-12 col-md-3 ${styles.cash} ms-auto`}>
                  <div className={styles.productPrice}>
                    <p className="fs-4 text-end m-0">$ 9,000</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-md-none">
              {/* <!-- Mobile layout --> */}
              <div className="row align-items-center mb-3">
                <div className="col-3">
                  <img
                    src="/funeral/index_n5.png"
                    alt="..."
                    className={styles.productImage}
                  />
                </div>
                <div className="col-9">
                  <div className="row">
                    <div className="col-12">
                      <div className={styles.productName}>
                        尊榮寵物 - 個別羽化
                      </div>
                    </div>
                    <div
                      className={`col-12 ${styles.quantityPriceContainer} mt-2`}
                    >
                      <div className="input-group justify-content-start">
                        <div className="input-group-prepend">
                          <button className={`btn ${styles.quantitySelector1}`}>
                            -
                          </button>
                        </div>
                        <input
                          type="text"
                          className={`form-control text-center ${styles.quantity}`}
                          value="1"
                          style={{ maxWidth: 40 + 'px' }}
                        />
                        <div className="input-group-append">
                          <button className={`btn ${styles.quantitySelector2}`}>
                            +
                          </button>
                        </div>
                      </div>
                      <div className={styles.productPrice}>$9,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- 細項 --> */}
            {/* <!-- 方案區 --> */}
            <hr className={styles.line} />
            <div className="row">
              <div className={`col-12 ${styles.total}`}>
                <p className="fs-4">總價</p>
              </div>
              <div className={`col-12 ${styles.total}`}>
                <p className="fs-4">$9,000</p>
              </div>
              <div className={`col-12 ${styles.total2}`}>
                <button
                  type="button"
                  className={`btn ${styles.checkBtn}`}
                  onClick={() => router.push('/funeral/funeral/booking-list')} // 替换为您的目标路径
                >
                  前往結帳
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- 生前契約 --> */}
      </main>
    </Layout>
  )
}
