import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout/layout'
import ModalComponent from '@/components/funeral/funeral/booking-list/modal'
import Styles from '@/components/funeral/funeral/booking-list/modal.module.css'
export default function Confirm() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [buyerInfo, setBuyerInfo] = useState({ name: '', mobile: '' })
  const [invoice, setInvoice] = useState('')

  useEffect(() => {
    // 從 localStorage 讀取資料
    const storedOption = localStorage.getItem('selectedOption')
    const storedPaymentMethod = localStorage.getItem('paymentMethod')
    const storedBuyerInfo = localStorage.getItem('buyerInfo')
    const storedInvoice = localStorage.getItem('invoice')

    if (storedOption) setSelectedOption(JSON.parse(storedOption))
    if (storedPaymentMethod) setPaymentMethod(storedPaymentMethod)
    if (storedBuyerInfo) setBuyerInfo(JSON.parse(storedBuyerInfo))
    if (storedInvoice) setInvoice(storedInvoice)
  }, [])

  if (!selectedOption) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <div className="container justify-content-center p-3">
        <h2 className="text-center m-3 mb-5">確認明細</h2>
        <div className="row d-flex justify-content-center align-items-start mb-5">
          {/* 左側圖片 */}
          <div className="col-md-6 mb-3 mb-md-0">
            <img
              src={selectedOption.imageSrc}
              alt=""
              className={`img-fluid ${Styles.image}`}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          {/* 右側文字 */}
          <div className={`col-md-6 ${Styles.rightSide}`}>
            <div className="d-flex flex-column">
              <div className="d-flex align-items-start mb-2">
                <p className="me-3 mb-2 fw-bold">禮儀方案:</p>
                <p className="mb-2">{selectedOption.title}</p>
              </div>
              <div className="d-flex align-items-start mb-2">
                <p className="me-3 mb-2 fw-bold">付款方式:</p>
                <p className="mb-2">{paymentMethod}</p>
              </div>
              <div className="d-flex align-items-start mb-2">
                <p className="me-3 mb-2 fw-bold">購買人資訊:</p>
                <div>
                  <p className="mb-1">{buyerInfo.name}</p>
                  <p className="mb-1">{buyerInfo.mobile}</p>
                </div>
              </div>
              <div className="d-flex align-items-start mb-2">
                <p className="me-3 mb-2 fw-bold">發票資訊:</p>
                <p className="mb-2">{invoice}</p>
              </div>
              <div className="d-flex align-items-start mb-2">
                <p className="me-3 mb-2 fw-bold">總金額:</p>
                <p className="mb-2">{selectedOption.price}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-md-4 text-center">
            <button
              className="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalToggle2"
              style={{ width: '100%', maxWidth: '200px' }}
            >
              確定付款
            </button>
          </div>
        </div>
        <ModalComponent />
      </div>
    </Layout>
  )
}
