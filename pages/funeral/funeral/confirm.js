import React from 'react'
import Layout from '../../../components/layout/layout'
import ModalComponent from '@/components/funeral/funeral/booking-list/modal'
import Styles from '@/components/funeral/funeral/booking-list/modal.module.css'
export default function Confirm() {
  return (
    <Layout>
      <div className="container-fluid justify-content-center p-3">
        <h2 className="text-center mb-3">確認明細</h2>
        <div className="row d-flex justify-content-center">
          {/* 左側圖片 */}
          <div className="col-md-7">
            <img
              src="/funeral/Frame 685.png"
              alt=""
              className={`img-fluid ${Styles.image}`}
            />
          </div>
          {/* 右側文字 */}
          <div className={`col-md-5 ${Styles.rightSide}`}>
            <div className="d-flex flex-column">
              <div className="d-flex align-items-start mb-2">
                <p className="me-3 mb-2">禮儀方案:</p>
                <p className="ms-5 mb-2">尊榮寵物 - 個別羽化</p>
              </div>
              <div className="d-flex align-items-start mb-2">
                <p className="me-3 mb-2">付款方式:</p>
                <p className="ms-5 mb-2">信用卡</p>
              </div>
              <div className="d-flex align-items-start mb-2">
                <p className="me-3 mb-2">購買人資訊:</p>
                <div>
                  <p className="ms-5 mb-1">姓名</p>
                  <p className="ms-5 mb-1">手機</p>
                  <p className="ms-5 mb-2">地址</p>
                </div>
              </div>
              <div className="d-flex align-items-start mb-2">
                <p className="me-3 mb-2">發票資訊:</p>
                <p className="ms-5 mb-2">手機載具</p>
              </div>
              <div className="d-flex align-items-start mb-2">
                <p className="me-3 mb-2">總金額:</p>
                <p className="ms-5 mb-2">NTD 9000</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <button
            className="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalToggle2"
            style={{ width: '10rem' }}
          >
            確定付款
          </button>
          <ModalComponent />
        </div>
      </div>
    </Layout>
  )
}
