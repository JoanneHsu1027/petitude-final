import { useEffect, useState } from 'react'
import { RESERVATION_LIST } from '../../configs/api-path'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { RESERVATION_ADD_POST } from '../../configs/api-path'

export default function ReservationEdit() {
  const router = useRouter()

  const [myForm, setMyForm] = useState({
    fk_b2c_id: '',
    fk_b2c_pet: '',
    reservation_date: '',
    note: '',
  })
  const [myFormErrors, setMyFormErrors] = useState({
    reservation_date: '',
    note: '',
  })

  const onChange = (e) => {
    console.log(e.target.name, e.target.value)

    const schemaForm = z.object({
      reservation_date: z.date().refine((date) => date >= new Date(), {
        message: '請符合日期格式 yyyy-mm-dd',
      }),
      note: z.string().min(2, { message: '至少填入十個字元' }),
    })

    const newForm = { ...myForm, [e.target.name]: e.target.value }

    const result2 = schemaForm.safeParse(newForm)
    console.log(JSON.stringify(result2, null, 4))

    // 重置 myFormErrors
    const newFormErrors = {
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
    // 如果表單驗證有通過的話
    try {
      const r = await fetch(RESERVATION_LIST_ADD_POST, {
        method: 'POST',
        body: JSON.stringify(myForm),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await r.json()
      console.log(result)
      if (result.success) {
        router.push(`/appointment/service`) // 跳頁
      } else {
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div title="新增線上預約單" pageName="reservation-add">
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">新增資料</h5>
              <form name="form1" onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    姓名
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={myForm.b2c_id}
                    onChange={onChange}
                  />
                  <div className="form-text">{myFormErrors.b2c_id}</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={myForm.b2c_email}
                    onChange={onChange}
                  />
                  <div className="form-text">{myFormErrors.b2c_email}</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    手機
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    value={myForm.b2c_mobile}
                    onChange={onChange}
                  />
                  <div className="form-text">{myFormErrors.b2c_mobile}</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="birthday" className="form-label">
                    生日
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="birthday"
                    name="birthday"
                    value={myForm.b2c_birthday}
                    onChange={onChange}
                  />
                  <div className="form-text"></div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    地址
                  </label>

                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    cols="30"
                    rows="3"
                    value={myForm.b2c_address}
                    onChange={onChange}
                  ></textarea>
                  <div className="form-text"></div>
                </div>

                <button type="submit" className="btn btn-primary">
                  新增
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
