import React, { useEffect, useState } from 'react'
import styles from './insurance.module.css'
import Link from 'next/link'
import ProgressBarCopy from './progress-bar-copy'
import withProgressBar from './withProgressBar'
import Head from 'next/head'

function PiPayment03() {
  const [data, setData] = useState(null)
  const [dates, setDates] = useState({ startDate: null, endDate: null })

  // 取得選擇的保險方案
  const [planType, setPlanType] = useState('')
  // 取得選擇的保險價格
  const [planPrice, setPlanPrice] = useState('')

  //處理時區問題
  const formatDate = (date) => {
    if (!date) return '' //如果日期無效,返回空字串
    return date
      .toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Taipei', // 使用台北時區
      })
      .replace(/\//g, '-') // 將斜線替換為連字符，以保持 YYYY-MM-DD 格式
  }

  useEffect(() => {
    // 這個代碼塊只會在客戶端執行
    // 取得並解析 localStorage 中的資料
    const catData = localStorage.getItem('catInsuranceData')
    const dogData = localStorage.getItem('dogInsuranceData')
    const parseData = JSON.parse(catData || dogData) // 整合貓跟狗的資料
    setData(parseData)
  }, [])

  useEffect(() => {
    if (data && data.insuranceStartDate) {
      // 取得保險起始日期並計算結束日期
      const startDate = new Date(data.insuranceStartDate)
      const endDate = new Date(startDate) //保險結束日期
      endDate.setFullYear(endDate.getFullYear() + 1)

      setDates({ startDate, endDate })
    }
  }, [data])

  useEffect(() => {
    const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan'))
    if (selectedPlan) {
      setPlanType(selectedPlan.type)
      setPlanPrice(selectedPlan.price)
    }
  }, [])

  if (!data || !dates.startDate) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>保單確認 | Petitude</title>
      </Head>
      <div className="container-fluid mb-5">
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
                  <h5 className={`col-8 ${styles['own-green']}`}>賴皇城</h5>
                </div>
                <div className="d-flex mb-3">
                  <h5
                    className={`col-4 ${styles['text-color']}`}
                    style={{ marginBottom: '.6875rem' }}
                  >
                    身份證字號
                  </h5>
                  <h5 className={`col-8 ${styles['own-green']}`}>A123456789</h5>
                </div>
                <div className="d-flex mb-3 ">
                  <h5
                    className={`col-4 ${styles['text-color']}`}
                    style={{ marginBottom: '.6875rem' }}
                  >
                    出生年月日
                  </h5>
                  <h5 className={`col-8 ${styles['own-green']}`}>1999-08-08</h5>
                </div>
                <div className="d-flex ">
                  <h5
                    className={`col-4 ${styles['text-color']}`}
                    style={{ marginBottom: '.6875rem' }}
                  >
                    通訊地址
                  </h5>
                  <h5 className={`col-8 ${styles['own-green']}`}>
                    台北市內湖區安和路333號5樓
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
                    abc@gmail.com
                  </h5>
                </div>
                <div className="d-flex mb-3 ">
                  <h5
                    className={`col-4 ${styles['text-color']}`}
                    style={{ marginBottom: '.6875rem' }}
                  >
                    連絡電話
                  </h5>
                  <h5 className={`col-8 ${styles['own-green']}`}>0928606557</h5>
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
                style={{ padding: '0 20px 20px 20px' }}
              >
                <img
                  src="/pi-pic/pet-upload.png"
                  className="img-fluid rounded-circle mb-4"
                  style={{ backgroundColor: '#D9D9D9', width: '60%' }}
                />
              </div>
              <div className="col-7 d-flex flex-column justify-content-center ">
                <div className="d-flex  mb-3">
                  <h5
                    className={`col-4 ${styles['text-color']}`}
                    style={{ marginBottom: '.6875rem' }}
                  >
                    寵物姓名
                  </h5>
                  <h5 className={`col-8 ${styles['own-green']}`}>Amber</h5>
                </div>
                <div className="d-flex mb-3">
                  <h5
                    className={`col-4 ${styles['text-color']}`}
                    style={{ marginBottom: '.6875rem' }}
                  >
                    晶片號碼
                  </h5>
                  <h5 className={`col-8 ${styles['own-green']}`}>
                    1213245897415235
                  </h5>
                </div>
                <div className="d-flex mb-3 ">
                  <h5
                    className={`col-4 ${styles['text-color']}`}
                    style={{ marginBottom: '.6875rem' }}
                  >
                    投保期間
                  </h5>
                  <h5 className={`col-8 ${styles['own-green']}`}>
                    {formatDate(dates.startDate)} 零時起至{' '}
                    {formatDate(dates.endDate)} 零時止
                  </h5>
                </div>
                <div className="d-flex ">
                  <h5
                    className={`col-4 ${styles['text-color']}`}
                    style={{ marginBottom: '.6875rem' }}
                  >
                    投保方案
                  </h5>
                  <h5 className={`col-8 ${styles['own-green']}`}>{planType}</h5>
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
                <ul style={{ padding: 0 }}>
                  <li className={`d-flex ${styles['item-dot']}`}>
                    <i className="bi bi-check-square me-1" />
                    <h5
                      className={styles['text-color']}
                      style={{ marginBottom: '.6875rem' }}
                    >
                      {' '}
                      每次門診(最高)費用
                    </h5>
                    <h5 className={styles['own-green']}>
                      NT 1,000元,一年最高3次
                    </h5>
                  </li>
                  <li className={`d-flex ${styles['item-dot']}`}>
                    <i className="bi bi-check-square me-1" />
                    <h5
                      className={styles['text-color']}
                      style={{ marginBottom: '.6875rem' }}
                    >
                      每次住院(最高)費用
                    </h5>
                    <h5 className={styles['own-green']}>
                      NT 5,000元,一年最高1次
                    </h5>
                  </li>
                  <li className={`d-flex ${styles['item-dot']}`}>
                    <i className="bi bi-check-square me-1" />
                    <h5
                      className={styles['text-color']}
                      style={{ marginBottom: '.6875rem' }}
                    >
                      {' '}
                      每次手術(最高)費用
                    </h5>
                    <h5 className={styles['own-green']}>
                      NT 20,000元,一年最高1次
                    </h5>
                  </li>
                  <li className={`d-flex ${styles['item-dot']}`}>
                    <i className="bi bi-check-square me-1" />
                    <h5
                      className={styles['text-color']}
                      style={{ marginBottom: '.6875rem' }}
                    >
                      保險期間內累積最高賠償限額
                    </h5>
                    <h5 className={styles['own-green']}>NT 25,000元</h5>
                  </li>
                </ul>
              </div>
              <div className="col-6 justify-content-center align-items-center">
                <h5
                  className={`text-center ${styles['text-color']}`}
                  style={{ marginBottom: '1.25rem' }}
                >
                  【寵物侵權責任保險】
                </h5>
                <ul style={{ padding: 0 }}>
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
            <Link
              href="/insurance/insurance-payment04"
              className="text-decoration-none"
            >
              <button className={styles['own-btn4']}>下一步</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default withProgressBar(PiPayment03)
