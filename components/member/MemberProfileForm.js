import React, { useState, useEffect } from 'react'
import { z } from 'zod'
import { MEMBER_UPDATE_POST } from '@/configs/api-path'
import { counties } from '@/components/common/county'
import { cities } from '@/components/common/city'

const MemberProfileForm = ({ memberData }) => {
  const [formData, setFormData] = useState({
    b2c_name: '',
    b2c_birth: '',
    b2c_mobile: '',
    fk_county_id: '',
    fk_city_id: '',
    b2c_address: '',
    b2c_IDcard: '',
    b2c_avatar: '',
  })

  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    // 初始化表單數據
    setFormData(memberData)
  }, [memberData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const getFilteredCities = (countyId) => {
    return cities.filter((city) => city.fk_county_id === parseInt(countyId, 10))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const schemaForm = z.object({
      b2c_name: z.string().min(2, { message: '姓名至少兩個字' }),
      b2c_birth: z.string().optional(),
      b2c_mobile: z
        .string()
        .regex(/09\d{2}-?\d{3}-?\d{3}/, { message: '請填寫正確的手機格式' }),
      fk_county_id: z.string().min(1, { message: '請選擇縣市' }),
      fk_city_id: z.string().min(1, { message: '請選擇城市' }),
      b2c_address: z.string().min(1, { message: '請填寫詳細地址' }),
      b2c_IDcard: z.string().optional(),
    })

    const result = schemaForm.safeParse(formData)

    if (result.success) {
      try {
        const response = await fetch(MEMBER_UPDATE_POST, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const resultData = await response.json()
        if (resultData.success) {
          alert('資料更新成功')
        } else {
          alert('資料更新失敗')
        }
      } catch (ex) {
        console.log(ex)
        alert('資料更新失敗')
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
      <h2 className="mb-4">會員資料</h2>
      {formData.b2c_avatar && <img src={formData.b2c_avatar} alt="頭像" />}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="b2c_name" className="form-label">
            姓名:
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
          <label htmlFor="b2c_birth" className="form-label">
            出生日期:
          </label>
          <input
            id="b2c_birth"
            type="date"
            className="form-control"
            name="b2c_birth"
            value={formData.b2c_birth}
            onChange={handleChange}
          />
          <div className="form-text">{formErrors.b2c_birth}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="b2c_mobile" className="form-label">
            手機號碼:
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

        <div className="mb-3">
          <label htmlFor="fk_county_id" className="form-label">
            縣:
          </label>
          <select
            id="fk_county_id"
            className="form-control"
            name="fk_county_id"
            value={formData.fk_county_id}
            onChange={handleChange}
            required
          >
            <option value="">請選擇縣市</option>
            {counties.map((county) => (
              <option key={county.county_id} value={county.county_id}>
                {county.county_name}
              </option>
            ))}
          </select>
          <div className="form-text">{formErrors.fk_county_id}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="fk_city_id" className="form-label">
            市:
          </label>
          <select
            id="fk_city_id"
            className="form-control"
            name="fk_city_id"
            value={formData.fk_city_id}
            onChange={handleChange}
            required
          >
            <option value="">請選擇城市</option>
            {getFilteredCities(formData.fk_county_id).map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name}
              </option>
            ))}
          </select>
          <div className="form-text">{formErrors.fk_city_id}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="b2c_address" className="form-label">
            地址:
          </label>
          <input
            id="b2c_address"
            type="text"
            className="form-control"
            name="b2c_address"
            value={formData.b2c_address}
            onChange={handleChange}
            required
          />
          <div className="form-text">{formErrors.b2c_address}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="b2c_IDcard" className="form-label">
            身份證號碼:
          </label>
          <input
            id="b2c_IDcard"
            type="text"
            className="form-control"
            name="b2c_IDcard"
            value={formData.b2c_IDcard}
            onChange={handleChange}
          />
          <div className="form-text">{formErrors.b2c_IDcard}</div>
        </div>

        <button type="submit" className="btn btn-primary">
          更新資料
        </button>
      </form>
    </div>
  )
}

export default MemberProfileForm
