import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import ImageComponent from '../../component/common/image'

// import { RV_LIST } from '@/configs/api-path'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { z } from 'zod'
// import { RV_ADD_POST } from '@/configs/api-path'

// appointment / service用的form
export default function ReservationForm() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* 第一區 */}
      <div
        className="col-12 position-relative justify-content-center"
        style={{ backgroundImage: 'url("/pics/bg-img.png")' }}
      >
        <div className="row justify-content-center">
          <div className="header mt-3">
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
                  marginTop: '-30px', // 確保與標題重疊
                }}
              >
                {/* 綠色圖形 */}
                <ImageComponent
                  className="green"
                  src="/pics/Vector 433.png"
                  alt=""
                  width={150}
                  height={60}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    zIndex: 1,
                    marginRight: '-20px', // 添加右側間距
                  }}
                />
                {/* 深黃色圖形 */}
                <ImageComponent
                  className="yellow"
                  src="/pics/Vector 431.png"
                  alt=""
                  width={150}
                  height={60}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    marginLeft: '-20px', // 添加左側間距
                  }}
                />
              </div>
            </div>
          </div>
          {/* 表單 */}
          <div className="col-md-6" style={{ zIndex: '1' }}>
            <p style={{ textAlign: 'center', marginTop: '40px' }}>
              我們提供多元服務管道，
              您可以撥打24小時免費客服專線0800-899-999由專人即時解答，
              也可以填寫下列資訊，客服人員會在週一 ～
              週五08：30-17：30主動與您聯繫
            </p>
            <div className="mb-3 text-start">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                姓名
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleFormControlInput2" className="form-label">
                電話
              </label>
              <input
                type="mobile"
                className="form-control"
                id="exampleFormControlInput2"
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleFormControlInput3" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput3"
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleFormControlInput4" className="form-label">
                聯絡時間
              </label>
              <input
                type="date"
                className="form-control"
                id="exampleFormControlInput4"
              />
            </div>
            <div className="mb-3 text-start">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                其他備註
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
          </div>
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
                  謝謝您的購買!
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <ImageComponent
                  src="/pics/thanks.png"
                  width={300}
                  height={200}
                  alt=""
                  style={{
                    borderRadius: '15px',
                    backgroundColor: 'orange',
                  }}
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-warning"
                  data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal"
                  onClick={() => setShowModal(true)}
                  style={{
                    width: '30%',
                    backgroundColor: 'orange',
                    borderRadius: '10px',
                    color: '#fff5cf',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '5px',
                    fontWeight: 'bolder',
                  }}
                >
                  回首頁
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="sendBtn"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <a
            className="btn btn-warning"
            data-bs-toggle="modal"
            href="#exampleModalToggle2"
            role="button"
            style={{
              width: '10%',
              backgroundColor: '#6a513d',
              borderRadius: '60px',
              color: '#fff5cf',
              marginBottom: '5px',
            }}
          >
            立即預約
          </a>
        </div>
        {/* Modal */}
      </div>
      <ImageComponent
        className="bookingPaw position-absolute"
        src="/pics/dog2.png"
        alt=""
        width={130}
        height={250}
        style={{
          bottom: '-155px',
          right: '0px',
          overflow: 'hidden',
          zIndex: '0',
        }}
      />
      <ImageComponent
        className="bookingDog position-absolute text-start"
        src="/pics/bookingDog.png"
        alt=""
        width={120}
        height={270}
        style={{
          top: '50px',
          overflow: 'hidden',
          zIndex: '0',
        }}
      />
      <ImageComponent
        className="bookingDog position-absolute text-start"
        src="/pics/bone.png"
        alt=""
        width={120}
        height={120}
        style={{
          top: '500px',
          left: '150px',
          overflow: 'hidden',
          zIndex: '0',
          opacity: '0.4',
        }}
      />
      <ImageComponent
        className="bookingDog position-absolute text-start"
        src="/pics/bone.png"
        alt=""
        width={50}
        height={50}
        style={{
          top: '260px',
          left: '400px',
          overflow: 'hidden',
          zIndex: '0',
          transform: 'scaleX(-1)', // 將圖片左右翻轉
          opacity: '0.4',
        }}
      />
      <ImageComponent
        className="bookingDog position-absolute text-start"
        src="/pics/bone.png"
        alt=""
        width={80}
        height={80}
        style={{
          bottom: '60px',
          right: '300px',
          overflow: 'hidden',
          zIndex: '0',
          opacity: '0.4',
        }}
      />
      <ImageComponent
        className="bookingDog position-absolute text-start"
        src="/pics/bone.png"
        alt=""
        width={70}
        height={70}
        style={{
          top: '100px',
          right: '300px',
          overflow: 'hidden',
          zIndex: '0',
          transform: 'scaleX(-1)', // 將圖片左右翻轉
          opacity: '0.4',
        }}
      />
    </>
  )
}

