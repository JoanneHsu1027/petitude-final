import { useState, useEffect } from 'react'
import Layout from '@/components/layout/layout'
import { useRouter } from 'next/router'
import styles from '@/styles/funeral/booking-list.module.css'
import axios from 'axios'
import swal from 'sweetalert2'
import { RL } from '@/configs/funeral/api-path'
import { useCart1 } from '@/contexts/funeral/CartContext1'
import { z } from 'zod'

export default function BookingList() {
  const router = useRouter()
  const [selectedBillMethod, setSelectedBillMethod] = useState(false) // 發票方式
  const [cartProjects, setCartProjects] = useState([]) //儲存購物車項目
  const [counties, setCounties] = useState([]) //儲存縣市
  const [cities, setCities] = useState([]) // 儲存鄉鎮
  const [selectedCounty, setSelectedCounty] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const billMethodMapping = {
    phoneBill: '手機載具',
    memberBill: '會員載具',
    donateBill: '捐贈發票',
    companyBill: '公司發票',
  }

  // 用於儲存結帳表單的值
  const [formData, setFormData] = useState({
    paymentMethod: '',
    creditCardNumber: '',
    expiryDate: '',
    cvv: '',
    buyerName: '',
    mobile: '',
    telephone: '',
    county: '',
    city: '',
    address: '',
    billMethod: '',
    billNumber: '',
  })
  const [formDataErrors, setFormDataErrors] = useState({
    buyerName: '',
    mobile: '',
  })
  const { clearCart1 } = useCart1()

  useEffect(() => {
    // 使用hook 從 localStorage 讀取購物車資料, 並存到cartItems裡
    const storedCart1 = localStorage.getItem('funeralShoppingCart')
    if (storedCart1) {
      setCartProjects(JSON.parse(storedCart1))
    }
  }, [])

  // 計算項目總價, 儲存在totalPrice裡
  const totalPrice = cartProjects.reduce(
    (total, project) => total + project.project_price * project.qty,
    0,
  )

  // 使用hook獲取所有縣市, 並存至counties裡
  useEffect(() => {
    const fetchCounties = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/project/counties',
        )
        if (response.data.success) {
          setCounties(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching counties:', error)
      }
    }

    fetchCounties()
  }, [])

  // 當選擇的縣市selectedCounty 改變時，獲取對應的鄉鎮市區, 存到cities裡
  useEffect(() => {
    const fetchCities = async () => {
      if (selectedCounty) {
        try {
          const response = await axios.get(
            `http://localhost:3001/project/cities/${selectedCounty}`,
          )
          if (response.data.success) {
            setCities(response.data.data)
          }
        } catch (error) {
          console.error('Error fetching cities:', error)
        }
      } else {
        setCities([])
      }
    }

    fetchCities()
  }, [selectedCounty])

  // 下面兩個分别處理縣市和鄉鎮市區的選擇變更，並更新對應的狀態及表單數據
  const handleCountyChange = (e) => {
    const countyId = e.target.value
    setSelectedCounty(countyId)
    setSelectedCity('')
    setFormData({
      ...formData,
      countyId: countyId,
      cityId: '',
    })
  }

  const handleCityChange = (e) => {
    const cityId = e.target.value
    setSelectedCity(cityId)
    setFormData({
      ...formData,
      cityId: cityId,
    })
  }
  // 表單欄位驗證
  const schemaForm = z.object({
    buyerName: z.string().min(2, { message: '姓名至少兩個字' }),
    mobile: z.string().regex(/^09\d{8}$/, { message: '請填寫正確的手機格式' }),
  })

  // 表單若有輸入或其他變化, 則更新formData狀態
  const handleInputChange = (e) => {
    const { id, value } = e.target
    console.log(id, value)

    const newForm = { ...formData, [id]: value }
    setFormData(newForm)

    // 重置 formDataErrors
    const newFormErrors = {
      buyerName: '',
      mobile: '',
    }

    const result = schemaForm.safeParse(newForm)
    console.log(JSON.stringify(result, null, 4))

    if (!result.success && result?.error?.issues?.length) {
      for (let issue of result.error.issues) {
        newFormErrors[issue.path[0]] = issue.message
      }
    }
    setFormDataErrors(newFormErrors)
  }

  // 用於提交表單數據
  const handleSubmit = async (e) => {
    e.preventDefault()

    // 進行全面驗證
    const result = schemaForm.safeParse(formData)

    if (!result.success) {
      const newFormErrors = {
        buyerName: '',
        mobile: '',
      }
      for (let issue of result.error.issues) {
        newFormErrors[issue.path[0]] = issue.message
      }
      setFormDataErrors(newFormErrors)

      swal.fire({
        icon: 'error',
        title: '表單驗證失敗',
        text: '請檢查並修正錯誤的欄位',
      })
      return // 阻止表單提交
    }
    try {
      const storedCart1 = JSON.parse(
        // 從localStorage獲取購物車裡的數據
        localStorage.getItem('funeralshoppingcart') || '[]',
      )
      // 將formData和storesCart組合成dataToSent
      const dataToSend = {
        ...formData,
        cartProjects: storedCart1,
      }

      // 首先發送到 /ecpay 路由
      const ecpayResponse = await axios.get(
        `http://localhost:3001/ecpay?${new URLSearchParams({ ...dataToSend, amount: totalPrice })}`, // 移除 ?amount
        // 在請求體中傳遞 amount
      )
      console.log(ecpayResponse)
      if (ecpayResponse.data.htmlContent) {
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = ecpayResponse.data.htmlContent
        const form = tempDiv.querySelector('form')
        if (form) {
          document.body.appendChild(form)
          form.submit()
          // 清空localStorage
          localStorage.removeItem('funeralshoppingcart')
          // 清空Context中的購物車
          clearCart1()
        } else {
          console.error('找不到支付表單')
        }
      } else {
        console.error('無效的回應格式')
      }

      // 顯示成功消息並導航
      // swal
      //   .fire({
      //     icon: 'success',
      //     html: `訂單已成功建立`,
      //     showCancelButton: true,
      //     focusConfirm: false,
      //     confirmButtonText: `回首頁`,
      //     cancelButtonText: `回商品列表`,
      //   })
      //   .then((result) => {
      //     if (result.isConfirm) {
      //       router.push('/')
      //     } else {
      //       router.push('/estore/')
      //     }
      //   })
    } catch (error) {
      console.error('發生錯誤:', error)
      // 處理錯誤
    }
  }

  return (
    <Layout>
      {/* <ProgressBar /> */}
      <div
        className={`container-fluid d-flex flex-column flex-md-row justify-content-between align-items-stretch mb-5 ${styles.full}`}
      >
        <div className="row">
          {/* leftCard */}
          <div className="col-md-7 justify-content-center align-items-center">
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
                  backgroundColor: '#F6D554',
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
                      value={formData.buyerName}
                      onChange={handleInputChange}
                    />
                    {formDataErrors.buyerName && (
                      <div className="invalid-feedback">
                        {formDataErrors.buyerName}
                      </div>
                    )}
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
                      value={formData.mobile}
                      onChange={handleInputChange}
                    />
                    {formDataErrors.mobile && (
                      <div className="invalid-feedback">
                        {formDataErrors.mobile}
                      </div>
                    )}
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
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* <!-- 縣市 --> */}
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="county">
                      寄送地址
                    </label>
                    <select
                      className="form-select rounded-pill"
                      id="county"
                      value={selectedCounty}
                      onChange={handleCountyChange}
                    >
                      <option value="">請選擇縣市</option>
                      {counties.map((county) => (
                        <option key={county.county_id} value={county.county_id}>
                          {county.county_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <!-- 鄉鎮市區 --> */}
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="city">
                      鄉鎮市區
                    </label>
                    <select
                      className="form-select rounded-pill"
                      id="city"
                      value={selectedCity}
                      onChange={handleCityChange}
                      disabled={!selectedCounty}
                    >
                      <option value="">請選擇鄉鎮市區</option>
                      {cities.map((city) => (
                        <option key={city.city_id} value={city.city_id}>
                          {city.city_name}
                        </option>
                      ))}
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
                      onChange={handleInputChange}
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
                  backgroundColor: '#F6D554',
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
                    id="companyBill"
                    value="companyBill"
                    style={{ marginTop: '0.3rem' }}
                    checked={selectedBillMethod === 'companyBill'}
                    onChange={() => setSelectedBillMethod('companyBill')}
                  />
                  <label htmlFor="companyBill" className="form-label">
                    公司發票
                  </label>
                  {selectedBillMethod === 'companyBill' && (
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
                {/* 若cartProjects長度大於0, 則顯示購物車項目列表, 否則顯示"購物車是空的" */}
                {cartProjects.length > 0 ? (
                  <>
                    {/* 使用map遍歷cartProjects中的每個project項目 */}
                    {cartProjects.map((r, i) => (
                      <div
                        key={i}
                        className="row align-items-center justify-content-center mb-3"
                      >
                        <div
                          className="col-3 w-auto"
                          style={{ paddingRight: 2 + 'rem' }}
                        >
                          {/* 項目圖片 */}
                          <img
                            src={`http://localhost:3001//project/${r.project_id}.png`}
                            alt="..."
                            className={styles.productImage}
                          />
                        </div>
                        <div className="col-9">
                          <div className="row">
                            <div className="col-12">
                              {/* 項目名稱 */}
                              <div className={`fs-5 ${styles.productName}`}>
                                {r.project_name}
                              </div>
                            </div>
                            <div
                              className={`col-12 ${styles.quantityPriceContainer} mt-2`}
                            >
                              {/* 項目數量 */}
                              {/* <div
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
                              </div> */}

                              {/* 項目價格*項目數量 */}
                              <div
                                className={`justify-content-end fs-4 ${styles.productPrice}`}
                              >
                                $ {r.project_price * r.qty}
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
                    <p className="card-text mb-1 fs-5">發票開立方式</p>
                  </div>
                  <div className="text-end ms-5 ms-auto">
                    <p className="card-text fs-5">
                      {billMethodMapping[selectedBillMethod] || ''}
                    </p>
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
                    onClick={handleSubmit}
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
