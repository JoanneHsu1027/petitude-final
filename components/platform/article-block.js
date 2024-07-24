import React, { useEffect, useState, useRef, useCallback } from 'react'
import styles from '../../styles/platform/platform-style.module.css'
import { BsBookmarkFill, BsChatText } from 'react-icons/bs'
import moment from 'moment-timezone'
import { ARTICLE } from '@/configs/platform/api-path'

export default function ArticleBlock({ keyword }) {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()

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
  }, [keyword])

  useEffect(() => {
    if (hasMore) {
      fetch(`${ARTICLE}?keyword=${encodeURIComponent(keyword)}&page=${page}`)
        .then((r) => r.json())
        .then((myData) => {
          if (myData.rows.length === 0) {
            setHasMore(false)
          } else {
            setData((prevData) => {
              const newData = [...prevData, ...myData.rows]
              return [...new Set(newData.map((item) => item.article_id))].map(
                (id) => newData.find((item) => item.article_id === id),
              )
            })
          }
        })
        .catch((error) => console.error('Error loading articles:', error))
    }
  }, [keyword, page, hasMore])

  return (
    <>
      {data.map((r, index) => {
        const dateFormat = moment(r.article_date).format('YYYY-MM-DD')
        if (data.length === index + 1) {
          return (
            <a
              ref={lastArticleElementRef}
              key={r.article_id}
              className={`${styles.AReset}`}
              href={`../../platform/article/${r.article_id}`}
            >
              <div className="m-2 border-bottom">
                <div className="mx-2 d-flex">
                  <p className="me-3 px-1 border border-dark rounded-3">
                    {r.class_name}
                  </p>
                  <p className={`${styles.LightGray}`}>{dateFormat}</p>
                </div>
                <div className="mx-3">
                  <h2 className={`${styles.TitleOverHide} w-100 mb-3`}>
                    {r.article_name}
                  </h2>
                  <p className={`${styles.ContentOverHide} mx-2`}>
                    {r.article_content}
                  </p>
                </div>
                <div className="d-flex mx-5">
                  <p className={`me-5 ${styles.OrangeYellow}`}>
                    <BsChatText className={`mb-1`} />
                    {r.message_count}
                  </p>
                  <button
                    className={`${styles.AReset} ${styles.LightGray} ${styles.FavHover} ${styles.BtnReset} mb-3`}
                  >
                    <BsBookmarkFill className={`mb-1`} />
                    收藏
                  </button>
                </div>
              </div>
            </a>
          )
        } else {
          return (
            <a
              key={r.article_id}
              className={`${styles.AReset}`}
              href={`../../platform/article/${r.article_id}`}
            >
              <div className="m-2 border-bottom">
                <div className="mx-2 d-flex">
                  <p className="me-3 px-1 border border-dark rounded-3">
                    {r.class_name}
                  </p>
                  <p className={`${styles.LightGray}`}>{dateFormat}</p>
                </div>
                <div className="mx-3">
                  <h2 className={`${styles.TitleOverHide} w-100 mb-3`}>
                    {r.article_name}
                  </h2>
                  <p className={`${styles.ContentOverHide} mx-2`}>
                    {r.article_content}
                  </p>
                </div>
                <div className="d-flex mx-5">
                  <p className={`me-5 ${styles.OrangeYellow}`}>
                    <BsChatText className={`mb-1`} />
                    {r.message_count}
                  </p>
                  <button
                    className={`${styles.AReset} ${styles.LightGray} ${styles.FavHover} ${styles.BtnReset} mb-3`}
                  >
                    <BsBookmarkFill className={`mb-1`} />
                    收藏
                  </button>
                </div>
              </div>
            </a>
          )
        }
      })}
    </>
  )
}
