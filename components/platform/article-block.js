import React, { useEffect, useState } from 'react'
import styles from '../../styles/platform/platform-style.module.css'
import { BsBookmarkFill, BsChatText } from 'react-icons/bs'
import moment from 'moment-timezone'
import { ARTICLE } from '@/configs/platform/api-path'

export default function ArticleBlock({ keyword }) {
  const [data, setData] = useState({
    success: false,
    rows: [],
  })

  useEffect(() => {
    fetch(`${ARTICLE}?keyword=${encodeURIComponent(keyword)}`)
      .then((r) => r.json())
      .then((myData) => {
        setData(myData)
      })
  }, [keyword])

  return (
    <>
      {data.rows.map((r) => {
        const dateFormat = moment(r.article_date).format('YYYY-MM-DD')
        return (
          <a
            key={r.article_id}
            className={`${styles.AReset}`}
            href={`../../platform/article/${r.article_id}`}
          >
            <div className="m-2 border-bottom">
              <div className="mx-2 d-flex">
                <p className="me-3 border border-dark rounded-3">
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
                  {r.views_count}
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
      })}
    </>
  )
}
