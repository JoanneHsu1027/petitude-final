import React, { useRef, useState } from 'react'
import styles from './insurance.module.css'
import Link from 'next/link'
import ProgressBarCopy from './progress-bar-copy'
import withProgressBar from './withProgressBar'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { counties } from '../common/county'
import { cities } from '../common/city'

function PiPayment02() {
  const router = useRouter()
  const formRef = useRef(null)

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

  // 為了已審閱並了解貴公司所提供之上述須知及商品簡介
  const [checkedRead, setCheckedRead] = useState(false)

  //寄出表單
  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(formRef.current)
    const holderName = formData.get('policyholder_name')
    const holderID = formData.get('policyholder_IDcard')

    // 驗證身份證字號
    if (!validatedID(holderID)) {
      setIdError('請輸入正確的身份證字號')
      return
    } else {
      setIdError('')
    }

    // 檢查"已審閱並了解貴公司所提供之上述須知及商品簡介"已勾選
    if (!checkedRead) {
      alert('請勾選已審閱並了解貴公司所提供之上述須知及商品簡介')
      return
    }

    try {
      // 收集所有表單數據
      const petName = formData.get('pet_name')

      // 檢查必要欄位是否填寫
      const missingFields = []

      if (!holderName) missingFields.push('要保人姓名')
      if (!holderID) missingFields.push('身份證字號')

      if (missingFields.length > 0) {
        throw new Error(`請填寫以下必要欄位：${missingFields.join(', ')}`)
      }

      // 保存所有數據到 localStorage
      // localStorage.setItem(
      //   'holderBasicData',
      //   JSON.stringify({
      //     HolderName: ,
      //     HolderID: holderID,
      //     HolderBirthday: ,
      //     HolderEmail: ,
      //     HolderMobile: ,
      //     HolderCounty: ,
      //     HolderCity: ,
      //     HodlerAddress: ,
      //   }),
      // )

      // 成功提示
      alert('資料已成功保存，請繼續下一步驟')
      // 跳轉下一頁
      router.push('/insurance/insurance-payment02')
    } catch (error) {
      console.error('保存失敗:', error)
      alert(error.message || '保存失敗，請檢查所有欄位並重試。')
    }
  }
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
                  <div className="d-flex flex-column">
                    <label htmlFor="policyholder_name">
                      <h5
                        className={styles['text-color']}
                        style={{ marginBottom: '11px' }}
                      >
                        要/被保險人姓名(寵物登記證記載之飼主)
                      </h5>
                    </label>
                    <input
                      className={styles['sheet-input']}
                      type="text"
                      id="policyholder_name"
                      name="policyholder_name"
                      style={{ width: '50%' }}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <label htmlFor="b2c_IDcard">
                      <h5
                        className={`${styles['text-color']} mt-4`}
                        style={{ marginBottom: '11px' }}
                      >
                        身份證字號
                      </h5>
                    </label>
                    <input
                      className={styles['sheet-input']}
                      type="text"
                      id="policyholder_IDcard"
                      name="policyholder_IDcard"
                      style={{ width: '50%' }}
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
                      </h5>
                    </label>
                    <input
                      className={styles['sheet-input']}
                      type="date"
                      id="b2c_birth"
                      style={{ width: '50%' }}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <label htmlFor="b2c_email">
                      <h5
                        className={`${styles['text-color']} mt-4`}
                        style={{ marginBottom: '11px' }}
                      >
                        Email
                      </h5>
                    </label>
                    <input
                      className={styles['sheet-input']}
                      type="text"
                      id="b2c_email"
                      style={{ width: '50%' }}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <label htmlFor="b2c_mobile">
                      <h5
                        className={`${styles['text-color']} mt-4`}
                        style={{ marginBottom: '11px' }}
                      >
                        手機號碼
                      </h5>
                    </label>
                    <input
                      className={styles['sheet-input']}
                      type="text"
                      id="pb2c_mobile"
                      style={{ width: '50%' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="address">
                      <h5
                        className={`${styles['text-color']} mt-4`}
                        style={{ marginBottom: '11px' }}
                      >
                        聯絡地址
                      </h5>
                    </label>
                  </div>
                  <div className="d-flex ">
                    <select
                      className={`${styles['sheet-input']} me-3`}
                      style={{ width: '49%' }}
                      id="fk_county_id"
                      name="fk_county_id"
                      value={formData.fk_county_id}
                      onChange={(e) => {
                        handleChange(e)
                        setFormData((prevData) => ({
                          ...prevData,
                          fk_city_id: '',
                        })) // 重置城市
                      }}
                      required
                    >
                      <option value="">請選擇縣市</option>
                    </select>
                    <select
                      className={styles['sheet-input']}
                      type="text"
                      id="fk_city_id"
                      style={{ width: '49%' }}
                    >
                      <option value>2</option>
                    </select>
                  </div>
                  <input
                    className={styles['sheet-input']}
                    style={{ marginTop: '.6875rem' }}
                    type="text"
                    id="b2c_address"
                  />
                </div>
              </div>
            </div>
            {/* 確認同意 */}
            <div className="col-12">
              <div
                className="form-check d-flex align-items-start my-3"
                style={{ margin: 0, padding: 0 }}
              >
                <input
                  className="form-check-input"
                  style={{
                    border: '3px solid #B7B7B7',
                    marginLeft: 0,
                    paddingTop: 10,
                  }}
                  type="checkbox"
                  id="flexCheckDefault6"
                  checked={checkedRead}
                  onChange={(e) => setCheckedRead(e.target.checked)}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault6"
                >
                  <h5>本人已審閱並了解貴公司所提供須知及商品簡介 </h5>
                </label>
              </div>
            </div>
            {/* 下一步 */}
            <div className="col-12">
              <div>
                <div className="d-flex justify-content-center align-items-center">
                  <Link
                    href="/insurance/insurance-payment01"
                    className="text-decoration-none"
                  >
                    <button className={styles['own-btn4']}>上一步</button>
                  </Link>
                  <Link
                    href="/insurance/insurance-payment03"
                    className="text-decoration-none"
                  >
                    <button className={styles['own-btn4']}>下一步</button>
                  </Link>
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
