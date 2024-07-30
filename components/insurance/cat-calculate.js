import React, { useEffect, useRef, useState } from 'react'
import styles from '@/components/insurance/insurance.module.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { date } from 'zod'
// 使用動態導入避免衝突
const DatePicker = dynamic(() => import('./date-picker'), { ssr: false })

export default function CatCalculate() {
  const handleBirthdayChange = (date) => {
    if (date.year && date.month && date.day) {
      const formattedDate = new Date(date.year, date.month - 1, date.day)
      const catAge = new Date() - formattedDate //年紀, 以毫秒為單位
      let catAgeInMonths = catAge / (1000 * 60 * 60 * 24 * 30.4375) //將毫秒換成月份, 30.4375 是每月的平均天數
      let catAgeMonth = Math.floor(catAgeInMonths)
      if (catBirthdayRef.current) {
        catBirthdayRef.current.value = catAgeMonth
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
      // alert('資料已成功保存，請繼續下一步驟')

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
      <div
        className={`col-4 d-flex justify-content-center text-center ${styles.allFont}`}
      >
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
        className={`modal fade ${styles.allFont}`}
        id="ModalCat"
        tabIndex={-1}
        aria-labelledby="ModalCatLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
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
                  <img
                    src="/pi-pic/cat-on-btn.png"
                    style={{ height: '20%', width: '20%' }}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <div
                    className="col-8 btn-group d-flex flex-wrap justify-content-center align-items-center"
                    role="group"
                    aria-label="Basic radio toggle button group"
                  >
                    <input
                      type="radio"
                      className={styles['btn-check']}
                      name="cat-breed"
                      id="cat-breed-1"
                      autoComplete="off"
                      value={1.5}
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
                      value={1.5}
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
                      value={1.2}
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
                      value={1.2}
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
                      value={1.5}
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
                      value={1}
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
                      value={1}
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
                      value={1.5}
                      required
                    />
                    <label className={styles[`own-btn3`]} htmlFor="cat-breed-8">
                      其他品種
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <p className="text-color mb-0">
                    ※如果不知道品種或不在選項中,請選擇其他品種
                  </p>
                </div>
                <div className={`row ${styles.formLayout}`}>
                  <div className="col-lg-4 col-12 mb-3">
                    <div
                      className={`d-flex justify-content-center ${styles.formSpace}`}
                    >
                      <h5>寵物性別</h5>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div
                        className={`me-5 ${styles['form-check']} d-flex justify-content-center align-items-center`}
                      >
                        <input
                          className={`${styles['form-check-input']}`}
                          type="radio"
                          name="cat-gender"
                          id="cat-gender-male"
                          value={1.2}
                          required
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="cat-gender-male"
                        >
                          <h5 style={{ marginBottom: 0 }}>男生</h5>
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
                          value={1}
                          required
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="cat-gender-female"
                        >
                          <h5 style={{ marginBottom: 0 }}>女生</h5>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-8">
                    <div className="d-flex justify-content-center">
                      <h5>寵物生日</h5>
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
                      <p className="text-color mb-0">
                        ※請確認相關投保資料與寵物身分證明文件(寵物登記證)相符
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                    <div className="col-8 mt-2">
                      <div className="d-flex justify-content-center">
                        <h5>投保起始日期</h5>
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

                  <div
                    className={`${styles['bg-image']} d-flex justify-content-center border-0 no-outline`}
                  >
                    <button
                      type="submit"
                      className={styles['own-btn1']}
                      data-bs-dismiss="modal"
                    >
                      開始試算
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* 試算modal-cat end */}
    </>
  )
}
