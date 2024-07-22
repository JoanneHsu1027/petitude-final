import React, { useEffect, useState } from 'react'
import { counties } from '@/components/common/county'
import { cities } from '@/components/common/city'
import viewStyles from './css/MemberProfileView.module.css'

const MemberProfileView = ({ memberData, onEdit }) => {
  const [countyLabel, setCountyLabel] = useState('')
  const [cityLabel, setCityLabel] = useState('')

  useEffect(() => {
    const county = counties.find(
      (county) => county.value === memberData.fk_county_id?.toString(),
    )
    const city = cities.find(
      (city) => city.value === memberData.fk_city_id?.toString(),
    )
    setCountyLabel(county ? county.label : '')
    setCityLabel(city ? city.label : '')
  }, [memberData])

  return (
    <div className="p-4">
      <h2 className="mb-4">會員資料</h2>
      <div className="mb-3">
        <h5 className={viewStyles['form-lable']}>姓名:</h5>
        <p className={viewStyles['form-innerText']}>{memberData.b2c_name}</p>
      </div>
      <div className="mb-3">
        <h5 className={viewStyles['form-lable']}>信箱:</h5>
        <p className={viewStyles['form-innerText']}>{memberData.b2c_email}</p>
      </div>
      <div className="mb-3">
        <h5 className={viewStyles['form-lable']}>手機號碼:</h5>
        <p className={viewStyles['form-innerText']}>{memberData.b2c_mobile}</p>
      </div>
      <div className="mb-3">
        <h5 className={viewStyles['form-lable']}>居住地區:</h5>
        <p className={viewStyles['form-innerText']}>
          {countyLabel}
          {cityLabel}
          {memberData.b2c_address}
        </p>
      </div>

      <button type="button" className="btn btn-primary" onClick={onEdit}>
        修改
      </button>
    </div>
  )
}

export default MemberProfileView
