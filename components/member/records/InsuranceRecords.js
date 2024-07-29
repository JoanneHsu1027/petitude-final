import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router' // 引入 useRouter
import { InsuranceRecords_GET } from '@/configs/api-path'
import styles from '@/styles/member/insurance.module.css'
import { useAuth } from '@/contexts/member/auth-context'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import InsuranceRecordsModal from './InsuranceRecordsModal' // 確保引入的名稱正確

const InsuranceRecords = () => {
  const { auth, getAuthHeader } = useAuth()
  const [recordsData, setRecordsData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')
  const [selectedRecord, setSelectedRecord] = useState(null)
  const router = useRouter() // 使用 useRouter 鉤子

  useEffect(() => {
    const fetchRecordsData = async () => {
      if (!auth.b2c_id) return

      try {
        const response = await fetch(`${InsuranceRecords_GET}/${auth.b2c_id}`, {
          headers: getAuthHeader(),
        })
        const result = await response.json()
        console.log('Fetched records data:', result) // 打印結果以便調試
        if (result.success) {
          setRecordsData(Array.isArray(result.data) ? result.data : [])
        } else {
          console.error(result.error)
          setRecordsData([])
        }
      } catch (error) {
        console.error('Error fetching insurance records:', error)
        setRecordsData([])
      }
    }

    fetchRecordsData()
  }, [auth.b2c_id, getAuthHeader])

  const showModal = (type, record) => {
    console.log('Selected Record:', record)
    setModalType(type)
    setSelectedRecord(record)
    setModalVisible(true)
  }

  const handlePayment = (orderId) => {
    // 使用 router.push 進行導航
    router.push(`/insurance/payment/${orderId}`)
  }

  return (
    <div className={`container-fluid mb-5 ${styles.allFont}`}>
      <div className="row justify-content-center">
        <div className="col-12" style={{ marginTop: '30px' }}>
          <h4 className={styles['top-frame']}>保單紀錄</h4>
          {recordsData.length > 0 ? (
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
                      {/* 添加前往付款按鈕 */}
                      {record.payment_status === '未付款' && (
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handlePayment(record.insurance_order_id)
                          }
                        >
                          前往付款
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className={styles['no-records-message']}>沒有保單紀錄</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalVisible && selectedRecord && (
        <InsuranceRecordsModal
          modalType={modalType}
          selectedRecord={selectedRecord}
          modalVisible={modalVisible} // 確保傳遞這個 prop
          setModalVisible={setModalVisible} // 傳遞關閉模態的函數
        />
      )}
    </div>
  )
}

export default InsuranceRecords
