import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '@/components/insurance/insurance.module.css'
import Link from 'next/link'
import swal from 'sweetalert2'
import { useAuth } from '@/contexts/member/auth-context'
import { useRouter } from 'next/router'
import LoginModal from '@/components/member/LoginModal'

export default function TrialCalculation() {
  // 確認是否有登入
  const { auth } = useAuth()
  const router = useRouter()
  // 確認是否有收到試算的表單資料
  const [catDataReceived, setCatDataReceived] = useState(true)
  const [dogDataReceived, setDogDataReceived] = useState(true)

  // 計算保險費用
  const [basicPlan, setBasicPlan] = useState(0)
  const [advancedPlan, setAdvancedPlan] = useState(0)
  const [fullPlan, setFullPlan] = useState(0)

  // 要求要有登入過
  const [showModal, setShowModal] = useState(false)

  // 設定進入付款流程時, 主畫面隱藏式算結果
  useEffect(() => {
    const checkStorage = () => {
      const catData = localStorage.getItem('catDataReceived')
      const dogData = localStorage.getItem('dogDataReceived')

      setCatDataReceived(catData === 'false')
      setDogDataReceived(dogData === 'false')
    }
    // 初始檢查
    checkStorage()
    // 添加事件監聽器以檢測 localStorage 的變化
    window.addEventListener('localStorageChange', checkStorage)
    window.addEventListener('storage', checkStorage) // 保留這個以防其他標籤頁更改 localStorage

    // 清理函數
    return () => {
      window.removeEventListener('localStorageChange', checkStorage)
      window.removeEventListener('storage', checkStorage)
    }
  }, [])

  // 清除 localStorage 內確認有送出表單的函數
  const clearLocalStorage = () => {
    localStorage.removeItem('catDataReceived')
    localStorage.removeItem('dogDataReceived')
    setCatDataReceived(false)
    setDogDataReceived(false)
  }

  const calculatePlan = (data, type) => {
    // 計算邏輯
    const basePrice = 1000
    let breedFactor = data.breed
    let genderFactor = data.gender

    let birthdayFactor
    const age = data.birthday
    if (age <= 77) {
      birthdayFactor = 1
    } else if (age <= 113) {
      birthdayFactor = 1.5
    } else {
      birthdayFactor = 2.25
    }

    let typeFactor
    switch (type) {
      case '基礎方案':
        typeFactor = 1.5
        break
      case '進階方案':
        typeFactor = 2
        break
      case '完整方案':
        typeFactor = 2.2
        break
      default:
        typeFactor = 1
    }

    //計算最終保費
    const premium =
      basePrice * breedFactor * genderFactor * birthdayFactor * typeFactor

    return Math.round(premium).toLocaleString('en-US')
  }

  // 計算不同方案的保費
  useEffect(() => {
    const catData = JSON.parse(localStorage.getItem('catInsuranceData'))
    const dogData = JSON.parse(localStorage.getItem('dogInsuranceData'))

    if (catData || dogData) {
      const data = catData || dogData
      // 這裡假設有一個計算函數，根據實際情況進行調整
      setBasicPlan(calculatePlan(data, '基礎方案'))
      setAdvancedPlan(calculatePlan(data, '進階方案'))
      setFullPlan(calculatePlan(data, '完整方案'))
    }
  }, [])

  // 傳出選擇的方案和價格去localStorage
  const handlePlanSelection = (plan) => {
    localStorage.setItem(
      'selectedPlan',
      JSON.stringify({
        type: plan,
        price:
          plan === '基礎方案'
            ? basicPlan
            : plan === '進階方案'
              ? advancedPlan
              : fullPlan,
      }),
    )
  }

  // 讓按鈕同時具有確認登入 清除 '確認送出表單'標記和 '送出選擇的方案' 三個功能
  const handleButtonClick = async (plan) => {
    if (!auth.b2c_id) {
      await swal.fire({
        text: '請先登入會員!',
        icon: 'error',
      })
      setShowModal(true) //在警告框關閉後顯示登入視窗
      return
    }
    clearLocalStorage()
    handlePlanSelection(plan)
    router.push('./insurance/insurance-payment01')
  }

  useEffect(() => {}, [showModal])

  return (
    <>
      <div className="container-fluid">
        <div
          className="row justify-content-center"
          style={{ margin: 0, padding: '0 60px' }}
        >
          <div className="col-12 d-flex justify-content-center align-items-center">
            <img
              className="img-fluid"
              loading="lazy"
              src="/pic/insurance.png"
              alt=""
            />
            <h2
              className={`d-flex justify-content-center align-items-center ${styles['text-color']}`}
            >
              方案介紹
            </h2>
          </div>
          <h5
            className={`d-flex justify-content-center align-items-center ${styles['text-color']} mt-2`}
          >
            最低每天只要$5起
          </h5>
          {/* 表格 */}
          <div className="col-8 mt-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col" colSpan={2} />
                  <th
                    scope="col"
                    className={styles['pi-options']}
                    style={{ backgroundColor: '#4CB1C8' }}
                  >
                    <h3>基礎方案</h3>
                    <p>(自負額: 損失之30%)</p>
                  </th>
                  <th
                    scope="col"
                    className={styles['pi-options']}
                    style={{ backgroundColor: '#CFE7B1' }}
                  >
                    <h3>進階方案</h3>
                    <p>(自負額: 損失之30%)</p>
                  </th>
                  <th
                    scope="col"
                    className={styles['pi-options']}
                    style={{ backgroundColor: '#F6D554' }}
                  >
                    <h3>完整方案</h3>
                    <p>(自負額: 損失之30%)</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th
                    scope="row"
                    rowSpan={4}
                    style={{ textAlign: 'center', verticalAlign: 'middle' }}
                  >
                    <h5>寵物醫療費用保險</h5>
                  </th>
                  <td className="align-middle">
                    <p
                      className={`${styles['text-color']} text-center`}
                      style={{ fontWeight: 700, marginBottom: 0 }}
                    >
                      每次門診費用
                    </p>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <p className={styles[`text-color`]}>一年最高</p>
                      <h5 style={{ color: '#4CB1C8' }}>1</h5>
                      <p>次</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <p>每次最高</p>
                      <h5 style={{ color: 'red' }}>$1,000</h5>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <p className={styles[`text-color`]}>一年最高</p>
                      <h5 style={{ color: '#94BF5C' }}>3</h5>
                      <p>次</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <p>每次最高</p>
                      <h5 style={{ color: 'red' }}>$1,000</h5>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <p className={styles[`text-color`]}>一年最高</p>
                      <h5 style={{ color: 'red' }}>5</h5>
                      <p>次</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <p>每次最高</p>
                      <h5 style={{ color: 'red' }}>$1,200</h5>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-center align-middle">
                    <p
                      className={styles[`text-color`]}
                      style={{ fontWeight: 700, marginBottom: 0 }}
                    >
                      每次住院費用
                    </p>
                  </th>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <p className={styles[`text-color`]}>一年最高</p>
                      <h5 style={{ color: '#4CB1C8' }}>1</h5>
                      <p>次</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <p>每次最高</p>
                      <h5 style={{ color: 'red' }}>$5,000</h5>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <p className={styles[`text-color`]}>一年最高</p>
                      <h5 style={{ color: '#94BF5C' }}>1</h5>
                      <p>次</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <p>每次最高</p>
                      <h5 style={{ color: 'red' }}>$5,000</h5>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <p className={styles[`text-color`]}>一年最高</p>
                      <h5 style={{ color: 'red' }}>2</h5>
                      <p>次</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <p>每次最高</p>
                      <h5 style={{ color: 'red' }}>$5,000</h5>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-center align-middle">
                    <p
                      className={styles[`text-color`]}
                      style={{ fontWeight: 700, marginBottom: 0 }}
                    >
                      每次手術費用
                    </p>
                  </th>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <p className={styles[`text-color`]}>一年最高</p>
                      <h5 style={{ color: '#4CB1C8' }}>1</h5>
                      <p>次</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <p>每次最高</p>
                      <h5 style={{ color: 'red' }}>$20,000</h5>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <p className={styles[`text-color`]}>一年最高</p>
                      <h5 style={{ color: '#94BF5C' }}>1</h5>
                      <p>次</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <p>每次最高</p>
                      <h5 style={{ color: 'red' }}>$20,000</h5>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <p className={styles[`text-color`]}>一年最高</p>
                      <h5 style={{ color: 'red' }}>2</h5>
                      <p>次</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <p>每次最高</p>
                      <h5 style={{ color: 'red' }}>$20,000</h5>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-center align-middle">
                    <p
                      className={styles[`text-color`]}
                      style={{ fontWeight: 700, marginBottom: 0 }}
                    >
                      保險期間累積最高賠償限額
                    </p>
                  </th>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h4 style={{ color: '#4CB1C8' }}>$25,000</h4>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h4 style={{ color: '#94BF5C' }}>$28,000</h4>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h4 style={{ color: 'red' }}>$56,000</h4>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    rowSpan={4}
                    style={{ textAlign: 'center', verticalAlign: 'middle' }}
                  >
                    <h5>寵物侵權責任保險</h5>
                  </th>
                  <td className="text-center align-middle">
                    <p
                      className={styles[`text-color`]}
                      style={{ fontWeight: 700, marginBottom: 0 }}
                    >
                      每一個人體傷害責任
                    </p>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h4 style={{ color: '#4CB1C8' }}>$100,000</h4>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h4 style={{ color: '#94BF5C' }}>$100,000</h4>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h4 style={{ color: 'red' }}>$100,000</h4>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-center align-middle">
                    <p
                      className={styles[`text-color`]}
                      style={{ fontWeight: 700, marginBottom: 0 }}
                    >
                      每一意外傷害責任
                    </p>
                  </th>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h4 style={{ color: '#4CB1C8' }}>$200,000</h4>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h4 style={{ color: '#94BF5C' }}>$200,000</h4>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h4 style={{ color: 'red' }}>$200,000</h4>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-center align-middle">
                    <p
                      className={styles[`text-color`]}
                      style={{ fontWeight: 700, marginBottom: 0 }}
                    >
                      每一意外事故財物損失責任
                    </p>
                  </th>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h4 style={{ color: '#4CB1C8' }}>$50,000</h4>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h4 style={{ color: '#94BF5C' }}>$50,000</h4>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h4 style={{ color: 'red' }}>$50,000</h4>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-center align-middle">
                    <p
                      className={styles[`text-color`]}
                      style={{ fontWeight: 700, marginBottom: 0 }}
                    >
                      保險期間最高賠償金額
                    </p>
                  </th>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h4 style={{ color: '#4CB1C8' }}>$500,000</h4>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h4 style={{ color: '#94BF5C' }}>$500,000</h4>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h4 style={{ color: 'red' }}>$500,000</h4>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" colSpan={2} />
                  <td>
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h3 style={{ color: 'red' }}>${basicPlan}</h3>
                      <h5>起/年</h5>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        className={styles['own-btn4']}
                        onClick={() => handleButtonClick('基礎方案')}
                      >
                        立即投保
                      </button>
                      {/* {showModal && (
                        <LoginModal onClose={() => setShowModal(false)} />
                      )} */}
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h3 style={{ color: 'red' }}>${advancedPlan}</h3>
                      <h5>起/年</h5>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        className={styles['own-btn4']}
                        onClick={() => handleButtonClick('進階方案')}
                      >
                        立即投保
                      </button>
                      {/* {showModal && (
                        <LoginModal onClose={() => setShowModal(false)} />
                      )} */}
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ marginTop: '1rem' }}
                    >
                      <h3 style={{ color: 'red' }}>${fullPlan}</h3>
                      <h5>起/年</h5>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        className={styles['own-btn4']}
                        onClick={() => handleButtonClick('完整方案')}
                      >
                        立即投保
                      </button>
                      {/* {showModal && (
                        <LoginModal onClose={() => setShowModal(false)} />
                      )} */}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* 說明文字 */}
          <div className="col-8">
            <p style={{ color: '#94BF5C' }}>溫馨提醒:</p>
            <ol>
              <li style={{ color: 'red' }}>
                本保障方案:
                基礎方案新件投保年齡為0歲2個月至6歲5個月，續保可至14歲5個月；進階方案、完整方案新件投保年齡為0歲2個月至6歲5個月；續保可至9歲5個月。惟本公司保留續保與否及調整續年度保費之權利。
              </li>
              <li style={{ color: 'red' }}>
                本保障方案之特定疾病等待期為90天(癌症、膝蓋骨異位、髖關節發育不良、椎間盤突出、心臟疾病、腎臟疾病、癲癇、糖尿病或甲狀腺疾病)，亦即保單生效90天後或續年度之保單所發生之前述疾病，才可申請理賠。
              </li>
              <li style={{ color: 'red' }}>
                本保障方案非第2點所列之其它疾病等待期為30天(保單生效30天後或續年度之保單所發生疾病，才可申請理賠)
              </li>
              <li style={{ color: '#94BF5C' }}>
                要保人與被保險人須為同一人，投保時須年滿18歲。
              </li>
              <li style={{ color: '#94BF5C' }}>
                限飼養並事故發生於中華民國境內(台澎金馬地區)之寵物
              </li>
            </ol>
          </div>
        </div>
      </div>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  )
}
