import React, { useState } from 'react'
import { z } from 'zod'
import { counties } from '@/components/common/county'
import { cities } from '@/components/common/city'
import { MEMBER_ADD_POST } from '@/configs/api-path'

const SignupForm = ({ onClose, switchToLogin }) => {
  const [formData, setFormData] = useState({
    b2c_name: '',
    b2c_email: '',
    b2c_password: '',
    b2c_mobile: '',
    b2c_address: '',
    fk_county_id: '',
    fk_city_id: '',
  })

  const [formErrors, setFormErrors] = useState({
    b2c_name: '',
    b2c_email: '',
    b2c_password: '',
    b2c_mobile: '',
    b2c_address: '',
    fk_county_id: '',
    fk_city_id: '',
  })

  const [error, setError] = useState('')

  // 根據縣市列出城市
  const getFilteredCities = (countyId) => {
    return cities.filter((city) => city.fk_county_id === parseInt(countyId, 10))
  }

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
      b2c_name: z.string().min(2, { message: '姓名至少兩個字' }),
      b2c_email: z.string().email({ message: '請填寫正確的電郵格式' }),
      b2c_mobile: z
        .string()
        .regex(/09\d{2}-?\d{3}-?\d{3}/, { message: '請填寫正確的手機格式' }),
      b2c_password: z.string().min(6, { message: '密碼至少6個字' }),
      fk_county_id: z.string().min(1, { message: '請選擇縣市' }),
      fk_city_id: z.string().min(1, { message: '請選擇城市' }),
      b2c_address: z.string().min(1, { message: '請填寫詳細地址' }),
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
          onClose()
        } else {
          setError('註冊失敗')
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
      <h2 className="mb-4">Sign Up</h2>
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
          <label htmlFor="b2c_name" className="form-label">
            請填寫稱呼:
          </label>
          <input
            id="b2c_name"
            type="text"
            className="form-control"
            name="b2c_name"
            value={formData.b2c_name}
            onChange={handleChange}
            required
          />
          <div className="form-text">{formErrors.b2c_name}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="fk_county_id" className="form-label">
            請填寫居住地區:
          </label>
          {/* 縣市 */}
          <select
            id="fk_county_id"
            name="fk_county_id"
            className="form-control"
            value={formData.fk_county_id}
            onChange={(e) => {
              handleChange(e)
              setFormData((prevData) => ({ ...prevData, fk_city_id: '' })) // 重置城市
            }}
            required
          >
            <option value="">請選擇縣市</option>
            {counties.map((county) => (
              <option key={county.value} value={county.value}>
                {county.label}
              </option>
            ))}
          </select>
          <div className="form-text">{formErrors.fk_county_id}</div>
        </div>

        <div className="mb-3">
          {/* 城市 */}
          <label htmlFor="fk_city_id" className="form-label">
            請選擇城市:
          </label>
          <select
            id="fk_city_id"
            name="fk_city_id"
            className="form-control"
            value={formData.fk_city_id}
            onChange={handleChange}
            required
          >
            <option value="">請選擇城市</option>
            {getFilteredCities(formData.fk_county_id).map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
          <div className="form-text">{formErrors.fk_city_id}</div>
        </div>

        <div className="mb-3">
          {/* 詳細地址 */}
          <label htmlFor="b2c_address" className="form-label">
            請填寫詳細地址:
          </label>
          <input
            id="b2c_address"
            type="text"
            className="form-control"
            name="b2c_address"
            value={formData.b2c_address}
            onChange={handleChange}
            placeholder="請填寫詳細地址"
            required
          />
          <div className="form-text">{formErrors.b2c_address}</div>
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
