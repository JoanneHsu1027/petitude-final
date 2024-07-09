import React from 'react'
import styles from '../../styles/platforum/platforum-style.module.css'
import { BsBookmarkFill } from 'react-icons/bs'
import { BsChatText } from 'react-icons/bs'

export default function ArticleBlock() {
  return (
    <>
      <a className={`${styles.AReset}`} href="../../platforum/article-page">
        <div className="m-2 border-bottom">
          <div className="mx-2 d-flex">
            <p className="me-3 border border-dark rounded-3">主題名稱</p>
            <p className={`${styles.LightGray}`}>14小時</p>
          </div>
          <div className="mx-3">
            <h2 className="mb-3">文章標題文章標題文章標題文章標題</h2>
            <p>
              文章內容預覽文章內容預覽文章內容預覽文章內容預覽文章內容預覽文章內容預覽文章內容預覽文章內容預覽文章內容預覽文章內容預覽文章內容預覽文章內容預覽文章內容預覽文章內容預覽文章內容預覽
            </p>
          </div>

          <div className="d-flex mx-5">
            <p className={`me-5 ${styles.OrangeYellow}`}>
              <BsChatText className={`mb-1`}></BsChatText> 94
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
}
