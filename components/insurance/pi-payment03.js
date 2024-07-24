import React, { useEffect, useMemo, useState } from 'react'
import styles from './insurance.module.css'
import Link from 'next/link'
import ProgressBarCopy from './progress-bar-copy'
import withProgressBar from './withProgressBar'
import Head from 'next/head'
import { useRouter } from 'next/router'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { counties } from '../common/county'
import { cities } from '../common/city'
import { products } from './insurance_product'
import { INSURANCE_ADD_POST } from '@/configs/insurance/api-path'

function PiPayment03() {
  const router = useRouter()
  // 抓取會員id
  const [memberID, setMemberID] = useState('')
  // 要保人資料

  const [holderName, setHolderName] = useState('')
  const [holderID, setHolderID] = useState('')
  const [holderBirthday, setHolderBirthday] = useState('')
  const [holderEmail, setHolderEmail] = useState('')
  const [holderMobile, setHolderMobile] = useState('')
  const [holderCounty, setHolderCounty] = useState('')
  const [holderCity, setHolderCity] = useState('')
  const [holderAddress, setHolderAddress] = useState('')
  // 寵物資料
  const [petName, setPetName] = useState('')
  const [petChip, setPetChip] = useState('')
  const [insuranceStartDate, setInsuranceStartDate] = useState('')
  const [insuranceEndDate, setInsuranceEndDate] = useState('')
  const [planType, setPlanType] = useState('')
  const [planPrice, setPlanPrice] = useState('')
  // 紀錄的圖片(File物件)
  const [selectedImg, setSelectedImg] = useState('/pi-pic/pet-upload.png')

  // 為了判斷保險方案以提供內容
  const selectedProduct = useMemo(() => {
    const product =
      products.find((product) => product.id === planType) || products[0]
    return product
  }, [planType])
  // 為了已審閱並了解貴公司所提供之上述須知及商品簡介
  const [checkedRead, setCheckedRead] = useState(false)

  // 為每個欄位創建錯誤狀態
  const [errors, setErrors] = useState({
    checkedRead: '',
  })

  // 錯誤訊息組件
  const ErrorMessage = ({ message }) =>
    message ? <span style={{ color: 'red' }}>{message}</span> : null

  //寄出表單
  const handleSubmit = async (e) => {
    e.preventDefault()

    // 檢查"已審閱並了解貴公司所提供之上述須知及商品簡介"已勾選
    if (!checkedRead) {
      setErrors((prev) => ({
        ...prev,
        checkedRead: '請勾選後才能進行下一步',
      }))
      return
    }

    setErrors({})

    try {
      const countyData = counties.find(
        (county) => county.label === holderCounty,
      )
      const cityData = cities.find((city) => city.label === holderCity)

      const insuranceData = {
        fk_b2c_id: memberID,
        // 要保人資料
        b2c_name: holderName,
        policyholder_IDcard: holderID,
        policyholder_birthday: holderBirthday,
        fk_policyholder_email: holderEmail,
        fk_policyholder_mobile: holderMobile,
        fk_county_id: countyData ? countyData.value : '',
        fk_city_id: cityData ? cityData.value : '',
        fk_policyholder_address: holderAddress,
        // 寵物資料
        pet_name: petName,
        pet_chip: petChip,
        insurance_start_date: insuranceStartDate,
        insurance_end_date: insuranceEndDate,
        insurance_product: planType,
        insurance_premium: planPrice,
        // 紀錄的圖片(File物件)
        pet_pic: selectedImg,
      }
      // 保存所有數據到 localStorage
      // localStorage.setItem('InsuranceOrder', JSON.stringify(insuranceData))

      // 資料發送到後端
      console.log(insuranceData)
      const response = await fetch(INSURANCE_ADD_POST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(insuranceData),
      })

      if (!response.ok) {
        throw new Error('Failed to save data to server')
      }

      const result = await response.json()
      console.log('Server response:', result)

      // 如果訂單成立, 返回一個order id 進localstorage
      if (result.success) {
        if (result.latestOrderId !== undefined) {
          localStorage.setItem('order_id', result.latestOrderId.toString())
        } else {
          console.error('Latest order ID is undefinded')
        }
      }

      // 跳轉下一頁
      router.push('/insurance/insurance-payment04')
    } catch (error) {
      console.error('保存失敗:', error)
      alert(error.message || '保存失敗，請檢查所有欄位並重試。')
    }
  }

  useEffect(() => {
    // 這個代碼塊只會在客戶端執行
    // 取得並解析 localStorage 中的資料
    const catData = localStorage.getItem('catInsuranceData')
    const dogData = localStorage.getItem('dogInsuranceData')
    const parseData = JSON.parse(catData || dogData) // 整合貓跟狗的資料
    if (parseData) {
      setInsuranceStartDate(parseData.insuranceStartDate) // 保險起始日
    }

    const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan'))
    if (selectedPlan) {
      setPlanType(selectedPlan.type) // 保險品名
      setPlanPrice(selectedPlan.price) // 保險價格
    }

    const petBasicData = JSON.parse(localStorage.getItem('petBasicData'))
    if (petBasicData) {
      setPetChip(petBasicData.PetChip) // 寵物晶片號碼
      setPetName(petBasicData.PetName) // 寵物名字
      setInsuranceEndDate(petBasicData.insuranceEndDate) // 保險結束日
    }

    const petPic = localStorage.getItem('petPhoto') // 寵物照片
    if (petPic) {
      setSelectedImg(petPic)
    }

    const petMemberAuth = localStorage.getItem('petmember-auth') // 會員id
    if (petMemberAuth) {
      const authData = JSON.parse(petMemberAuth)
      setMemberID(authData.b2c_id)
    }

    const holderBasicData = JSON.parse(localStorage.getItem('holderBasicData'))
    if (holderBasicData) {
      const countyData = counties.find(
        (county) => county.value === holderBasicData.fk_county_id,
      )
      const cityData = cities.find(
        (city) => city.value === holderBasicData.fk_city_id,
      )
      setHolderName(holderBasicData.policyholder_name) // 要保人姓名
      setHolderID(holderBasicData.policyholder_IDcard) // 要保人身份證字號
      setHolderBirthday(holderBasicData.policyholder_birthday) // 要保人生日
      setHolderEmail(holderBasicData.fk_policyholder_email) // 要保人信箱
      setHolderMobile(holderBasicData.fk_policyholder_mobile) // 要保人手機
      setHolderCounty(countyData ? countyData.label : '') // 要保人居住縣市
      setHolderCity(cityData ? cityData.label : '') // 要保人居住區
      setHolderAddress(holderBasicData.fk_policyholder_address) // 要保人地址
    }
  }, [])

  console.log('Current planType:', planType)
  console.log('Selected product:', selectedProduct)

  if (!selectedProduct) {
    console.log('No product selected')
    return <div>正在加載...</div>
  }

  return (
    <>
      <Head>
        <title>保單確認 | Petitude</title>
      </Head>
      <div className="container-fluid mb-5">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            {/* 進度條 */}
            <ProgressBarCopy />
            {/* 資料確認 */}
            <div className="col-8" style={{ marginTop: '30px' }}>
              <h4 className={styles['top-frame']}>資料確認</h4>
              <div
                className={`d-flex justify-content-center ${styles['data-frame']}`}
              >
                <div
                  className="col-6 d-flex flex-column justify-content-center"
                  style={{ paddingLeft: '1.25rem' }}
                >
                  <div className="d-flex  mb-3">
                    <h5
                      className={`col-4 ${styles['text-color']}`}
                      style={{ marginBottom: '.6875rem' }}
                    >
                      要保人姓名
                    </h5>
                    <h5 className={`col-8 ${styles['own-green']}`}>
                      {holderName}
                    </h5>
                  </div>
                  <div className="d-flex mb-3">
                    <h5
                      className={`col-4 ${styles['text-color']}`}
                      style={{ marginBottom: '.6875rem' }}
                    >
                      身份證字號
                    </h5>
                    <h5 className={`col-8 ${styles['own-green']}`}>
                      {holderID}
                    </h5>
                  </div>
                  <div className="d-flex mb-3 ">
                    <h5
                      className={`col-4 ${styles['text-color']}`}
                      style={{ marginBottom: '.6875rem' }}
                    >
                      出生年月日
                    </h5>
                    <h5 className={`col-8 ${styles['own-green']}`}>
                      {holderBirthday}
                    </h5>
                  </div>
                  <div className="d-flex ">
                    <h5
                      className={`col-4 ${styles['text-color']}`}
                      style={{ marginBottom: '.6875rem' }}
                    >
                      通訊地址
                    </h5>
                    <h5 className={`col-8 ${styles['own-green']}`}>
                      {holderCounty}
                      {holderCity}
                      {holderAddress}
                    </h5>
                  </div>
                </div>
                <div className="col-6 d-flex flex-column justify-content-start ">
                  <div className="d-flex  mb-3">
                    <h5
                      className={`col-4 ${styles['text-color']}`}
                      style={{ marginBottom: '.6875rem' }}
                    >
                      保單型式
                    </h5>
                    <h5 className={`col-8 ${styles['own-green']}`}>電子保單</h5>
                  </div>
                  <div className="d-flex mb-3">
                    <h5
                      className={`col-4 ${styles['text-color']}`}
                      style={{ marginBottom: '.6875rem' }}
                    >
                      保單寄送信箱
                    </h5>
                    <h5 className={`col-8 ${styles['own-green']}`}>
                      {holderEmail}
                    </h5>
                  </div>
                  <div className="d-flex mb-3 ">
                    <h5
                      className={`col-4 ${styles['text-color']}`}
                      style={{ marginBottom: '.6875rem' }}
                    >
                      連絡電話
                    </h5>
                    <h5 className={`col-8 ${styles['own-green']}`}>
                      {holderMobile}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            {/* 投保方案確認 */}
            <div className="col-8" style={{ marginTop: '30px' }}>
              <h4 className={styles['top-frame']}>投保方案確認</h4>
              <div
                className={`d-flex justify-content-center ${styles['data-frame-up']}`}
              >
                <div
                  className="col-5 d-flex flex-column justify-content-start align-items-center"
                  style={{
                    padding: '0 20px',
                  }}
                >
                  <div
                    className="img-fluid rounded-circle"
                    style={{
                      width: '250px',
                      height: '250px',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={selectedImg}
                      className="img-fluid rounded-circle"
                      style={{
                        backgroundColor: '#D9D9D9',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </div>
                <div className="col-7 d-flex flex-column justify-content-center ">
                  <div className="d-flex  mb-3">
                    <h5
                      className={`col-3 ${styles['text-color']}`}
                      style={{ marginBottom: '.6875rem' }}
                    >
                      寵物姓名
                    </h5>
                    <h5 className={`col-8 ${styles['own-green']}`}>
                      {petName}
                    </h5>
                  </div>
                  <div className="d-flex mb-3">
                    <h5
                      className={`col-3 ${styles['text-color']}`}
                      style={{ marginBottom: '.6875rem' }}
                    >
                      晶片號碼
                    </h5>
                    <h5 className={`col-8 ${styles['own-green']}`}>
                      {petChip}
                    </h5>
                  </div>
                  <div className="d-flex mb-3 ">
                    <h5
                      className={`col-3 ${styles['text-color']}`}
                      style={{ marginBottom: '.6875rem' }}
                    >
                      投保期間
                    </h5>
                    <h5 className={`col-8 ${styles['own-green']}`}>
                      {insuranceStartDate} 零時起至 {insuranceEndDate} 零時止
                    </h5>
                  </div>
                  <div className="d-flex ">
                    <h5
                      className={`col-3 ${styles['text-color']}`}
                      style={{ marginBottom: '.6875rem' }}
                    >
                      投保方案
                    </h5>
                    <h5 className={`col-8 ${styles['own-green']}`}>
                      {planType || '未選擇方案'}
                    </h5>
                  </div>
                </div>
              </div>
              <div
                className={`d-flex justify-content-center ${styles['data-frame']}`}
              >
                <div className="col-6 justify-content-center align-items-center">
                  <h5
                    className={`text-center ${styles['text-color']}`}
                    style={{ marginBottom: '1.25rem' }}
                  >
                    【寵物醫療費用保險】
                  </h5>

                  <ul style={{ padding: 0, paddingLeft: 100 }}>
                    {[
                      {
                        label: '每次門診(最高)費用',
                        value: `${selectedProduct.clinicFee}元,一年最高${selectedProduct.clinicTime}次`,
                      },
                      {
                        label: '每次住院(最高)費用',
                        value: `${selectedProduct.hospitalFee}元,一年最高${selectedProduct.hospitalTime}次`,
                      },
                      {
                        label: '每次手術(最高)費用',
                        value: `${selectedProduct.surgeryFee}元,一年最高${selectedProduct.surgeryTime}次`,
                      },
                      {
                        label: '保險期間內累積最高賠償限額',
                        value: `${selectedProduct.maxPayment}元`,
                      },
                    ].map((item, index) => (
                      <li
                        key={index}
                        className={`d-flex ${styles['item-dot']}`}
                      >
                        <i className="bi bi-check-square me-1" />
                        <h5
                          className={styles['text-color']}
                          style={{ marginBottom: '.6875rem' }}
                        >
                          {item.label}
                        </h5>
                        <h5 className={styles['own-green']}>NT {item.value}</h5>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-6 justify-content-center align-items-center">
                  <h5
                    className={`text-center ${styles['text-color']}`}
                    style={{ marginBottom: '1.25rem' }}
                  >
                    【寵物侵權責任保險】
                  </h5>
                  <ul style={{ padding: 0, paddingLeft: 140 }}>
                    <li className={`d-flex ${styles['item-dot']}`}>
                      <i className="bi bi-check-square me-1" />
                      <h5
                        className={styles['text-color']}
                        style={{ marginBottom: '.6875rem' }}
                      >
                        每一個人體傷責任
                      </h5>
                      <h5 className={styles['own-green']}>NT 100,000元</h5>
                    </li>
                    <li className={`d-flex ${styles['item-dot']}`}>
                      <i className="bi bi-check-square me-1" />
                      <h5
                        className={styles['text-color']}
                        style={{ marginBottom: '.6875rem' }}
                      >
                        每一意外事故體傷責任
                      </h5>
                      <h5 className={styles['own-green']}>NT 200,000元</h5>
                    </li>
                    <li className={`d-flex ${styles['item-dot']}`}>
                      <i className="bi bi-check-square me-1" />
                      <h5
                        className={styles['text-color']}
                        style={{ marginBottom: '.6875rem' }}
                      >
                        每一意外事故財物損失責任
                      </h5>
                      <h5 className={styles['own-green']}>NT 50,000元</h5>
                    </li>
                    <li className={`d-flex ${styles['item-dot']}`}>
                      <i className="bi bi-check-square me-1" />
                      <h5
                        className={styles['text-color']}
                        style={{ marginBottom: '.6875rem' }}
                      >
                        保險期間最高賠償金額
                      </h5>
                      <h5 className={styles['own-green']}>NT 500,000元</h5>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* 總計保費 */}
            <div className="col-8 d-flex justify-content-end align-items-end my-3">
              <h5 className="me-1">總計保費</h5>
              <h2
                className={styles['own-orange']}
                style={{ marginBottom: '4px' }}
              >
                NT${planPrice}
              </h2>
            </div>
            {/* 確認同意 */}
            <div className="col-8">
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
                  <h5>本人已審閱並了解貴公司所提供須知及商品簡介</h5>
                  <ErrorMessage message={errors.checkedRead} />
                </label>
              </div>
            </div>
          </div>
          {/* 下一步 */}
          <div className="row">
            <div className="d-flex justify-content-center align-items-center">
              <Link
                href="/insurance/insurance-payment02"
                className="text-decoration-none"
              >
                <button className={styles['own-btn4']}>上一步</button>
              </Link>
              <button className={styles['own-btn4']} type="submit">
                下一步
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default withProgressBar(PiPayment03)
