import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useAuth } from '@/contexts/member/auth-context'
import {
  ProductRecords_GET,
  ProductRecords_Detail_GET,
} from '@/configs/api-path'

export default function ProductRecords() {
  const { auth } = useAuth()
  const [orders, setOrders] = useState([])
  const [selectedOrderDetails, setSelectedOrderDetails] = useState([]) // 儲存選擇的訂單細節
  const [modalVisible, setModalVisible] = useState(false) // 控制 modal 顯示狀態

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!auth.b2c_id) return

      try {
        const response = await fetch(`${ProductRecords_GET}/${auth.b2c_id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        })
        const result = await response.json()
        console.log('API Response:', result) // 檢查 API 響應的數據

        if (result.success) {
          setOrders(result.data)
        } else {
          console.error(result.error)
        }
      } catch (ex) {
        console.error(ex)
      }
    }

    fetchOrderData()
  }, [auth.b2c_id, auth.token])

  const handleViewDetails = async (requestId) => {
    try {
      const response = await fetch(`${ProductRecords_Detail_GET}/${requestId}`)
      const result = await response.json()
      if (result.success) {
        setSelectedOrderDetails(result.data) // 將獲取到的訂單細節設置到狀態中
        setModalVisible(true) // 顯示 modal
      }
    } catch (error) {
      console.error('無法獲取訂單細節:', error)
    }
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 justify-content-center align-items-center mb-3 mt-3">
          <div
            className="card my-3"
            style={{
              maxWidth: '100%',
              height: 'auto',
              marginTop: '0.3rem',
              borderTopRightRadius: '30px',
              borderTopLeftRadius: '30px',
              marginBottom: '0',
            }}
          >
            <div
              className="card-header text-center"
              style={{
                backgroundColor: '#4CB1C8',
                color: '#ffffff',
                borderTopRightRadius: '30px',
                borderTopLeftRadius: '30px',
              }}
            >
              購買紀錄
            </div>
            <div className="card-body">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div
                    className="my-3"
                    key={order.request_id}
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '10px',
                      padding: '10px',
                      marginBottom: '10px',
                    }}
                  >
                    <div className="row no-border-table">
                      <div className="col-12 col-md-6">
                        <table>
                          <tbody>
                            <tr>
                              <th>訂單編號: </th>
                              <td>{order.request_id}</td>
                            </tr>
                            <tr>
                              <th>訂單狀態: </th>
                              <td>{order.request_status}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-12 col-md-6">
                        <table>
                          <tbody>
                            <tr>
                              <th>訂單細項: </th>
                              <td>
                                <button
                                  onClick={() =>
                                    handleViewDetails(order.request_id)
                                  }
                                >
                                  點擊查看
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <th>訂單金額: </th>
                              <td>{order.request_price} 元</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">沒有購物紀錄</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal 用於顯示訂單細節 */}
      {modalVisible && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">訂單細節</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalVisible(false)}
                ></button>
              </div>
              <div className="modal-body">
                <ul>
                  {selectedOrderDetails.map((detail) => (
                    <li key={detail.request_detail_id}>
                      {detail.purchase_quantity} x {detail.product_name} - NT{' '}
                      {detail.purchase_price}
                    </li>
                  ))}
                </ul>
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

      <style jsx>{`
        .card-header,
        .card-body,
        .form-check-label,
        .form-label,
        .form-control,
        .form-select {
          font-size: 1.2rem;
        }

        .form-control {
          flex-grow: 1;
        }

        th,
        td {
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .container,
          .row,
          .leftCard,
          .rightCard {
            width: 100%;
            margin: 0 auto;
          }
          th,
          td {
            font-size: 0.9rem;
          }
        }

        .card-header,
        .card-title {
          font-size: 1.2rem;
        }

        .form-check-label,
        .form-label,
        .form-control,
        .form-select {
          font-size: 1rem;
        }
      `}</style>
    </div>
  )
}
