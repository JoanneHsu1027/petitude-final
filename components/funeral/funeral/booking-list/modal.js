import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ImageComponent from '../../../../components/funeral/common/image'
import { useRouter } from 'next/router'

export default function ModalComponent() {
  const router = useRouter()

  const handleButtonClick = () => {
    router.push('/funeral/funeral/masonry')
  }

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">
                謝謝您的購買!
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ImageComponent
                src="/funeral/thanks.png"
                width={300}
                height={200}
                alt=""
                style={{
                  borderRadius: '15px',
                  backgroundColor: 'orange',
                }}
              />
            </div>
            {/* 所以要在點擊回首頁前, 要先跳轉付款畫面, 在跳轉謝謝購買的modal */}
            {/* 這邊所有資料都要存在localstorage, 然後在帶入下個頁面 */}
            {/* 要怎麼做? 目前已經有紀錄狀態值了?? */}
            <div className="modal-footer">
              <button
                onClick={handleButtonClick}
                className="btn btn-warning"
                style={{ width: '120px', marginTop: '20px' }}
              >
                回首頁
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* /funeral/booking-list 點擊進入/funeral/confirm頁面按鈕 */}
      {/* Modal */}
    </>
  )
}
