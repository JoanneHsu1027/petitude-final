import React, { useState, useEffect } from 'react'
import styles from '@/components/insurance/insurance.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '@/contexts/member/auth-context'
import { useRouter } from 'next/router'
import LoginForm from '@/components/member/LoginForm'
import Modal from '@/components/member/LoginModal'
import Link from 'next/link'

export default function Navbar({ pageName = '' }) {
  const { auth, logout } = useAuth()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Log auth to check if it updates
    console.log('Current auth state:', auth)
  }, [auth])

  const handleLogout = async () => {
    await logout()
    router.push('/') // Redirect to the login page or homepage
  }

  const isActive = (page) =>
    pageName === page ? 'font-weight-bold text-primary' : ''

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light d-md-none d-lg-block d-sm-none d-md-block d-none d-sm-block ${styles['bg-image']}`}
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <div className="d-flex justify-content-center w-100">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link href="#" legacyBehavior>
                    <a className="nav-link">
                      <img src="./pi-pic/about-icon.png" alt="" />
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="estore" legacyBehavior>
                    <a className="nav-link">
                      <img src="./pi-pic/product-icon.png" alt="" />
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="insurance" legacyBehavior>
                    <a className="nav-link">
                      <img src="./pi-pic/insurance-icon.png" alt="" />
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/" legacyBehavior>
                    <a className="nav-link">
                      <img src="./pi-pic/petitude-icon.png" alt="" />
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="funeral" legacyBehavior>
                    <a className="nav-link">
                      <img src="./pi-pic/funeral-icon.png" alt="" />
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="platforum" legacyBehavior>
                    <a className="nav-link">
                      <img src="./pi-pic/forum-icon.png" alt="" />
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="member" legacyBehavior>
                    <a className="nav-link">
                      <img src="./pi-pic/member-icon.png" alt="" />
                    </a>
                  </Link>
                </li>
                {auth.b2c_id ? (
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
              {auth.b2c_id ? (
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
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm onClose={() => setShowModal(false)} />
          </Modal>
        )}
      </nav>
    </>
  )
}
