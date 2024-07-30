import React, { useEffect, useState } from 'react'
import styles from './insurance.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { INSURANCE_GET_ITEM } from '@/configs/insurance/api-path'

export default function PiPayment04() {
  // 選擇付費方式
  // const [selectedPayment, setSelectedPayment] = useState('')

  const router = useRouter()
  // 從url抓取orderId
  const { OrderId } = router.query

  // 抓取新訂單id
  // const [orderID, setOrderID] = useState('')

  // 抓取保費
  const [planPrice, setPlanPrice] = useState('')
  // 保費轉成數字
  const price = parseFloat(planPrice.replace(/,/g, ''))

  // 綠界付款
  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   try {
  //     // 確認localstorage有收到新成立的訂單編號 (綠界必須用get)

  //     // 用從 URL 獲取的 orderId
  //     if (OrderId) {
  //       const response = await fetch(
  //         `http://localhost:3001/ecpayJ?${new URLSearchParams({ amount: price })}`,
  //       )

  //       const ecpayResponse = await response.json()

  //       if (ecpayResponse.htmlContent) {
  // 方式一
  //         // const tempDiv = document.createElement('div')
  //         // tempDiv.innerHTML = ecpayResponse.htmlContent

  //         // const form = tempDiv.querySelector('form')
  //         // if (form) {
  //         //   document.body.appendChild(form)
  //         //   form.submit()
  //         //   // 再把訂單號碼加入localstorage
  //         //   localStorage.setItem(
  //         //     'OrderId',
  //         //     JSON.stringify({ OrderId: OrderId }),
  //         //   )
  //         // } else {
  //         //   console.error('找不到支付表單')
  //         // }

  //方式二
  //         // 創建一個臨時的iframe
  //         const iframe = document.createElement('iframe')
  //         iframe.style.display = 'none'
  //         document.body.appendChild(iframe)

  //         // 將HTML內容寫入iframe
  //         iframe.contentWindow.document.open()
  //         iframe.contentWindow.document.write(ecpayResponse.htmlContent)
  //         iframe.contentWindow.document.close()

  //         // 提交表單
  //         const form = iframe.contentWindow.document.querySelector('form')
  //         if (form) {
  //           form.submit()
  //           // 再把訂單號碼加入localstorage
  //           localStorage.setItem(
  //             'OrderId',
  //             JSON.stringify({ OrderId: OrderId }),
  //           )
  //         } else {
  //           console.error('找不到支付表單')
  //         }
  //       } else {
  //         console.error('無效的回應格式')
  //       }
  //     } else {
  //       console.error('新增資料庫失敗')
  //     }
  //   } catch (error) {
  //     console.error('發生錯誤:', error)
  //     // 處理錯誤
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (OrderId) {
        const response = await fetch(
          `http://localhost:3001/ecpayJ?${new URLSearchParams({ amount: price })}`,
        )

        const ecpayResponse = await response.json()

        if (ecpayResponse.htmlContent) {
          // 創建一個新的窗口或標籤頁來加載和提交表單
          const newWindow = window.open('', '_blank')
          newWindow.document.write(ecpayResponse.htmlContent)
          newWindow.document.close()
        } else {
          console.error('無效的回應格式')
        }
      } else {
        console.error('新增資料庫失敗')
      }
    } catch (error) {
      console.error('發生錯誤:', error)
    }
  }

  // 從後端抓訂單id跟保險價格
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`${INSURANCE_GET_ITEM}/${OrderId}`)
        console.log('API response:', response.data)
        if (response.data && response.data.data) {
          const orderData = response.data.data
          setPlanPrice(orderData.insurance_premium)
        } else {
          console.log('無效的 API 響應格式')
          return null
        }
      } catch (error) {
        console.log('Error fetching insurance data:', error)
      }
    }
    if (OrderId) {
      fetchOrderData()
    }
  }, [OrderId])
  return (
    <>
      <div className={`container-fluid mb-5 ${styles.allFont}`}>
        <div className="row justify-content-center">
          {/* 請款資訊 */}
          <div className="col-8" style={{ marginTop: '30px' }}>
            <h4 className={styles['top-frame']}>請款資訊</h4>
            <div
              className={`d-flex justify-content-center ${styles['data-frame']}`}
            >
              <div
                className="col-6 d-flex flex-column justify-content-center"
                style={{ paddingLeft: '1.25rem' }}
              >
                <div className="d-flex">
                  <h5
                    className={`col-4 ${styles['text-color']}`}
                    style={{ marginBottom: '.6875rem' }}
                  >
                    訂單號碼
                  </h5>
                  <h5
                    className={`col-8 ${styles['own-green']}`}
                    style={{ color: 'green' }}
                  >
                    PIO{OrderId}
                  </h5>
                </div>
              </div>
              <div className="col-6 d-flex flex-column justify-content-start ">
                <div className="d-flex">
                  <h5
                    className={`col-4 ${styles['text-color']}`}
                    style={{ marginBottom: '.6875rem' }}
                  >
                    保單金額
                  </h5>
                  <h5 className={`col-8 ${styles['own-orange']}`}>
                    NT${planPrice}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          {/* 付費 */}
          <div className="col-8 mb-5" style={{ marginTop: '30px' }}>
            <h4 className={styles['top-frame']}>前往付款</h4>
            <div className={styles['data-frame']}>
              <div className="col-12 px-5">
                <form className="d-flex justify-content-center my-5">
                  <button
                    type="submit"
                    style={{ border: 'none', padding: 0 }}
                    onClick={handleSubmit}
                  >
                    <img src="/pi-pic/ecpay.png" style={{ border: 'none' }} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* 下一步 */}
        <div className="row">
          <div className="d-flex justify-content-center align-items-center">
            <Link href="/insurance" className="text-decoration-none">
              <button className={styles['own-btn4']}>離開</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
