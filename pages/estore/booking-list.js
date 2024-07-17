import { useState, useEffect } from 'react'
import Layout from '@/components/layout/layout'
import { useRouter } from 'next/router'
import styles from '@/styles/estore/bookingList.module.css'
import { useCart } from '@/contexts/estore/CartContext'

export default function BookingList() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(false)
  const router = useRouter()
  const [selectedBillMethod, setSelectedBillMethod] = useState(false)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    // 從 localStorage 讀取購物車資料
    const storedCart = localStorage.getItem('joannesshoppingcart')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product_price * item.qty,
    0,
  )

  return (
    <Layout>
      {/* <ProgressBar /> */}

      <div
        className={`container-fluid d-flex flex-column flex-md-row justify-content-between align-items-stretch mb-5 ${styles.full}`}
      >
        <div className="row">
          {/* leftCard */}
          <div className="col-md-7 justify-content-center align-items-center">
            {/* <!-- 付款方式 --> */}
            <div
              className="card my-3"
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderTopRightRadius: 30 + 'px',
                borderTopLeftRadius: 30 + 'px',
              }}
            >
              <div
                className="card-header text-center"
                style={{
                  backgroundColor: '#4CB1C8',
                  color: '#ffffff',
                  borderTopRightRadius: 30 + 'px',
                  borderTopLeftRadius: 30 + 'px',
                }}
              >
                付款方式
              </div>
              <div className="card-body" style={{ border: 10 + 'px' }}>
                <h5 className="card-title mb-4">付款方式</h5>

                <div className="form-check" style={{ marginBottom: '1rem' }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="creditCard"
                    value="creditCard"
                    style={{ marginTop: '0.3rem' }}
                    checked={selectedPaymentMethod === 'creditCard'}
                    onChange={() => setSelectedPaymentMethod('creditCard')}
                  />
                  <label className="form-check-label mb-2" htmlFor="creditCard">
                    信用卡一次付清
                  </label>
                  {selectedPaymentMethod === 'creditCard' && (
                    <>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="creditCardNumber"
                        placeholder="請輸入信用卡號"
                      />
                      <form className="row">
                        <div className="col-md-6">
                          <label htmlFor="expiryDate" className="form-label">
                            有效日期
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-pill"
                            id="expiryDate"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="cvv" className="form-label">
                            檢核碼
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-pill"
                            id="cvv"
                            placeholder="CVV"
                          />
                        </div>
                      </form>
                    </>
                  )}
                </div>

                <div className="form-check" style={{ marginBottom: '1rem' }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="otherMethods"
                    value="otherMethods"
                    style={{ marginTop: '0.3rem' }}
                    checked={selectedPaymentMethod === 'otherMethods'}
                    onChange={() => setSelectedPaymentMethod('otherMethods')}
                  />
                  <label
                    className="form-check-label mb-2"
                    htmlFor="otherMethods"
                  >
                    Line Pay
                  </label>
                </div>
              </div>
            </div>
            {/* <!-- 付款方式 --> */}
            {/* <!-- 購買人資訊 --> */}
            <div
              className="card my-3"
              style={{
                maxWidth: '100%',
                height: 'auto',
                marginTop: '0.3rem',
                borderTopRightRadius: 30 + 'px',
                borderTopLeftRadius: 30 + 'px',
              }}
            >
              <div
                className="card-header text-center"
                style={{
                  backgroundColor: '#4CB1C8',
                  color: '#ffffff',
                  borderTopRightRadius: 30 + 'px',
                  borderTopLeftRadius: 30 + 'px',
                }}
              >
                購買人資訊
              </div>
              <div className="card-body">
                <h5 className="card-title mb-4">購買人資訊</h5>
                <form className="row" style={{ marginBottom: '1rem' }}>
                  {/* <!-- 姓名 --> */}
                  <div className="col-12">
                    <label htmlFor="buyerName" className="form-label">
                      購買人姓名
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      id="buyerName"
                      placeholder="姓名"
                    />
                  </div>
                  {/* <!-- 手機 --> */}
                  <div className="col-md-6">
                    <label htmlFor="mobile" className="form-label">
                      手機
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      id="mobile"
                      placeholder="手機"
                    />
                  </div>
                  {/* <!-- 市話 --> */}
                  <div className="col-md-6">
                    <label htmlFor="telephone" className="form-label">
                      市話(非必填)
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      id="telephone"
                      placeholder="市話"
                    />
                  </div>
                  {/* <!-- 縣市 --> */}
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="city">
                      發票地址
                    </label>
                    <select className="form-select rounded-pill" id="city">
                      <option selected>請選擇縣市</option>
                      <option value="1">新北市</option>
                      <option value="2">台北市</option>
                      <option value="3">桃園市</option>
                    </select>
                  </div>
                  {/* <!-- 鄉鎮市區 --> */}
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="district">
                      鄉鎮市區
                    </label>
                    <select className="form-select rounded-pill" id="district">
                      <option selected>請選擇鄉鎮市區</option>
                      <option value="1">新北市</option>
                      <option value="2">台北市</option>
                      <option value="3">桃園市</option>
                    </select>
                  </div>
                  {/* <!-- 詳細地址 --> */}
                  <div className="col-12 mt-0">
                    <label htmlFor="address" className="form-label">
                      詳細地址
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      id="address"
                      placeholder="詳細地址"
                    />
                  </div>
                  <div className="col-12">
                    <div
                      className="form-check"
                      style={{ marginTop: 0.5 + 'rem' }}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="syncInfo"
                        style={{ marginTop: '0.3rem' }}
                      />
                      <label className="form-check-label" htmlFor="syncInfo">
                        購買人資訊同步會員基本資料
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* <!-- 購買人資訊 --> */}
            {/* <!-- 發票資訊 --> */}
            <div
              className="card my-3"
              style={{
                maxWidth: '100%',
                height: 'auto',
                marginTop: '0.3rem',
                borderTopRightRadius: 30 + 'px',
                borderTopLeftRadius: 30 + 'px',
              }}
            >
              <div
                className="card-header text-center"
                style={{
                  backgroundColor: '#4CB1C8',
                  color: '#ffffff',
                  borderTopRightRadius: 30 + 'px',
                  borderTopLeftRadius: 30 + 'px',
                }}
              >
                發票資訊
              </div>
              <div className="card-body">
                <h5 className="card-title mb-4">發票資訊</h5>
                {/* <!-- 會員載具 --> */}
                <div className="form-check" style={{ marginBottom: '1rem' }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="billMethod"
                    id="memberBill"
                    value="memberBill"
                    style={{ marginTop: '0.3rem' }}
                    checked={selectedBillMethod === 'memberBill'}
                    onChange={() => setSelectedBillMethod('memberBill')}
                  />
                  <label className="form-check-label mb-2" htmlFor="memberBill">
                    會員載具
                  </label>
                  {selectedBillMethod === 'memberBill' && (
                    <>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="memberBillnumber"
                        placeholder="請填寫會員載具"
                      />
                    </>
                  )}
                </div>
                {/* <!-- 手機載具 --> */}
                <div className="form-check" style={{ marginBottom: '1rem' }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="billMethod"
                    id="phoneBill"
                    value="phoneBill"
                    style={{ marginTop: '0.3rem' }}
                    checked={selectedBillMethod === 'phoneBill'}
                    onChange={() => setSelectedBillMethod('phoneBill')}
                  />

                  <label htmlFor="phoneBill" className="form-label">
                    手機載具
                  </label>
                  {selectedBillMethod === 'phoneBill' && (
                    <>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="phoneBill"
                        placeholder="請填寫共通載具"
                      />
                      <div
                        className="col-12 form-check"
                        style={{ marginTop: 0.5 + 'rem' }}
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="syncInfo"
                          style={{ marginTop: '0.3rem' }}
                        />
                        <label className="form-check-label" htmlFor="syncInfo">
                          記住此資訊，讓下次結帳時可使用
                        </label>
                      </div>
                    </>
                  )}
                </div>
                {/* <!-- 公司發票 --> */}
                <div className="form-check" style={{ marginBottom: '1rem' }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="billMethod"
                    id="compenyBill"
                    value="compenyBill"
                    style={{ marginTop: '0.3rem' }}
                    checked={selectedBillMethod === 'compenyBill'}
                    onChange={() => setSelectedBillMethod('compenyBill')}
                  />
                  <label htmlFor="compenyBill" className="form-label">
                    公司發票
                  </label>
                  {selectedBillMethod === 'compenyBill' && (
                    <>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="cvv"
                        placeholder="請填寫統一編號"
                      />
                    </>
                  )}
                </div>
                <div className="form-check" style={{ marginBottom: '1rem' }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="billMethod"
                    id="donateBill"
                    value="donateBill"
                    style={{ marginTop: '0.3rem' }}
                    checked={selectedBillMethod === 'donateBill'}
                    onChange={() => setSelectedBillMethod('donateBill')}
                  />
                  <label className="form-label" htmlFor="donateBill">
                    捐贈發票
                  </label>
                  {selectedBillMethod === 'donateBill' && (
                    <>
                      <select
                        className="form-select rounded-pill"
                        id="district"
                      >
                        <option selected>請選擇捐贈單位</option>
                        <option value="1">台灣狗腳印幸福聯盟</option>
                        <option value="2">台灣之心愛護動物協會</option>
                        <option value="3">社團法人台灣之心愛護動物協會</option>
                        <option value="4">
                          社團法人台灣幸褔狗流浪中途協會
                        </option>
                        <option value="5">社團法人台灣動物平權促進會</option>
                        <option value="6">社團法人台灣防止虐待動物協會</option>
                      </select>
                    </>
                  )}
                </div>
              </div>
              <div
                className="card-footer text-muted"
                style={{ backgroundColor: '#FFF5CF' }}
              >
                ！依統一發票使用辦法規定：發票一經開立不得任意更改或改開發票。
              </div>
            </div>
            {/* <!-- 發票資訊 --> */}
          </div>
          {/* leftCard */}
          {/* rightCard */}
          <div className="col-md-5 justify-content-center align-items-center">
            <div
              className="card my-3"
              style={{
                maxWidth: '100%',
                height: 'auto',
                marginTop: '0.3rem',
                borderRadius: 30 + 'px',
              }}
            >
              <div
                className="card-header text-center fs-2"
                style={{
                  backgroundColor: '#F6D554',
                  color: '#6A513D',
                  borderTopRightRadius: 30 + 'px',
                  borderTopLeftRadius: 30 + 'px',
                  borderBottom: 'none',
                  fontWeight: 900,
                }}
              >
                結帳明細
              </div>
              <div
                className="card-body"
                style={{
                  backgroundColor: '#F6D554',
                  color: '#6A513D',
                  borderEndStartRadius: 30 + 'px',
                  borderEndEndRadius: 30 + 'px',
                  fontWeight: 900,
                }}
              >
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((r, i) => (
                      <div
                        key={i}
                        className="row align-items-center justify-content-center mb-3"
                      >
                        <div
                          className="col-3 w-auto"
                          style={{ paddingRight: 2 + 'rem' }}
                        >
                          <img
                            src={`http://localhost:3001/estore/A${r.pk_product_id}.png`}
                            alt="..."
                            className={styles.productImage}
                          />
                        </div>
                        <div className="col-9">
                          <div className="row">
                            <div className="col-12">
                              <div className={`fs-5 ${styles.productName}`}>
                                {r.product_name}
                              </div>
                            </div>
                            <div
                              className={`col-12 ${styles.quantityPriceContainer} mt-2`}
                            >
                              <div
                                className="justify-content-start fs-5"
                                style={{
                                  color: '#FFF5CF',
                                  backgroundColor: '#6A513D',
                                  borderRadius: 30 + 'px',
                                  paddingLeft: 2 + 'rem',
                                  paddingRight: 2 + 'rem',
                                  paddingTop: 0.1 + 'rem',
                                  paddingBottom: 0.1 + 'rem',
                                }}
                              >
                                數量：{r.qty}
                              </div>
                              <div
                                className={`justify-content-end fs-4 ${styles.productPrice}`}
                              >
                                $ {r.product_price * r.qty}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* ... 總金額計算等 ... */}
                  </>
                ) : (
                  <p>購物車是空的</p>
                )}
                <hr />
                <div className="col d-flex align-items-center">
                  <div className="text-start m-2">
                    <p className="card-text mb-1 fs-5">付款方式</p>
                  </div>
                  <div className="text-end ms-5 ms-auto">
                    <p className="card-text fs-5">
                      {selectedPaymentMethod === 'creditCard'
                        ? '信用卡'
                        : 'Line Pay'}
                    </p>
                  </div>
                </div>
                <div className="col d-flex align-items-center">
                  <div className="text-start m-2">
                    <p className="card-text mb-1 fs-5">發票開立方式</p>
                  </div>
                  <div className="text-end ms-5 ms-auto">
                    <p className="card-text fs-5">手機載具</p>
                  </div>
                </div>
                <div className="col d-flex align-items-center">
                  <div className="text-start m-2">
                    <p className="card-text mb-1 fs-5">總金額</p>
                  </div>
                  <div className="text-end ms-5 ms-auto">
                    <p className="card-text fs-4">$ {totalPrice}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn w-100  fs-4"
                    onClick={() => {
                      router.push('/funeral/funeral/confirm')
                    }}
                    style={{
                      // width: '120px',
                      marginTop: '20px',
                      color: '#FFF5CF',
                      backgroundColor: '#6A513D',
                      borderRadius: 30 + 'px',
                    }}
                  >
                    確認結帳
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* rightCard */}
        </div>

        <style jsx>{`
          .card-header,
          .card-body,
          .form-check-label,
          .form-label,
          .form-control,
          .form-select {
            font-size: 1rem;
          }

          .form-control {
            flex-grow: 1;
          }

          @media (max-width: 768px) {
            .container-fluid,
            .row,
            .leftCard,
            .rightCard {
              width: 100%;
              margin: 0 auto;
            }
          }

          .card-header,
          .card-title {
            font-size: 1.2rem;
          }

          .form-check-label,
          .form-label,
          .form-control,
          .form-select {
            font-size: 1rem;
          }
        `}</style>
      </div>
    </Layout>
  )
}
