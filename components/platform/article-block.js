import React from 'react'
import styles from '../../styles/platform/platform-style.module.css'
import { BsBookmarkFill } from 'react-icons/bs'
import { BsChatText } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { ARTICLE_LIST } from '@/configs/api-path'

export default function ArticleBlock() {
  const [data, setData] = useState({
    success: false,
    rows: [],
  })

  useEffect(() => {
    fetch(`${ARTICLE_LIST}`)
      .then((r) => r.json())
      .then((myData) => {
        console.log(data)
        setData(myData)
      })
  }, [])

  return (
    <>
      {data.rows.map((r) => {
        return (
          <>
            <a
              key={r.article_id}
              className={`${styles.AReset}`}
              href="../../platform/article-page"
            >
              <div className="m-2 border-bottom">
                <div className="mx-2 d-flex">
                  <p className="me-3 border border-dark rounded-3">主題名稱</p>
                  <p className={`${styles.LightGray}`}>{r.article_date}</p>
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
                    <BsChatText className={`mb-1`}></BsChatText>
                    {r.views_count}
                  </p>

                  <button
                    className={`${styles.AReset} ${styles.LightGray} ${styles.FavHover} ${styles.BtnReset} mb-3`}
                  >
                    <BsBookmarkFill className={`mb-1`}></BsBookmarkFill>
                    收藏
                  </button>
                </div>
              </div>
            </a>
          </>
        )
      })}
    </>
  )
}
