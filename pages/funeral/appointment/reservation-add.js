import { useEffect, useState, useRef } from 'react'
import Layout1 from '@/components/layout/layout'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { RV_ADD_POST } from '@/configs/funeral/api-path'
import swal from 'sweetalert2'
import anime from 'animejs'

export default function RvEdit() {
  const router = useRouter()
  const svgRef = useRef()
  const dustParticlesRef = useRef()

  const [myForm, setMyForm] = useState({
    b2c_name: '',
    b2c_mobile: '',
    reservation_date: '',
    reservation_time: '',
    note: '',
  })
  const [myFormErrors, setMyFormErrors] = useState({
    b2c_name: '',
    b2c_mobile: '',
    reservation_date: '',
    reservation_time: '',
    note: '',
  })

  const schemaForm = z.object({
    b2c_name: z.string().min(2, { message: '姓名至少兩個字' }),
    b2c_mobile: z
      .string()
      .regex(/09\d{2}-?\d{3}-?\d{3}/, { message: '請填寫正確的手機格式' }),
    reservation_date: z.string().refine(
      (val) => {
        const date = new Date(val)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return date >= today
      },
      { message: '日期必須是今天或之後的日期' },
    ),
    reservation_time: z.string().min(1, { message: '請選擇預約時間' }),
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setMyForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
    setMyFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    // 合併日期和時間
    const combinedDateTime = `${myForm.reservation_date} ${myForm.reservation_time}`

    // 使用合併後的日期和時間進行驗證
    const result = schemaForm.safeParse({
      ...myForm,
      reservation_date: combinedDateTime,
    })

    // 如果驗證失敗
    if (!result.success) {
      //創建一個新的空對象來存儲錯誤信息
      const newFormErrors = {}
      // 遍歷所有驗證錯誤
      result.error.issues.forEach((issue) => {
        // 將每個錯誤信息添加到 newFormErrors 對象中
        // issue.path[0] 是錯誤發生的字段名稱
        // issue.message 是錯誤信息
        newFormErrors[issue.path[0]] = issue.message
      })
      // 更新表單錯誤狀態
      setMyFormErrors(newFormErrors)

      // 顯示 SweetAlert 錯誤提示
      swal.fire({
        icon: 'error',
        title: '表單驗證失敗',
        text: '請檢查並修正錯誤的欄位',
      })

      return
    }

    // 驗證成功，繼續提交表單
    try {
      const r = await fetch(RV_ADD_POST, {
        method: 'POST',
        body: JSON.stringify(myForm),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!r.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await r.json()
      if (result.success) {
        // 使用 SweetAlert 顯示成功訊息
        swal
          .fire({
            title: '預約成功！',
            text: '謝謝您的預約，專人會與您聯繫~',
            icon: 'success',
            confirmButtonText: '回首頁',
          })
          .then((result) => {
            if (result.isConfirmed) {
              router.push('/funeral')
            }
          })
      } else {
        console.log('Form submission failed:', result)
      }
    } catch (ex) {
      console.log('Fetch error:', ex)
    }
  }

  // ---------------------------------------------------------------

  useEffect(() => {
    const designAnimation = anime({
      targets: `${svgRef.current} #XMLID5`,
      keyframes: [
        { translateX: -500 },
        { rotateY: 180 },
        { translateX: 920 },
        { rotateY: 0 },
        { translateX: -500 },
        { rotateY: 180 },
        { translateX: -500 },
      ],
      easing: 'easeInOutSine',
      duration: 10000,
      loop: true, // Add loop to keep the animation running indefinitely
    })

    const dustParticlesAnimation = anime({
      targets: 'path',
      translateX: [10, -80], // 動畫效果：`path` 元素在 Y 軸上的位置從 10 像素變到 -150 像素
      direction: 'alternate', // 動畫方向：往返效果，即從起點到終點，再返回到起點
      loop: true, // 是否循環播放動畫
      delay: (el, i, l) => i * 100, // 每個 `path` 元素的延遲時間：根據元素的索引 `i` 和總數 `l` 計算
      endDelay: (el, i, l) => (l - i) * 100, // 動畫結束後的延遲時間：根據元素的索引 `i` 和總數 `l` 計算
    })

    // Cleanup animations on component unmount
    return () => {
      designAnimation.pause()
      dustParticlesAnimation.pause()
    }
  }, [])

  return (
    <Layout1>
      <div className="dust-paarticle">
        <svg
          width="100%"
          id="dust-paarticle"
          height="100%"
          viewBox="0 0 885 455"
          fill="none"
          opacity="0.3"
        >
          <path
            d="M678.1 394.1C679.923 394.1 681.4 392.622 681.4 390.8C681.4 388.977 679.923 387.5 678.1 387.5C676.277 387.5 674.8 388.977 674.8 390.8C674.8 392.622 676.277 394.1 678.1 394.1Z"
            stroke="#F4CD39"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.46"
            d="M880.3 342.9C882.123 342.9 883.6 341.423 883.6 339.6C883.6 337.777 882.123 336.3 880.3 336.3C878.477 336.3 877 337.777 877 339.6C877 341.423 878.477 342.9 880.3 342.9Z"
            stroke="#F4CD39"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.46"
            d="M282.2 7.69997C284.023 7.69997 285.5 6.2225 285.5 4.39996C285.5 2.57742 284.023 1.09998 282.2 1.09998C280.377 1.09998 278.9 2.57742 278.9 4.39996C278.9 6.2225 280.377 7.69997 282.2 7.69997Z"
            stroke="#F4CD39"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M598.3 207.8C601.061 207.8 603.3 205.561 603.3 202.8C603.3 200.039 601.061 197.8 598.3 197.8C595.539 197.8 593.3 200.039 593.3 202.8C593.3 205.561 595.539 207.8 598.3 207.8Z"
            stroke="#FDB130"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M48.7 442.7C50.4121 442.7 51.8 441.312 51.8 439.6C51.8 437.888 50.4121 436.5 48.7 436.5C46.9879 436.5 45.6 437.888 45.6 439.6C45.6 441.312 46.9879 442.7 48.7 442.7Z"
            stroke="#E03F8D"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M489.7 311.7C491.909 311.7 493.7 309.909 493.7 307.7C493.7 305.491 491.909 303.7 489.7 303.7C487.491 303.7 485.7 305.491 485.7 307.7C485.7 309.909 487.491 311.7 489.7 311.7Z"
            stroke="#1DB7C2"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M373.8 225C375.623 225 377.1 223.523 377.1 221.7C377.1 219.877 375.623 218.4 373.8 218.4C371.977 218.4 370.5 219.877 370.5 221.7C370.5 223.523 371.977 225 373.8 225Z"
            stroke="#FDB130"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M844.1 453.7C846.309 453.7 848.1 451.909 848.1 449.7C848.1 447.491 846.309 445.7 844.1 445.7C841.891 445.7 840.1 447.491 840.1 449.7C840.1 451.909 841.891 453.7 844.1 453.7Z"
            stroke="#1DB7C2"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M151 254.6C152.16 254.6 153.1 253.66 153.1 252.5C153.1 251.34 152.16 250.4 151 250.4C149.84 250.4 148.9 251.34 148.9 252.5C148.9 253.66 149.84 254.6 151 254.6Z"
            stroke="#FDB130"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.6 315.9C4.7598 315.9 5.7 314.96 5.7 313.8C5.7 312.64 4.7598 311.7 3.6 311.7C2.4402 311.7 1.5 312.64 1.5 313.8C1.5 314.96 2.4402 315.9 3.6 315.9Z"
            stroke="#9E3FB7"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M768.2 366.7H775.5"
            stroke="#9E3FB7"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M771.8 363.1V370.4"
            stroke="#9E3FB7"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g opacity="0.6">
            <path
              opacity="0.6"
              d="M696.4 40.5H703.8"
              stroke="#9E3FB7"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              opacity="0.6"
              d="M700.1 36.8V44.2"
              stroke="#9E3FB7"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <path
            d="M630.3 284.1H636"
            stroke="#E03F8D"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M633.2 281.2V286.9"
            stroke="#E03F8D"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M414.9 104.5H420.6"
            stroke="#E03F8D"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M417.8 101.7V107.3"
            stroke="#E03F8D"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M203.7 290.8H211.5"
            stroke="#E03F8D"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M207.6 286.9V294.6"
            stroke="#E03F8D"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M165.9 402.7H176.2"
            stroke="#1DB7C2"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M171 397.5V407.9"
            stroke="#1DB7C2"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M252.1 346.8C253.2 345.3 254.8 346.4 255.9 344.9C257 343.4 255.4 342.2 256.5 340.7C257.6 339.2 259.2 340.3 260.3 338.8C261.4 337.3 259.8 336.1 260.9 334.5C262 333 263.6 334.1 264.7 332.6"
            stroke="white"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g opacity="0.4">
            <path
              opacity="0.4"
              d="M36.3 391.2C35.7 389.4 37.5 388.7 36.9 387C36.3 385.2 34.4 385.9 33.7 384.1C33.1 382.3 34.9 381.6 34.3 379.9C33.7 378.1 31.8 378.8 31.1 377C30.5 375.2 32.3 374.5 31.7 372.8"
              stroke="white"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <path
            d="M732.3 292.1C730.6 291.2 731.5 289.5 729.8 288.6C728.1 287.7 727.2 289.5 725.5 288.7C723.8 287.8 724.7 286.1 723 285.2C721.3 284.3 720.4 286.1 718.7 285.3C717 284.4 717.9 282.7 716.2 281.8"
            stroke="white"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g opacity="0.53">
            <path
              opacity="0.53"
              d="M282.7 439.7C281.5 440.4 280.5 438.7 279.3 439.4C278.1 440.1 279.1 441.8 278 442.5C276.8 443.2 275.8 441.5 274.6 442.2C273.4 442.9 274.4 444.6 273.3 445.3C272.2 446 271.1 444.3 269.9 445"
              stroke="#1DB7C2"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <path
            d="M819.6 253.6C821.4 253 822 255 823.8 254.4C825.6 253.8 825 251.9 826.8 251.4C828.6 250.8 829.2 252.8 831 252.2C832.8 251.6 832.2 249.7 834 249.2C835.8 248.7 836.4 250.6 838.2 250"
            stroke="#9E3FB7"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M487.9 207.4C489.7 206.8 490.3 208.8 492.1 208.2C493.9 207.6 493.3 205.7 495.1 205.2C496.9 204.6 497.5 206.6 499.3 206C501.1 205.4 500.5 203.5 502.3 203C504.1 202.5 504.7 204.4 506.5 203.8"
            stroke="#9E3FB7"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {/* 第一區 */}
      <div
        title="新增線上預約"
        pageName="reservation-add"
        className="container-fluid d-flex justify-content-center align-items-center position-relative allFont"
      >
        <div className="row d-flex flex-column align-items-center">
          <div className="col-12 col-md-6 header justify-content-center">
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
              <h3 className="title">線上預約</h3>
              <div className="pattern">
                {/* 綠色圖形 */}
                <img className="green" src="/funeral/Vector 433.png" alt="" />
                {/* 深黃色圖形 */}
                <img className="yellow" src="/funeral/Vector 431.png" alt="" />
              </div>
            </div>
          </div>
          {/* 表單 */}
          <div className="col-12 col-md-6 justify-content-center form1">
            <p
              className="text"
              style={{
                textAlign: 'start',
                margin: '30px',
                fontWeight: '900',
              }}
            >
              我們提供多元服務管道，
              您可以撥打24小時免費客服專線0800-899-999由專人即時解答，
              也可以填寫下列資訊，客服人員會在週一 ～
              週五08：30-17：30主動與您聯繫
            </p>
            <form name="form1" onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  姓名
                </label>
                <div className="input-container">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="b2c_name"
                    value={myForm.b2c_name}
                    onChange={onChange}
                  />
                </div>
                <div className="form-text" style={{ color: 'red' }}>
                  {myFormErrors.b2c_name}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  手機
                </label>
                <div className="input-container">
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="b2c_mobile"
                    value={myForm.b2c_mobile}
                    onChange={onChange}
                  />
                </div>
                <div className="form-text" style={{ color: 'red' }}>
                  {myFormErrors.b2c_mobile}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  預約日期
                </label>
                <div className="input-container">
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="reservation_date"
                    value={myForm.reservation_date}
                    onChange={onChange}
                  />
                </div>
                <div className="form-text" style={{ color: 'red' }}>
                  {myFormErrors.reservation_date}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="time" className="form-label">
                  預約時間
                </label>
                <div className="input-container">
                  <select
                    className="form-control"
                    id="time"
                    name="reservation_time"
                    value={myForm.reservation_time}
                    onChange={onChange}
                  >
                    <option value="">選擇預約時間</option>
                    <option value="09:00-10:00">09:00-10:00</option>
                    <option value="10:00-11:00">10:00-11:00</option>
                    <option value="11:00-12:00">11:00-12:00</option>
                    <option value="13:00-14:00">13:00-14:00</option>
                    <option value="14:00-15:00">14:00-15:00</option>
                    <option value="15:00-16:00">15:00-16:00</option>
                    <option value="16:00-17:00">16:00-17:00</option>
                  </select>
                </div>
                <div className="form-text" style={{ color: 'red' }}>
                  {myFormErrors.reservation_time}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="note" className="form-label">
                  備註
                </label>
                <div className="input-container">
                  <textarea
                    className="form-control"
                    id="note"
                    name="note"
                    cols="30"
                    rows="3"
                    value={myForm.note}
                    onChange={onChange}
                  ></textarea>
                </div>

                <div className="form-text"></div>
              </div>

              {/* 立即預約按鈕 */}
              <div
                className="sendBtn"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <button type="submit" className="btn">
                  立即預約
                </button>
              </div>
              {/* 立即預約按鈕 */}
            </form>
          </div>

          {/* Modal */}
          {/* <div
            className="modal fade"
            id="exampleModalToggle2"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel2"
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalToggleLabel2">
                    謝謝您的預約, 專人會與您聯繫~
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body d-flex justify-content-center">
                  <img
                    src="/funeral/57.jpg"
                    alt=""
                    style={{ width: '200px' }}
                  />
                </div>

                <div className="modal-footer d-flex justify-content-center ">
                  <button
                    className="btn btn-warning"
                    data-bs-target="#exampleModalToggle2"
                    data-bs-toggle="modal"
                    onClick={() => router.push('/funeral')}
                    style={{
                      width: '100%',
                      backgroundColor: 'orange',
                      borderRadius: '10px',
                      color: '#fff5cf',
                      fontWeight: 'bolder',
                      display: 'inline-block',
                      textAlign: 'center',
                    }}
                  >
                    回首頁
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          {/* Modal */}
        </div>
      </div>
      <div className="dogpic">
        <img src="/funeral/shiba.png" className="dogpic1" />
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC&display=swap');

        .allFont {
          font-family: 'Noto Serif TC', serif;
          font-weight: 900;
        }

        body,
        html {
          background-color: #f0f2f5;
          background-image: url('https://1.bp.blogspot.com/-fd1WXKk-TAc/XyqfngP4PiI/AAAAAAAAVMw/umQz3tkxtg43uPIy8W5og6gAkpCfjaTvACLcBGAsYHQ/w1563-h1563/bg-snell.png');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 100%;
          height: 100vh;
          text-rendering: optimizeLegibility;
        }
        .form1 {
          z-index: 1;
        }

        .dust-paarticle {
          position: absolute;
          width: 100%;
        }
        .container-fluid {
          margin-top: 3%;
          margin-bottom: 5%;
        }

        #dust-paarticle path {
          transform-box: fill-box;
          transform-origin: center;
        }
        .sendBtn {
          margin-top: 2rem;
        }
        .btn {
          width: 30%;
          background-color: #6a513d;
          border-radius: 60px;
          color: #fff5cf;
          margin-bottom: 5px;
          font-size: 20px;
          font-weight: 900;
        }
        .btn:hover {
          width: 30%;
          background-color: #f5d553;
          border-radius: 60px;
          color: #6a513d;
          margin-bottom: 5px;
          font-size: 20px;
          font-weight: 900;
        }
        .pattern {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: auto;
          position: relative;
          z-index: 1;
          margin-top: -30px;
        }
        .title {
          width: 100%;
          height: auto;
          text-align: center;
          z-index: 2;
          position: relative;
          top: 26px;
          font-weight: 900;
          font-family: 'Noto Serif TC';
        }
        .yellow {
          max-width: 100%;
          width: 162px;
          height: auto;
          margin-left: -20px;
        }
        .green {
          max-width: 100%;
          width: 140px;
          height: auto;
          z-index: 1;
          margin-right: -40px;
        }
        .dogpic {
          position: absolute;
          top: 54.4%;
          left: 5%;
          transform: rotate(-9deg);
        }
        .dogpic1 {
          width: 100%;
        }

        ul {
          padding: 0;
          margin: 0;
          list-style: none;
        }

        a {
          text-decoration: none;
          color: #2d385e;
        }

        a:focus {
          outline: none;
          text-decoration: none;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: 'Titillium Web', sans-serif;
          color: #2d385e;
        }

        a,
        a:hover,
        a:focus {
          color: #4f77ff;
        }

        @media (min-width: 390px) and (max-width: 395px) {
          body {
            background-size: cover;
          }

          .dogpic {
            display: none !important;
          }
          .pattern {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: auto;
            position: relative;
            z-index: 1;
            margin-top: -27px;
          }
          .title {
            width: 100%;
            height: auto;
            text-align: center;
            z-index: 2;
            position: relative;
            top: 19px;
            font-weight: 900;
            font-family: 'Noto Serif TC';
          }
          .form-label {
            margin-left: 15px;
          }
          .input-container {
            display: flex;
            justify-content: center;
          }
          .form-control {
            width: 70%;
            display: flex;
            justify-content: center;
          }
          .yellow {
            max-width: 100%;
            width: 120px;
            height: auto;
            margin-left: -20px;
          }
          .green {
            max-width: 100%;
            width: 105px;
            height: auto;
            z-index: 1;
            margin-right: -40px;
          }
          .btn {
            width: 22%;
            background-color: #6a513d;
            border-radius: 60px;
            color: #fff5cf;
            margin-bottom: 5px;
            font-size: 12px;
            font-weight: 900;
          }
        }

        @media (max-width: 320px) {
          .remember-row .col-sm-6 {
            width: 100%;
          }
          .dogpic {
            display: none !important;
          }
        }

        @media (min-width: 1200px) {
          .col-lg-offset-3 {
            margin-left: 25%;
          }
          .col-lg-6 {
            width: 50%;
          }

          .col-lg-1,
          .col-lg-10,
          .col-lg-11,
          .col-lg-12,
          .col-lg-2,
          .col-lg-3,
          .col-lg-4,
          .col-lg-5,
          .col-lg-6,
          .col-lg-7,
          .col-lg-8,
          .col-lg-9 {
            float: left;
          }
        }

        @media (min-width: 768px) {
          .col-sm-1,
          .col-sm-10,
          .col-sm-11,
          .col-sm-12,
          .col-sm-2,
          .col-sm-3,
          .col-sm-4,
          .col-sm-5,
          .col-sm-6,
          .col-sm-7,
          .col-sm-8,
          .col-sm-9 {
            float: left;
          }
        }
      `}</style>
    </Layout1>
  )
}
