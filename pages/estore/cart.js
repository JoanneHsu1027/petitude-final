/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import styles from '@/styles/estore/cart.module.css'
import styles2 from '@/styles/estore/product.module.css'
import { useCart } from '@/contexts/estore/CartContext'
import { useAuth } from '@/contexts/member/auth-context'
import swal from 'sweetalert2'
import { useCart1 } from '@/contexts/funeral/CartContext1'
import LoginModal from '@/components/member/LoginModal'

export default function CartPage() {
  const router = useRouter()
  const { auth } = useAuth()

  // 商城功能
  const { cartItems, updateCartItemQuantity, removeCartItem } = useCart()

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product_price * item.qty,
    0,
  )

  const increaseItem = (id) => {
    updateCartItemQuantity(id, 1)
  }

  const decreaseItem = (id) => {
    updateCartItemQuantity(id, -1)
    const item = cartItems.find((item) => item.pk_product_id === id)
    if (item.qty - 1 === 0) {
      swal.fire('刪除!', `${item.product_name} 已被刪除!`, 'success')
    }
  }
  // 商城功能
  // 生命禮儀功能
  // 購物車設定每個項目只能買一項, 買超過一項則無法列入計算價格跟刪除
  const { cartProjects, removeCartProject } = useCart1([]) // 确保 useCart1 返回正确的值
  const [showModal, setShowModal] = useState(false)
  // 顯示方案價格加總
  const totalProjectPrice = cartProjects.reduce(
    (total, project) => total + project.project_price,
    0,
  )
  // 方案刪除
  const handleRemoveProject = (idx) => {
    const items = cartProjects.find((items) => items.project_id === idx)
    if (items) {
      swal.fire('刪除!', `${items.project_name} 已被刪除!`, 'success')
      // 更新 cartProjects 的狀態
      removeCartProject(idx) // 用 removeCartProject 来刪除項目
    }
  }
  // 生命禮儀功能

  return (
    <Layout>
      <main className={`flex-shrink-0 pt-5 ${styles.full}`}>
        <div className="container d-flex justify-content-center">
          <h1 className={styles.title}>購物車</h1>
        </div>
        <div className="container-fluid p-0">
          <ul
            className={`nav nav-pills justify-content-center mb-5 w-100 ${styles2.bookmark}`}
            id="myTab"
            role="tablist"
          >
            <li className={`nav-item ${styles.name1}`} role="presentation">
              <button
                className={`nav-link active nav-btn fs-4 ${styles.name3}`}
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#s1"
                type="button"
                role="tab"
                aria-controls="s1"
                aria-selected="true"
                style={{ backgroundColor: '#CFE7B1' }}
              >
                網路商城
              </button>
            </li>
            <li className={`nav-item ${styles.name1}`} role="presentation">
              <button
                className={`nav-link nav-btn fs-4 ${styles.name3}`}
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
                生前契約
              </button>
            </li>
          </ul>

          <div
            className="tab-content"
            id="myTabContent"
            style={{
              marginBottom: 48 + 'px',
            }}
          >
            {/* 網路商城 start */}
            <div
              className="tab-pane fade show active fs-5"
              id="s1"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div>
                <div
                  className={`container-fluid d-flex justify-content-center ${styles.alldetail}`}
                >
                  <div className={`col-12 ${styles.cartdetail}`}>
                    <div className={`row ${styles.cartName}`}>
                      <div
                        className="col-12 text-center"
                        style={{ color: '#6A513D' }}
                      >
                        <p className="fs-2">購物車</p>
                      </div>
                    </div>
                    {/* <!-- 商品區 --> */}
                    {/* <!-- 細項 --> */}
                    {cartItems.map((r, i) => {
                      return (
                        <div key={r.pk_product_id}>
                          <div className="d-none d-md-block">
                            {/* <!-- Desktop layout --> */}
                            <div className="row align-items-center bd-highlight mb-3">
                              <div
                                className="col-3 col-md-3"
                                style={{ width: 'auto' }}
                              >
                                <img
                                  src={`http://localhost:3001/estore/A${r.pk_product_id}.png`}
                                  alt="..."
                                  className={styles.productImage}
                                />
                              </div>
                              <div
                                className="col-6 col-md-4"
                                style={{ width: 'auto' }}
                              >
                                <div className={`${styles.productName} fs-4`}>
                                  {r.product_name}
                                </div>
                              </div>
                              <div
                                className="col-3 col-md-3"
                                style={{ width: 'auto' }}
                              >
                                <div className="input-group justify-content-center">
                                  <div className="input-group-prepend">
                                    <button
                                      className={`btn ${styles.quantitySelector1}`}
                                      onClick={() => {
                                        decreaseItem(r.pk_product_id)
                                      }}
                                    >
                                      -
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    className={`form-control text-center readOnly ${styles.quantity}`}
                                    value={r.qty}
                                    style={{ maxWidth: 40 + 'px' }}
                                  />
                                  <div className="input-group-append">
                                    <button
                                      className={`btn ${styles.quantitySelector2}`}
                                      onClick={() => {
                                        increaseItem(r.pk_product_id)
                                      }}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div
                                className={`col-12 col-md-2 ${styles.cash} ms-auto w-auto`}
                                style={{ paddingLeft: 0 + 'px' }}
                              >
                                <div className={styles.productPrice}>
                                  <p className="fs-4 text-end m-0">
                                    $ {r.product_price * r.qty}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <!-- Mobile layout --> */}
                          <div className="d-md-none">
                            <div className="row align-items-center mb-3">
                              <div className="col-3">
                                <img
                                  src={`http://localhost:3001/estore/A${r.pk_product_id}.png`}
                                  alt="..."
                                  className={styles.productImage}
                                />
                              </div>
                              <div className="col-9">
                                <div className="row">
                                  <div className="col-12">
                                    <div className={styles.productName}>
                                      {r.product_name}
                                    </div>
                                  </div>
                                  <div
                                    className={`col-12 ${styles.quantityPriceContainer} mt-2`}
                                  >
                                    <div className="input-group justify-content-start w-auto">
                                      <div className="input-group-prepend">
                                        <button
                                          className={`btn ${styles.quantitySelector1}`}
                                          onClick={() =>
                                            decreaseItem(r.pk_product_id)
                                          }
                                        >
                                          -
                                        </button>
                                      </div>
                                      <input
                                        type="text"
                                        className={`form-control text-center ${styles.quantity}`}
                                        value={r.qty}
                                        style={{ maxWidth: 40 + 'px' }}
                                      />
                                      <div className="input-group-append">
                                        <button
                                          className={`btn ${styles.quantitySelector2}`}
                                          onClick={() =>
                                            increaseItem(r.pk_product_id)
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                    <div className={styles.productPrice}>
                                      $ {r.product_price * r.qty}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    {/* <!-- 細項 --> */}
                    {/* <!-- 商品區 --> */}
                    <hr className={styles.line} />
                    <div className="row">
                      <div className={`col-12 ${styles.total}`}>
                        <p className="fs-4">總價</p>
                      </div>
                      <div className={`col-12 ${styles.total}`}>
                        <p className="fs-4">$ {totalPrice}</p>
                      </div>
                      <div className={`col-12 ${styles.total2}`}>
                        <button
                          type="button"
                          className={`btn ${styles.checkBtn}`}
                          onClick={() => {
                            if (!auth.b2c_id) {
                              swal.fire({
                                text: '請先登入會員！',
                                icon: 'error',
                              })
                            } else {
                              router.push('/estore/booking-list')
                            }
                          }}
                        >
                          前往結帳
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 網路商城 end */}

            {/* 生前契約 start */}
            <div
              className="tab-pane fade show active fs-5"
              id="s2"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div
                className={`container-fluid d-flex justify-content-center ${styles.alldetail}`}
              >
                <div className={`col-12 ${styles.cartdetail}`}>
                  <div className={`row ${styles.cartName}`}>
                    <div
                      className="col-12 text-center"
                      style={{ color: '#6A513D' }}
                    >
                      <p className="fs-2">生前契約購物車</p>
                    </div>
                  </div>
                  {/* 方案區 */}
                  {cartProjects.map((project, i) => (
                    <div key={project.project_id}>
                      <div className="d-none d-md-block">
                        {/* Desktop layout */}
                        <div className="row align-items-center bd-highlight mb-3">
                          <div
                            className="col-3 col-md-3"
                            style={{ width: 'auto' }}
                          >
                            <img
                              src={`http://localhost:3001//project/${project.project_id}.png`}
                              alt="..."
                              className={styles.projectImage}
                            />
                          </div>
                          <div
                            className="col-6 col-md-4"
                            style={{ width: 'auto' }}
                          >
                            <div className={`${styles.productName} fs-4`}>
                              {project.project_name}
                            </div>
                          </div>
                          <div
                            className={`col-12 col-md-3 ${styles.cash} ms-auto`}
                          >
                            <div className={styles.productPrice}>
                              <p className="fs-4 text-end m-0">
                                $ {project.project_price}
                              </p>
                            </div>
                          </div>

                          <div className={`col-2 ${styles.btnArea}`}>
                            <button
                              className={`btn ${styles.btn}`}
                              onClick={() =>
                                handleRemoveProject(project.project_id)
                              }
                            >
                              刪除
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-md-none">
                        {/* Mobile layout */}
                        <div className="row align-items-center mb-3">
                          <div className="col-3">
                            <img
                              src={`http://localhost:3001//project/${project.project_id}.png`}
                              alt="..."
                              className={styles.projectImage}
                            />
                          </div>
                          <div className="col-6 ps-5">
                            <div className="row">
                              <div className="col-12">
                                <div className={styles.productName}>
                                  {project.project_name}
                                </div>
                              </div>
                              <div
                                className={`col-12 ${styles.quantityPriceContainer} mt-2`}
                              >
                                <div className={styles.productPrice}>
                                  ${project.project_price}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={`col-3 ${styles.btnArea}`}>
                            <button
                              className={`btn btn-sm ${styles.btn}`}
                              onClick={() =>
                                handleRemoveProject(project.project_id)
                              }
                            >
                              刪除
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <hr className={styles.line} />
                  <div className="row">
                    <div className={`col-12 ${styles.total}`}>
                      <p className="fs-4">總價</p>
                    </div>
                    <div className={`col-12 ${styles.total}`}>
                      <p className="fs-4">${totalProjectPrice}</p>
                    </div>
                    <div className={`col-12 ${styles.total}`}>
                      <button
                        type="button"
                        className={`btn ${styles.checkBtn}`}
                        onClick={() => {
                          if (!auth.b2c_id) {
                            swal
                              .fire({
                                text: '請先登入會員！',
                                icon: 'error',
                              })
                              .then(() => {
                                setShowModal(true) // 在警告框關閉後顯示登入視窗
                              })
                          } else {
                            router.push('/funeral/funeral/booking-list')
                          }
                        }}
                      >
                        前往結帳
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 生前契約 end */}
          </div>
        </div>
      </main>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </Layout>
  )
}
