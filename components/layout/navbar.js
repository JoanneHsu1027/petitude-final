import React, { useState } from 'react'
import { useAuth } from '@/contexts/member/auth-context'
import { useRouter } from 'next/router'
import Modal from '@/components/member/LoginModal'
import LoginForm from '@/components/member/LoginForm'
import Link from 'next/link'
import styles from '@/components/insurance/insurance.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Navbar({ pageName = '' }) {
  const { auth, logout } = useAuth()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push('/') // Redirect to the homepage
  }

  const handleLinkClick = (e, path) => {
    if (!auth.b2c_id) {
      e.preventDefault()
      setShowModal(true)
    } else {
      router.push(path)
    }
  }

  const isActive = (page) =>
    pageName === page ? 'font-weight-bold text-primary' : ''

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700&display=swap');
        .AllFont {
          font-family: 'Noto Serif TC', serif;
          font-weight: 900;
        }

        .nav-link {
          cursor: pointer;
        }
        .nav-item .nav-link {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
      <nav
        className={`navbar navbar-expand-lg navbar-light d-md-none d-lg-block d-sm-none d-md-block d-none d-sm-block AllFont ${styles['bg-image']}`}
        style={{ backgroundColor: '#FFF5CF' }}
      >
        <div className="container-fluid AllFont">
          <div className="collapse navbar-collapse">
            <div className="d-flex justify-content-center w-100">
              <ul className="navbar-nav">
                <li className="nav-item h-auto">
                  <Link
                    className="nav-link d-flex flex-column align-items-center mt-1 mx-1"
                    href="#"
                  >
                    <img
                      src="/estore/貓背影.png"
                      alt=""
                      style={{ width: '55px' }}
                      className="m-0"
                    />
                    <span className="fs-5">關於我們</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex flex-column align-items-center mt-1 mx-1"
                    href="/estore/"
                  >
                    <img
                      src="/estore/罐罐.png"
                      alt=""
                      style={{ width: '55px' }}
                      className="m-0"
                    />
                    <span className="fs-5">寵物商城</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex flex-column align-items-center mt-1 mx-1"
                    href="/insurance/"
                  >
                    <img
                      src="/estore/保險.png"
                      alt=""
                      style={{ width: '55px' }}
                      className="m-0"
                    />
                    <span className="fs-5">寵物保險</span>
                  </Link>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <Link
                    className="nav-link p-0 d-flex align-items-center"
                    href="/"
                  >
                    <img src="/pi-pic/petitude-icon.png" alt="" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex flex-column align-items-center mt-1 mx-1"
                    href="/funeral/"
                  >
                    <img
                      src="/estore/墓碑.png"
                      alt=""
                      style={{ width: '55px' }}
                      className="m-0"
                    />
                    <span className="fs-5">生命禮儀</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex flex-column align-items-center mt-1 mx-1"
                    href="/platfrom/"
                  >
                    <img
                      src="/estore/論壇.png"
                      alt=""
                      style={{ width: '55px' }}
                      className="m-0"
                    />
                    <span className="fs-5">寵物論壇</span>
                  </Link>
                </li>
                <div>
                  <div className="d-flex position-absolute">
                    {auth.b2c_id ? (
                      <>
                        <li className="nav-item">
                          <a className="nav-link">{auth.b2c_name}</a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#/"
                            onClick={handleLogout}
                          >
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
                    <li className="nav-item">
                      <Link className="nav-link" href="/estore/cart">
                        <i className="bi bi-bag-fill cartItem"></i>
                      </Link>
                    </li>
                  </div>
                </div>
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
      {/* 手機板 */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700&display=swap');
        .AllFont {
          font-family: 'Noto Serif TC', serif;
          font-weight: 900;
        }

        .nav-link {
          cursor: pointer;
        }
      `}</style>
      <nav
        className={`navbar navbar-expand-lg navbar-light d-lg-none d-xl-block d-xl-none d-xxl-block d-xxl-none p-0 AllFont ${styles['bg-image']}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand mx-auto" href="/">
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
                <Link className="nav-link" href="/">
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
                <a
                  className="nav-link"
                  href="#"
                  onClick={(e) => handleLinkClick(e, '/member/')}
                >
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
