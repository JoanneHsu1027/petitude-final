import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRouter } from 'next/router'

export default function AppointmentService() {
  const router = useRouter()

  const handleButtonClick = () => {
    router.push('/funeral/appointment/reservation-form')
  }

  return (
    <>
      <div className="container-fluid p-4 mt-5">
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
              }}
            >
              <h2
                className="title"
                style={{
                  width: '100%',
                  height: 'auto',
                  textAlign: 'center',
                  zIndex: 2,
                  position: 'relative',
                  marginBottom: '-10px', // 確保與 pattern 有足夠的間距
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
                  width: '100%',
                  height: 'auto',
                  position: 'relative',
                  zIndex: 1,
                  marginTop: '-50px', // 確保與標題重疊
                }}
              >
                {/* 淺黃色圖形 */}
                <img
                  className="lightYellow"
                  src="/funeral/Vector 433.png"
                  alt=""
                  width={250}
                  height={80}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    zIndex: 1,
                    marginRight: '-60px', // 添加右側間距
                  }}
                />
                {/* 深黃色圖形 */}
                <img
                  className="yellow"
                  src="/funeral/Vector 431.png"
                  alt=""
                  width={250}
                  height={80}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    marginLeft: '-60px', // 添加左側間距
                  }}
                />
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
                marginTop: '30px',
                marginBottom: '20px',
              }}
            >
              <div
                className="content text-center"
                style={{ marginTop: '30px', marginBottom: '20px' }}
              >
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
                className="btn btn-primary"
                onClick={handleButtonClick}
                style={{
                  backgroundColor: '#6a513d',
                  color: '#fff5cf',
                  borderColor: '#6a513d',
                  marginBottom: '20px',
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
              width={250}
              height={400}
              style={{
                marginTop: '110px',
                marginLeft: '60px',
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
          {/* 底部圖片 */}
          <img
            className="vector"
            src="/funeral/Vector 436.png"
            alt=""
            width={1440}
            height={250}
            style={{
              position: 'fixed',
              bottom: '0',
              padding: '0',
              width: '100%',
              zIndex: -1,
              overflow: 'hidden',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .container-fluid {
            padding: 30px;
          }
          .row {
            margin: 20px;
          }
          .dog {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 20%;
            margin-right: 3%;
          }
        }
        /* modal內部css設定 */
        .modal-content,
        .modal-header,
        .modal-body,
        .modal-footer {
          background-color: #fcfaee;
          width: 100%;
        }
      `}</style>
    </>
  )
}
