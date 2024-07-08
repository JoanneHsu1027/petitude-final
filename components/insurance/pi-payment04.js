import React, { useState } from 'react'
import styles from './insurance.module.css'
import Link from 'next/link'
import ProgressBarCopy from './progress-bar-copy'

export default function PiPayment04() {
  const [selectedPayment, setSelectedPayment] = useState('')

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.id)
  }

  return (
    <>
      <div className="container-fluid mb-5">
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
                  <h5 className={`col-8 ${styles['own-green']}`}>
                    A123145646546578
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
                  <h5 className={`col-8 ${styles['own-orange']}`}>NT$2,941</h5>
                </div>
              </div>
            </div>
          </div>
          {/* 付費方式 */}
          <div className="col-8 mb-5" style={{ marginTop: '30px' }}>
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
                    <div className="form-check d-flex align-items-center mb-5">
                      <input
                        className="form-check-input me-2"
                        style={{ margin: 0 }}
                        type="radio"
                        name="paymentType"
                        id="greenPay"
                        required
                        onChange={handlePaymentChange}
                      />
                      <label
                        className="form-check-label d-flex align-items-center me-5"
                        htmlFor="greenPay"
                      >
                        <h5 style={{ margin: 0 }}>線上付款(綠界)</h5>
                      </label>
                    </div>
                    {selectedPayment === 'greenPay' ? <div>456</div> : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* 下一步 */}
        <div className="row">
          <div className="d-flex justify-content-center align-items-center">
            <Link href="/insurance" className="text-decoration-none">
              <button className={styles['own-btn4']}>離開</button>
            </Link>
            <Link
              href="/insurance/insurance-payment05"
              className="text-decoration-none"
            >
              <button className={styles['own-btn4']}>送出</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
