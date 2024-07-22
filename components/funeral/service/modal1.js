import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import RecommendationModal from '@/components/funeral/service/RecommendationModal'

export default function Modal1({ show, handleClose }) {
  const [showRecommendationModal, setShowRecommendationModal] = useState(false)

  const [selection, setSelection] = useState({
    pet: '',
    kg: '',
    ashes: '',
    service: '',
    setup: '',
    other: '',
  })

  const handleSelectionChange = (event) => {
    const { name, value } = event.target
    setSelection((prev) => {
      const updatedSelection = { ...prev, [name]: value }
      // 更新 localStorage
      localStorage.setItem('setUpSelection', JSON.stringify(updatedSelection))
      return updatedSelection
    })
  }

  // 在組件掛載時檢查 localStorage 並加載狀態
  useEffect(() => {
    const storedSelection = localStorage.getItem('petSelection')
    if (storedSelection) {
      setSelection(JSON.parse(storedSelection))
    }
  }, [])




  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton style={{ backgroundColor: '#FFF5CF' }}>
        <Modal.Title className="modal-title">客製化服務</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container1 flex-column">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <div
                className="optionGroup d-flex flex-row align-items-stretch mb-3"
                id="optionGroup1"
              >
                <div className="form-check">
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="pet"
                    id="cat"
                    value="貓"
                    onChange={handleSelectionChange}
                    required
                  />
                  <label className="form-check-label own-btn4" htmlFor="cat">
                    <div className="image-container">
                      <img
                        src="/funeral/cat-btn.png"
                        alt=""
                        className="pet-image"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="pet"
                    id="dog"
                    value="犬"
                    onChange={handleSelectionChange}
                    required
                  />
                  <label className="form-check-label own-btn4" htmlFor="dog">
                    <div className="image-container">
                      <img
                        src="/funeral/dog-btn.png"
                        alt=""
                        className="pet-image"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <div className="optionGroup m-2" id="optionGroup2">
                <div className="form-check text-center">
                  <h6>寶貝重量</h6>
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="kg"
                    id="underFiveKg"
                    value="5公斤以下"
                    onChange={handleSelectionChange}
                    required
                  />
                  <label
                    className="form-check-label own-btn3"
                    htmlFor="underFiveKg"
                  >
                    5公斤以下
                  </label>
                </div>
                <div className="form-check text-center">
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="kg"
                    id="underTenKg"
                    value="10公斤以下"
                    onChange={handleSelectionChange}
                    required
                  />
                  <label
                    className="form-check-label own-btn3"
                    htmlFor="underTenKg"
                  >
                    10公斤以下
                  </label>
                </div>
                <div className="form-check text-center">
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="kg"
                    id="underTwentyKg"
                    value="20公斤以下"
                    onChange={handleSelectionChange}
                    required
                  />
                  <label
                    className="form-check-label own-btn3"
                    htmlFor="underTwentyKg"
                  >
                    20公斤以下
                  </label>
                </div>
              </div>
              <div className="optionGroup m-2" id="optionGroup3">
                <div className="form-check text-center">
                  <h6>骨灰安置</h6>
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="ashes"
                    id="bringBack"
                    value="家長帶回"
                    onChange={handleSelectionChange}
                    required
                  />
                  <label
                    className="form-check-label own-btn3"
                    htmlFor="bringBack"
                  >
                    家長帶回
                  </label>
                </div>
                <div className="form-check text-center">
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="ashes"
                    id="flowerBurial"
                    value="園區花葬"
                    onChange={handleSelectionChange}
                    required
                  />
                  <label
                    className="form-check-label own-btn3"
                    htmlFor="flowerBurial"
                  >
                    園區花葬
                  </label>
                </div>
              </div>
              <div className="optionGroup m-2" id="optionGroup4">
                <div className="form-check text-center">
                  <h6>接體服務</h6>
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="service"
                    id="pd"
                    value="家長親送"
                    onChange={handleSelectionChange}
                    required
                  />
                  <label className="form-check-label own-btn3" htmlFor="pd">
                    家長親送
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="service"
                    id="ps"
                    value="專人接體"
                    onChange={handleSelectionChange}
                    required
                  />
                  <label className="form-check-label own-btn3" htmlFor="ps">
                    專人接體
                  </label>
                </div>
              </div>
              <div className="optionGroup m-2" id="optionGroup5">
                <div className="form-check text-center">
                  <h6>告別式布置</h6>
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="setup"
                    id="Warm"
                    value="溫馨布置"
                    onChange={handleSelectionChange}
                    required
                  />
                  <label className="form-check-label own-btn3" htmlFor="Warm">
                    溫馨布置
                  </label>
                </div>
                <div className="form-check text-center">
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="setup"
                    id="honor"
                    value="尊榮布置"
                    onChange={handleSelectionChange}
                    required
                  />
                  <label className="form-check-label own-btn3" htmlFor="honor">
                    尊榮布置
                  </label>
                </div>
              </div>
              <div className="optionGroup m-2" id="optionGroup6">
                <div className="form-check text-center">
                  <h6>其他服務</h6>
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="other"
                    id="spa"
                    value="禮體SPA美容"
                    onChange={handleSelectionChange}
                    required
                  />
                  <label className="form-check-label own-btn3" htmlFor="spa">
                    禮體SPA美容
                  </label>
                </div>
                <div className="form-check text-center">
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="other"
                    id="none"
                    value="無須其他服務"
                    onChange={handleSelectionChange}
                    required
                  />
                  <label className="form-check-label own-btn3" htmlFor="none">
                    無須其他服務
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#FFF5CF' }}>
        <button className="btn btn-warning" onClick={handleClose}>
          確定
        </button>
      </Modal.Footer>

      <style jsx>{`
        .form-check-input {
          display: none;
        }
        .form-check {
          padding: 0;
          margin-bottom: 12px;
        }
        .own-btn3 {
          border-radius: 1.25rem;
          background-color: white;
          border: 1px solid #f69a30;
          color: #515151;
          font-size: 1rem;
          font-weight: 900;
          white-space: nowrap;
          width: 7rem;
          height: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0;
          margin: 5px;
          cursor: pointer;
        }
        .own-btn3:hover {
          background-color: #f0f0f0;
        }
        .btn-check {
          display: none;
        }
        .btn-check:checked + .own-btn3 {
          background-color: #f69a30;
          color: white;
          border-color: #f69a30;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .own-btn4 {
          border-radius: 1.25rem;
          background-color: #cfe7b1;
          color: #515151;
          width: 20rem;
          height: 7rem;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0;
          margin: 5px;
          cursor: pointer;
        }
        .btn-check {
          display: none;
        }
        .btn-check:checked + .own-btn4 {
          background-color: #cfe7b1;
          color: white;
          border-color: #f69a30;
          border: 3px solid #f69a30;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        @media screen and (max-width: 1005px) {
          .own-btn3 {
            width: 80%;
            height: 2.5rem;
            font-size: 0.6rem;
          }
          .own-btn4 {
            width: 90%;
            height: 5rem;
          }
        }
      `}</style>
    </Modal>
  )
}
