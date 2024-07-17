import React, { useState, useEffect } from 'react'
import Styles from '@/components/funeral/project/card.module.css'
import { useRouter } from 'next/router'
import { PJ_LIST } from '@/configs/funeral/api-path'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Card() {
  const router = useRouter()
  // 設定card.js文字過長的問題
  const [isExpanded, setIsExpanded] = useState(false)
  const [data, setData] = useState({
    success: false,
    rows: [],
  })

  const fetchData = async () => {
    try {
      setData((prevData) => ({ ...prevData, success: false }))
      const res = await axios.get(PJ_LIST)
      const myData = res.data
      console.log('Received data:', myData)
      if (myData.success) {
        setData(myData)
      } else {
        console.error('API request was not successful:', myData)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setData((prevData) => ({ ...prevData, success: false }))
    }
  }

  useEffect(() => {
    if (router.isReady) {
      fetchData()
    }
  }, [router.isReady])

  return (
    <div title="生前契約" pageName="project-list">
      <div className="row">
        {data.rows.map((card, i) => (
          <div className="col-md-4 text-center p-2" key={card.project_id}>
            <div className={Styles.card}>
              {/* 引入後端public圖片 */}
              <img
                className={Styles.cardImage}
                src={`http://localhost:3001//project/${card.project_id}.png`}
                alt=""
              />
              <div className={Styles.cardContent}>
                <h5>{card.project_name}</h5>
                <div className="mb-3">
                  <h6
                    style={{
                      overflow: 'hidden',
                      whiteSpace: isExpanded ? 'normal' : 'nowrap',
                      textOverflow: 'ellipsis',
                      margin: '0',
                      justifyContent: 'end',
                    }}
                  >
                    {card.project_content}
                  </h6>
                  {!isExpanded && (
                    <span
                      style={{ cursor: 'pointer', fontSize: '12px' }}
                      onClick={() => setIsExpanded(true)}
                    >
                      ...閱讀更多
                    </span>
                  )}
                  {isExpanded && (
                    <span
                      style={{ color: 'gray', cursor: 'pointer' }}
                      onClick={() => setIsExpanded(false)}
                    >
                      <div>
                        <i
                          class="bi bi-triangle-fill"
                          style={{ color: 'gray' }}
                        ></i>
                      </div>
                    </span>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  <div className="text-start me-4" style={{ flex: 1 }}>
                    <p className="card-text">
                      贈送
                      <br />
                      {card.project_text}
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <h6>售價: {card.project_price} 元</h6>
                  </div>
                </div>

                <div className="d-flex justify-content-end align-items-right mb-3">
                  <button
                    type="button"
                    className={`btnPlan btn btn-warning ${Styles.btnPlan}`}
                    onClick={() => {
                      localStorage.setItem(
                        'selectedOption',
                        JSON.stringify(card),
                      )
                      router.push('/funeral/funeral/booking-list')
                    }}
                  >
                    選擇方案
                  </button>
                  <button
                    type="button"
                    className={`btnPlan1 btn btn-warning ${Styles.btnPlan1}`}
                    onClick={() => router.push('/funeral/funeral/cart')}
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
