import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Router, { useRouter } from 'next/router'

// 假设的从数据库中获取推荐方案的函数
const fetchRecommendationFromDatabase = (setup) => {
  const recommendations = {
    warm: {
      title: '温馨布置方案',
      image: '/funeral/Vector 20.png',
      details: '这是温馨布置的详细内容。',
      price: 'NTD 7000',
    },
    honor: {
      title: '尊榮布置方案',
      image: '/funeral/index_n5.png',
      details: '这是尊荣布置的详细内容。',
      price: 'NTD 9000',
    },
  }

  return (
    recommendations[setup] || {
      title: '找不到上面兩個',
      image: '/pics/index_n5.png',
      details: '所以顯示這裡',
      price: 'NTD 1000',
    }
  )
}

export default function RecommendationModal({
  show,
  handleClose,
  setup, // 从父组件传入的布置方案
}) {
  const router = useRouter()
  const [recommendationData, setRecommendationData] = useState(null)

  // 使用 useEffect 在模态框显示时调用从数据库中获取推荐方案的函数
  useEffect(() => {
    if (show) {
      const data = fetchRecommendationFromDatabase(setup) // 根据setup获取数据
      setRecommendationData(data)
    }
  }, [show, setup])

  // 解构 recommendationData 物件，取出 title / image / details
  const { title, image, details, price } = recommendationData || {}

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton style={{ backgroundColor: '#FFF5CF' }}>
        <Modal.Title>推薦方案</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 d-flex justify-content-between align-items-center">
              {/* 顯示推薦方案的圖片 */}
              <div className="col-md-6">
                {image && (
                  <div className="text-center">
                    <img
                      src={image}
                      alt=""
                      className="img-fluid"
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        marginBottom: '1rem',
                      }}
                    />
                  </div>
                )}
              </div>
              {/* 顯示推薦方案的文字和詳細描述 */}
              <div className="col-md-6">
                <h4 style={{ fontWeight: '900' }}>{title}</h4>
                <p style={{ fontSize: '14px' }}>{details}</p>
                <div className="d-flex justify-content-between">
                  <div>
                    <p
                      style={{
                        color: '#A0722A',
                        fontWeight: '900',
                        fontSize: '12px',
                      }}
                    >
                      免費結緣往生被/十字被
                      <br />
                      免費靈體冰存14天
                      <br />
                      免費懷念骨灰
                      <br />
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '18px' }}>{price}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#FFF5CF' }}>
        <button className="btn btn-warning" onClick={handleClose}>
          取消
        </button>
        {/* 跳轉到funeral/booking-list頁面做結帳 */}
        <button
          className="btn btn-warning"
          onClick={() => {
            if (confirm('確定嗎?')) {
              router.push('/funeral/funeral/booking-list')
            }
          }}
        >
          確定結帳
        </button>
      </Modal.Footer>
    </Modal>
  )
}