// export default function ReservationEdit() {
//   const router = useRouter()

//   const [myForm, setMyForm] = useState({
//     fk_b2c_id: '',
//     fk_b2c_pet: '',
//     reservation_date: '',
//     note: '',
//   })
//   const [myFormErrors, setMyFormErrors] = useState({
//     reservation_date: '',
//     note: '',
//   })

//   const onChange = (e) => {
//     console.log(e.target.name, e.target.value)

//     const schemaForm = z.object({
//       reservation_date: z.date().refine((date) => date >= new Date(), {
//         message: '請符合日期格式 yyyy-mm-dd',
//       }),
//       note: z.string().min(2, { message: '至少填入十個字元' }),
//     })

//     const newForm = { ...myForm, [e.target.name]: e.target.value }

//     const result2 = schemaForm.safeParse(newForm)
//     console.log(JSON.stringify(result2, null, 4))

//     // 重置 myFormErrors
//     const newFormErrors = {
//       reservation_date: '',
//       note: '',
//     }

//     if (!result2.success && result2?.error?.issues?.length) {
//       for (let issue of result2.error.issues) {
//         newFormErrors[issue.path[0]] = issue.message
//       }
//     }
//     setMyFormErrors(newFormErrors)
//     console.log(newForm)
//     setMyForm(newForm)
//   }

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     // 如果表單驗證有通過的話
//     try {
//       const r = await fetch(RV_ADD_POST, {
//         method: 'POST',
//         body: JSON.stringify(myForm),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       const result = await r.json()
//       console.log(result)
//       if (result.success) {
//         router.push(`/appointment/service`) // 跳頁
//       } else {
//       }
//     } catch (ex) {
//       console.log(ex)
//     }
//   }

//   return (
//     <div title="新增線上預約單" pageName="reservation-add">
//       <div className="row">
//         <div className="col-6">
//           <div className="card">
//             <div className="card-body">
//               <h5 className="card-title">新增資料</h5>
//               <form name="form1" onSubmit={onSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="name" className="form-label">
//                     姓名
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="name"
//                     name="name"
//                     value={myForm.b2c_id}
//                     onChange={onChange}
//                   />
//                   <div className="form-text">{myFormErrors.b2c_id}</div>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">
//                     Email
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="email"
//                     name="email"
//                     value={myForm.b2c_email}
//                     onChange={onChange}
//                   />
//                   <div className="form-text">{myFormErrors.b2c_email}</div>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="mobile" className="form-label">
//                     手機
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="mobile"
//                     name="mobile"
//                     value={myForm.b2c_mobile}
//                     onChange={onChange}
//                   />
//                   <div className="form-text">{myFormErrors.b2c_mobile}</div>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="birthday" className="form-label">
//                     生日
//                   </label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     id="birthday"
//                     name="birthday"
//                     value={myForm.b2c_birthday}
//                     onChange={onChange}
//                   />
//                   <div className="form-text"></div>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="address" className="form-label">
//                     地址
//                   </label>

//                   <textarea
//                     className="form-control"
//                     id="address"
//                     name="address"
//                     cols="30"
//                     rows="3"
//                     value={myForm.b2c_address}
//                     onChange={onChange}
//                   ></textarea>
//                   <div className="form-text"></div>
//                 </div>

//                 <button type="submit" className="btn btn-primary">
//                   新增
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
