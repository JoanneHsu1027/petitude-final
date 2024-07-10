import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Router, { useRouter } from 'next/router'

// 假設的從資料庫中獲取推薦方案的函式
const fetchRecommendationFromDatabase = () => {
  // 假設這裡實際上是從資料庫中取得推薦方案的邏輯
  return {
    text: '從資料庫中取得的推薦方案文字',
    image: '/path/to/database/image.jpg',
    details: '從資料庫中取得的推薦方案詳細內容',
    price: '從資料庫中取得的推薦方案價格',
  }
}

export default function RecommendationModal({
  show,
  handleClose,
  recommendation,
}) {
  const router = useRouter()
  const [recommendationData, setRecommendationData] = useState(null)

  // 使用 useEffect 在模態框顯示時調用從資料庫中獲取推薦方案的函式
  useEffect(() => {
    if (show) {
      const data = fetchRecommendationFromDatabase()
      setRecommendationData(data)
    }
  }, [show])

  // 解構 recommendationData 物件，取出 text / image / details
  const { text, image, details, price } = recommendationData || {}

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
                <h4 style={{ fontWeight: '900' }}>{text}</h4>
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

// import React from 'react'
// import { Modal, Button } from 'react-bootstrap'
// import ImageComponent from '../../common/image'

// // 定義推薦方案的內容
// const recommendations = {
//   pet: {
//     cat: {
//       content: (
//         <Modal.Body>
//           <p>選擇貓, 跳這</p>
//         </Modal.Body>
//       ),
//     },
//     dog: {
//       content: (
//         <Modal.Body>
//           <p>選擇狗, 跳這</p>
//         </Modal.Body>
//       ),
//     },
//   },
//   kg: {
//     underFiveKg: {
//       content: (
//         <Modal.Body>
//           <p>選擇5kg, 跳這</p>
//           {/* 請根據需求添加相應的內容 */}
//         </Modal.Body>
//       ),
//     },
//     underTenKg: {
//       content: (
//         <Modal.Body>
//           <p>選擇10kg, 跳這</p>
//           {/* 請根據需求添加相應的內容 */}
//         </Modal.Body>
//       ),
//     },
//     underTwentyKg: {
//       content: (
//         <Modal.Body>
//           <p>選擇20kg, 跳這</p>
//           {/* 請根據需求添加相應的內容 */}
//         </Modal.Body>
//       ),
//     },
//   },
//   ashes: {
//     bringBack: {
//       content: (
//         <Modal.Body>
//           <p>選擇家長帶回, 跳這</p>
//           {/* 請根據需求添加相應的內容 */}
//         </Modal.Body>
//       ),
//     },
//     flowerBurial: {
//       content: (
//         <Modal.Body>
//           <p>選擇園區花葬, 跳這</p>
//           {/* 請根據需求添加相應的內容 */}
//         </Modal.Body>
//       ),
//     },
//   },
//   service: {
//     pd: {
//       content: (
//         <Modal.Body>
//           <p>選擇家長親送, 跳這</p>
//           {/* 請根據需求添加相應的內容 */}
//         </Modal.Body>
//       ),
//     },
//     ps: {
//       content: (
//         <Modal.Body>
//           <p>選擇專人接體, 跳這</p>
//           {/* 請根據需求添加相應的內容 */}
//         </Modal.Body>
//       ),
//     },
//   },
//   setup: {
//     warm: {
//       content: (
//         <Modal.Body>
//           <p>選擇溫馨布置, 跳這</p>
//           <ImageComponent
//             src="/pics/Vector 20.png"
//             alt="溫馨寵物"
//             width={300}
//             height={250}
//           />
//         </Modal.Body>
//       ),
//     },
//     honor: {
//       content: (
//         <Modal.Body>
//           <p>選擇尊榮布置, 跳這</p>
//           <ImageComponent
//             src="/pics/index_n5.png"
//             alt="尊榮寵物"
//             width={300}
//             height={250}
//           />
//         </Modal.Body>
//       ),
//     },
//   },
//   other: {
//     spa: {
//       content: (
//         <Modal.Body>
//           <p>選擇禮體spa美容, 跳這</p>
//           {/* 請根據需求添加相應的內容 */}
//         </Modal.Body>
//       ),
//     },
//     none: {
//       content: (
//         <Modal.Body>
//           <p>選擇無須其他服務, 跳這</p>
//           {/* 請根據需求添加相應的內容 */}
//         </Modal.Body>
//       ),
//     },
//   },
// }

// // 定義推薦方案組件
// const RecommendationModal = ({ show, handleClose, recommendation }) => {
//   // 渲染推薦方案
//   const renderRecommendation = () => {
//     let content = null

//     for (let category in recommendation) {
//       if (
//         recommendation.hasOwnProperty(category) &&
//         recommendations[category]?.[recommendation[category]]
//       ) {
//         content = recommendations[category][recommendation[category]].content
//         break // 找到第一個符合條件的推薦方案即可
//       }
//     }

//     return content
//   }

//   return (
//     <Modal show={show} onHide={handleClose} centered size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>推薦方案</Modal.Title>
//       </Modal.Header>
//       {renderRecommendation()}
//       <Modal.Footer>
//         <Button variant="warning" onClick={handleClose}>
//           取消
//         </Button>
//         <Button variant="warning" onClick={handleClose}>
//           確認結帳
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   )
// }

// export default RecommendationModal
