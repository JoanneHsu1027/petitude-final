import React, { useState } from 'react'
import styles from '@/components/insurance/insurance.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link'
import { useAuth } from '@/contexts/member/auth-context'
import { useRouter } from 'next/router'
import LoginForm from '@/components/member/LoginForm'
import Modal from '@/components/member/LoginModal'

export default function Navbar({ pageName = '' }) {
  const { auth, logout } = useAuth()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push('/') // 登出後重定向到登入頁面或首頁
  }

  const isActive = (page) =>
    pageName === page ? 'font-weight-bold text-primary' : ''
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
                  <Link className="nav-link" href="#">
                    <img src="/pi-pic/about-icon.png" alt="" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/estore/">
                    <img src="/pi-pic/product-icon.png" alt="" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/insurance/">
                    <img src="/pi-pic/insurance-icon.png" alt="" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/home">
                    <img src="/pi-pic/petitude-icon.png" alt="" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/funeral/">
                    <img src="/pi-pic/funeral-icon.png" alt="" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/platform/">
                    <img src="/pi-pic/forum-icon.png" alt="" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="member">
                    <img src="/pi-pic/member-icon.png" alt="" />
                  </Link>
                </li>
                {auth.id ? (
                  <>
                    <li className="nav-item">
                      <a className="nav-link">{auth.b2c_name}</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#/" onClick={handleLogout}>
                        登出
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <a
                      className={`nav-link ${isActive('login-jwt')}`}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setShowModal(true)
                      }}
                    >
                      登入
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm onClose={() => setShowModal(false)} />
          </Modal>
        )}
      </nav>
      {/* 電腦版 nav 這裡結束 */}

      {/* 手機版 nav 這裡開始 */}
      <nav
        className={`navbar navbar-expand-lg navbar-light d-lg-none d-xl-block d-xl-none d-xxl-block d-xxl-none p-0 ${styles['bg-image']}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand mx-auto" href="/home">
            <img src="/pi-pic/petitude-mobile-icon.png" alt="" />
          </Link>
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
                <Link className="nav-link" href="#">
                  關於我們
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/estore/">
                  購物商城
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/insurance/">
                  寵物保險
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/funeral/">
                  生命禮儀
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/platform/">
                  貓狗論壇
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  會員中心
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* 手機版 nav 這裡結束 */}
    </>
  )
}
