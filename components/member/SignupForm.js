import React, { useState } from 'react'
import { z } from 'zod'
import { MEMBER_ADD_POST } from '@/configs/api-path'

const SignupForm = ({ onClose, switchToLogin }) => {
  const [formData, setFormData] = useState({
    b2c_email: '',
    b2c_password: '',
    b2c_mobile: '',
  })

  const [formErrors, setFormErrors] = useState({
    b2c_email: '',
    b2c_password: '',
    b2c_mobile: '',
  })

  const [error, setError] = useState('')

  // 處理欄位輸入變化
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  // 表單提交
  const handleSubmit = async (e) => {
    e.preventDefault()

    // 驗證
    const schemaForm = z.object({
      b2c_email: z.string().email({ message: '請填寫正確的電郵格式' }),
      b2c_password: z.string().min(6, { message: '密碼至少6個字' }),
      b2c_mobile: z
        .string()
        .regex(/09\d{2}-?\d{3}-?\d{3}/, { message: '請填寫正確的手機格式' }),
    })

    const result = schemaForm.safeParse(formData)

    if (result.success) {
      try {
        const response = await fetch(MEMBER_ADD_POST, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const resultData = await response.json()
        if (resultData.success) {
          switchToLogin() // 切換到登入表單
        } else {
          // 根據伺服器返回的錯誤消息設置錯誤狀態
          setError(resultData.error || '註冊失敗')
        }
      } catch (ex) {
        console.log(ex)
        setError('註冊失敗')
      }
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ...result.error.issues.reduce((acc, issue) => {
          acc[issue.path[0]] = issue.message
          return acc
        }, {}),
      }))
    }
  }

  return (
    <div className="p-4">
      <h2 className="mb-4">註冊</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="b2c_email" className="form-label">
            請填寫信箱:
          </label>
          <input
            id="b2c_email"
            type="email"
            className="form-control"
            name="b2c_email"
            value={formData.b2c_email}
            onChange={handleChange}
            required
          />
          <div className="form-text">{formErrors.b2c_email}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="b2c_password" className="form-label">
            請填寫密碼:
          </label>
          <input
            id="b2c_password"
            type="password"
            className="form-control"
            name="b2c_password"
            value={formData.b2c_password}
            onChange={handleChange}
            required
          />
          <div className="form-text">{formErrors.b2c_password}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="b2c_mobile" className="form-label">
            請填寫手機:
          </label>
          <input
            id="b2c_mobile"
            type="text"
            className="form-control"
            name="b2c_mobile"
            value={formData.b2c_mobile}
            onChange={handleChange}
            required
          />
          <div className="form-text">{formErrors.b2c_mobile}</div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          註冊
        </button>
      </form>
    </div>
  )
}

export default SignupForm
