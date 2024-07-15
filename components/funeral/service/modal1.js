import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import RecommendationModal from '@/components/funeral/service/RecommendationModal'

export default function Modal1({ show, handleClose }) {
  const [selection, setSelection] = useState({
    // 使用 useState 来管理用戶選擇的選項，設定初始值
    pet: '',
    kg: '',
    ashes: '',
    service: '',
    setup: '',
    other: '',
  })

  const [errors, setErrors] = useState({
    // 用來管理每個選項的驗證狀態, 初始值為所有選項未選取(呈false)
    pet: false,
    kg: false,
    ashes: false,
    service: false,
    setup: false,
    other: false,
  })
  // 控制modal的顯示狀態
  const [showRecommendationModal, setShowRecommendationModal] = useState(false)

  // 組件載入時, 從localStorage 中讀取之前保存的選項值, 有的話更新selection狀態
  useEffect(() => {
    const savedSelection = JSON.parse(localStorage.getItem('selection'))
    if (savedSelection) {
      setSelection(savedSelection)
    }
  }, [])

  // 當用戶選擇某個選項時, 就會使用到這個function
  const handleRadioChange = (e) => {
    // 會得到選取的name和value, 並更新到上面selection狀態裡
    const { name, value } = e.target
    setSelection((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    // 同時也會清除error的預設狀態
    setErrors((prevState) => ({
      ...prevState,
      [name]: false,
    }))
    // 將更新後的 選取值(selection) 存到 localStorage
    localStorage.setItem(
      'selection',
      JSON.stringify({
        ...selection,
        [name]: value,
      }),
    )
  }
  // 檢查選項是否都被選取, 有選則跳出modal, 未選則跳錯
  // 每個欄位都需要被選到才可以繼續進行下一步
  const validateSelection = () => {
    const radioGroups = ['pet', 'kg', 'ashes', 'service', 'setup', 'other']
    let isValid = true
    const newErrors = { ...errors }

    radioGroups.forEach((groupName) => {
      if (!selection[groupName]) {
        isValid = false
        newErrors[groupName] = true
      }
    })

    setErrors(newErrors)

    if (isValid) {
      setShowRecommendationModal(true)
    }
  }

  const getRecommendation = (selection) => {
    // 將用戶選擇的中文選項轉換為name的值
    const mapping = {
      pet: { 貓: 'cat', 犬: 'dog' },
      kg: {
        '5公斤以下': 'underFiveKg',
        '10公斤以下': 'underTenKg',
        '20公斤以下': 'underTwentyKg',
      },
      ashes: { 家長帶回: 'bringBack', 園區花葬: 'flowerBurial' },
      service: { 家長親送: 'pd', 專人接體: 'ps' },
      setup: { 溫馨布置: 'warm', 尊榮布置: 'honor' },
      other: { 禮體SPA美容: 'spa', 無須其他服務: 'none' },
    }
    // 便利用戶選擇的每個選項, 產生個新的函式(convertedSelection)
    const convertedSelection = Object.entries(selection).reduce(
      (acc, [key, value]) => {
        // 根據轉換完的選項, 從 recommendationMap娶的推薦的向項目
        acc[key] = mapping[key][value] || value
        // 未找到的話, 則返回
        return acc
      },
      {},
    )

    const { pet, kg, ashes, service, setup, other } = convertedSelection
    // 最後會將推薦的項目裝在上方recommendation函式裡並返回
    const recommendationMap = {
      cat: {
        bringBack: { text: '家長帶回' },
        flowerBurial: { text: '園區花葬' },
        pd: { text: '家長親送' },
        ps: { text: '專人接體' },
        warm: {
          text: '溫馨布置',
          image: '/funeral/Vector 20.png',
          details:
            '生命雖短，愛卻無疆。我們為愛寵設計的告別儀式，不僅是對生命的尊重，更是對每份愛的證明。無論何時決定，免費冰存都將為您騰出思考的空間。在這份旅程終點，讓我們攜手將愛寵的故事，編入時間的長河。',
          price: 'NTD 7000',
        },
        honor: {
          text: '尊榮布置',
          image: '/funeral/index_n5.png',
          details:
            '生命雖短，愛卻無疆。我們為愛寵設計的告別儀式，不僅是對生命的尊重，更是對每份愛的證明。無論何時決定，免費冰存都將為您騰出思考的空間。在這份旅程終點，讓我們攜手將愛寵的故事，編入時間的長河。',
          price: 'NTD 9000',
        },
        underFiveKg: { text: '五公斤以下' },
        underTenKg: { text: '十公斤以下' },
        underTwentyKg: { text: '二十公斤以下' },
        spa: { text: '禮體SPA美容' },
        none: { text: '無須其他服務' },
      },
      dog: {
        bringBack: { text: '家長帶回' },
        flowerBurial: { text: '園區花葬' },
        pd: { text: '家長親送' },
        ps: { text: '專人接體' },
        warm: {
          text: '溫馨布置',
          image: '/funeral/Vector 20.png',
          details:
            '生命雖短，愛卻無疆。我們為愛寵設計的告別儀式，不僅是對生命的尊重，更是對每份愛的證明。無論何時決定，免費冰存都將為您騰出思考的空間。在這份旅程終點，讓我們攜手將愛寵的故事，編入時間的長河。',
          price: 'NTD 7000',
        },
        honor: {
          text: '尊榮布置',
          image: '/funeral/index_n5.png',
          details:
            '生命雖短，愛卻無疆。我們為愛寵設計的告別儀式，不僅是對生命的尊重，更是對每份愛的證明。無論何時決定，免費冰存都將為您騰出思考的空間。在這份旅程終點，讓我們攜手將愛寵的故事，編入時間的長河。',
          price: 'NTD 9000',
        },
        underFiveKg: { text: '五公斤以下' },
        underTenKg: { text: '十公斤以下' },
        underTwentyKg: { text: '二十公斤以下' },
        spa: { text: '禮體SPA美容' },
        none: { text: '無須其他服務' },
      },
    }

    // 會依照選擇的寵物種類及布置方案做推薦
    const recommendationKeys = [setup, ashes, service, kg, other]
    let recommendationText = 'defaultRecommendation'
    let recommendationDetails = 'defaultDetails'
    let recommendationPrice = 'defaultPrice'
    let recommendationImage = '/funeral/vector 20.png'

    for (const key of recommendationKeys) {
      if (
        recommendationMap[pet]?.[key]?.text &&
        recommendationText === 'defaultRecommendation'
      ) {
        recommendationText = recommendationMap[pet][key].text
      }
      if (
        recommendationMap[pet]?.[key]?.details &&
        recommendationDetails === 'defaultDetails'
      ) {
        recommendationDetails = recommendationMap[pet][key].details
      }
      if (
        recommendationMap[pet]?.[key]?.price &&
        recommendationPrice === 'defaultPrice'
      ) {
        recommendationPrice = recommendationMap[pet][key].price
      }
      if (
        recommendationMap[pet]?.[key]?.image &&
        recommendationImage === '/path/to/defaultImage.jpg'
      ) {
        recommendationImage = recommendationMap[pet][key].image
      }
    }

    const recommendation = {
      text: recommendationText,
      details: recommendationDetails,
      price: recommendationPrice,
      image: recommendationImage,
    }
    // 把更新後的的 selection資料 存入 localStorage
    // localStorage.setItem('selection', JSON.stringify(selection))

    return recommendation
  }

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
                    onChange={handleRadioChange}
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
                  {/* 若未選擇, 則會觸發這邊錯誤提示 */}
                  {errors.pet && (
                    <span className="text-danger" style={{ fontSize: '12px' }}>
                      請選擇
                    </span>
                  )}
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="pet"
                    id="dog"
                    value="犬"
                    onChange={handleRadioChange}
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
                  {errors.pet && (
                    <span className="text-danger" style={{ fontSize: '12px' }}>
                      請選擇
                    </span>
                  )}
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
                    onChange={handleRadioChange}
                    required
                  />
                  <label
                    className="form-check-label own-btn3"
                    htmlFor="underFiveKg"
                  >
                    5公斤以下
                  </label>
                  {errors.kg && (
                    <span className="text-danger" style={{ fontSize: '12px' }}>
                      請選擇
                    </span>
                  )}
                </div>
                <div className="form-check text-center">
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="kg"
                    id="underTenKg"
                    value="10公斤以下"
                    onChange={handleRadioChange}
                    required
                  />
                  <label
                    className="form-check-label own-btn3"
                    htmlFor="underTenKg"
                  >
                    10公斤以下
                  </label>
                  {errors.kg && (
                    <span className="text-danger" style={{ fontSize: '12px' }}>
                      請選擇
                    </span>
                  )}
                </div>
                <div className="form-check text-center">
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="kg"
                    id="underTwentyKg"
                    value="20公斤以下"
                    onChange={handleRadioChange}
                    required
                  />
                  <label
                    className="form-check-label own-btn3"
                    htmlFor="underTwentyKg"
                  >
                    20公斤以下
                  </label>
                  {errors.kg && (
                    <span className="text-danger" style={{ fontSize: '12px' }}>
                      請選擇
                    </span>
                  )}
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
                    onChange={handleRadioChange}
                    required
                  />
                  <label
                    className="form-check-label own-btn3"
                    htmlFor="bringBack"
                  >
                    家長帶回
                  </label>
                  {errors.ashes && (
                    <span className="text-danger" style={{ fontSize: '12px' }}>
                      請選擇
                    </span>
                  )}
                </div>
                <div className="form-check text-center">
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="ashes"
                    id="flowerBurial"
                    value="園區花葬"
                    onChange={handleRadioChange}
                    required
                  />
                  <label
                    className="form-check-label own-btn3"
                    htmlFor="flowerBurial"
                  >
                    園區花葬
                  </label>
                  {errors.ashes && (
                    <span className="text-danger" style={{ fontSize: '12px' }}>
                      請選擇
                    </span>
                  )}
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
                    onChange={handleRadioChange}
                    required
                  />
                  <label className="form-check-label own-btn3" htmlFor="pd">
                    家長親送
                  </label>
                  {errors.service && (
                    <span className="text-danger" style={{ fontSize: '12px' }}>
                      請選擇
                    </span>
                  )}
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="service"
                    id="ps"
                    value="專人接體"
                    onChange={handleRadioChange}
                    required
                  />
                  <label className="form-check-label own-btn3" htmlFor="ps">
                    專人接體
                  </label>
                  {errors.service && (
                    <span className="text-danger" style={{ fontSize: '12px' }}>
                      請選擇
                    </span>
                  )}
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
                    onChange={handleRadioChange}
                    required
                  />
                  <label className="form-check-label own-btn3" htmlFor="Warm">
                    溫馨布置
                  </label>
                  {errors.setup && (
                    <span className="text-danger" style={{ fontSize: '12px' }}>
                      請選擇
                    </span>
                  )}
                </div>
                <div className="form-check text-center">
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="setup"
                    id="honor"
                    value="尊榮布置"
                    onChange={handleRadioChange}
                    required
                  />
                  <label className="form-check-label own-btn3" htmlFor="honor">
                    尊榮布置
                  </label>
                  {errors.setup && (
                    <span className="text-danger" style={{ fontSize: '12px' }}>
                      請選擇
                    </span>
                  )}
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
                    onChange={handleRadioChange}
                    required
                  />
                  <label className="form-check-label own-btn3" htmlFor="spa">
                    禮體SPA美容
                  </label>
                  {errors.other && (
                    <span className="text-danger" style={{ fontSize: '12px' }}>
                      請選擇
                    </span>
                  )}
                </div>
                <div className="form-check text-center">
                  <input
                    className="form-check-input btn-check"
                    type="radio"
                    name="other"
                    id="none"
                    value="無須其他服務"
                    onChange={handleRadioChange}
                    required
                  />
                  <label className="form-check-label own-btn3" htmlFor="none">
                    無須其他服務
                  </label>
                  {errors.other && (
                    <span className="text-danger" style={{ fontSize: '12px' }}>
                      請選擇
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#FFF5CF' }}>
        <button className="btn btn-warning" onClick={validateSelection}>
          確定
        </button>
      </Modal.Footer>
      {/* 當所有選項都已選擇, 則呼叫getRecommendation(selection) 來獲得推薦方案 */}
      <RecommendationModal
        show={showRecommendationModal}
        handleClose={() => setShowRecommendationModal(false)}
        // 推薦方案被存在 recommendation 狀態中，並且將 showRecommendationModal 設置為 true 來顯示 RecommendationModal
        // 所以只要點擊送出, 就會呼叫recommendation裡的函式(getRecommendation)
        recommendation={getRecommendation(selection)}
        // recommendation 屬性是由 getRecommendation(selection) 函數return，而selection 也包含所有選項的狀態值
      />
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
