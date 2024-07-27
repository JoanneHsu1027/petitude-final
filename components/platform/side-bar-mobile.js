import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/platform/platform-style.module.css'
import { BsSearch } from 'react-icons/bs'
import Link from 'next/link'
import { useAuth } from '@/contexts/member/auth-context'
import LoginModal from '@/components/member/LoginModal'
import swal from 'sweetalert2'

export default function SideBarMobile({ onSearch }) {
  const router = useRouter()
  const [activeLink, setActiveLink] = useState('')
  const [showModal, setShowModal] = useState(false)
  const { auth } = useAuth()

  useEffect(() => {
    if (router.pathname.includes('class')) {
      setActiveLink('class')
    } else if (router.pathname.includes('article')) {
      setActiveLink('article')
    } else if (router.pathname.includes('favorite')) {
      setActiveLink('favorite')
    }
  }, [router.pathname])

  const handleSearch = (event) => {
    event.preventDefault()
    const keyword = event.target.search.value
    onSearch(keyword)
  }

  const handleFavoriteClick = (event) => {
    if (!auth.b2c_id) {
      event.preventDefault() // 防止導航
      swal
        .fire({
          text: '請先登入會員！',
          icon: 'error',
        })
        .then(() => {
          setShowModal(true) // 在警告框關閉後顯示登入視窗
        })
    }
  }

  return (
    <>
      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
          overflow-x: hidden;
          overflow-y: hidden;
        }
      `}</style>
      <div className={`d-flex mt-4 ms-3 ${styles.AllFont}`}>
        <form
          className="d-flex mt-2 d-xl-none d-xxl-block d-xxl-none mb-3 p-0"
          onSubmit={handleSearch}
        >
          <input
            className={`${styles.BorderEndDel} form-control border-success border-end-0`}
            type="search"
            name="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className={`${styles.BorderStartDel} btn btn-outline-success border-start-0`}
            type="submit"
          >
            <BsSearch />
          </button>
        </form>
      </div>
      <div
        style={{ height: 60 }}
        className={`border-bottom border-dark bg-white position-sticky top-0 d-xl-none d-xxl-block d-xxl-none mb-3 p-0 ${styles.AllFont}`}
      >
        <div className={`d-flex text-nowrap overflow-scroll`}>
          <Link
            href="../../platform"
            type="button"
            className={`${styles.AReset} p-3 text-black ${styles.MobileBtnHover} ${activeLink === '' ? styles.MobilePageSelect : ''} `}
          >
            論壇首頁
          </Link>
          <Link
            href="../../platform/class"
            type="button"
            className={`${styles.AReset} p-3 text-black ${styles.MobileBtnHover} ${activeLink === 'class' ? styles.MobilePageSelect : ''} `}
          >
            主題分類
          </Link>
          <Link
            href="../../platform/article"
            type="button"
            className={`${styles.AReset} p-3 text-black ${styles.MobileBtnHover} ${activeLink === 'article' ? styles.MobilePageSelect : ''} `}
          >
            最新文章
          </Link>
          <Link
            href="../../platform/favorite"
            type="button"
            className={`${styles.AReset} p-3 text-black ${styles.MobileBtnHover} ${activeLink === 'favorite' ? styles.MobilePageSelect : ''} `}
            onClick={handleFavoriteClick}
          >
            文章收藏
          </Link>
        </div>
      </div>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  )
}
