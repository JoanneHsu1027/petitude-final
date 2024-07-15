import React, { useState, useEffect } from 'react'
import Styles from '@/components/funeral/project/card.module.css'
import { useRouter } from 'next/router'
import { PJ_LIST } from '@/configs/funeral/api-path'
import axios from 'axios'

// 重新定義 cardData
const cardData = [
  {
    title: '溫馨寵物 -個別羽化',
    description:
      '生命雖短，愛卻無疆。我們為愛寵設計的告別儀式，不僅是對生命的尊重，更是對每份愛的證明。無論何時決定，免費冰存都將為您騰出思考的空間。在這份旅程終點，讓我們攜手將愛寵的故事。',
    details: '免費結緣往生被/十字被\n\n免費靈體冰存14天\n\n免費懷念骨灰罐',
    price: 'NTD 7000',
    imageSrc: '/funeral/Vector 20.png',
    link: '/funeral/funeral/booking-list',
  },
  {
    title: '尊榮寵物 -個別羽化',
    description:
      '生命雖短，愛卻無疆。我們為愛寵設計的告別儀式，不僅是對生命的尊重，更是對每份愛的證明。無論何時決定，免費冰存都將為您騰出思考的空間。在這份旅程終點，讓我們攜手將愛寵的故事。',
    details: '免費結緣往生被/十字被\n\n免費靈體冰存14天\n\n免費懷念骨灰罐',
    price: 'NTD 9000',
    imageSrc: '/funeral/index_n5.png',
    link: '/funeral/funeral/booking-list',
  },
  {
    title: '朋友寵物 - 集體羽化',
    description:
      '生命雖短，愛卻無疆。我們為愛寵設計的告別儀式，不僅是對生命的尊重，更是對每份愛的證明。無論何時決定，免費冰存都將為您騰出思考的空間。在這份旅程終點，讓我們攜手將愛寵的故事。',
    details: '免費結緣往生被/十字被\n\n 免費靈體冰存14天\n\n 免費懷念骨灰罐',
    price: 'NTD 4000',
    imageSrc: '/funeral/Vector 21.png',
    link: '/funeral/funeral/booking-list',
  },
]

export default function Card() {
  const router = useRouter()
  const [data, setData] = useState(cardData) // 使用 cardData 作為初始數據
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  console.log('API URL:', PJ_LIST)
  useEffect(() => {
    const fetchData = async () => {
      const page = router.query.page || 1
      const keyword = router.query.keyword || ''
      setIsLoading(true)
      try {
        const response = await axios.get(
          `${PJ_LIST}?page=${page}&keyword=${keyword}`,
        )
        console.log('API Response:', response.data)
        if (
          response.data &&
          response.data.rows &&
          response.data.rows.length > 0
        ) {
          setData(response.data.rows) // 如果 API 返回有效數據，使用 API 數據
        } else {
          console.log('No data from API, using hardcoded data')
          setData(cardData) // 如果 API 沒有返回有效數據，使用硬編碼數據
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
        setError('Failed to load data from API. Using default data.')
        // 保持使用 cardData
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [router.query.page, router.query.keyword])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div title="生前契約" pageName="project-list">
      <div className="row">
        {data.map((card, i) => (
          <div className="col-md-4 text-center p-2" key={i}>
            <div className={Styles.card}>
              <img className={Styles.cardImage} src={card.imageSrc} alt="" />
              <div className={Styles.cardContent}>
                <h5>{card.title}</h5>
                <h6>{card.description}</h6>
                <div className="d-flex justify-content-between">
                  <div>
                    {typeof card.details === 'string' &&
                      card.details.split('\n\n').map((detail, idx) => (
                        <p key={idx} className={Styles.cardDetails}>
                          {detail}
                        </p>
                      ))}
                  </div>
                  <div style={{ marginTop: '30px', marginRight: '5px' }}>
                    {card.price}
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
                      router.push(card.link)
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
