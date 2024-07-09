import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from '@/components/funeral/common/button'
import ImageComponent from '../../../components/common/funeral/image'
import Modal1 from '../../../components/funeral/funeral/service/modal1'
import Styles from '../../../components/funeral/funeral/service/modal.module.css'

export default function Service() {
  const [showModal1, setShowModal1] = useState(false) // 定義 showModal1 狀態

  const handleShowModal1 = () => {
    setShowModal1(true) // 設置 showModal1 為 true，顯示 Modal1
  }

  return (
    <>
      <div className="container-fluid my-3">
        <div className="row justify-content-center">
          <div className="text-center my-4">
            <h2 style={{ fontWeight: '900' }}>寵物火化服務項目一覽</h2>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 p-0 d-flex justify-content-center">
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
                    <ImageComponent
                      src="/funeral/arrow.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  </li>
                  <li className="list-group-item">道別/禱告/誦經</li>
                  <li className="list-group-item">
                    <ImageComponent
                      src="/funeral/arrow.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  </li>
                  <li className="list-group-item">火化遺體</li>
                  <li className="list-group-item">
                    <ImageComponent
                      src="/funeral/arrow.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  </li>
                  <li className="list-group-item">骨灰安置</li>
                  <li className="list-group-item">
                    <ImageComponent
                      src="/funeral/arrow.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  </li>
                  <li className="list-group-item">追思</li>
                  <li className="list-group-item">(每月初一、十五法會誦經)</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-0 d-flex justify-content-center">
            <div
              className={`card text-dark mb-1 border-0 text-center ${Styles.card}`}
            >
              <div className={`card-header ${Styles.headerCard2}`}>
                <h5>團體</h5>
                <h6 className="m-0">園區流程火化 ,無法觀禮拍照</h6>
              </div>
              <div className={`card-body bg-light ${Styles.cardBody}`}>
                <ul className="list-group">
                  <li className="list-group-item">火化遺體</li>
                  <li className="list-group-item">
                    <ImageComponent
                      src="/funeral/arrow.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  </li>
                  <li className="list-group-item">骨灰安置</li>
                  <li className="list-group-item">
                    <ImageComponent
                      src="/funeral/arrow.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  </li>
                  <li className="list-group-item">追思</li>
                  <li className="list-group-item">(每月初一、十五法會誦經)</li>
                </ul>
              </div>
            </div>
          </div>
          <Button
            className="btn btn-warning"
            onClick={handleShowModal1}
            style={{ width: '120px', marginTop: '20px' }}
          >
            客製化服務
          </Button>
        </div>
        <Modal1 show={showModal1} handleClose={() => setShowModal1(false)} />
      </div>
    </>
  )
}
