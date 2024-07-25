import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Styles from '@/components/funeral/service/modal.module.css'

export default function Service() {
  return (
    <>
      <div className="container-fluid allFont">
        <div className="row d-flex justify-content-center">
          <h2 className="title text-center">寵物火化服務項目一覽</h2>
          <div
            className="col-md-6 col-12 d-flex justify-content-center mt-3"
            style={{ maxWidth: '600px' }}
          >
            <div
              className={`card text-dark mb-1 border-0 text-center ${Styles.card}`}
            >
              <div className={`card-header ${Styles.headerCard1}`}>
                <h5>個別</h5>
                <h6>擇日告別式(依家長宗教及需求討論)</h6>
              </div>
              <div className={`card-body bg-light ${Styles.cardBody}`}>
                <ul className="list-group">
                  <li className="list-group-item">基礎淨身</li>
                  <li className="list-group-item">
                    <img src="/funeral/arrow.png" alt="" />
                  </li>
                  <li className="list-group-item">道別/禱告/誦經</li>
                  <li className="list-group-item">
                    <img src="/funeral/arrow.png" alt="" />
                  </li>
                  <li className="list-group-item">火化遺體</li>
                  <li className="list-group-item">
                    <img src="/funeral/arrow.png" alt="" />
                  </li>
                  <li className="list-group-item">骨灰安置</li>
                  <li className="list-group-item">
                    <img src="/funeral/arrow.png" alt="" />
                  </li>
                  <li className="list-group-item">追思</li>
                  <li className="list-group-item">(每月初一、十五法會誦經)</li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="col-md-6 col-12 d-flex justify-content-center mt-3"
            style={{ maxWidth: '600px' }}
          >
            <div
              className={`card text-dark mb-1 border-0 text-center ${Styles.card}`}
            >
              <div className={`card-header ${Styles.headerCard2}`}>
                <h5>團體</h5>
                <h6>園區流程火化 ,無法觀禮拍照</h6>
              </div>
              <div className="card-body bg-light">
                <ul className="list-group">
                  <li className="list-group-item">火化遺體</li>
                  <li className="list-group-item">
                    <img src="/funeral/arrow.png" alt="" />
                  </li>
                  <li className="list-group-item">骨灰安置</li>
                  <li className="list-group-item">
                    <img src="/funeral/arrow.png" alt="" />
                  </li>
                  <li className="list-group-item">追思</li>
                  <li className="list-group-item">(每月初一、十五法會誦經)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC&display=swap');

        .allFont {
          font-family: 'Noto Serif TC', serif;
          font-weight: 900;
        }
        .container-fluid {
          margin-bottom: 8%;
        }
        .title {
          font-size: 34px;
          margin-top: 5rem;
          margin-bottom: 5rem;
        }
        h5 {
          font-size: 24px;
          font-weight: 700;
        }
        .list-group {
          padding: 0; /* 移除內邊距 */
          margin: 0; /* 移除外邊距 */
          border: none; /* 移除邊框 */
        }

        .list-group-item {
          font-size: 20px;
          border: none; /* 移除每個項目的邊框 */
          padding: 0.5rem 1rem; /* 自定義內邊距 */
          background-color: transparent; /* 設定背景顏色為透明 */
        }
        @media (max-width: 768px) {
          h2 {
            font-size: 1.5rem; /* 調整標題字體大小 */
            margin-bottom: 2%;
          }

          .btn-warning {
            width: 100px; /* 調整按鈕寬度 */
            font-size: 0.8rem; /* 調整按鈕字體大小 */
          }
        }

        @media (max-width: 576px) {
          h2 {
            font-size: 1.2rem; /* 調整標題字體大小 */
            margin-bottom: 1%;
          }

          .btn-warning {
            width: 80px; /* 調整按鈕寬度 */
            font-size: 0.7rem; /* 調整按鈕字體大小 */
          }
        }
      `}</style>
    </>
  )
}
