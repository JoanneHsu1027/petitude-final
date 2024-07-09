import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ImageComponent from '../../../../components/funeral/common/image'
import { useRouter } from 'next/router'
// import ProgressBar from '../../progress-bar'

export default function ModalComponent() {
  const router = useRouter()

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        {/* <ProgressBar /> */}
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
            <div className="modal-footer">
              <button
                className="btn btn-warning"
                onClick={() => {
                  if (confirm('確定嗎?')) {
                    router.push('/funeral/funeral/masonry')
                  }
                }}
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

{
  /* 所以要在點擊回首頁前, 要先跳轉付款畫面, 在跳轉謝謝購買的modal */
}
{
  /* 這邊所有資料都要存在localstorage, 然後在帶入下個頁面 */
}
{
  /* 要怎麼做? 目前已經有紀錄狀態值了?? */
}
