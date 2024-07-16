import React, { useState, useEffect } from 'react'
import Styles from '@/components/funeral/project/card.module.css'
import { useRouter } from 'next/router'
import { PJ_LIST } from '@/configs/funeral/api-path'
import axios from 'axios'

export default function Card() {
  const router = useRouter()
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
                <h6>{card.project_content}</h6>
                <div className="d-flex justify-content-between">
                  <div className="text-start m-2">
                    <p className="card-text">
                      贈送
                      <br />
                      {card.project_text}
                    </p>
                  </div>
                  <div style={{ marginTop: '30px', marginRight: '5px' }}>
                    {card.project_price}
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
