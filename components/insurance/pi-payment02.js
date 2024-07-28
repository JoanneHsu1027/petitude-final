import React, { useEffect, useRef, useState } from 'react'
import styles from './insurance.module.css'
import Link from 'next/link'
import ProgressBarCopy from './progress-bar-copy'
import withProgressBar from './withProgressBar'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { counties } from '../common/county'
import { cities } from '../common/city'
import { z } from 'zod'
import axios from 'axios'
import { INSURANCE_GET_B2C } from '@/configs/insurance/api-path'

function PiPayment02() {
  const router = useRouter()
  const formRef = useRef(null)

  // 取得使用者會員Id
  const getMemberId = () => {
    const authData = localStorage.getItem('petmember-auth')
    if (authData) {
      const parsedData = JSON.parse(authData)
      return parsedData.b2c_id
    }
    return null
  }

  //勾選後根據登入會員id去抓後端資料
  const fetchMemberData = async (memberId) => {
    try {
      const response = await axios.get(`${INSURANCE_GET_B2C}/${memberId}`)
      console.log('API response:', response.data)
      if (response.data && response.data.data) {
        return response.data.data
      } else {
        console.log('無效的 API 響應格式')
        return null
      }
    } catch (error) {
      console.log('Error fetching member data:', error)
      return null
    }
  }

  // 儲存會員資料
  const [memberData, setMemberData] = useState({
    policyholder_name: '',
    policyholder_IDcard: '',
    policyholder_birthday: '',
    fk_policyholder_email: '',
    policyholder_mobile: '',
    fk_county_id: '',
    fk_city_id: '',
    policyholder_address: '',
  })

  // 為每個欄位創建錯誤狀態
  const [errors, setErrors] = useState({
    policyholder_name: '',
    policyholder_IDcard: '',
    policyholder_birthday: '',
    fk_policyholder_email: '',
    policyholder_mobile: '',
    fk_county_id: '',
    fk_city_id: '',
    policyholder_address: '',
  })

  // 選擇是否帶入會員資料
  const [useInfo, setUseInfo] = useState(false)

  // 台灣身分證字號驗證
  const [idError, setIdError] = useState('')
  const validatedID = (id) => {
    const idRegex = /^[A-Z][12]\d{8}$/
    if (!idRegex.test(id)) {
      return false
    }
    const letterValue = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'.indexOf(id[0]) + 10
    const n1 = Math.floor(letterValue / 10)
    const n2 = letterValue % 10
    const digits = id.slice(1).split('').map(Number)

    const weightedSum =
      n1 +
      n2 * 9 +
      digits[0] * 8 +
      digits[1] * 7 +
      digits[2] * 6 +
      digits[3] * 5 +
      digits[4] * 4 +
      digits[5] * 3 +
      digits[6] * 2 +
      digits[7] * 1 +
      digits[8]

    return weightedSum % 10 === 0
  }

  // 為了縣市的選擇
  const [selectedCounty, setSelectedCounty] = useState('')
  // 為了區的選擇
  const [filteredCities, setFilteredCities] = useState([])

  // 選擇帶入會員資料
  const handleCheckboxChange = async (e) => {
    const isChecked = e.target.checked
    setUseInfo(isChecked)

    if (isChecked) {
      const memberId = getMemberId()

      if (memberId) {
        try {
          const fullMemberData = await fetchMemberData(memberId)

          if (fullMemberData) {
            const newMemberData = {
              policyholder_name: fullMemberData.b2c_name || '',
              policyholder_IDcard: fullMemberData.b2c_IDcard || '',
              policyholder_birthday: fullMemberData.b2c_birth
                ? new Date(fullMemberData.b2c_birth).toISOString().split('T')[0]
                : '',
              fk_policyholder_email: fullMemberData.b2c_email || '',
              policyholder_mobile: fullMemberData.b2c_mobile || '',
              fk_county_id: fullMemberData.fk_county_id || '',
              fk_city_id: fullMemberData.fk_city_id || '',
              policyholder_address: fullMemberData.b2c_address || '',
            }

            setMemberData(newMemberData)
            setSelectedCounty(fullMemberData.fk_county_id)
          }
        } catch (error) {
          console.log('獲取會員數據失敗:', error)
        }
      }
    } else {
      setMemberData({
        policyholder_name: '',
        policyholder_IDcard: '',
        policyholder_birthday: '',
        fk_policyholder_email: '',
        policyholder_mobile: '',
        fk_county_id: '',
        fk_city_id: '',
        policyholder_address: '',
      })
      setSelectedCounty()
    }
  }

  //寄出表單
  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(formRef.current)

    // 驗證表單資料
    const schemaForm = z.object({
      policyholder_name: z.string().min(2, { message: '姓名至少兩個字' }),
      policyholder_IDcard: z
        .string()
        .refine(validatedID, { message: '請輸入正確的身份證字號' }),
      policyholder_birthday: z.string().min(1, { message: '請填寫出生年月日' }),
      fk_policyholder_email: z
        .string()
        .email({ message: '請填寫正確的電子郵件地址' }),
      policyholder_mobile: z
        .string()
        .regex(/^09\d{2}(-?\d{3}){2}$/, { message: '請填寫正確的手機格式' }),
      fk_county_id: z.string().min(1, { message: '請選擇縣市' }),
      fk_city_id: z.string().min(1, { message: '請選擇城市' }),
      policyholder_address: z.string().min(1, { message: '請填寫詳細地址' }),
    })

    const formDataObject = Object.fromEntries(formData.entries())
    const result = schemaForm.safeParse(formDataObject)

    if (!result.success) {
      //顯示驗證錯誤
      const newErrors = {}
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message
      })
      setErrors(newErrors)
      return
    }

    try {
      // 保存所有數據到 localStorage
      localStorage.setItem('holderBasicData', JSON.stringify(formDataObject))

      // 更新會員資料
      // await axios.put('http://localhost:3001/petcompany/b2c_members', {
      //   fk_policyholder_email: formDataObject.fk_policyholder_email,
      //   policyholder_mobile: formDataObject.policyholder_mobile,
      //   fk_county_id: formDataObject.fk_county_id,
      //   fk_city_id: formDataObject.fk_city_id,
      //   policyholder_address: formDataObject.policyholder_address,
      // })

      // 跳轉下一頁
      router.push('/insurance/insurance-payment03')
      console.log(
        'Submitted mobile number:',
        formDataObject.policyholder_mobile,
      )
      console.log('Submitted address:', formDataObject.policyholder_address)
    } catch (error) {
      console.error('保存失敗:', error)
      alert(error.message || '保存失敗，請檢查所有欄位並重試。')
    }
  }

  // 錯誤訊息組件
  const ErrorMessage = ({ message }) =>
    message ? (
      <span style={{ color: 'red', marginLeft: '10px' }}>{message}</span>
    ) : null

  // 根據縣市過濾城市
  useEffect(() => {
    if (selectedCounty) {
      const filtered = cities.filter(
        (city) => city.fk_county_id === parseInt(selectedCounty),
      )
      setFilteredCities(filtered)
    } else {
      setFilteredCities([])
    }
  }, [selectedCounty])

  useEffect(() => {
    if (useInfo) {
      const memberId = getMemberId()
      if (memberId) {
        fetchMemberData(memberId).then((fullMemberData) => {
          if (fullMemberData) {
            setMemberData({
              policyholder_name: fullMemberData.b2c_name || '',
              policyholder_IDcard: fullMemberData.b2c_IDcard || '',
              policyholder_birthday: fullMemberData.b2c_birth
                ? new Date(fullMemberData.b2c_birth).toISOString().split('T')[0]
                : '',
              fk_policyholder_email: fullMemberData.b2c_email || '',
              policyholder_mobile: fullMemberData.b2c_mobile || '',
              fk_county_id: fullMemberData.fk_county_id || '',
              fk_city_id: fullMemberData.fk_city_id || '',
              policyholder_address: fullMemberData.b2c_address || '',
            })
            setSelectedCounty(fullMemberData.fk_county_id)
          }
        })
      }
    }
  }, [useInfo])

  return (
    <>
      <Head>
        <title>保人資料 | Petitude</title>
      </Head>
      <div className="container-fluid mb-5">
        <div className="row justify-content-center">
          {/* 進度條 */}
          <ProgressBarCopy />
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`col-8 d-flex flex-column justify-content-center align-items-center ${styles.allFont}`}
          >
            {/* 要保人資料 */}
            <div className="col-12" style={{ marginTop: '30px' }}>
              <h4 className={styles['top-frame']}>要保人資料</h4>
              <div
                className={`d-flex justify-content-center ${styles['data-frame']}`}
              >
                <div className="col-12 justify-content-center align-items-center px-5">
                  <div className="col-12 d-flex flex-row">
                    <div className="col-6">
                      <div>
                        <input
                          className="form-check-input"
                          style={{
                            border: '3px solid #B7B7B7',
                            marginLeft: 0,
                            paddingTop: 10,
                          }}
                          type="checkbox"
                          id="loadInfo"
                          name="loadInfo"
                          checked={useInfo}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="loadInfo"
                        >
                          <p>以下資訊同步會員基本資料</p>
                        </label>
                      </div>
                      <div className="d-flex flex-column">
                        <label htmlFor="policyholder_name">
                          <h5
                            className={styles['text-color']}
                            style={{ marginBottom: '11px' }}
                          >
                            要/被保險人姓名(寵物登記證記載之飼主)
                            <ErrorMessage message={errors.policyholder_name} />
                          </h5>
                        </label>
                        <input
                          className={styles['sheet-input']}
                          type="text"
                          id="policyholder_name"
                          name="policyholder_name"
                          style={{ width: '100%' }}
                          value={memberData.policyholder_name}
                          onChange={(e) =>
                            setMemberData({
                              ...memberData,
                              policyholder_name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <label htmlFor="b2c_IDcard">
                          <h5
                            className={`${styles['text-color']} mt-4`}
                            style={{ marginBottom: '11px' }}
                          >
                            身份證字號
                            <ErrorMessage
                              message={errors.policyholder_IDcard}
                            />
                          </h5>
                        </label>
                        <input
                          className={styles['sheet-input']}
                          type="text"
                          id="policyholder_IDcard"
                          name="policyholder_IDcard"
                          style={{ width: '100%' }}
                          value={memberData.policyholder_IDcard}
                          onChange={(e) =>
                            setMemberData({
                              ...memberData,
                              policyholder_IDcard: e.target.value,
                            })
                          }
                        />
                        {idError && <p style={{ color: 'red' }}>{idError}</p>}
                      </div>
                      <div className="d-flex flex-column">
                        <label htmlFor="b2c_birth">
                          <h5
                            className={`${styles['text-color']} mt-4`}
                            style={{ marginBottom: '11px' }}
                          >
                            出生年月日
                            <ErrorMessage
                              message={errors.policyholder_birthday}
                            />
                          </h5>
                        </label>
                        <input
                          className={styles['sheet-input']}
                          type="date"
                          id="policyholder_birthday"
                          name="policyholder_birthday"
                          style={{ width: '100%' }}
                          value={memberData.policyholder_birthday}
                          onChange={(e) =>
                            setMemberData({
                              ...memberData,
                              policyholder_birthday: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <label htmlFor="b2c_email">
                          <h5
                            className={`${styles['text-color']} mt-4`}
                            style={{ marginBottom: '11px' }}
                          >
                            Email
                            <ErrorMessage
                              message={errors.fk_policyholder_email}
                            />
                          </h5>
                        </label>
                        <input
                          style={{ width: '100%' }}
                          className={styles['sheet-input']}
                          type="text"
                          id="fk_policyholder_email"
                          name="fk_policyholder_email"
                          value={memberData.fk_policyholder_email}
                          onChange={(e) =>
                            setMemberData({
                              ...memberData,
                              fk_policyholder_email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <label htmlFor="b2c_mobile">
                          <h5
                            className={`${styles['text-color']} mt-4`}
                            style={{ marginBottom: '11px' }}
                          >
                            手機號碼
                            <ErrorMessage
                              message={errors.policyholder_mobile}
                            />
                          </h5>
                        </label>
                        <input
                          className={styles['sheet-input']}
                          type="text"
                          id="policyholder_mobile"
                          name="policyholder_mobile"
                          style={{ width: '100%' }}
                          value={memberData.policyholder_mobile}
                          onChange={(e) =>
                            setMemberData({
                              ...memberData,
                              policyholder_mobile: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-end align-items-end">
                      <img
                        src="/pi-pic/footprints.png"
                        style={{ width: '50%', height: '50%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address">
                      <h5
                        className={`${styles['text-color']} mt-4`}
                        style={{ marginBottom: '11px' }}
                      >
                        聯絡地址
                        <ErrorMessage message={errors.policyholder_address} />
                      </h5>
                    </label>
                  </div>
                  <div className="d-flex ">
                    <select
                      className={`${styles['sheet-input']} me-3`}
                      style={{ width: '49%' }}
                      id="fk_county_id"
                      name="fk_county_id"
                      value={memberData.fk_county_id}
                      onChange={(e) => {
                        setSelectedCounty(e.target.value)
                        setMemberData({
                          ...memberData,
                          fk_county_id: e.target.value,
                          fk_city_id: '',
                        })
                      }}
                    >
                      <option value="">請選擇縣市</option>
                      {counties.map((county) => (
                        <option key={county.value} value={county.value}>
                          {county.label}
                        </option>
                      ))}
                    </select>

                    <select
                      className={styles['sheet-input']}
                      style={{ width: '49%' }}
                      id="fk_city_id"
                      name="fk_city_id"
                      value={memberData.fk_city_id}
                      onChange={(e) =>
                        setMemberData({
                          ...memberData,
                          fk_city_id: e.target.value,
                        })
                      }
                    >
                      <option value>請選擇行政區</option>
                      {filteredCities.map((city) => (
                        <option key={city.value} value={city.value}>
                          {city.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    className={styles['sheet-input']}
                    style={{ marginTop: '.6875rem' }}
                    type="text"
                    id="policyholder_address"
                    name="policyholder_address"
                    value={memberData.policyholder_address}
                    onChange={(e) =>
                      setMemberData({
                        ...memberData,
                        policyholder_address: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* 下一步 */}
            <div className="col-12 mt-4">
              <div>
                <div className="d-flex justify-content-center align-items-center">
                  <Link
                    href="/insurance/insurance-payment01"
                    className="text-decoration-none"
                  >
                    <button className={styles['own-btn4']}>上一步</button>
                  </Link>
                  <button className={styles['own-btn4']} type="submit">
                    下一步
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default withProgressBar(PiPayment02)
