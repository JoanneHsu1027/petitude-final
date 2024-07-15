import React, { useState, useEffect } from 'react'
import Styles from '@/components/funeral/project/card.module.css'
import { useRouter } from 'next/router'
import { PJ_LIST } from '@/configs/api-path'

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
    // setLoading(true);
    const controller = new AbortController()
    const signal = controller.signal
    

    fetch(`${PJ_LIST}?${new URLSearchParams(router.query)}`, { signal })
      .then((r) => r.json())
      .then((myData) => {
        console.log(data)
        setData(myData)
        // setLoading(false);
      })
      .catch((ex) => {
        // setLoadingError('載入資料時發生錯誤');
        // setLoading(false);
        console.log('fetch-ex:', ex)
      })

    return () => {
      controller.abort() // 取消上一次的 ajax
    }
  }, [router])

  console.log(`PJ_LIST render--------`)
  console.log('Data to render:', data) // 確認設置的資料

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
                    {r.project_level.split('\n\n').map((project_level, idx) => (
                      <p key={idx} className={Styles.cardDetails}>
                        {project_level}
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
