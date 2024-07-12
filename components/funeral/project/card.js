import React, { useState, useEffect } from 'react'
import Styles from '@/components/funeral/project/card.module.css'
import { useRouter } from 'next/router'
import { PJ_LIST } from '@/configs/api-path'
import axios from 'axios'

export default function Card() {
  const router = useRouter()
  
  const [data, setData] = useState({
    success: false,
    rows: [],
  })

  // const cardData = [
  //   {
  //     title: '溫馨寵物 -個別羽化',
  //     description:
  //       '生命雖短，愛卻無疆。我們為愛寵設計的告別儀式，不僅是對生命的尊重，更是對每份愛的證明。無論何時決定，免費冰存都將為您騰出思考的空間。在這份旅程終點，讓我們攜手將愛寵的故事。',
  //     details: '免費結緣往生被/十字被\n\n免費靈體冰存14天\n\n免費懷念骨灰罐',
  //     imageSrc: '/funeral/Vector 20.png',
  //     link: '/pages/cart',
  //   },
  //   {
  //     title: '尊榮寵物 -個別羽化',
  //     description:
  //       '生命雖短，愛卻無疆。我們為愛寵設計的告別儀式，不僅是對生命的尊重，更是對每份愛的證明。無論何時決定，免費冰存都將為您騰出思考的空間。在這份旅程終點，讓我們攜手將愛寵的故事。',
  //     details: '免費結緣往生被/十字被\n\n免費靈體冰存14天\n\n免費懷念骨灰罐',
  //     imageSrc: '/funeral/index_n5.png',
  //     link: '/pages/funeral',
  //   },
  //   {
  //     title: '朋友寵物 - 集體羽化',
  //     description:
  //       '生命雖短，愛卻無疆。我們為愛寵設計的告別儀式，不僅是對生命的尊重，更是對每份愛的證明。無論何時決定，免費冰存都將為您騰出思考的空間。在這份旅程終點，讓我們攜手將愛寵的故事。',
  //     details: '免費結緣往生被/十字被\n\n 免費靈體冰存14天\n\n 免費懷念骨灰罐',
  //     imageSrc: '/funeral/Vector 21.png',
  //     link: '/pages/funeral',
  //   },
  // ]

  // useEffect放在return上面(串後端api)
  useEffect(() => {
    const fetchData = async () => {
      const page = router.query.page || 1
      const keyword = ''
      try {
        const res = await fetch(`${PJ_LIST}?page=${page}`)
        const myData = await res.json()
        console.log(myData)
        setData(myData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }

      const searchKeyword = new URLSearchParams(keyword)

      const res = await axios.get(`${PJ_LIST}?${searchKeyword.toString()}`)
    }
    fetchData()
  }, [router.query])

  return (
    <div title="生前契約" pageName="project-list">
      <div className="row">
        {data.rows.length > 0 ? (
          data.rows.map((r, i) => (
            <div className="col-md-4 text-center p-2" key={i}>
              <div className={Styles.card}>
                <img className={Styles.cardImage} src={r.imageSrc} alt="" />
                <div className={Styles.cardContent}>
                  <h5>{r.project_name}</h5>
                  <h6>{r.project_content}</h6>
                  <div>
                    {typeof r.project_content === 'string' &&
                      r.project_content
                        .split('\n\n')
                        .map((project_content, idx) => (
                          <p key={idx} className={Styles.cardDetails}>
                            {project_content}
                          </p>
                        ))}
                  </div>
                  <div className="d-flex justify-content-end align-items-right mb-3">
                    <button
                      type="button"
                      className={`btnPlan btn btn-warning ${Styles.btnPlan}`}
                      onClick={() => {
                        router.push('/funeral/funeral/booking-list')
                      }}
                    >
                      選擇方案
                    </button>

                    <button
                      type="button"
                      className={`btnPlan1 btn btn-warning ${Styles.btnPlan1}`}
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>載入中...</p> // 在資料加載完成前顯示加載訊息
        )}
      </div>
    </div>
  )
}
