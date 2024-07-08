import React from 'react'
import styles from '@/components/insurance/insurance.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Navbar() {
  return (
    <>
      {/* 電腦版 nav 這裡開始 */}
      <nav
        className={`navbar navbar-expand-lg navbar-light d-md-none d-lg-block d-sm-none d-md-block d-none d-sm-block ${styles['bg-image']}`}
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <div className="d-flex justify-content-center w-100">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <img src="./pi-pic/about-icon.png" alt="" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="estore">
                    <img src="./pi-pic/product-icon.png" alt="" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="insurance">
                    <img src="./pi-pic/insurance-icon.png" alt="" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="index">
                    <img src="./pi-pic/petitude-icon.png" alt="" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="funeral">
                    <img src="./pi-pic/funeral-icon.png" alt="" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="platforum">
                    <img src="./pi-pic/forum-icon.png" alt="" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="member">
                    <img src="./pi-pic/member-icon.png" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* 電腦版 nav 這裡結束 */}
      {/* 手機版 nav 這裡開始 */}
      <nav
        className={`navbar navbar-expand-lg navbar-light d-lg-none d-xl-block d-xl-none d-xxl-block d-xxl-none p-0 ${styles['bg-image']}`}
      >
        <div className="container-fluid">
          <a className="navbar-brand mx-auto" href="#">
            <img src="./pi-pic/petitude-mobile-icon.png" alt="" />
          </a>
          <button
            className="navbar-toggler p-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  關於我們
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  購物商城
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  寵物保險
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  生命禮儀
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  貓狗論壇
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  會員中心
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* 手機版 nav 這裡結束 */}
    </>
  )
}
