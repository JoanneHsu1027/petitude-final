import React from 'react'
import ProgressBar from './progress-bar'
import styles from './insurance.module.css'
import Link from 'next/link'

export default function PiPayment05() {
  return (
    <>
      <div className="container-fluid mb-5">
        <div className="row justify-content-center">
          {/* 進度條 */}
          <ProgressBar />
          {/* 圖片 */}
          <div
            className="col-8"
            style={{ margin: '1.25rem 0 1.875rem 0', padding: '0 240px' }}
          >
            <img
              src="/pic/payment-done.jpg"
              className="img-fluid"
              style={{ borderRadius: '1.875rem' }}
              alt=""
            />
          </div>
          {/* 投保完成 */}
          <div
            className="col-8 text-center"
            style={{ margin: '.625rem 0 1.875rem 0' }}
          >
            <h1 className={styles['text-color']}>投保完成!</h1>
          </div>
          {/* 下一步 */}
          <div className="col-8">
            <div className="d-flex justify-content-center align-items-center">
              <Link href="/insurance" className="text-decoration-none">
                <button className={styles['own-btn4']}>回首頁</button>
              </Link>
              <Link href="#/" className="text-decoration-none">
                <button className={styles['own-btn4']}>會員中心</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
