import { useEffect, useState } from 'react'
import { RV_UPDATE_PUT_LIST } from '@/configs/funeral/api-path'
import Layout1 from '@/components/layout/layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { RV_ADD_POST } from '@/configs/funeral/api-path'
import swal from 'sweetalert2'

export default function RvEdit() {
  const router = useRouter()

  const [myForm, setMyForm] = useState({
    b2c_name: '',
    b2c_mobile: '',
    reservation_date: '',
    note: '',
  })
  const [myFormErrors, setMyFormErrors] = useState({
    b2c_name: '',
    b2c_mobile: '',
    reservation_date: '',
    note: '',
  })

  const schemaForm = z.object({
    b2c_name: z.string().min(2, { message: '姓名至少兩個字' }),
    b2c_mobile: z
      .string()
      .regex(/09\d{2}-?\d{3}-?\d{3}/, { message: '請填寫正確的手機格式' }),
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setMyForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    // 使用 Zod schema 驗證表單數據
    const result = schemaForm.safeParse(myForm)
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
                  name="b2c_name"
                  value={myForm.b2c_name}
                  onChange={onChange}
                />
                <div className="form-text">{myFormErrors.b2c_name}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  手機
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="b2c_mobile"
                  value={myForm.b2c_mobile}
                  onChange={onChange}
                />
                <div className="form-text">{myFormErrors.b2c_mobile}</div>
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
                  type="submit"
                  className="btn btn-warning"
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
