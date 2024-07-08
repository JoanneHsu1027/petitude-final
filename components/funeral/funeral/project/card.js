import React from 'react'
import Button from '../../common/button'
import ImageComponent from '../../common/image'
import Styles from './card.module.css'
import Link from 'next/link'

// import Cart from '../../../pages/cart'

export default function Card() {
  const cardData = [
    {
      title: '溫馨寵物 -個別羽化',
      description:
        '生命雖短，愛卻無疆。我們為愛寵設計的告別儀式，不僅是對生命的尊重，更是對每份愛的證明。無論何時決定，免費冰存都將為您騰出思考的空間。在這份旅程終點，讓我們攜手將愛寵的故事。',
      details: '免費結緣往生被/十字被\n\n免費靈體冰存14天\n\n免費懷念骨灰罐',
      imageSrc: '/pics/Vector 20.png',
      link: '/pages/cart',
    },
    {
      title: '尊榮寵物 -個別羽化',
      description:
        '生命雖短，愛卻無疆。我們為愛寵設計的告別儀式，不僅是對生命的尊重，更是對每份愛的證明。無論何時決定，免費冰存都將為您騰出思考的空間。在這份旅程終點，讓我們攜手將愛寵的故事。',
      details: '免費結緣往生被/十字被\n\n免費靈體冰存14天\n\n免費懷念骨灰罐',
      imageSrc: '/pics/index_n5.png',
      link: '/pages/funeral',
    },
    {
      title: '朋友寵物 - 集體羽化',
      description:
        '生命雖短，愛卻無疆。我們為愛寵設計的告別儀式，不僅是對生命的尊重，更是對每份愛的證明。無論何時決定，免費冰存都將為您騰出思考的空間。在這份旅程終點，讓我們攜手將愛寵的故事。',
      details: '免費結緣往生被/十字被\n\n免費靈體冰存14天\n\n免費懷念骨灰罐',
      imageSrc: '/pics/Vector 21.png',
      link: '/pages/funeral',
    },
  ]

  return (
    <div className="row">
      {cardData.map((card, index) => (
        <div className="col-md-4 text-center" key={index}>
          <div className={Styles.card}>
            <ImageComponent
              className={Styles.cardImage}
              src={card.imageSrc}
              alt=""
              width={240}
              height={190}
            />
            <div className={Styles.cardContent}>
              <h5>{card.title}</h5>
              <h6>{card.description}</h6>
              <div
                Styles={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  height: '55px',
                }}
              >
                {card.details.split('\n\n').map((detail, idx) => (
                  <p key={idx} className={Styles.cardDetails}>
                    {detail}
                  </p>
                ))}
                <Link href="/funeral/booking-list">
                  <Button
                    type="button"
                    className={`btnPlan btn btn-warning ${Styles.btnPlan}`}
                  >
                    選擇方案
                  </Button>
                </Link>

                <Button
                  type="button"
                  className={`btnPlan1 btn btn-warning ${Styles.btnPlan1}`}
                >
                  加入購物車
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
