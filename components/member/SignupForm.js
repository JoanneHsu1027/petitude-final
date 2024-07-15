import React, { useState } from 'react'
import { z } from 'zod'
import { counties } from '@/components/common/county'
import { cities } from '@/components/common/city'

const SignupForm = ({ onClose, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    county: '',
    city: '',
  })

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    county: '',
    city: '',
  })

  const [error, setError] = useState('')

  // 用于获取与所选县市相关的城市
  const getFilteredCities = (countyId) => {
    return cities.filter((city) => city.fk_county_id === parseInt(countyId, 10))
  }

  // 处理输入变化
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  // 表单提交处理
  const handleSubmit = async (e) => {
    e.preventDefault()

    // 验证模式
    const schemaForm = z.object({
      name: z.string().min(2, { message: '姓名至少兩個字' }),
      email: z.string().email({ message: '請填寫正確的電郵格式' }),
      mobile: z
        .string()
        .regex(/09\d{2}-?\d{3}-?\d{3}/, { message: '請填寫正確的手機格式' }),
      password: z.string().min(6, { message: '密碼至少6個字' }),
      county: z.string().min(1, { message: '請選擇縣市' }),
      city: z.string().min(1, { message: '請選擇城市' }),
    })

    const result = schemaForm.safeParse(formData)

    if (result.success) {
      try {
        const response = await fetch('/api/signup', {
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
          <label htmlFor="email" className="form-label">
            請填寫信箱:
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="form-text">{formErrors.email}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            請填寫密碼:
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="form-text">{formErrors.password}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            請填寫稱呼:
          </label>
          <input
            id="name"
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className="form-text">{formErrors.name}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="county" className="form-label">
            請填寫居住地區:
          </label>
          {/* 縣市 */}
          <select
            id="county"
            name="county"
            className="form-control"
            value={formData.county}
            onChange={(e) => {
              handleChange(e)
              setFormData((prevData) => ({ ...prevData, city: '' })) // 重置城市
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
          <div className="form-text">{formErrors.county}</div>

          {/* 城市 */}
          <select
            id="city"
            name="city"
            className="form-control"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">請選擇城市</option>
            {getFilteredCities(formData.county).map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
          <div className="form-text">{formErrors.city}</div>

          {/* 詳細地址 */}
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
          <label htmlFor="mobile" className="form-label">
            請填寫手機:
          </label>
          <input
            id="mobile"
            type="text"
            className="form-control"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <div className="form-text">{formErrors.mobile}</div>
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
