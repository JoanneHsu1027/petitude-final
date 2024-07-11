import React, { useEffect, useRef, useState } from 'react'
import styles from '@/components/insurance/insurance.module.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
// 使用動態導入避免衝突
const DatePicker = dynamic(() => import('./date-picker'), { ssr: false })

export default function CatCalculate() {
  const handleBirthdayChange = (date) => {
    if (date.year && date.month && date.day) {
      const formattedDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`
      if (catBirthdayRef.current) {
        catBirthdayRef.current.value = formattedDate
      }
    } else if (catBirthdayRef.current) {
      catBirthdayRef.current.value = ''
    }
  }

  const handleInsuranceStartChange = (date) => {
    if (date.year && date.month && date.day) {
      const formattedDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`
      if (insuranceStartDateRef.current) {
        insuranceStartDateRef.current.value = formattedDate
      }
    } else if (insuranceStartDateRef.current) {
      insuranceStartDateRef.current.value = ''
    }
  }

  const [modal, setModal] = useState(null)
  const router = useRouter()

  const insuranceStartDateRef = useRef(null)
  const catBirthdayRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      // 收集所有表單數據
      const formData = new FormData(e.target)

      const catBreed = formData.get('cat-breed')
      const catGender = formData.get('cat-gender')
      const catBirthday = catBirthdayRef.current
        ? catBirthdayRef.current.value
        : null
      const insuranceStartDate = insuranceStartDateRef.current
        ? insuranceStartDateRef.current.value
        : null

      // 檢查必要欄位是否填寫
      const missingFields = []
      if (!catBreed) missingFields.push('貓咪品種')
      if (!catGender) missingFields.push('寵物性別')
      if (!catBirthday) missingFields.push('寵物生日')
      if (!insuranceStartDate) missingFields.push('投保起始日期')

      if (missingFields.length > 0) {
        throw new Error(`請填寫以下必要欄位：${missingFields.join(', ')}`)
      }

      // 保存所有數據到 localStorage
      localStorage.setItem(
        'catInsuranceData',
        JSON.stringify({
          breed: catBreed,
          gender: catGender,
          birthday: catBirthday,
          insuranceStartDate: insuranceStartDate,
        }),
      )

      // 設置一個標誌表示已收到貓咪數據
      localStorage.setItem('catDataReceived', 'true')
      window.dispatchEvent(new Event('localStorageChange'))

      // 成功提示
      alert('資料已成功保存，請繼續下一步驟')

      const closeModalAndNavigate = () => {
        return new Promise((resolve) => {
          // 移除 modal 背景
          document.body.classList.remove('modal-open')
          const modalBackdrop = document.querySelector('.modal-backdrop')
          if (modalBackdrop) {
            modalBackdrop.remove()
          }
          // 给予一些时间让 modal 完全关闭
          setTimeout(resolve, 300)
        })
      }

      // 执行关闭 modal 和导航
      closeModalAndNavigate().then(() => {
        router.push('/insurance/#showTrial').then(() => {
          // 可以在这里添加导航完成后的逻辑
          console.log('导航完成')
        })
      })
    } catch (error) {
      console.error('保存失敗:', error)
      alert(error.message || '保存失敗，請檢查所有欄位並重試。')
    }
  }
  // 在後續的結帳步驟中，您可以使用以下代碼來獲取保存的數據：
  // jsxCopyconst savedData = JSON.parse(localStorage.getItem('catInsuranceData'));

  // 當您需要將數據發送到後端時（可能在最後的結帳步驟），您可以再次獲取這些數據並發送請求。
  // 記得在適當的時候（例如完成整個過程後）清除 localStorage：
  // jsxCopylocalStorage.removeItem('catInsuranceData');

  //   如果您需要將一些數據傳遞到 /insurance 頁面，可以使用查詢參數：
  // jsxCopyrouter.push({
  //   pathname: '/insurance',
  //   query: { step: 'cat-info' }  // 例如
  // });

  useEffect(() => {
    // 確保這個 effect 只在客戶端運行
    if (typeof window !== 'undefined') {
      import('bootstrap/js/dist/modal').then((ModalModule) => {
        const modalElement = document.getElementById('ModalCat')
        if (modalElement) {
          setModal(new ModalModule.default(modalElement))
        }
      })
    }
  }, [])

  return (
    <>
      <div className="col-4 d-flex justify-content-center">
        <button
          style={{
            backgroundColor: 'white',
            outline: 'none',
            boxShadow: 'none',
          }}
          className=" border-0 no-outline"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#ModalCat"
        >
          <img
            className="img-fluid"
            loading="lazy"
            src="/pi-pic/cat-btn.png"
            alt=""
          />
        </button>
      </div>

      {/* 試算modal-cat start */}
      <div
        className="modal fade"
        id="ModalCat"
        tabIndex={-1}
        aria-labelledby="ModalCatLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div
              className={`modal-header ${styles['bg-image']} pb-0 justify-content-end border-0 no-outline`}
            >
              <div className="modal-title" id="ModalCatLabel">
                {/* 保留空位 */}
              </div>
              <div>
                <button
                  type="button"
                  className="btn-close "
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div
                className={`modal-body ${styles['bg-image']} ${styles.downScroll}`}
                style={{ paddingTop: 0 }}
              >
                <div className="d-flex justify-content-center">
                  <img src="/pi-pic/cat-on-btn.png" alt="" />
                </div>
                <div
                  className="btn-group d-flex flex-wrap justify-content-center align-items-center"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <input
                    type="radio"
                    className={styles['btn-check']}
                    name="cat-breed"
                    id="cat-breed-1"
                    autoComplete="off"
                    required
                  />
                  <label className={styles[`own-btn3`]} htmlFor="cat-breed-1">
                    暹羅貓
                  </label>
                  <input
                    type="radio"
                    className={styles['btn-check']}
                    name="cat-breed"
                    id="cat-breed-2"
                    autoComplete="off"
                    required
                  />
                  <label className={styles[`own-btn3`]} htmlFor="cat-breed-2">
                    布偶貓
                  </label>
                  <input
                    type="radio"
                    className={styles['btn-check']}
                    name="cat-breed"
                    id="cat-breed-3"
                    autoComplete="off"
                    required
                  />
                  <label className={styles[`own-btn3`]} htmlFor="cat-breed-3">
                    藍貓
                  </label>
                  <input
                    type="radio"
                    className={styles['btn-check']}
                    name="cat-breed"
                    id="cat-breed-4"
                    autoComplete="off"
                    required
                  />
                  <label className={styles[`own-btn3`]} htmlFor="cat-breed-4">
                    美短貓
                  </label>
                  <input
                    type="radio"
                    className={styles['btn-check']}
                    name="cat-breed"
                    id="cat-breed-5"
                    autoComplete="off"
                    required
                  />
                  <label className={styles[`own-btn3`]} htmlFor="cat-breed-5">
                    英短貓
                  </label>
                  <input
                    type="radio"
                    className={styles['btn-check']}
                    name="cat-breed"
                    id="cat-breed-6"
                    autoComplete="off"
                    required
                  />
                  <label className={styles[`own-btn3`]} htmlFor="cat-breed-6">
                    虎斑貓
                  </label>
                  <input
                    type="radio"
                    className={styles['btn-check']}
                    name="cat-breed"
                    id="cat-breed-7"
                    autoComplete="off"
                    required
                  />
                  <label className={styles[`own-btn3`]} htmlFor="cat-breed-7">
                    米克斯貓
                  </label>
                  <input
                    type="radio"
                    className={styles['btn-check']}
                    name="cat-breed"
                    id="cat-breed-8"
                    autoComplete="off"
                    required
                  />
                  <label className={styles[`own-btn3`]} htmlFor="cat-breed-8">
                    其他品種
                  </label>
                </div>
                <div className="d-flex justify-content-center">
                  <h4 className="text-color">
                    ※如果不知道品種或不在選項中,請選擇其他品種
                  </h4>
                </div>
                <div className="row align-items-start mt-4">
                  <div className="col-4 ">
                    <div className="d-flex justify-content-center">
                      <h3>寵物性別</h3>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <div
                        className={`me-5 ${styles['form-check']} d-flex justify-content-center align-items-center`}
                      >
                        <input
                          className={`${styles['form-check-input']}`}
                          type="radio"
                          name="cat-gender"
                          id="cat-gender-male"
                          required
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="cat-gender-male"
                        >
                          <h2 style={{ marginBottom: 0 }}>男生</h2>
                        </label>
                      </div>
                      <div
                        className={`${styles['form-check']} d-flex justify-content-center align-items-center`}
                      >
                        <input
                          className={`${styles['form-check-input']}`}
                          type="radio"
                          name="cat-gender"
                          id="cat-gender-female"
                          required
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="cat-gender-female"
                        >
                          <h2 style={{ marginBottom: 0 }}>女生</h2>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex justify-content-center">
                      <h3>寵物生日</h3>
                    </div>
                    <DatePicker
                      startYear={new Date().getFullYear() - 15}
                      endYear={new Date().getFullYear()}
                      disableFuture={true}
                      onChange={handleBirthdayChange}
                    />
                    <input
                      type="hidden"
                      name="cat-birthday"
                      ref={catBirthdayRef}
                    />
                    <div className="d-flex justify-content-center">
                      <h4 className="text-color">
                        ※請確認相關投保資料與寵物身分證明文件(寵物登記證)相符
                      </h4>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-4 mb-2">
                    <div className="col-8 mt-2">
                      <div className="d-flex justify-content-center">
                        <h3>投保起始日期</h3>
                      </div>
                      <DatePicker
                        startYear={new Date().getFullYear()}
                        endYear={new Date().getFullYear() + 2}
                        disableFuture={false}
                        disablePast={true} // 添加這個 prop
                        onChange={handleInsuranceStartChange}
                      />
                      <input
                        type="hidden"
                        name="insurance-start-date"
                        ref={insuranceStartDateRef}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`modal-footer ${styles['bg-image']} d-flex justify-content-center border-0 no-outline`}
              >
                <button
                  type="submit"
                  className={styles['own-btn1']}
                  data-bs-dismiss="modal"
                >
                  開始試算
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* 試算modal-cat end */}
    </>
  )
}
