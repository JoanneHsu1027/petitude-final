import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal1 from '@/components/funeral/service/modal1'
import Styles from '@/components/funeral/service/modal.module.css'

export default function Service() {
  const [showModal1, setShowModal1] = useState(false) // 定義 showModal1 狀態

  const handleShowModal1 = () => {
    setShowModal1(true) // 設置 showModal1 為 true，顯示 Modal1
  }

  return (
    <>
      <div className="container-fluid mt-5 mb-5">
        <div className="row d-flex justify-content-center">
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '4%',
            }}
          >
            寵物火化服務項目一覽
          </h2>
          <div
            className="col-md-6  d-flex justify-content-center mt-3"
            style={{ width: '40%' }}
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
            className="col-md-6 d-flex justify-content-center mt-3"
            style={{ width: '40%' }}
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
          <div className="d-flex justify-content-center align-items-center">
            <button
              className="btn btn-warning mt-5"
              onClick={handleShowModal1}
              style={{ width: '150px', marginTop: '20px' }}
            >
              客製化服務
            </button>
          </div>
        </div>
        <Modal1 show={showModal1} handleClose={() => setShowModal1(false)} />
      </div>
      <style jsx>{`
        .list-group {
          padding: 0; /* 移除內邊距 */
          margin: 0; /* 移除外邊距 */
          border: none; /* 移除邊框 */
        }

        .list-group-item {
          border: none; /* 移除每個項目的邊框 */
          padding: 0.5rem 1rem; /* 自定義內邊距 */
          background-color: transparent; /* 設定背景顏色為透明 */
        }
      `}</style>
    </>
  )
}
