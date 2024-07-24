import React, { useState, useEffect } from 'react'
import Styles from '@/components/funeral/project/card.module.css'
import { useRouter } from 'next/router'
import { PJ_LIST } from '@/configs/funeral/api-path'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useCart1 } from '@/contexts/funeral//CartContext1'
import swal from 'sweetalert2'

export default function Card() {
  const router = useRouter()
  // 設定card.js文字過長的問題
  // const [isExpanded, setIsExpanded] = useState(false)
  const [expandedCards, setExpandedCards] = useState({})

  const [data, setData] = useState({
    success: false,
    rows: [],
  })

  const toggleExpand = (projectId) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [projectId]: !prevState[projectId],
    }))
  }

  const fetchData = async () => {
    const page = router.query.page || 1
    try {
      setData((prevData) => ({ ...prevData, success: false }))
      const res = await axios.get(PJ_LIST, {
        params: {
          page: page,
        },
      })
      const myData = res.data
      console.log('Received data:', myData)
      if (myData.success) {
        setData(myData)
      } else {
        console.error('API request was not successful:', myData)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
      if (error.response) {
        console.error('Response data:', error.response.data)
        console.error('Response status:', error.response.status)
      }
      setData((prevData) => ({ ...prevData, success: false }))
    }
  }

  useEffect(() => {
    if (router.isReady) {
      fetchData()
    }
  }, [])
  // 這個addToCarts在CartContext裡面
  const { addToCarts } = useCart1()

  const handleAddItem = (event, project) => {
    event.preventDefault()
    event.stopPropagation()
    addToCarts(project)
  }

  return (
    <div title="生前契約" pageName="project-list">
      <div className="row">
        {data.rows.map((card) => (
          <div className="col-md-4 text-center p-2" key={card.project_id}>
            <div className={Styles.card}>
              {/* 引入後端public圖片 */}
              <img
                className={Styles.cardImage}
                src={`http://localhost:3001//project/${card.project_id}.png`}
                alt=""
              />
              <div className={Styles.cardContent}>
                <h5 className={Styles.cardTitle}>{card.project_name}</h5>

                <div className="mb-5">
                  <h6
                    style={{
                      overflow: 'hidden',
                      whiteSpace: expandedCards[card.project_id]
                        ? 'normal'
                        : 'nowrap',
                      textOverflow: 'ellipsis',
                      margin: '1rem',
                      justifyContent: 'end',
                    }}
                  >
                    {card.project_content}
                  </h6>
                  {!expandedCards[card.project_id] && (
                    <span
                      style={{ cursor: 'pointer', fontSize: '1rem' }}
                      onClick={() => toggleExpand(card.project_id)}
                    >
                      ...閱讀更多
                    </span>
                  )}
                  {expandedCards[card.project_id] && (
                    <span
                      style={{ color: 'gray', cursor: 'pointer' }}
                      onClick={() => toggleExpand(card.project_id)}
                    >
                      <div>
                        <i
                          class="bi bi-triangle-fill"
                          style={{ color: '#6A513D', fontSize: '0.9rem' }}
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
                  {/* <button
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
                  </button> */}
                  <button
                    className={`btnPlan1 btn btn-warning ${Styles.btnPlan1}`}
                    onClick={(e) => {
                      handleAddItem(e, card)
                      swal.fire(
                        '已加入!',
                        `${card.project_name} 已被加入購物車!`,
                        'success',
                      )
                    }}
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
