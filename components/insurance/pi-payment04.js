import React, { useEffect, useState } from 'react'
import styles from './insurance.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { INSURANCE_GET_ITEM } from '@/configs/insurance/api-path'

export default function PiPayment04() {
  // 選擇付費方式
  // const [selectedPayment, setSelectedPayment] = useState('')

  const router = useRouter()
  // 從url抓取orderId
  const { OrderId } = router.query

  // 抓取新訂單id
  // const [orderID, setOrderID] = useState('')

  // 抓取保費
  const [planPrice, setPlanPrice] = useState('')
  // 保費轉成數字
  const price = parseFloat(planPrice.replace(/,/g, ''))

  // const handlePaymentChange = (e) => {
  //   setSelectedPayment(e.target.id)
  // }

  // 綠界付款
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // 確認localstorage有收到新成立的訂單編號 (綠界必須用get)
      // if (localStorage.order_id) {

      // 用從 URL 獲取的 orderId
      if (OrderId) {
        const response = await fetch(
          `http://localhost:3001/ecpayJ?${new URLSearchParams({ amount: price })}`,
          // `http://localhost:3001/ecpayJ?${new URLSearchParams({ amount: price, OrderId: OrderId })}`,
        )

        const ecpayResponse = await response.json()

        if (ecpayResponse.htmlContent) {
          const tempDiv = document.createElement('div')
          tempDiv.innerHTML = ecpayResponse.htmlContent

          const form = tempDiv.querySelector('form')
          if (form) {
            document.body.appendChild(form)
            form.submit()
            // 再把訂單號碼加入localstorage
            localStorage.setItem(
              'OrderId',
              JSON.stringify({ OrderId: OrderId }),
            )
          } else {
            console.error('找不到支付表單')
          }
        } else {
          console.error('無效的回應格式')
        }
      } else {
        console.error('新增資料庫失敗')
      }
    } catch (error) {
      console.error('發生錯誤:', error)
      // 處理錯誤
    }
  }

  // 從後端抓訂單id跟保險價格
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`${INSURANCE_GET_ITEM}/${OrderId}`)
        console.log('API response:', response.data)
        if (response.data && response.data.data) {
          const orderData = response.data.data
          setPlanPrice(orderData.insurance_premium)
        } else {
          console.log('無效的 API 響應格式')
          return null
        }
      } catch (error) {
        console.log('Error fetching insurance data:', error)
      }
    }
    if (OrderId) {
      fetchOrderData()
    }
  }, [OrderId])
  return (
    <>
      <div className={`container-fluid mb-5 ${styles.allFont}`}>
        <div className="row justify-content-center">
          {/* 請款資訊 */}
          <div className="col-8" style={{ marginTop: '30px' }}>
            <h4 className={styles['top-frame']}>請款資訊</h4>
            <div
              className={`d-flex justify-content-center ${styles['data-frame']}`}
            >
              <div
                className="col-6 d-flex flex-column justify-content-center"
                style={{ paddingLeft: '1.25rem' }}
              >
                <div className="d-flex">
                  <h5
                    className={`col-4 ${styles['text-color']}`}
                    style={{ marginBottom: '.6875rem' }}
                  >
                    訂單號碼
                  </h5>
                  <h5
                    className={`col-8 ${styles['own-green']}`}
                    style={{ color: 'green' }}
                  >
                    PIO{OrderId}
                  </h5>
                </div>
              </div>
              <div className="col-6 d-flex flex-column justify-content-start ">
                <div className="d-flex">
                  <h5
                    className={`col-4 ${styles['text-color']}`}
                    style={{ marginBottom: '.6875rem' }}
                  >
                    保單金額
                  </h5>
                  <h5 className={`col-8 ${styles['own-orange']}`}>
                    NT${planPrice}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          {/* 付費 */}
          <div className="col-8 mb-5" style={{ marginTop: '30px' }}>
            <h4 className={styles['top-frame']}>前往付款</h4>
            <div className={styles['data-frame']}>
              <div className="col-12 px-5">
                <form className="d-flex justify-content-center my-5">
                  <button
                    type="submit"
                    style={{ border: 'none', padding: 0 }}
                    onClick={handleSubmit}
                  >
                    <img src="/pi-pic/ecpay.png" style={{ border: 'none' }} />
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* 付費方式 */}
          {/* <div className="col-8 mb-5" style={{ marginTop: '30px' }}>
            <h4 className={styles['top-frame']}>付費方式</h4>
            <div className={styles['data-frame']}>
              <div className="col-12 px-5">
                <form>
                  <div className="col-5">
                    <div className="form-check d-flex align-items-center mb-5">
                      <input
                        className="form-check-input me-2"
                        style={{ margin: 0 }}
                        type="radio"
                        name="paymentType"
                        id="creditCard"
                        required
                        onChange={handlePaymentChange}
                      />
                      <label
                        className="form-check-label d-flex align-items-center"
                        htmlFor="creditCard"
                      >
                        <h5 style={{ margin: 0 }}>信用卡一次付清</h5>
                      </label>
                    </div>
                    {selectedPayment === 'creditCard' ? (
                      <div className="ms-4 mb-5" name="creditCard">
                        <div
                          style={{
                            marginLeft: '1.875rem',
                            marginTop: '.6875rem',
                          }}
                        >
                          <input
                            className={styles['sheet-input']}
                            type="text"
                            id="b2c_IDcard"
                            style={{ width: '100%' }}
                            placeholder="請填信用卡號"
                          />
                        </div>
                        <div
                          className="d-flex justify-content-center mt-4"
                          style={{ marginLeft: '1.875rem' }}
                        >
                          <div className="me-5">
                            <p className="text-color mb-0">有效日期</p>
                            <input
                              className={styles['sheet-input']}
                              type="text"
                              id="fk_conty_id"
                              style={{ marginTop: 0, width: '100%' }}
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <p className="text-color mb-0">驗證碼</p>
                            <input
                              className={styles['sheet-input']}
                              type="text"
                              id="fk_city_id"
                              style={{ marginTop: 0, width: '100%' }}
                              placeholder="CVC"
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <div className="form-check d-flex align-items-center mb-5">
                      <input
                        className="form-check-input me-2"
                        style={{ margin: 0 }}
                        type="radio"
                        name="paymentType"
                        id="linePay"
                        required
                        onChange={handlePaymentChange}
                      />
                      <label
                        className="form-check-label d-flex align-items-center me-5"
                        htmlFor="linePay"
                      >
                        <h5 style={{ margin: 0 }}>Line Pay</h5>
                      </label>
                    </div>

                    {selectedPayment === 'linePay' ? <div>123</div> : null}
                  </div>
                </form>
              </div>
            </div>
          </div> */}
        </div>
        {/* 下一步 */}
        <div className="row">
          <div className="d-flex justify-content-center align-items-center">
            <Link href="/insurance" className="text-decoration-none">
              <button className={styles['own-btn4']}>離開</button>
            </Link>
            {/* <Link
              href="/insurance/insurance-payment05"
              className="text-decoration-none"
            >
              <button className={styles['own-btn4']}>送出</button>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  )
}
