import React from 'react'
import styles from '../../styles/platforum/platforum-style.module.css'

export default function ReMessageBlock() {
  return (
    <>
      <div className="d-flex border-bottom my-4 mx-1">
        <div className="mx-2">
          <img src="/forum-pic/avatar.png" alt="" />
        </div>
        <div className="flex-grow-1 me-2">
          <p>使用者1</p>
          <p>
            留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容留言內容
          </p>
          <div className="d-flex ms-4">
            <p className="me-4">2024-06-03 12:00</p>
            <a className={`${styles.AReset} ${styles.LightGray}`} href="">
              回覆
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
