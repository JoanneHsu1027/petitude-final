import { useEffect, useState } from 'react'
import ImageComponent from '../../../components/common/funeral/image'
import Layout from '../../../components/layout/layout'
import { useRouter } from 'next/router'
// import ProgressBar from '../../../components/funeral/progress-bar'

export default function BookingList() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(false)
  const router = useRouter()

  return (
    <Layout>
      {/* <ProgressBar /> */}

      <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-stretch mb-5">
        <div className="row">
          {/* leftCard */}
          <div className="col-md-8 justify-content-center align-items-center">
            {/* <!-- 付款方式 --> */}
            <div
              className="card my-3"
              style={{ maxWidth: '100%', height: 'auto' }}
            >
              <div className="card-header text-center bg-warning">付款方式</div>
              <div className="card-body">
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
                        className="form-control"
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
                            className="form-control"
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
                            className="form-control"
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
                    其他方式付款
                    <br />
                    (ATM轉帳、7-11 ibon)
                  </label>
                </div>
              </div>
            </div>
            {/* <!-- 付款方式 --> */}
            {/* <!-- 購買人資訊 --> */}
            <div
              className="card my-3"
              style={{ maxWidth: '100%', height: 'auto', marginTop: '0.3rem' }}
            >
              <div className="card-header text-center bg-warning">
                購買人資訊
              </div>
              <div className="card-body">
                <h5 className="card-title mb-4">購買人資訊</h5>
                <form className="row">
                  {/* <!-- 姓名 --> */}
                  <div className="col-12">
                    <label htmlFor="buyerName" className="form-label">
                      購買人姓名
                    </label>
                    <input
                      type="text"
                      className="form-control"
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
                      className="form-control"
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
                      className="form-control"
                      id="telephone"
                      placeholder="市話"
                    />
                  </div>
                  {/* <!-- 縣市 --> */}
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="city">
                      發票地址
                    </label>
                    <select className="form-select" id="city">
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
                    <select className="form-select" id="district">
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
                      className="form-control"
                      id="address"
                      placeholder="詳細地址"
                    />
                  </div>
                  <div className="col-12">
                    <div
                      className="form-check"
                      style={{ marginBottom: '1rem' }}
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
              style={{ maxWidth: '100%', height: 'auto', marginTop: '0.3rem' }}
            >
              <div className="card-header text-center bg-warning">發票資訊</div>
              <div className="card-body">
                <h5 className="card-title mb-4">發票資訊</h5>
                {/* <!-- credit input --> */}
                <form className="row">
                  {/* <!-- 會員載具 --> */}
                  <div className="col-12">
                    <label htmlFor="cvv" className="form-label">
                      會員載具
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      placeholder="請填寫會員載具"
                    />
                  </div>
                  {/* <!-- 手機載具 --> */}
                  <div className="col-12">
                    <label htmlFor="cvv" className="form-label">
                      手機載具
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      placeholder="請填寫共通載具"
                    />
                  </div>
                  <div
                    className="col-12 form-check"
                    style={{ marginBottom: '1rem' }}
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
                  {/* <!-- 公司發票 --> */}
                  <div className="col-12">
                    <label htmlFor="cvv" className="form-label">
                      公司發票
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      placeholder="請填寫統一編號"
                    />
                  </div>
                  {/* <!-- 捐贈發票 --> */}
                  <div className="col-12">
                    <label className="form-label" htmlFor="district">
                      捐贈發票
                    </label>
                    <select className="form-select" id="district">
                      <option selected>請選擇捐贈單位</option>
                      <option value="1">台灣狗腳印幸福聯盟</option>
                      <option value="2">台灣之心愛護動物協會</option>
                      <option value="3">社團法人台灣之心愛護動物協會</option>
                      <option value="4">社團法人台灣幸褔狗流浪中途協會</option>
                      <option value="5">社團法人台灣動物平權促進會</option>
                      <option value="6">社團法人台灣防止虐待動物協會</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="card-footer text-muted bg-warning">
                ！依統一發票使用辦法規定：發票一經開立不得任意更改或改開發票。
              </div>
            </div>
            {/* <!-- 發票資訊 --> */}
          </div>
          {/* leftCard */}
          {/* rightCard */}
          <div className="col-md-4 justify-content-center align-items-center">
            <div
              className="card my-3"
              style={{ maxWidth: '100%', height: 'auto', marginTop: '0.3rem' }}
            >
              <div className="card-header bg-warning text-center">結帳明細</div>
              <div className="card-body" style={{ backgroundColor: '#FFF5CF' }}>
                <div className="col d-flex justify-content-between align-items-center">
                  <ImageComponent
                    src="/funeral/Frame 685.png"
                    width={150}
                    height={150}
                    alt=""
                  />
                  <h5 className="card-title text-center">
                    尊榮寵物 - 個別羽化
                  </h5>
                </div>
                <div className="col d-flex align-items-center">
                  <div className="text-start m-2">
                    <p className="card-text mb-1">贈送</p>
                    <p className="card-text m-0">免費結緣往生被/十字被</p>
                    <p className="card-text m-0">免費靈體冰存14天</p>
                    <p className="card-text m-0">免費懷念骨灰罐</p>
                  </div>
                  <div className="text-end ms-5 ms-auto">
                    <p className="card-text">$ 9000元</p>
                  </div>
                </div>
                <hr />
                <div className="col d-flex align-items-center">
                  <div className="text-start m-2">
                    <p className="card-text mb-1">付款方式</p>
                  </div>
                  <div className="text-end ms-5 ms-auto">
                    <p className="card-text">信用卡</p>
                  </div>
                </div>
                <div className="col d-flex align-items-center">
                  <div className="text-start m-2">
                    <p className="card-text mb-1">總金額</p>
                  </div>
                  <div className="text-end ms-5 ms-auto">
                    <p className="card-text">$ 9000</p>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  {/* button跳轉頁面 */}
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      if (confirm('確定嗎?')) {
                        router.push('/funeral/funeral/confirm')
                      }
                    }}
                    style={{ width: '120px', marginTop: '20px' }}
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
            font-size: 0.8rem;
          }

          .form-check-label,
          .form-label,
          .form-control,
          .form-select {
            font-size: 0.6rem;
          }
        `}</style>
      </div>
    </Layout>
  )
}
