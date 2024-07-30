import { useState, useEffect } from 'react'
import Layout from '@/components/layout/layout'
import { useRouter } from 'next/router'
import styles from '@/styles/estore/bookingList.module.css'
import axios from 'axios'
import swal from 'sweetalert2'
import { useCart } from '@/contexts/estore/CartContext'
import { useAuth } from '@/contexts/member/auth-context'
import { z } from 'zod'
import { RequestList } from '@/configs/estore/api-path'

export default function BookingList() {
  const { auth } = useAuth()
  const router = useRouter()
  const [selectedBillMethod, setSelectedBillMethod] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [counties, setCounties] = useState([])
  const [cities, setCities] = useState([])
  const [selectedCounty, setSelectedCounty] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const billMethodMapping = {
    phoneBill: '手機載具',
    memberBill: '會員載具',
    donateBill: '捐贈發票',
    companyBill: '公司發票',
  }

  const [formData, setFormData] = useState({
    buyerName: '',
    mobile: '',
    telephone: '',
    countyId: '',
    cityId: '',
    address: '',
    billMethod: '',
    billNumber: '',
  })
  const [formDataErrors, setFormDataErrors] = useState({
    buyerName: '',
    mobile: '',
  })

  const { clearCart } = useCart()

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('zh-TW', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  useEffect(() => {
    // 從 localStorage 讀取購物車資料
    const storedCart = localStorage.getItem('joannesshoppingcart')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }

    // 從 auth 獲取 b2c_id 並獲取用戶資料
    if (auth?.b2c_id) {
      fetchUserData(auth.b2c_id)
    }
  }, [auth])

  const fetchUserData = async (b2c_id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/product/user/${b2c_id}`,
      )
      if (response.data.success) {
        const userData = response.data.data
        setFormData((prevData) => ({
          ...prevData,
          buyerName: userData.b2c_name || '',
          mobile: userData.b2c_mobile || '',
          countyId: userData.fk_county_id || '',
          cityId: userData.fk_city_id || '',
          address: userData.b2c_address || '',
        }))

        // 更新選中的縣市和城市
        setSelectedCounty(userData.fk_county_id || '')
        setSelectedCity(userData.fk_city_id || '')

        // 如果有縣市 ID,獲取對應的城市數據
        if (userData.fk_county_id) {
          fetchCities(userData.fk_county_id)
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product_price * item.qty,
    0,
  )

  useEffect(() => {
    // 獲取所有縣市
    const fetchCounties = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/product/counties',
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

  // 將 fetchCities 函數移到組件內部
  const fetchCities = async (countyId) => {
    if (countyId) {
      try {
        const response = await axios.get(
          `http://localhost:3001/product/cities/${countyId}`,
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

  // 修改 handleCountyChange 函數
  const handleCountyChange = (e) => {
    const countyId = e.target.value
    setSelectedCounty(countyId)
    setSelectedCity('')
    setFormData((prevData) => ({
      ...prevData,
      countyId: countyId,
      cityId: '',
    }))
    fetchCities(countyId)
  }

  const handleCityChange = (e) => {
    const cityId = e.target.value
    setSelectedCity(cityId)
    setFormData((prevData) => ({
      ...prevData,
      cityId: cityId,
    }))
  }

  const schemaForm = z.object({
    buyerName: z.string().min(2, { message: '姓名至少兩個字' }),
    mobile: z.string().regex(/^09\d{8}$/, { message: '請填寫正確的手機格式' }),
  })

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

    // 如果驗證通過，繼續原有的提交邏輯
    try {
      const dataToSend = {
        ...formData,
        b2c_id: auth.b2c_id, // 添加 b2c_id
        county: counties.find(
          (c) => c.county_id === parseInt(formData.countyId),
        )?.county_name,
        city: cities.find((c) => c.city_id === parseInt(formData.cityId))
          ?.city_name,
        cartItems: JSON.parse(
          localStorage.getItem('joannesshoppingcart') || '[]',
        ),
      }

      // 首先發送到資料庫新增路由
      const paymentResponse = await axios.post(
        `http://localhost:3001/product/cartCheckout`,
        dataToSend,
      )

      if (paymentResponse.data.success) {
        // 資料庫新增成功就處理綠界
        const ecpayResponse = await axios.get(
          `http://localhost:3001/ecpay?${new URLSearchParams({ ...dataToSend, amount: totalPrice })}`,
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
            localStorage.removeItem('joannesshoppingcart')
            // 清空Context中的購物車
            clearCart()
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
                      className={`form-control rounded-pill ${formDataErrors.buyerName ? 'is-invalid' : ''}`}
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
                      className={`form-control rounded-pill ${formDataErrors.mobile ? 'is-invalid' : ''}`}
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
                      value={formData.address}
                      onChange={handleInputChange}
                    />
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
                className="card-body d-none d-md-block"
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
                                className={`justify-content-start fs-5 ${styles.quantity}`}
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
                                $ {formatCurrency(r.product_price * r.qty)}
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
                    <p className="card-text fs-4">
                      $ {formatCurrency(totalPrice)}
                    </p>
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
              <div
                className="card-body d-block d-md-none"
                style={{
                  backgroundColor: '#F6D554',
                  color: '#6A513D',
                  borderEndStartRadius: 30 + 'px',
                  borderEndEndRadius: 30 + 'px',
                  fontWeight: 900,
                  paddingRight: '16px',
                  paddingLeft: '16px',
                }}
              >
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((r, i) => (
                      <div
                        key={i}
                        className="row d-flex align-items-center justify-content-center mb-3 my-0"
                      >
                        <div
                          className="col-3 d-flex align-items-center justify-content-center"
                          style={{ padding: 0 + 'px' }}
                        >
                          <img
                            src={`http://localhost:3001/estore/A${r.pk_product_id}.png`}
                            alt="..."
                            className={styles.productImage}
                            style={{ padding: 0 + 'px' }}
                          />
                        </div>
                        <div className="col-9">
                          <div className="row">
                            <div
                              className="col-12"
                              style={{ paddingLeft: 0 + 'px' }}
                            >
                              <div className={`fs-6 ${styles.productName}`}>
                                {r.product_name}
                              </div>
                            </div>
                            <div
                              className={`col-12 ${styles.quantityPriceContainer} mt-2`}
                              style={{ paddingLeft: 0 + 'px' }}
                            >
                              <div
                                className={`justify-content-start ${styles.quantity}`}
                                style={{
                                  color: '#FFF5CF',
                                  backgroundColor: '#6A513D',
                                  borderRadius: 30 + 'px',
                                  paddingLeft: 1 + 'rem',
                                  paddingRight: 1 + 'rem',
                                  paddingTop: 0.1 + 'rem',
                                  paddingBottom: 0.1 + 'rem',
                                  fontSize: 16 + 'px',
                                }}
                              >
                                數量：{r.qty}
                              </div>
                              <div
                                className={`justify-content-end fs-4 ${styles.productPrice}`}
                              >
                                $ {formatCurrency(r.product_price * r.qty)}
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
                    <p className="card-text fs-4">
                      $ {formatCurrency(totalPrice)}
                    </p>
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
