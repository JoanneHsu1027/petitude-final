import React from 'react'
import Layout1 from '../../component/layout/layout1'
import ImageComponent from '../../component/common/image'
import ModalComponent from '../../component/funeral/booking-list/modal'

export default function Confirm() {
  return (
    <Layout1>
      {/* <!-- pagination --> */}
      <div className="col-12 d-flex justify-content-center">
        <ImageComponent
          src="/pics/麵包屑2.png"
          width={500}
          height={70}
          alt=""
        />
      </div>
      {/* <!-- pagination --> */}
      <div className="container-fluid m-0 p-0">
        <div className="row d-flex justify-content-center">
          <div className="col-12 justify-content-center">
            {/* body */}
            <div className="body justify-content-center mt-3">
              <div className="section-body d-flex mb-3">
                <div
                  className="col-md-7 d-flex pt-2"
                  style={{ justifyContent: 'center', alignContent: 'center' }}
                >
                  <ImageComponent
                    src="/pics/Frame 685.png"
                    width={400}
                    height={250}
                    alt=""
                  />
                </div>
                <div
                  className="col-md-5 d-flex pt-2"
                  style={{ justifyContent: 'start', alignContent: 'center' }}
                >
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-start mb-2">
                      <p className="me-3 mb-2">禮儀方案:</p>
                      <p className="ms-5 mb-2">尊榮寵物 - 個別羽化</p>
                    </div>
                    <div className="d-flex align-items-start mb-2">
                      <p className="me-3 mb-2">付款方式:</p>
                      <p className="ms-5 mb-2">信用卡</p>
                    </div>
                    <div className="d-flex align-items-start mb-2">
                      <p className="me-3 mb-2">購買人資訊:</p>
                      <div>
                        <p className="ms-5 mb-1">姓名</p>
                        <p className="ms-5 mb-1">手機</p>
                        <p className="ms-5 mb-2">地址</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start mb-2">
                      <p className="me-3 mb-2">發票資訊:</p>
                      <p className="ms-5 mb-2">手機載具</p>
                    </div>
                    <div className="d-flex align-items-start mb-2">
                      <p className="me-3 mb-2">總金額:</p>
                      <p className="ms-5 mb-2">NTD 9000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* body */}
            <div className="d-flex justify-content-center my-3">
              <button
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalToggle2"
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
                確定付款
              </button>
              <ModalComponent />
            </div>
          </div>
        </div>
      </div>
    </Layout1>
  )
}
