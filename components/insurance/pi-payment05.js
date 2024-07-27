import React, { useEffect, useState } from 'react'
import styles from './insurance.module.css'
import Link from 'next/link'
import ProgressBarCopy from './progress-bar-copy'
import withProgressBar from './withProgressBar'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import { INSURANCE_EDIT_ITEM } from '@/configs/insurance/api-path'

function PiPayment05() {
  const router = useRouter()

  const [orderId, setOrderId] = useState(null)

  // 清除 localStorage 內確認有送出表單的函數
  const clearLocalStorage = () => {
    localStorage.removeItem('catInsuranceData')
    localStorage.removeItem('dogInsuranceData')
    localStorage.removeItem('selectedPlan')
    localStorage.removeItem('petPhoto')
    localStorage.removeItem('petBasicData')
    localStorage.removeItem('holderBasicData')
    localStorage.removeItem('order_id')
    localStorage.removeItem('OrderId')
  }

  const toHomeButton = () => {
    clearLocalStorage()
    router.push('/insurance')
  }

  const toMemberButton = () => {
    clearLocalStorage()
    router.push('/member')
  }

  // 取得orderId, 更新保單資料的付款狀態
  useEffect(() => {
    const storedOrderId = JSON.parse(localStorage.getItem('OrderId'))

    if (storedOrderId) {
      setOrderId(storedOrderId)

      const updatePaymentStatus = async () => {
        const storedOrderId = localStorage.getItem('OrderId')

        if (!storedOrderId) {
          console.error('No OrderId found in localStorage')
          return
        }

        let orderId
        try {
          // 解析存儲的值， JSON 轉型
          const parsedOrderId = JSON.parse(storedOrderId)
          orderId = parsedOrderId.OrderId || parsedOrderId
        } catch (error) {
          // 如果解析失敗，假設它已經是正確的格式
          orderId = storedOrderId
        }

        try {
          const response = await axios.put(INSURANCE_EDIT_ITEM, {
            OrderId: orderId,
            payment_status: '已付款',
          })

          if (response.data.message === '訂單支付狀態更新成功') {
            console.log('付款狀態更新成功')
          }
        } catch (error) {
          console.error(
            '更新付款狀態失敗:',
            error.response ? error.response.data : error.message,
          )
          // 如果有具體的錯誤信息，顯示它
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            console.error('具體錯誤:', error.response.data.error)
          }
        }
      }

      updatePaymentStatus()
    } else {
      console.error('No OrderId found in localStorage')
    }
  }, [])

  return (
    <>
      <Head>
        <title>投保完成 | Petitude</title>
      </Head>
      <div className={`container-fluid mb-5 ${styles.allFont}`}>
        <div className="row justify-content-center">
          {/* 進度條 */}
          <ProgressBarCopy />
          {/* 圖片 */}
          <div
            className="col-8"
            style={{ margin: '1.25rem 0 1.875rem 0', padding: '0 240px' }}
          >
            <img
              src="/pi-pic/payment-done.jpg"
              className="img-fluid"
              style={{ borderRadius: '1.875rem' }}
              alt=""
            />
          </div>
          {/* 投保完成 */}
          <div
            className="col-8 text-center"
            style={{ margin: '.625rem 0 1.875rem 0' }}
          >
            <h1 className={styles['text-color']}>投保完成!</h1>
          </div>
          {/* 下一步 */}
          <div className="col-8">
            <div className="d-flex justify-content-center align-items-center">
              <button className={styles['own-btn4']} onClick={toHomeButton}>
                回首頁
              </button>

              <button className={styles['own-btn4']} onClick={toMemberButton}>
                會員中心
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default withProgressBar(PiPayment05)
