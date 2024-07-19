import React, { useState, useEffect } from 'react'
import { z } from 'zod'
import { MEMBER_UPDATE_POST } from '@/configs/api-path'
import { counties } from '@/components/common/county'
import { cities } from '@/components/common/city'
import formStyles from './css/MemberProfileForm.module.css'

const MemberProfileForm = ({ memberData, onCancel }) => {
  const [formData, setFormData] = useState({
    b2c_id: '',
    b2c_email: '',
    b2c_name: '',
    b2c_mobile: '',
    fk_county_id: '',
    fk_city_id: '',
    b2c_address: '',
  })

  const [formErrors, setFormErrors] = useState({})
  const [filteredCities, setFilteredCities] = useState([])

  useEffect(() => {
    setFormData({
      b2c_id: memberData.b2c_id?.toString() || '',
      b2c_email: memberData.b2c_email?.toString() || '',
      b2c_name: memberData.b2c_name || '',
      b2c_mobile: memberData.b2c_mobile || '',
      fk_county_id: memberData.fk_county_id?.toString() || '',
      fk_city_id: memberData.fk_city_id?.toString() || '',
      b2c_address: memberData.b2c_address || '',
    })
  }, [memberData])

  useEffect(() => {
    const getFilteredCities = (countyId) => {
      return cities.filter(
        (city) => city.fk_county_id === parseInt(countyId, 10),
      )
    }

    if (formData.fk_county_id) {
      setFilteredCities(getFilteredCities(formData.fk_county_id))
    } else {
      setFilteredCities([])
    }
  }, [formData.fk_county_id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value || '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const schemaForm = z.object({
      b2c_name: z.string().min(2, { message: '姓名至少兩個字' }),
      b2c_mobile: z
        .string()
        .regex(/09\d{2}-?\d{3}-?\d{3}/, { message: '請填寫正確的手機格式' }),
      fk_county_id: z.string().min(1, { message: '請選擇縣市' }),
      fk_city_id: z.string().min(1, { message: '請選擇城市' }),
      b2c_address: z.string().min(1, { message: '請填寫詳細地址' }),
    })

    const result = schemaForm.safeParse(formData)

    if (result.success) {
      try {
        const response = await fetch(
          `${MEMBER_UPDATE_POST}/${formData.b2c_id}`,
          {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        const resultData = await response.json()
        if (resultData.success) {
          alert('資料更新成功')

          const updatedUser = {
            ...formData,
            b2c_birth: formData.b2c_birth || '',
          }
          localStorage.setItem('user', JSON.stringify(updatedUser))

          setFormErrors({})
        } else {
          console.error('資料更新失敗:', resultData)
          alert('資料更新失敗')
        }
      } catch (ex) {
        console.error('請求錯誤:', ex)
        alert('資料更新失敗')
      }
    } else {
      console.error('驗證錯誤:', result.error)
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
      <h2 className="mb-4">會員資料</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="b2c_name" className="form-label">
            姓名:
          </label>
          <input
            id="b2c_name"
            type="text"
            className={`form-control ${formStyles['form-innerText']}`}
            name="b2c_name"
            value={formData.b2c_name}
            onChange={handleChange}
            required
          />
          {formErrors.b2c_name && (
            <div className="form-text text-danger">{formErrors.b2c_name}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="b2c_email" className="form-label">
            信箱:
          </label>
          <input
            id="b2c_email"
            type="text"
            className={`form-control ${formStyles['form-innerText']}`}
            name="b2c_email"
            value={formData.b2c_email}
            onChange={handleChange}
            required
          />
          {formErrors.b2c_name && (
            <div className="form-text text-danger">{formErrors.b2c_email}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="b2c_mobile" className="form-label">
            手機號碼:
          </label>
          <input
            id="b2c_mobile"
            type="text"
            className={`form-control ${formStyles['form-innerText']}`}
            name="b2c_mobile"
            value={formData.b2c_mobile}
            onChange={handleChange}
            required
          />
          {formErrors.b2c_mobile && (
            <div className="form-text text-danger">{formErrors.b2c_mobile}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="fk_county_id" className="form-label">
            請填寫居住地區:
          </label>
          <div className={formStyles['form-span']}>
            {' '}
            <select
              id="fk_county_id"
              name="fk_county_id"
              className={`form-control ${formStyles['form-innerText']}`}
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
            {formErrors.fk_county_id && (
              <div className="form-text text-danger">
                {formErrors.fk_county_id}
              </div>
            )}
            <select
              id="fk_city_id"
              name="fk_city_id"
              className={`form-control ${formStyles['form-innerText']}`}
              value={formData.fk_city_id}
              onChange={handleChange}
              required
            >
              <option value="">請選擇城市</option>
              {filteredCities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
            {formErrors.fk_city_id && (
              <div className="form-text text-danger">
                {formErrors.fk_city_id}
              </div>
            )}
          </div>

          <input
            id="b2c_address"
            type="text"
            className={`form-control ${formStyles['form-innerText']}`}
            name="b2c_address"
            value={formData.b2c_address}
            onChange={handleChange}
            placeholder="請填寫詳細地址"
            required
          />
          {formErrors.b2c_address && (
            <div className="form-text text-danger">
              {formErrors.b2c_address}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          更新資料
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={onCancel}
        >
          取消
        </button>
      </form>
    </div>
  )
}

export default MemberProfileForm
