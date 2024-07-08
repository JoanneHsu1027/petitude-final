import React from 'react'
import ProgressBar from './progress-bar'
import styles from './insurance.module.css'
import Link from 'next/link'
import ProgressBarCopy from './progress-bar-copy'
import withProgressBar from './withProgressBar'
import Head from 'next/head'

function PiPayment05() {
  return (
    <>
    <Head><title>投保完成 | Petitude</title></Head>
      <div className="container-fluid mb-5">
        <div className="row justify-content-center">
          {/* 進度條 */}
          <ProgressBarCopy />
          {/* 圖片 */}
          <div
            className="col-8"
            style={{ margin: '1.25rem 0 1.875rem 0', padding: '0 240px' }}
          >
            <img
              src="/pi-pic/payment-done.jpg"
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
              <Link href="/member" className="text-decoration-none">
                <button className={styles['own-btn4']}>會員中心</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default withProgressBar(PiPayment05);