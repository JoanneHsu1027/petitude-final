import React from 'react'
import Styles from '@/components/funeral/project/card.module.css'
import { useRouter } from 'next/router'

export default function Card() {
  const router = useRouter()
  const cardData = [
    {
      title: '溫馨寵物 -個別羽化',
      description:
        '生命雖短，愛卻無疆。我們為愛寵設計的告別儀式，不僅是對生命的尊重，更是對每份愛的證明。無論何時決定，免費冰存都將為您騰出思考的空間。在這份旅程終點，讓我們攜手將愛寵的故事。',
      details: '免費結緣往生被/十字被\n\n免費靈體冰存14天\n\n免費懷念骨灰罐',
      imageSrc: '/funeral/Vector 20.png',
      link: '/pages/cart',
    },
    {
      title: '尊榮寵物 -個別羽化',
      description:
        '生命雖短，愛卻無疆。我們為愛寵設計的告別儀式，不僅是對生命的尊重，更是對每份愛的證明。無論何時決定，免費冰存都將為您騰出思考的空間。在這份旅程終點，讓我們攜手將愛寵的故事。',
      details: '免費結緣往生被/十字被\n\n免費靈體冰存14天\n\n免費懷念骨灰罐',
      imageSrc: '/funeral/index_n5.png',
      link: '/pages/funeral',
    },
    {
      title: '朋友寵物 - 集體羽化',
      description:
        '生命雖短，愛卻無疆。我們為愛寵設計的告別儀式，不僅是對生命的尊重，更是對每份愛的證明。無論何時決定，免費冰存都將為您騰出思考的空間。在這份旅程終點，讓我們攜手將愛寵的故事。',
      details: '免費結緣往生被/十字被\n\n 免費靈體冰存14天\n\n 免費懷念骨灰罐',
      imageSrc: '/funeral/Vector 21.png',
      link: '/pages/funeral',
    },
  ]

  return (
    <div className="row">
      {cardData.map((card, index) => (
        <div className="col-md-4 text-center p-2" key={index}>
          <div className={Styles.card}>
            <img className={Styles.cardImage} src={card.imageSrc} alt="" />
            <div className={Styles.cardContent}>
              <h5>{card.title}</h5>
              <h6>{card.description}</h6>
              <div>
                {card.details.split('\n\n').map((detail, idx) => (
                  <p key={idx} className={Styles.cardDetails}>
                    {detail}
                  </p>
                ))}
              </div>
              <div className="d-flex justify-content-end align-items-right mb-3">
                <button
                  type="button"
                  className={`btnPlan btn btn-warning ${Styles.btnPlan}`}
                  onClick={() => {
                    if (confirm('確定嗎?')) {
                      router.push('/funeral/funeral/booking-list')
                    }
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
      ))}
    </div>
  )
}
