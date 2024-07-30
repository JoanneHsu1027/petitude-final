import React, { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/member/auth-context'
import swal from 'sweetalert2'
import StarTwinkle from '@/components/funeral/star'
import LoginModal from '@/components/member/LoginModal'

export default function AppointmentService() {
  const router = useRouter()
  const { auth } = useAuth()
  const [showModal, setShowModal] = useState(false)

  const handleButtonClick = () => {
    router.push('/funeral/appointment/reservation-add')
  }

  const waveRef = useRef(null)

  const wave1 =
    'M0 108.306L50 114.323C100 120.34 200 132.374 300 168.476C400 204.578 500 264.749 600 246.698C700 228.647 800 132.374 900 108.306C1000 84.2382 1100 132.374 1150 156.442L1200 180.51V0H1150C1100 0 1000 0 900 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0H0V108.306Z'
  const wave2 =
    'M0 250L50 244.048C100 238.095 200 226.19 300 226.19C400 226.19 500 238.095 600 232.143C700 226.19 800 202.381 900 196.429C1000 190.476 1100 202.381 1150 208.333L1200 214.286V0H1150C1100 0 1000 0 900 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0H0V250Z'
  const wave3 =
    'M0 250L50 238.095C100 226.19 200 202.381 300 166.667C400 130.952 500 83.3333 600 101.19C700 119.048 800 202.381 900 214.286C1000 226.19 1100 166.667 1150 136.905L1200 107.143V0H1150C1100 0 1000 0 900 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0H0V250Z'
  const wave4 =
    'M0 125L50 111.111C100 97.2222 200 69.4444 300 97.2222C400 125 500 208.333 600 236.111C700 263.889 800 236.111 900 229.167C1000 222.222 1100 236.111 1150 243.056L1200 250V0H1150C1100 0 1000 0 900 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0H0V125Z'

  useEffect(() => {
    if (waveRef.current) {
      anime({
        targets: waveRef.current.querySelector('path'),
        easing: 'linear',
        duration: 7500,
        loop: true,
        d: [
          { value: [wave1, wave2] },
          { value: wave3 },
          { value: wave4 },
          { value: wave1 },
        ],
      })
    }
  }, [])

  return (
    <>
      {/* <StarTwinkle /> */}
      <div className="container-fluid allFont" style={{ overflow: 'hidden' }}>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-8 position-relative p-0">
            {/* 上方文字+圖形區塊 */}
            <div
              className="headSection"
              style={{
                position: 'relative',
                width: '100%',
                height: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: '25px',
              }}
            >
              <h2
                className="title"
                style={{
                  width: '80%',
                  textAlign: 'center',
                  zIndex: 2,
                  position: 'relative',
                  marginBottom: '-10px',
                  fontWeight: '900',
                }}
              >
                寵物殯葬服務
              </h2>
              <div
                className="pattern"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '80%', // 調整寬度以適應較小螢幕
                  height: 'auto',
                  position: 'relative',
                  zIndex: 1,
                  marginTop: '-4.5%',
                }}
              >
                {/* 綠色圖形 */}
                <img className="green" src="/funeral/Vector 433.png" alt="" />
                {/* 深黃色圖形 */}
                <img className="yellow" src="/funeral/Vector 431.png" alt="" />
              </div>
            </div>
            {/* 左側文字 */}
            <div
              className="section2"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div className="content text-center">
                <p>毛寶貝，你值得永遠的守護</p>
                <p>
                  雖然知道你我相伴的日子，一天一天在倒數著...
                  看著你用盡最後一絲力氣窩在我身旁撒嬌，我知道，這次是真的...
                </p>
                <p>
                  說好了要笑著和你道別，但淚水卻不爭氣的在眼角悄悄滑落，
                  說好了要堅強的送你一程，但心卻痛到像撕裂般，無法呼吸！
                </p>
                <p>
                  是你讓我了解生命的美好，讓我懂得如何去愛去珍惜，
                  放心，我會遵守約定，帶你住進美麗的森林裡，
                  這是我的責任，也是我對你永遠守護的承諾！
                </p>
                <p>
                  謝謝你，我的好夥伴、好朋友、乖寶貝...遇見你，是我這輩子最幸福的事！
                </p>
              </div>
              <button
                className="btn"
                onClick={() => {
                  if (!auth.b2c_id) {
                    swal
                      .fire({
                        text: '請先登入會員！',
                        icon: 'error',
                      })
                      .then(() => {
                        setShowModal(true) // 在警告框關閉後顯示登入視窗
                      })
                  } else {
                    router.push('/funeral/appointment/reservation-add')
                  }
                }}
              >
                線上預約
              </button>
            </div>
          </div>
          <div className="col-md-4 text-center">
            {/* 右邊狗圖 */}
            <img
              className="dog"
              src="/funeral/unsplash_g2FtlFrc164 2.png"
              alt=""
            />
          </div>
          <div>
            <svg
              ref={waveRef}
              className="wave-bottom"
              width="100%"
              viewBox="0 0 1200 250"
              preserveAspectRatio="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d={wave1}
                fill="#FFF5CF"
              />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC&display=swap');

        .allFont {
          font-family: 'Noto Serif TC', serif;
          font-weight: 900;
        }
        .container-fluid {
          margin-top: 5%;
          margin-bottom: 5%;
        }
        .btn {
          width: 15%;
          height: 20%;
          background-color: #6a513d;
          color: #fff5cf;
          margin-bottom: 20px;
          font-weight: 600;
          font-size: 20px;
          border-radius: 25px;
        }
        .btn:hover {
          background-color: #f6d554;
          color: #6a513d;
          font-weight: 700;
        }
        .dog {
          width: 70%;
          margin-top: 20%;
        }
        .content {
          margin-top: 5rem;
          margin-bottom: 3rem;
          padding: 0 5rem;
          line-height: 2;
        }
        p {
          font-size: 20px;
          font-weight: 500;
        }
        .green {
          width: 20%;
          height: auto;
          z-index: 1;
          margin-right: -60px;
        }
        .yellow {
          width: 25%;
          height: auto;
          margin-right: -10px;
        }

        html,
        body {
          height: 100%;
        }

        body {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: darkblue;
          text-align: center;
          color: white;
          box-sizing: border-box;
          padding: 1rem;
        }

        h1 {
          position: relative;
          z-index: 10;
        }

        a {
          color: #ffe37b;
          text-decoration: none;
        }

        .wave-bottom {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          transform: rotate(180deg);
          z-index: -1; /* 確保SVG在其他內容下方 */
        }

        @media (max-width: 768px) {
          .container-fluid {
            padding: 15px;
          }
          .row {
            margin: 10px;
            z-index: 3;
          }
          .title {
            width: 80%;
            text-align: center;
            z-index: 2;
            position: relative;
          }
          .content {
            margin-top: 5rem;
            margin-bottom: 3rem;
            padding: 2rem;
            line-height: 2;
          }
          .p {
            font-size: 0.9rem;
          }
          .dog {
            width: 30%;
            margin-right: -85%;
            margin-top: -35%;
          }
          .green {
            width: 35%;
            height: auto;
            z-index: 1;
            margin-right: -60px;
            margin-top: 1%;
          }
          .yellow {
            width: 40%;
            height: auto;
            margin-right: -10px;
            margin-top: 1%;
          }
          .btn {
            width: 30%;
            font-size: 0.8rem; /* 在較小螢幕下設定較小的按鈕字體大小 */
            padding: 5px 10px; /* 調整按鈕內邊距 */
          }
        }
        @media (max-width: 580px) {
          .title {
            font-size: 1.4rem; /* 在較小螢幕下進行調整 */
          }
          .content {
            margin-top: 2rem;
            margin-bottom: 1rem;
            line-height: 2;
          }
          .content p {
            font-size: 0.9rem;
          }
          .dog {
            width: 30%;
            margin-right: -85%;
            margin-top: -35%;
          }
          .green {
            width: 50%;
            height: auto;
            z-index: 1;
            margin-right: -60px;
            margin-top: -7%;
          }
          .yellow {
            width: 55%;
            height: auto;
            margin-right: -10px;
            margin-top: -7%;
          }
          .btn-warning {
            font-size: 0.9rem; /* 在較小螢幕下設定較小的按鈕字體大小 */
            padding: 5px 10px; /* 調整按鈕內邊距 */
          }
        }
        /* modal內部css設定 */
        .modal-content,
        .modal-header,
        .modal-body,
        .modal-footer {
          background-color: #fcfaee;
          width: 80%;
        }
      `}</style>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  )
}
