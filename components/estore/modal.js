import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
// import ImageComponent from '../../common/image'
export default function ModalComponent() {
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
              {/* <ImageComponent
                src="/pics/thanks.png"
                width={300}
                height={200}
                alt=""
                style={{
                  borderRadius: '15px',
                  backgroundColor: 'orange',
                }}
              /> */}
            </div>
            <div className="modal-footer">
              <button
                href="/"
                className="btn btn-warning"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
                style={{
                  width: '30%',
                  backgroundColor: 'orange',
                  borderRadius: '10px',
                  color: '#fff5cf',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '5px',
                  fontWeight: 'bolder',
                }}
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
