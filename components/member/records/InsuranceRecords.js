import React, { useEffect, useState } from 'react'
import { InsuranceRecords_GET } from '@/configs/api-path'
import styles from '@/styles/member/insurance.module.css'
import { useAuth } from '@/contexts/member/auth-context'
import { products } from '@/components/insurance/insurance_product'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const InsuranceRecords = () => {
  const { auth, getAuthHeader } = useAuth()
  const [recordsData, setRecordsData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')
  const [selectedRecord, setSelectedRecord] = useState(null)

  useEffect(() => {
    const fetchRecordsData = async () => {
      if (!auth.b2c_id) return

      try {
        const response = await fetch(`${InsuranceRecords_GET}/${auth.b2c_id}`, {
          headers: getAuthHeader(),
        })
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

    fetchRecordsData()
  }, [auth.b2c_id, getAuthHeader])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(dateString).toLocaleDateString('zh-TW', options)
  }

  const renderDataRow = (label, value, customClass = '') => (
    <div className="d-flex mb-3">
      <h5
        className={`col-4 ${styles['text-color']}`}
        style={{ marginBottom: '.6875rem' }}
      >
        {label}
      </h5>
      <h5 className={`col-8 ${styles['own-green']} ${customClass}`}>{value}</h5>
    </div>
  )

  const getInsuranceProductDetails = (productId) => {
    return products.find((product) => product.id === productId) || {}
  }

  const showModal = (type, record) => {
    console.log('Selected Record:', record) // 確認獲取的紀錄
    setModalType(type)
    setSelectedRecord(record)
    setModalVisible(true)
  }

  return (
    <div className={`container-fluid mb-5 ${styles.allFont}`}>
      <div className="row justify-content-center">
        <div className="col-12" style={{ marginTop: '30px' }}>
          <h4 className={styles['top-frame']}>保單紀錄</h4>
          {recordsData.length === 0 ? (
            <div className="alert alert-info text-center">沒有保單紀錄</div>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>編號</th>
                  <th>方案名稱</th>
                  <th>付款狀態</th>
                  <th>金額</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {recordsData.map((record) => (
                  <tr key={record.insurance_order_id}>
                    <td>{record.insurance_order_id}</td>
                    <td>{record.insurance_product}</td>
                    <td>{record.payment_status}</td>
                    <td>{record.insurance_premium}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => showModal('policyholder', record)}
                      >
                        投保人資料
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => showModal('insurance', record)}
                      >
                        投保方案
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalVisible && selectedRecord && (
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
                    {renderDataRow('要保人姓名', selectedRecord.b2c_name)}
                    {renderDataRow(
                      '身份證字號',
                      selectedRecord.policyholder_IDcard,
                    )}
                    {renderDataRow(
                      '出生年月日',
                      formatDate(selectedRecord.policyholder_birthday),
                    )}
                    {renderDataRow(
                      '通訊地址',
                      selectedRecord.policyholder_address,
                    )}
                    {renderDataRow('保單型式', '電子保單')}
                    {renderDataRow(
                      '保單寄送信箱',
                      selectedRecord.policyholder_email,
                    )}
                    {renderDataRow(
                      '連絡電話',
                      selectedRecord.policyholder_mobile,
                    )}
                    {renderDataRow('付款方式', '線上付款')}
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
                      />
                    </div>
                    {renderDataRow(
                      '寵物姓名',
                      selectedRecord.pet_name,
                      'col-3',
                    )}
                    {renderDataRow(
                      '晶片號碼',
                      selectedRecord.pet_chip,
                      'col-3',
                    )}
                    {renderDataRow(
                      '投保期間',
                      `${formatDate(selectedRecord.insurance_start_date)} 零時起至 ${formatDate(
                        new Date(
                          new Date(
                            selectedRecord.insurance_start_date,
                          ).setFullYear(
                            new Date(
                              selectedRecord.insurance_start_date,
                            ).getFullYear() + 1,
                          ),
                        ),
                      )} 零時止`,
                      'col-3',
                    )}
                    {renderDataRow(
                      '投保方案',
                      selectedRecord.insurance_product || '未選擇方案',
                      'col-3',
                    )}
                    <div className="col-12">
                      <h5
                        className={`text-center ${styles['text-color']}`}
                        style={{ marginBottom: '1.25rem' }}
                      >
                        【寵物醫療費用保險】
                      </h5>
                      <ul style={{ padding: 0, paddingLeft: 60 }}>
                        {[
                          {
                            label: '每次門診(最高)費用',
                            value: `${getInsuranceProductDetails(selectedRecord.insurance_product).clinicFee}元, 一年最高${getInsuranceProductDetails(selectedRecord.insurance_product).clinicTime}次`,
                          },
                          {
                            label: '每次住院(最高)費用',
                            value: `${getInsuranceProductDetails(selectedRecord.insurance_product).hospitalFee}元, 一年最高${getInsuranceProductDetails(selectedRecord.insurance_product).hospitalTime}次`,
                          },
                          {
                            label: '每次手術(最高)費用',
                            value: `${getInsuranceProductDetails(selectedRecord.insurance_product).surgeryFee}元, 一年最高${getInsuranceProductDetails(selectedRecord.insurance_product).surgeryTime}次`,
                          },
                          {
                            label: '保險期間內累積最高賠償限額',
                            value: `${getInsuranceProductDetails(selectedRecord.insurance_product).maxPayment}元`,
                          },
                        ].map((item, index) => (
                          <li
                            key={index}
                            className={`d-flex ${styles['item-dot']}`}
                          >
                            <i className="bi bi-check-square me-1" />
                            <h5
                              className={styles['text-color']}
                              style={{ marginBottom: '.6875rem' }}
                            >
                              {item.label}
                            </h5>
                            <h5 className={styles['own-green']}>
                              NT {item.value}
                            </h5>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-12">
                      <h5
                        className={`text-center ${styles['text-color']}`}
                        style={{ marginBottom: '1.25rem' }}
                      >
                        【寵物侵權責任保險】
                      </h5>
                      <ul style={{ padding: 0, paddingLeft: 60 }}>
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
                            每一個財物損失責任
                          </h5>
                          <h5 className={styles['own-green']}>NT 100,000元</h5>
                        </li>
                        <li className={`d-flex ${styles['item-dot']}`}>
                          <i className="bi bi-check-square me-1" />
                          <h5
                            className={styles['text-color']}
                            style={{ marginBottom: '.6875rem' }}
                          >
                            每一次事故總責任
                          </h5>
                          <h5 className={styles['own-green']}>NT 300,000元</h5>
                        </li>
                      </ul>
                    </div>
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
      )}
    </div>
  )
}

export default InsuranceRecords
