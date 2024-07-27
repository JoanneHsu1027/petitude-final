import React, { useEffect, useState } from 'react'
import { InsuranceRecords_GET } from '@/configs/api-path'
import styles from '@/styles/member/insurance.module.css'
import { useAuth } from '@/contexts/member/auth-context'
import { products } from '@/components/insurance/insurance_product'

const InsuranceRecords = () => {
  const { auth, getAuthHeader } = useAuth()
  const [recordData, setRecordsData] = useState({
    fk_b2c_id: '',
    b2c_email: '',
    b2c_name: '',
    b2c_mobile: '',
    fk_county_id: '',
    fk_city_id: '',
    b2c_address: '',
    policyholder_address: '',
    policyholder_email: '',
    policyholder_mobile: '',
  })

  useEffect(() => {
    const fetchRecordData = async () => {
      if (!auth.b2c_id) return

      try {
        const response = await fetch(
          `${InsuranceRecords_GET}/${recordData.fk_b2c_id}`,
          {
            headers: getAuthHeader(),
          },
        )
        const result = await response.json()
        if (result.success) {
          setRecordsData(result.data)
        } else {
          console.error(result.error)
        }
      } catch (ex) {
        console.error(ex)
      }
    }

    fetchRecordData()
  }, [auth.b2c_id, getAuthHeader])

  if (!recordData) {
    return <div>Loading...</div>
  }

  return (
    <div className={`container-fluid mb-5 ${styles.allFont}`}>
      <div className="row justify-content-center">
        {/* 資料確認 */}
        <div className="col-12" style={{ marginTop: '30px' }}>
          <h4 className={styles['top-frame']}>投保人資料</h4>
          <div
            className={`d-flex justify-content-center ${styles['data-frame']}`}
          >
            <div
              className="col-6 d-flex flex-column justify-content-center"
              style={{ paddingLeft: '1.25rem' }}
            >
              <div className="d-flex mb-3">
                <h5
                  className={`col-4 ${styles['text-color']}`}
                  style={{ marginBottom: '.6875rem' }}
                >
                  要保人姓名
                </h5>
                <h5 className={`col-8 ${styles['own-green']}`}>
                  {recordData.b2c_name}
                </h5>
              </div>
              <div className="d-flex mb-3">
                <h5
                  className={`col-4 ${styles['text-color']}`}
                  style={{ marginBottom: '.6875rem' }}
                >
                  身份證字號
                </h5>
                <h5 className={`col-8 ${styles['own-green']}`}>
                  {recordData.policyholder_IDcard}
                </h5>
              </div>
              <div className="d-flex mb-3">
                <h5
                  className={`col-4 ${styles['text-color']}`}
                  style={{ marginBottom: '.6875rem' }}
                >
                  出生年月日
                </h5>
                <h5 className={`col-8 ${styles['own-green']}`}>
                  {recordData.policyholder_birthday}
                </h5>
              </div>
              <div className="d-flex">
                <h5
                  className={`col-4 ${styles['text-color']}`}
                  style={{ marginBottom: '.6875rem' }}
                >
                  通訊地址
                </h5>
                <h5 className={`col-8 ${styles['own-green']}`}>
                  {recordData.policyholder_address}
                </h5>
              </div>
            </div>
            <div className="col-6 d-flex flex-column justify-content-start">
              <div className="d-flex mb-3">
                <h5
                  className={`col-4 ${styles['text-color']}`}
                  style={{ marginBottom: '.6875rem' }}
                >
                  保單型式
                </h5>
                <h5 className={`col-8 ${styles['own-green']}`}>電子保單</h5>
              </div>
              <div className="d-flex mb-3">
                <h5
                  className={`col-4 ${styles['text-color']}`}
                  style={{ marginBottom: '.6875rem' }}
                >
                  保單寄送信箱
                </h5>
                <h5 className={`col-8 ${styles['own-green']}`}>
                  {recordData.policyholder_email}
                </h5>
              </div>
              <div className="d-flex mb-3">
                <h5
                  className={`col-4 ${styles['text-color']}`}
                  style={{ marginBottom: '.6875rem' }}
                >
                  連絡電話
                </h5>
                <h5 className={`col-8 ${styles['own-green']}`}>
                  {recordData.policyholder_mobile}
                </h5>
              </div>
              <div className="d-flex mb-3">
                <h5
                  className={`col-4 ${styles['text-color']}`}
                  style={{ marginBottom: '.6875rem' }}
                >
                  付款方式
                </h5>
                <h5 className={`col-8 ${styles['own-green']}`}>線上付款</h5>
              </div>
            </div>
          </div>
        </div>

        {/* 投保方案確認 */}
        <div className="col-12" style={{ marginTop: '30px' }}>
          <h4 className={styles['top-frame']}>投保方案</h4>
          <div
            className={`d-flex justify-content-center ${styles['data-frame-up']}`}
          >
            <div
              className="col-5 d-flex flex-column justify-content-start align-items-center"
              style={{
                padding: '0 20px',
              }}
            >
              <div
                className="img-fluid rounded-circle"
                style={{
                  width: '250px',
                  height: '250px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={recordData.pet_pic}
                  className="img-fluid rounded-circle"
                  style={{
                    backgroundColor: '#D9D9D9',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
            <div className="col-7 d-flex flex-column justify-content-center ">
              <div className="d-flex  mb-3">
                <h5
                  className={`col-3 ${styles['text-color']}`}
                  style={{ marginBottom: '.6875rem' }}
                >
                  寵物姓名
                </h5>
                <h5 className={`col-8 ${styles['own-green']}`}>
                  {recordData.pet_name}
                </h5>
              </div>
              <div className="d-flex mb-3">
                <h5
                  className={`col-3 ${styles['text-color']}`}
                  style={{ marginBottom: '.6875rem' }}
                >
                  晶片號碼
                </h5>
                <h5 className={`col-8 ${styles['own-green']}`}>
                  {recordData.pet_chip}
                </h5>
              </div>
              <div className="d-flex mb-3 ">
                <h5
                  className={`col-3 ${styles['text-color']}`}
                  style={{ marginBottom: '.6875rem' }}
                >
                  投保期間
                </h5>
                <h5 className={`col-8 ${styles['own-green']}`}>
                  {recordData.insurance_start_date} 零時起至 {9} 零時止
                </h5>
              </div>
              <div className="d-flex ">
                <h5
                  className={`col-3 ${styles['text-color']}`}
                  style={{ marginBottom: '.6875rem' }}
                >
                  投保方案
                </h5>
                <h5 className={`col-8 ${styles['own-green']}`}>
                  {recordData.insurance_product || '未選擇方案'}
                </h5>
              </div>
            </div>
          </div>
          <div
            className={`d-flex justify-content-center ${styles['data-frame']}`}
          >
            <div className="col-6 justify-content-center align-items-center">
              <h5
                className={`text-center ${styles['text-color']}`}
                style={{ marginBottom: '1.25rem' }}
              >
                【寵物醫療費用保險】
              </h5>

              <ul style={{ padding: 0, paddingLeft: 100 }}>
                {[
                  {
                    label: '每次門診(最高)費用',
                    value: `${10000}元,一年最高${10000}次`,
                  },
                  {
                    label: '每次住院(最高)費用',
                    value: `${10000}元,一年最高${10000}次`,
                  },
                  {
                    label: '每次手術(最高)費用',
                    value: `${10000}元,一年最高${10000}次`,
                  },
                  {
                    label: '保險期間內累積最高賠償限額',
                    value: `${10000}元`,
                  },
                ].map((item, index) => (
                  <li key={index} className={`d-flex ${styles['item-dot']}`}>
                    <i className="bi bi-check-square me-1" />
                    <h5
                      className={styles['text-color']}
                      style={{ marginBottom: '.6875rem' }}
                    >
                      {item.label}
                    </h5>
                    <h5 className={styles['own-green']}>NT {item.value}</h5>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-6 justify-content-center align-items-center">
              <h5
                className={`text-center ${styles['text-color']}`}
                style={{ marginBottom: '1.25rem' }}
              >
                【寵物侵權責任保險】
              </h5>
              <ul style={{ padding: 0, paddingLeft: 140 }}>
                <li className={`d-flex ${styles['item-dot']}`}>
                  <i className="bi bi-check-square me-1" />
                  <h5
                    className={styles['text-color']}
                    style={{ marginBottom: '.6875rem' }}
                  >
                    每一個人體傷責任
                  </h5>
                  <h5 className={styles['own-green']}>NT 100,000元</h5>
                </li>
                <li className={`d-flex ${styles['item-dot']}`}>
                  <i className="bi bi-check-square me-1" />
                  <h5
                    className={styles['text-color']}
                    style={{ marginBottom: '.6875rem' }}
                  >
                    每一意外事故體傷責任
                  </h5>
                  <h5 className={styles['own-green']}>NT 200,000元</h5>
                </li>
                <li className={`d-flex ${styles['item-dot']}`}>
                  <i className="bi bi-check-square me-1" />
                  <h5
                    className={styles['text-color']}
                    style={{ marginBottom: '.6875rem' }}
                  >
                    每一意外事故財物損失責任
                  </h5>
                  <h5 className={styles['own-green']}>NT 50,000元</h5>
                </li>
                <li className={`d-flex ${styles['item-dot']}`}>
                  <i className="bi bi-check-square me-1" />
                  <h5
                    className={styles['text-color']}
                    style={{ marginBottom: '.6875rem' }}
                  >
                    保險期間最高賠償金額
                  </h5>
                  <h5 className={styles['own-green']}>NT 500,000元</h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InsuranceRecords
