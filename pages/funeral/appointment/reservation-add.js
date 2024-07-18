import { useEffect, useState } from 'react'
import { RV_UPDATE_PUT_LIST } from '@/configs/funeral/api-path'
import Layout1 from '@/components/layout/layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { RV_ADD_POST } from '@/configs/funeral/api-path'

export default function RvEdit() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  const [myForm, setMyForm] = useState({
    fk_b2c_id: '',
    reservation_date: '',
    note: '',
  })
  const [myFormErrors, setMyFormErrors] = useState({
    fk_b2c_id: '',
    reservation_date: '',
    note: '',
  })

  const onChange = (e) => {
    console.log(e.target.name, e.target.value)

    // 做表單的驗證
    /*
        const schemaEmail = z.string().email({ message: "請填寫正確的電郵格式" });
        if (e.target.name === "email") {
        const result = schemaEmail.safeParse(e.target.value);
        console.log(JSON.stringify(result, null, 4));
        }
        */

    /*
        {
        "success": false,
        "error": {
            "issues": [
                {
                    "validation": "regex",
                    "code": "invalid_string",
                    "message": "請填寫正確的手機格式",
                    "path": [
                        "mobile"
                    ]
                }
            ],
            "name": "ZodError"
        }
        }
        */

    const schemaForm = z.object({
      name: z.string().min(2, { message: '姓名至少兩個字' }),
      email: z.string().email({ message: '請填寫正確的電郵格式' }),
      mobile: z
        .string()
        .regex(/09\d{2}-?\d{3}-?\d{3}/, { message: '請填寫正確的手機格式' }),
    })

    const newForm = { ...myForm, [e.target.name]: e.target.value }

    const result2 = schemaForm.safeParse(newForm)
    console.log(JSON.stringify(result2, null, 4))

    // 重置 myFormErrors
    const newFormErrors = {
      fk_b2c_id: '',
      reservation_date: '',
      note: '',
    }

    if (!result2.success && result2?.error?.issues?.length) {
      for (let issue of result2.error.issues) {
        newFormErrors[issue.path[0]] = issue.message
      }
    }
    setMyFormErrors(newFormErrors)
    console.log(newForm)
    setMyForm(newForm)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting form to:', RV_ADD_POST)
    // 如果表單驗證有通過的話
    try {
      const r = await fetch(RV_ADD_POST, {
        method: 'POST',
        body: JSON.stringify(myForm),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await r.json()
      console.log(result)
      if (result.success) {
        router.push(`/funeral/`) // 跳頁
      } else {
        console.log('Form submission failed:', result)
      }
    } catch (ex) {
      console.log('Fetch error:', ex)
    }
  }
  //  底下按鈕跳modal
  useEffect(() => {
    if (showModal) {
      // 顯示modal
      const modalElement = document.getElementById('exampleModalToggle2')
      const bootstrapModal = new window.bootstrap.Modal(modalElement)
      bootstrapModal.show()
      // 在modal顯示後用router進行頁面跳轉
      router.push('/funeral')
    }
  }, [showModal])

  return (
    <>
      {/* 第一區 */}
      <div
        title="新增線上預約"
        pageName="reservation-add"
        className="container-fluid d-flex justify-content-center align-items-center position-relative my-5"
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
              <h3
                className="title"
                style={{
                  width: '100%',
                  height: 'auto',
                  textAlign: 'center',
                  zIndex: 2,
                  position: 'relative',
                  top: '25px',
                }}
              >
                線上預約
              </h3>
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
                  marginTop: '-30px',
                }}
              >
                {/* 綠色圖形 */}
                <img
                  className="green"
                  src="/funeral/Vector 433.png"
                  alt=""
                  style={{
                    maxWidth: '100%',
                    width: '150px',
                    height: 'auto',
                    zIndex: 1,
                    marginRight: '-20px',
                  }}
                />
                {/* 深黃色圖形 */}
                <img
                  className="yellow"
                  src="/funeral/Vector 431.png"
                  alt=""
                  style={{
                    maxWidth: '100%',
                    width: '150px',
                    height: 'auto',
                    marginLeft: '-20px', // 添加左側間距
                  }}
                />
              </div>
            </div>
          </div>
          {/* 表單 */}
          <div
            className="col-12 col-md-6 justify-content-center"
            style={{ zIndex: '1' }}
          >
            <p
              className="text"
              style={{ textAlign: 'center', marginTop: '40px' }}
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
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="fk_b2c_id"
                  value={myForm.fk_b2c_id}
                  onChange={onChange}
                />

                <div className="form-text"></div>
              </div>

              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  預約日期
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="date"
                  name="reservation_date"
                  value={myForm.reservation_date}
                  onChange={onChange}
                />
                <div className="form-text"></div>
              </div>

              <div className="mb-3">
                <label htmlFor="note" className="form-label">
                  備註
                </label>

                <textarea
                  className="form-control"
                  id="note"
                  name="note"
                  cols="30"
                  rows="3"
                  value={myForm.note}
                  onChange={onChange}
                ></textarea>
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
                <button
                  className="btn btn-warning"
                  data-bs-toggle="modal"
                  href="#exampleModalToggle2"
                  style={{
                    width: '30%',
                    backgroundColor: '#6a513d',
                    borderRadius: '60px',
                    color: '#fff5cf',
                    marginBottom: '5px',
                  }}
                >
                  立即預約
                </button>
              </div>
              {/* 立即預約按鈕 */}
            </form>
          </div>

          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModalToggle2"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel2"
            tabindex="-1"
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
          </div>

          {/* Modal */}
        </div>
      </div>
      <img
        className="bookingPaw position-absolute"
        src="/funeral/dog2.png"
        alt=""
        style={{
          bottom: '-90px',
          width: '100px',
          right: '0px',
          overflow: 'hidden',
          zIndex: '0',
        }}
      />
      <img
        className="bookingDog position-absolute text-start"
        src="/funeral/bookingDog.png"
        alt=""
        style={{
          top: '50px',
          width: '100px',
          overflow: 'hidden',
          zIndex: '0',
        }}
      />
      <img
        className="bookingbone position-absolute text-start"
        src="/funeral/bone.png"
        alt=""
        style={{
          top: '500px',
          left: '150px',
          width: '120px',
          overflow: 'hidden',
          zIndex: '0',
          opacity: '0.4',
        }}
      />
      <img
        className="bookingbone position-absolute text-start"
        src="/funeral/bone.png"
        alt=""
        style={{
          top: '280px',
          left: '400px',
          width: '50px',
          overflow: 'hidden',
          zIndex: '0',
          transform: 'scaleX(-1)', // 將圖片左右翻轉
          opacity: '0.4',
        }}
      />
      <img
        className="bookingbone position-absolute text-start"
        src="/funeral/bone.png"
        alt=""
        style={{
          bottom: '120px',
          width: '70px',
          right: '240px',
          overflow: 'hidden',
          zIndex: '0',
          opacity: '0.4',
        }}
      />
      <img
        className="bookingbone position-absolute text-start"
        src="/funeral/bone.png"
        alt=""
        style={{
          top: '150px',
          right: '600px',
          width: '60px',
          overflow: 'hidden',
          zIndex: '0',
          transform: 'scaleX(-1)',
          opacity: '0.4',
        }}
      />
    </>
  )
}
