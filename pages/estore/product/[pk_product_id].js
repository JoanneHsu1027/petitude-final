/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Layout from '../../../components/layout/layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import styles from '../../../styles/estore/product.module.css'
import { useRouter } from 'next/router'
import { product_GET_ITEM } from '@/configs/estore/api-path'
import { useCart } from '@/contexts/estore/CartContext'

export default function Productid(addItem) {
  const router = useRouter()
  const [data, setData] = useState([])

  const { addToCart } = useCart()

  const handleAddItem = () => {
    addToCart(data)
  }

  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value))
  }

  useEffect(() => {
    if (!router.isReady) return

    fetch(`${product_GET_ITEM}/${router.query.pk_product_id}`)
      .then((r) => r.json())
      .then((myData) => {
        console.log(myData.data)
        setData(myData.data)
      })
  }, [router])

  // document.querySelectorAll('.thumbnail').forEach((item) => {
  //   item.addEventListener('click', (event) => {
  //     const mainImage = document.getElementById('mainImage')
  //     mainImage.src = item.dataset.mainImage
  //   })
  // })

  return (
    <Layout>
      <main
        className={`flex-shrink-0 mt-5 pt-5 ${styles.full}`}
        key={data.pk_product_id}
      >
        {/* <!-- 產品區 --> */}
        <div
          className={`container-fluid d-flax justify-content-center ${styles.product}`}
        >
          <div className="row m-0 d-flax justify-content-center">
            {/* <!-- 產品圖 start --> */}
            {/* <!-- 電腦版 --> */}
            <div className="d-none d-md-block col-md-5">
              <div className="row mt-3">
                <div className="col-12">
                  <img
                    id={styles.mainImage}
                    // src="/estore/圖1.jpg"
                    src={`http://localhost:3001/estore/A${data.pk_product_id}.png`}
                    alt="MainImage"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="row">
                <div className="d-none d-md-block col-md-3 mt-2 mb-3 py-1">
                  <img
                    className={styles.thumbnail}
                    src={`http://localhost:3001/estore/A${data.pk_product_id}.png`}
                    alt="Thumbnail 1"
                    data-main-image={`http://localhost:3001/estore/A${data.pk_product_id}.png`}
                  />
                </div>
                <div className="d-none d-md-block col-md-3 mt-2 mb-3 py-1">
                  <img
                    className={styles.thumbnail}
                    src={`http://localhost:3001/estore/B${data.pk_product_id}.png`}
                    alt="Thumbnail 2"
                    data-main-image={`http://localhost:3001/estore/B${data.pk_product_id}.png`}
                  />
                </div>
              </div>
            </div>
            {/* <!-- 電腦版 --> */}
            {/* <!-- 手機版 --> */}
            <div className="d-block d-md-none col-12">
              <div className="row mt-3">
                <div
                  id="carouselExampleInterval"
                  className="carousel slide carousel-container"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div
                      className="carousel-item active"
                      data-bs-interval="4000"
                    >
                      <img
                        src={`http://localhost:3001/estore/A${data.pk_product_id}.png`}
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item" data-bs-interval="4000">
                      <img
                        src={`http://localhost:3001/estore/B${data.pk_product_id}.png`}
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                  </div>

                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleInterval"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleInterval"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- 手機版 --> */}
            {/* <!-- 產品圖 end --> */}
            {/* <!-- 產品內容 start --> */}
            {/* <!-- 電腦版 --> */}
            <div className="d-none d-md-block col-md-6">
              <div className="row">
                <div className="row" style={{ marginBottom: 10 + '%' }}>
                  <div className={`fs-1 ${styles.title}`}>
                    {data.product_brand}
                  </div>
                  <div className={`fs-1 ${styles.title}`}>
                    {data.product_name}
                  </div>
                </div>
                <div
                  className="row p-0"
                  style={{ margin: 11 + 'px' + ' ' + 0 + 'px' }}
                >
                  <div
                    className="col-3"
                    style={
                      ({ width: 'auto' },
                      { padding: 0 + 'px' + ' ' + 5 + 'px' })
                    }
                  >
                    <select
                      className={styles.customSelect}
                      value={quantity}
                      onChange={handleQuantityChange}
                    >
                      <option className={styles.count} selected disabled>
                        數量
                      </option>
                      <option className={styles.count} value="1">
                        1
                      </option>
                      <option className={styles.count} value="2">
                        2
                      </option>
                      <option className={styles.count} value="3">
                        3
                      </option>
                      <option className={styles.count} value="4">
                        4
                      </option>
                      <option className={styles.count} value="5">
                        5
                      </option>
                    </select>
                  </div>
                  <div
                    className="col-3 d-flex justify-content-center"
                    style={
                      ({ width: 'auto' },
                      { padding: 0 + 'px' + ' ' + 5 + 'px' })
                    }
                  >
                    <button
                      type="button"
                      className={`btn ${styles.productBtn}`}
                      onClick={() => {
                        handleAddItem(data)
                      }}
                    >
                      加入購物車
                    </button>
                  </div>
                  <div
                    className="col-3 d-flex justify-content-center"
                    style={
                      ({ width: 'auto' },
                      { padding: 0 + 'px' + ' ' + 5 + 'px' })
                    }
                  >
                    <button
                      type="button"
                      className={`btn ${styles.productBtn}`}
                    >
                      收藏 <i className="bi bi-heart-fill"></i>
                    </button>
                  </div>
                </div>
                <div
                  className={`fs-4 ${styles.depicition}`}
                  style={({ marginTop: 12 + 'px' }, { marginBottom: 5 + 'px' })}
                >
                  $ {data.product_price}
                </div>
                <div
                  className={`fs-4 ${styles.depicition}`}
                  style={{ margin: 5 + 'px' + ' ' + 0 + 'px' }}
                >
                  規格 {data.product_specification}
                </div>
                <hr
                  className={styles.line}
                  style={{ margin: 12 + 'px' + ' ' + 0 + 'px' }}
                />
                <div className={`fs-4 ${styles.depicition2}`}>
                  {data.description_short}
                </div>
                <div
                  className={`row d-flax bd-highlight p-0 ${styles.depicition2}`}
                >
                  <div className="me-auto fs-4 col-6">特殊需求</div>
                  <div className="bd-highlight fs-4 col-6 text-end">
                    {data.special_needs}
                  </div>
                </div>
                <div
                  className={`row d-flax bd-highlight p-0 ${styles.depicition2}`}
                >
                  <div className="me-auto fs-4 col-6">口味</div>
                  <div className="bd-highlight fs-4 col-6 text-end">
                    {data.flavor}
                  </div>
                </div>
                <div
                  className={`row d-flax bd-highlight p-0 ${styles.depicition2}`}
                >
                  <div className="me-auto fs-4 col-6">生命階段</div>
                  <div className="bd-highlight fs-4 col-6 text-end">
                    {data.life_stage}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- 電腦版 --> */}
            {/* <!-- 手機版 --> */}
            <div className="d-block d-md-none col-12">
              <div className="row">
                <div className="row" style={{ marginBottom: 5 + '%' }}>
                  <div className="fs-5 title text-center">
                    {data.product_brand}
                  </div>
                  <div className="fs-2 title title text-center">
                    {data.product_name}
                  </div>
                </div>
                <div
                  className="row p-0 d-flax justify-content-center"
                  style={{ margin: 11 + 'px' + ' ' + 0 + 'px' }}
                >
                  <div className="col-3 px-1" style={{ width: 'auto' }}>
                    <select
                      className={styles.customSelect}
                      value={quantity}
                      onChange={handleQuantityChange}
                    >
                      <option className={styles.count} selected disabled>
                        {/* <i className="bi bi-caret-down-fill"></i> */}
                      </option>
                      <option className={styles.count} value="1">
                        1
                      </option>
                      <option className={styles.count} value="2">
                        2
                      </option>
                      <option className={styles.count} value="3">
                        3
                      </option>
                      <option className={styles.count} value="4">
                        4
                      </option>
                      <option className={styles.count} value="5">
                        5
                      </option>
                    </select>
                  </div>
                  <div
                    className="col-3 d-flex justify-content-center px-1"
                    style={{ width: 'auto' }}
                  >
                    <button
                      type="button"
                      className={`btn ${styles.productBtn}`}
                      onClick={() => {
                        handleAddItem(data)
                      }}
                    >
                      <i className="bi bi-bag-fill cartItem"></i>
                    </button>
                  </div>
                  <div
                    className="col-3 d-flex justify-content-center px-1"
                    style={{ width: 'auto' }}
                  >
                    <button
                      type="button"
                      className={`btn ${styles.productBtn}`}
                    >
                      <i className="bi bi-heart-fill"></i>
                    </button>
                  </div>
                </div>
                <div
                  className={`fs-5 text-center ${styles.depicition}`}
                  style={({ marginTop: 12 + 'px' }, { marginBottom: 5 + 'px' })}
                >
                  $ {data.product_price}
                </div>
                <div
                  className={`fs-5 text-center ${styles.depicition}`}
                  style={{ margin: 5 + 'px' + ' ' + 0 + 'px' }}
                >
                  規格 {data.product_specification}
                </div>
                <hr style={{ margin: 12 + 'px' + ' ' + 0 + 'px' }} />
                <div
                  className={`fs-5 ${styles.depicition}`}
                  style={({ marginTop: 5 + 'px' }, { marginBottom: 10 + 'px' })}
                >
                  {data.description_short}
                </div>
                <div
                  className={`row d-flax bd-highlight p-0 ${styles.depicition2}`}
                >
                  <div className="me-auto col-6">特殊需求</div>
                  <div className="bd-highlight col-6 text-end">
                    {data.special_needs}
                  </div>
                </div>
                <div
                  className={`row d-flax bd-highlight p-0 ${styles.depicition2}`}
                >
                  <div className="me-auto col-6">口味</div>
                  <div className="bd-highlight col-6 text-end">
                    {data.flavor}
                  </div>
                </div>
                <div
                  className={`row d-flax bd-highlight p-0 ${styles.depicition2}`}
                >
                  <div className="me-auto col-6">生命階段</div>
                  <div className="bd-highlight col-6 text-end">
                    {data.life_stage}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- 手機版 --> */}
            {/* <!-- 產品內容 end --> */}
          </div>
        </div>
        {/* <!-- 產品區 --> */}
        {/* <!-- 頁籤區 --> */}
        <div className="container-fluid p-0">
          <ul
            className={`nav nav-pills justify-content-center mb-5 w-100 ${styles.bookmark}`}
            id="myTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link active nav-btn ${styles.page}`}
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#s1"
                type="button"
                role="tab"
                aria-controls="s1"
                aria-selected="true"
                style={{ backgroundColor: '#CFE7B1' }}
              >
                主要效益
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link nav-btn ${styles.page}`}
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#s2"
                type="button"
                role="tab"
                aria-controls="s2"
                aria-selected="false"
                style={{
                  backgroundColor: '#CFE7B1',
                  borderRadius:
                    20 + 'px' + ' ' + 20 + 'px' + ' ' + 0 + 'px' + 0 + 'px',
                }}
              >
                &emsp;原料&emsp;
              </button>
            </li>
          </ul>

          <div
            className="tab-content"
            id="myTabContent"
            style={{
              padding: 0 + 'px' + ' ' + 60 + 'px',
              marginBottom: 48 + 'px',
            }}
          >
            {/* 主要效益 start */}
            <div
              className="tab-pane fade show active fs-5"
              id="s1"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div>{data.description_long}</div>
            </div>
            {/* 主要效益 end */}

            {/* 原料 start */}
            <div
              className="tab-pane fade fs-5"
              id="s2"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div>{data.raw_material}</div>
            </div>
            {/* 原料 end */}
          </div>
        </div>

        {/* <!-- 頁籤區 --> */}
      </main>
    </Layout>
  )
}
