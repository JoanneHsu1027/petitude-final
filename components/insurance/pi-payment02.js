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

function PiPayment02() {
  const router = useRouter()
  const formRef = useRef(null)
  // 儲存會員資料
  const [memberData, setMemberData] = useState({
    fk_policyholder_email: '',
    fk_policyholder_mobile: '',
    fk_county_id: '',
    fk_city_id: '',
    fk_policyholder_address: '',
  })

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
  // 為了已審閱並了解貴公司所提供之上述須知及商品簡介
  const [checkedRead, setCheckedRead] = useState(false)

  // 為每個欄位創建錯誤狀態
  const [errors, setErrors] = useState({
    policyholder_name: '',
    policyholder_IDcard: '',
    policyholder_birthday: '',
    fk_policyholder_email: '',
    fk_policyholder_mobile: '',
    fk_county_id: '',
    fk_city_id: '',
    fk_policyholder_address: '',
    // checkedRead: '',
  })

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
      fk_policyholder_mobile: z
        .string()
        .regex(/^09\d{2}(-?\d{3}){2}$/, { message: '請填寫正確的手機格式' }),
      fk_county_id: z.string().min(1, { message: '請選擇縣市' }),
      fk_city_id: z.string().min(1, { message: '請選擇城市' }),
      fk_policyholder_address: z.string().min(1, { message: '請填寫詳細地址' }),
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
      //   fk_policyholder_mobile: formDataObject.fk_policyholder_mobile,
      //   fk_county_id: formDataObject.fk_county_id,
      //   fk_city_id: formDataObject.fk_city_id,
      //   fk_policyholder_address: formDataObject.fk_policyholder_address,
      // })

      // 成功提示

      // 跳轉下一頁
      router.push('/insurance/insurance-payment03')
      console.log(
        'Submitted mobile number:',
        formDataObject.fk_policyholder_mobile,
      )
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

  // 獲取會員資料
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/petcompany/b2c_members',
        )
        setMemberData(response.data)
        setSelectedCounty(response.data.fk_county_id) // 設置初始縣市
      } catch (error) {
        console.error('Error fetching member data:', error)
      }
    }

    fetchMemberData()
  }, [])

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
            className="col-8 d-flex flex-column justify-content-center align-items-center"
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
                              message={errors.fk_policyholder_mobile}
                            />
                          </h5>
                        </label>
                        <input
                          className={styles['sheet-input']}
                          type="text"
                          id="fk_policyholder_mobile"
                          name="fk_policyholder_mobile"
                          style={{ width: '100%' }}
                          value={memberData.fk_policyholder_mobile}
                          onChange={(e) =>
                            setMemberData({
                              ...memberData,
                              fk_policyholder_mobile: e.target.value,
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
                        <ErrorMessage
                          message={errors.fk_policyholder_address}
                        />
                      </h5>
                    </label>
                  </div>
                  <div className="d-flex ">
                    <select
                      className={`${styles['sheet-input']} me-3`}
                      style={{ width: '49%' }}
                      id="fk_county_id"
                      name="fk_county_id"
                      // value={selectedCounty}
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
                    id="fk_policyholder_address"
                    name="fk_policyholder_address"
                    value={memberData.fk_policyholder_address}
                    onChange={(e) =>
                      setMemberData({
                        ...memberData,
                        fk_policyholder_address: e.target.value,
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
