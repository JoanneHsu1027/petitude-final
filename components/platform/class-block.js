import React, { useEffect, useState, useRef, useCallback } from 'react'
import styles from '../../styles/platform/platform-style.module.css'
import { BsBookmarkFill, BsChatText } from 'react-icons/bs'
import moment from 'moment-timezone'
import Swal from 'sweetalert2'
import {
  FAVORITE_ADD_POST,
  FAVORITE_CHECK,
  FAVORITE_REMOVE,
  CLASS_FILTER,
} from '@/configs/platform/api-path'
import { useAuth } from '@/contexts/member/auth-context'
import LoginModal from '@/components/member/LoginModal'

export default function ClassBlock({ classId }) {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [favorites, setFavorites] = useState([])
  const observer = useRef()
  const [showModal, setShowModal] = useState(false)
  const { auth } = useAuth()

  const lastArticleElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [hasMore],
  )

  useEffect(() => {
    setPage(1)
    setData([])
    setHasMore(true)
  }, [classId])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `${CLASS_FILTER}/${encodeURIComponent(classId)}`,
        )
        const myData = await response.json()
        if (myData.rows.length === 0) {
          setHasMore(false)
        } else {
          setData((prevData) => {
            const newData = [...prevData, ...myData.rows]
            return newData.filter(
              (item, index, self) =>
                index ===
                self.findIndex((t) => t.article_id === item.article_id),
            )
          })
        }
      } catch (error) {
        console.error('Error loading articles:', error)
      }
    }

    if (hasMore) {
      fetchArticles()
    }
  }, [classId, page, hasMore])

  const checkFavoriteStatus = async (articleId) => {
    try {
      const response = await fetch(
        `${FAVORITE_CHECK}/${auth.b2c_id}/${articleId}`,
      )
      const data = await response.json()
      if (response.ok && data.isFavorite) {
        setFavorites((prev) => [...prev, articleId])
      }
    } catch (error) {
      console.error('Error checking favorite status:', error)
    }
  }

  const handleFavoriteClick = async (e, articleId) => {
    e.preventDefault() // 防止默認行為

    if (!auth.b2c_id) {
      Swal.fire({
        text: '請先登入會員！',
        icon: 'error',
      }).then(() => {
        setShowModal(true) // 在警告框關閉後顯示登錄窗口
      })
      return
    }

    const isFavorite = favorites.includes(articleId)
    const url = isFavorite ? FAVORITE_REMOVE : FAVORITE_ADD_POST
    const method = isFavorite ? 'DELETE' : 'POST'
    const body = isFavorite ? undefined : JSON.stringify({ articleId })

    try {
      const response = await fetch(`${url}/${auth.b2c_id}/${articleId}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })

      if (response.ok) {
        if (isFavorite) {
          setFavorites((prev) => prev.filter((id) => id !== articleId))
        } else {
          setFavorites((prev) => [...prev, articleId])
        }
      }
    } catch (error) {
      console.error('Error handling favorite click:', error)
    }
  }

  useEffect(() => {
    data.forEach((article) => {
      checkFavoriteStatus(article.article_id)
    })
  }, [data])

  return (
    <>
      {data.map((r, index) => {
        if (data.length === index + 1) {
          return (
            <div
              key={r.article_id}
              ref={lastArticleElementRef}
              className={`container card mb-3 ${styles.Rounded5} border-0 ${styles.CardShadow}`}
            >
              <a
                href={`/platform/article/${r.article_id}`}
                className={`${styles.AReset}`}
              >
                <div className={`row ${styles.CardTitleFont}`}>
                  <div className={`col-lg-12 col-md-12 ${styles.LineHeightSm}`}>
                    <h3
                      className={`m-3 ${styles.TitleOverHide}`}
                      title={r.article_title}
                    >
                      {r.article_title}
                    </h3>
                  </div>
                </div>
                <div
                  className={`row ${styles.CardContentFont} ${styles.LineHeightSm}`}
                >
                  <div className="col-lg-12 col-md-12 d-flex align-items-center justify-content-between">
                    <p
                      className={`d-flex align-items-center ${styles.StripGray}`}
                    >
                      <BsChatText size={20} className="mx-2" />
                      {r.b2c_name}
                    </p>
                    <p
                      className={`d-flex align-items-center ${styles.StripGray}`}
                    >
                      {moment(r.article_create_time).format(
                        'YYYY-MM-DD HH:mm:ss',
                      )}
                    </p>
                  </div>
                </div>
              </a>
              <button
                onClick={(e) => handleFavoriteClick(e, r.article_id)}
                className={`btn ${styles.FavoriteButton}`}
              >
                {favorites.includes(r.article_id) ? (
                  <BsBookmarkFill size={20} />
                ) : (
                  <BsBookmarkFill size={20} color="#cccccc" />
                )}
              </button>
            </div>
          )
        } else {
          return (
            <div
              key={r.article_id}
              className={`container card mb-3 ${styles.Rounded5} border-0 ${styles.CardShadow}`}
            >
              <a
                href={`/platform/article/${r.article_id}`}
                className={`${styles.AReset}`}
              >
                <div className={`row ${styles.CardTitleFont}`}>
                  <div className={`col-lg-12 col-md-12 ${styles.LineHeightSm}`}>
                    <h3
                      className={`m-3 ${styles.TitleOverHide}`}
                      title={r.article_title}
                    >
                      {r.article_title}
                    </h3>
                  </div>
                </div>
                <div
                  className={`row ${styles.CardContentFont} ${styles.LineHeightSm}`}
                >
                  <div className="col-lg-12 col-md-12 d-flex align-items-center justify-content-between">
                    <p
                      className={`d-flex align-items-center ${styles.StripGray}`}
                    >
                      <BsChatText size={20} className="mx-2" />
                      {r.b2c_name}
                    </p>
                    <p
                      className={`d-flex align-items-center ${styles.StripGray}`}
                    >
                      {moment(r.article_create_time).format(
                        'YYYY-MM-DD HH:mm:ss',
                      )}
                    </p>
                  </div>
                </div>
              </a>
              <button
                onClick={(e) => handleFavoriteClick(e, r.article_id)}
                className={`btn ${styles.FavoriteButton}`}
              >
                {favorites.includes(r.article_id) ? (
                  <BsBookmarkFill size={20} />
                ) : (
                  <BsBookmarkFill size={20} color="#cccccc" />
                )}
              </button>
            </div>
          )
        }
      })}
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  )
}
