import React, { useState, useEffect } from 'react'
import styles from '@/styles/member/insurance.module.css'
import { products } from '@/components/insurance/insurance_product'
import { counties } from '@/components/common/county'
import { cities } from '@/components/common/city'

const InsuranceRecordsModal = ({
  modalVisible,
  setModalVisible,
  modalType,
  selectedRecord,
}) => {
  const [holderCounty, setHolderCounty] = useState('')
  const [holderCity, setHolderCity] = useState('')

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(dateString).toLocaleDateString('zh-TW', options)
  }

  const renderDataRow = (label, value, customClass = '', customClass1 = '') => (
    <div className="d-flex mb-3 justify-content-start">
      <h5 className={`col-6 ${styles['text-color']} ${customClass}`}>
        {label}
      </h5>
      <h5
        className={`col-6 ${styles['own-green']} ${customClass1}`}
        dangerouslySetInnerHTML={{ __html: value }}
      ></h5>
    </div>
  )

  const getInsuranceProductDetails = (productId) => {
    return products.find((product) => product.id === productId) || {}
  }

  useEffect(() => {
    if (selectedRecord) {
      const getLocationName = (id, list) => {
        const stringId = id.toString()
        const item = list.find((i) => i.value === stringId)
        return item ? item.label : '未知'
      }

      const newCounty = getLocationName(selectedRecord.fk_county_id, counties)
      const newCity = getLocationName(selectedRecord.fk_city_id, cities)

      console.log('確認縣id:', selectedRecord.fk_county_id)
      console.log('確認市id:', selectedRecord.fk_city_id)
      console.log('確認縣:', newCounty)
      console.log('確認市:', newCity)

      if (newCounty !== holderCounty) {
        setHolderCounty(newCounty)
      }
      if (newCity !== holderCity) {
        setHolderCity(newCity)
      }
    } else {
      if (holderCounty !== '' || holderCity !== '') {
        setHolderCounty('')
        setHolderCity('')
      }
    }
  }, [selectedRecord, holderCounty, holderCity])

  if (!modalVisible || !selectedRecord) return null

  return (
    <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {modalType === 'policyholder' ? '投保人資料' : '投保方案'}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setModalVisible(false)}
            ></button>
          </div>
          <div className="modal-body">
            {modalType === 'policyholder' && (
              <>
                {renderDataRow(
                  '要保人姓名',
                  selectedRecord.b2c_name,
                  'text-start',
                  'text-start',
                )}
                {renderDataRow(
                  '身份證字號',
                  selectedRecord.policyholder_IDcard,
                  'text-start',
                  'text-start',
                )}
                {renderDataRow(
                  '出生年月日',
                  formatDate(selectedRecord.policyholder_birthday),
                  'text-start',
                  'text-start',
                )}
                {renderDataRow(
                  '通訊地址',
                  `${holderCounty}${holderCity}${selectedRecord.policyholder_address}`,
                  'text-start',
                  'text-start',
                )}
                {renderDataRow(
                  '保單型式',
                  '電子保單',
                  'text-start',
                  'text-start',
                )}
                {renderDataRow(
                  '保單寄送信箱',
                  selectedRecord.policyholder_email,
                  'text-start',
                  'text-start',
                )}
                {renderDataRow(
                  '連絡電話',
                  selectedRecord.policyholder_mobile,
                  'text-start',
                  'text-start',
                )}
                {renderDataRow(
                  '付款方式',
                  '線上付款',
                  'text-start',
                  'text-start',
                )}
              </>
            )}
            {modalType === 'insurance' && (
              <>
                <div className="d-flex justify-content-center">
                  <img
                    src={selectedRecord.pet_pic}
                    className="img-fluid rounded-circle"
                    style={{
                      backgroundColor: '#D9D9D9',
                      width: '250px',
                      height: '250px',
                      objectFit: 'cover',
                    }}
                    alt="寵物圖片"
                  />
                </div>
                {renderDataRow(
                  '寵物姓名',
                  selectedRecord.pet_name,
                  'col-6 mt-2 text-center me-3',
                  'mt-2 text-start',
                )}
                {renderDataRow(
                  '晶片號碼',
                  selectedRecord.pet_chip,
                  'col-6  text-center me-3',
                  'text-start',
                )}
                {renderDataRow(
                  '投保期間',
                  `${formatDate(selectedRecord.insurance_start_date)} 零時起至<br /> ${formatDate(new Date(new Date(selectedRecord.insurance_start_date).setFullYear(new Date(selectedRecord.insurance_start_date).getFullYear() + 1)))} 零時止`,
                  'col-6  text-center me-3',
                  'text-start',
                )}
                {renderDataRow(
                  '投保方案',
                  selectedRecord.insurance_product || '未選擇方案',
                  'col-6  text-center me-3',
                  'text-start',
                )}

                {/* 顯示保險條款等細節 */}
                <InsuranceDetails
                  selectedRecord={selectedRecord}
                  getInsuranceProductDetails={getInsuranceProductDetails}
                />
              </>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setModalVisible(false)}
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const InsuranceDetails = ({ selectedRecord, getInsuranceProductDetails }) => {
  const productDetails = getInsuranceProductDetails(
    selectedRecord.insurance_product,
  )

  return (
    <div className="col-12">
      <h5
        className={`text-center ${styles['text-color']}`}
        style={{ marginBottom: '1.25rem' }}
      >
        【寵物醫療費用保險】
      </h5>
      <ul style={{ padding: 0, paddingLeft: 20 }}>
        {[
          {
            label: '每次門診(最高)費用',
            value: `${productDetails.clinicFee}元, 一年最高${productDetails.clinicTime}次`,
          },
          {
            label: '每次住院(最高)費用',
            value: `${productDetails.hospitalFee}元, 一年最高${productDetails.hospitalTime}次`,
          },
          {
            label: '每次手術(最高)費用',
            value: `${productDetails.surgeryFee}元, 一年最高${productDetails.surgeryTime}次`,
          },
          {
            label: '保險期間內累積最高賠償限額',
            value: `${productDetails.maxPayment}元`,
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
  )
}

export default InsuranceRecordsModal
