import React from 'react'
import styles from '@/components/insurance/insurance.module.css'

export default function CatCalculate() {
  return (
    <>

            <div className="col-4 d-flex justify-content-center">
              <button
                style={{ backgroundColor: 'white' }}
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
              <div className={`modal-header ${styles['bg-image']} pb-0 justify-content-end border-0 no-outline`}>
                  <div className="modal-title" id="ModalCatLabel">
                    {/* 保留空位 */}
                  </div>
                  <div >
                    <button
                      type="button"
                      className="btn-close "
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                </div>
                <div className={`modal-body ${styles['bg-image']}`} style={{ paddingTop: 0 }}>
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
                      className="btn-check"
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
                      className="btn-check"
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
                      className="btn-check"
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
                      className="btn-check"
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
                      className="btn-check"
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
                      className="btn-check"
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
                      className="btn-check"
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
                      className="btn-check"
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
                        <div className={`me-5 ${styles['form-check']} d-flex justify-content-center align-items-center`}>
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
                            <h2 style={{marginBottom: 0}}>男生</h2>
                          </label>
                        </div>
                        <div className={`${styles['form-check']} d-flex justify-content-center align-items-center`}>
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
                            <h2 style={{marginBottom: 0}}>女生</h2>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="d-flex justify-content-center">
                        <h3>寵物生日</h3>
                      </div>
                      <form className="d-flex">
                        <div className="form-group d-flex align-items-center">
                          <select
                            className={`form-control ${styles['own-btn3']}`}
                            style={{ width: 176, height: 66 }}
                            id="year-pet-b"
                            required
                          >
                            {/* 使用 JavaScript 來填充年份選項 */}
                          </select>
                          <label htmlFor="year-pet-b">
                            <h2 className="mx-2">年</h2>
                          </label>
                        </div>
                        {/* 月份選擇 */}
                        <div className="form-group d-flex align-items-center">
                          <select
                            className={`form-control ${styles['own-btn3']}`}
                            style={{ width: 176, height: 66 }}
                            id="month-pet-b"
                            required
                          ></select>
                          <label htmlFor="month-pet-b">
                            <h2 className="mx-2">月</h2>
                          </label>
                        </div>
                        {/* 日期選擇 */}
                        <div className="form-group  d-flex align-items-center">
                          <select
                            className={`form-control ${styles['own-btn3']}`}
                            style={{ width: 176, height: 66 }}
                            id="day-pet-b"
                            required
                          >
                            {/* 使用 JavaScript 來填充日期選項 */}
                          </select>
                          <label htmlFor="day-pet-b">
                            <h2 className="mx-2">日</h2>
                          </label>
                        </div>
                      </form>
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
                        <form className="d-flex">
                          <div className="form-group d-flex align-items-center">
                            <select
                              className={`form-control ${styles['own-btn3']}`}
                              style={{ width: 176, height: 66 }}
                              id="year-insurance-start"
                              required
                            >
                              {/* 使用 JavaScript 來填充年份選項 */}
                            </select>
                            <label htmlFor="year-insurance-start">
                              <h2 className="mx-2">年</h2>
                            </label>
                          </div>
                          {/* 月份選擇 */}
                          <div className="form-group d-flex align-items-center">
                            <select
                              className={`form-control ${styles['own-btn3']}`}
                              style={{ width: 176, height: 66 }}
                              id="month-insurance-start"
                              required
                            ></select>
                            <label htmlFor="month-insurance-start">
                              <h2 className="mx-2">月</h2>
                            </label>
                          </div>
                          {/* 日期選擇 */}
                          <div className="form-group  d-flex align-items-center">
                            <select
                              className={`form-control ${styles['own-btn3']}`}
                              style={{ width: 176, height: 66 }}
                              id="day-insurance-start"
                              required
                            >
                              {/* 使用 JavaScript 來填充日期選項 */}
                            </select>
                            <label htmlFor="day-insurance-start">
                              <h2 className="mx-2">日</h2>
                            </label>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`modal-footer ${styles['bg-image']} d-flex justify-content-center border-0 no-outline`}>
                  <a href="./pi-calculate.html">
                    <button type="button" className={styles['own-btn1']}>
                      開始試算
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
  {/* 試算modal-cat end */}

    </>
  )
}
