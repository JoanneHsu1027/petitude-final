import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'
import styles from '@/styles/estore/success.module.css'

export default function Success() {
  const router = useRouter()

  return (
    <Layout backgroundImage="url(/pic/bg-img01.png)">
      <main
        className={`d-none d-md-block ${styles.full}`}
        style={{ padding: 60 + 'px' }}
      >
        <div className={`container-fluid ${styles.outerFrame}`}>
          <div className="row fs-2 p-5 d-flex justify-content-center align-items-center">
            感謝你的購買
          </div>
          <div className="row fs-4 pt-0 pb-5 d-flex justify-content-center align-items-center">
            此次訂單已成功送出!
          </div>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-6 d-flex justify-content-end align-items-center">
              <button
                className={styles.btn}
                onClick={() => {
                  router.push('/')
                }}
              >
                回首頁
              </button>
            </div>
            <div className="col-6 d-flex justify-content-start align-items-center">
              <button
                className={styles.btn}
                onClick={() => {
                  router.push('/member/')
                }}
              >
                回會員中心
              </button>
            </div>
          </div>
        </div>
      </main>
      <main
        className={`d-block d-md-none ${styles.full}`}
        style={{ padding: 30 + 'px' }}
      >
        <div className={`container-fluid ${styles.outerFrame}`}>
          <div className="row fs-4 pt-5 pb-4 d-flex justify-content-center align-items-center">
            感謝你的購買
          </div>
          <div className="row fs-5 pt-0 pb-4 px-2 d-flex justify-content-center align-items-center text-center">
            此次訂單已成功送出!
          </div>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-6 d-flex justify-content-end align-items-center">
              <button
                className={styles.btn}
                onClick={() => {
                  router.push('/')
                }}
              >
                回首頁
              </button>
            </div>
            <div className="col-6 d-flex justify-content-start align-items-center">
              <button
                className={styles.btn}
                onClick={() => {
                  router.push('/member/')
                }}
              >
                回會員中心
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
