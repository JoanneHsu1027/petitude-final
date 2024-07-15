import React from 'react'
import styles from '@/styles/footer/footer-style.module.css'

export default function Footer() {
  return (
    <>
      <div
        className="container-fluid pt-4 pb-1"
        style={{ backgroundColor: '#FFDF79', marginTop: 'auto' }}
      >
        <div className="row ms-3  d-flex justify-content-center">
          <div className="col-lg-2 col-md-3 d-flex flex-column border-start border-dark mb-3 px-4">
            <h6 className="m-0 fw-bolder">會員專區</h6>
            <a className={`${styles.AReset}`} href="#">
              會員權益
            </a>
            <a className={`${styles.AReset}`} href="#">
              隱私權政策
            </a>
          </div>
          <div className="col-lg-2 col-md-3 d-flex flex-column border-start border-dark mb-3 px-4">
            <h6 className="m-0 fw-bolder">購物須知</h6>
            <a className={`${styles.AReset}`} href="#">
              付款與配送方式
            </a>
            <a className={`${styles.AReset}`} href="#">
              退換貨說明
            </a>
          </div>
          <div className="col-lg-2 col-md-3 d-flex flex-column border-start border-dark mb-3 px-4">
            <h6 className="m-0 fw-bolder">關於我們</h6>
            <a className={`${styles.AReset}`} href="#">
              品牌故事
            </a>
            <p className="m-0">統一編號: 12345678</p>
          </div>
          <div className="col-lg-2 col-md-3 d-flex flex-column border-start border-dark mb-3 px-4">
            <h6 className="m-0 fw-bolder">聯絡我們</h6>
            <a className={`${styles.AReset}`} href="#">
              Facebook粉絲團
            </a>
            <a className={`${styles.AReset}`} href="#">
              Line官方粉絲團
            </a>
            <p className="m-0">客服專線: 02-12345678</p>
            <p className="m-0">地址: 臺北市大安區信義路三段</p>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundColor: '#f4bc7a' }}
        className=" w-100 py-3 text-center text-black fw-bold"
      >
        @ CopyRight 2024 Petitude
      </div>
    </>
  )
}
