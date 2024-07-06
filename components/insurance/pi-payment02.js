import React from 'react'
import ProgressBar from './progress-bar'
import styles from './insurance.module.css'

export default function PiPayment02() {
  return (
    <>
      <div className="container-fluid mb-5">
        <div className="row justify-content-center">
          {/* 進度條 */}
          <ProgressBar />
          {/* 要保人資料 */}
        <div className="col-8" style={{marginTop: '30px'}}>
          <h4 className={styles['top-frame']}>要保人資料</h4>
          <div className={`d-flex justify-content-center ${styles['data-frame']}`}>
            <div className="col-12 justify-content-center align-items-center px-5">
              <form>
                <div className="d-flex flex-column">
                  <label htmlFor="policyholder_IDcard"><h5 className={styles['text-color']} style={{marginBottom: '11px'}}>要/被保險人姓名(寵物登記證記載之飼主)</h5></label>
                  <input  className={styles['sheet-input']} type="text" id="policyholder_IDcard" style={{width: '50%'}} />
                </div>
                <div className="d-flex flex-column">
                  <label htmlFor="b2c_IDcard"><h5 className={`${styles['text-color']} mt-4`}  style={{marginBottom: '11px'}}>身份證字號</h5></label>
                  <input  className={styles['sheet-input']} type="text" id="b2c_IDcard" style={{width: '50%'}} />
                </div>
                <div className="d-flex flex-column">
                  <label htmlFor="b2c_birth"><h5 className={`${styles['text-color']} mt-4`}  style={{marginBottom: '11px'}}>出生年月日</h5></label>
                  <input  className={styles['sheet-input']} type="date" id="b2c_birth" style={{width: '50%'}} />
                </div>
                <div className="d-flex flex-column">
                  <label htmlFor="b2c_email"><h5 className={`${styles['text-color']} mt-4`}  style={{marginBottom: '11px'}}>Email</h5></label>
                  <input  className={styles['sheet-input']} type="text" id="b2c_email" style={{width: '50%'}} />
                </div>
                <div className="d-flex flex-column">
                  <label htmlFor="b2c_mobile"><h5 className={`${styles['text-color']} mt-4`}  style={{marginBottom: '11px'}}>手機號碼</h5></label>
                  <input  className={styles['sheet-input']} type="text" id="pb2c_mobile" style={{width: '50%'}} />
                </div>
                <div>
                  <label htmlFor="address"><h5 className={`${styles['text-color']} mt-4`}  style={{marginBottom: '11px'}}>聯絡地址</h5></label>
                </div>
                <div className="d-flex ">                
                  <select className={`${styles['sheet-input']} me-3`} type="text" id="fk_conty_id" style={{width: '49%'}}>
                    <option value>1</option>
                  </select>
                  <select  className={styles['sheet-input']} type="text" id="fk_city_id" style={{width: '49%'}}>
                    <option value>2</option>
                  </select>
                </div>
                <input  className={styles['sheet-input']} style={{marginTop: '.6875rem'}} type="text" id="b2c_address" />
                <div className="d-flex" style={{margin: '1.25rem 0'}}>
                  <div className="col-6">                
                    <h5>是否為聽障或語障人士 ?</h5> 
                  </div>
                  <div className="col-5 d-flex justify-content-start align-items-center">
                    <div className="form-check d-flex align-items-center">
                      <input className="form-check-input me-2" style={{margin: 0}} type="radio" name={1} id />
                      <label className="form-check-label d-flex align-items-center" htmlFor>
                        <h5 style={{margin: 0}}>是</h5>
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center">
                      <input className="form-check-input me-2" style={{margin: 0}} type="radio" name={1} id="" defaultChecked required />
                      <label className="form-check-label d-flex align-items-center me-5" htmlFor>
                        <h5 style={{margin: 0}}>否</h5>
                      </label>
                    </div>                
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* 確認同意 */}
        <div className="col-8">
          <div className="form-check d-flex align-items-start my-3" style={{margin: 0, padding: 0}}>
            <input className="form-check-input" style={{border: '3px solid #B7B7B7', marginLeft: 0, paddingTop: 10}} type="checkbox" defaultValue id="flexCheckDefault6" required />
            <label className="form-check-label ms-2" htmlFor="flexCheckDefault6">
              <h5>本人已審閱並了解貴公司所提供之上述須知及商品簡介 </h5>
            </label>
          </div>
        </div>
        {/* 下一步 */}
        <div className="col-8">
          <div>
            <div className="d-flex justify-content-center align-items-center">
              <a href="/insurance/insurance-payment01" className="text-decoration-none"><button className={styles['own-btn4']}>上一步</button></a>
              <a href="/insurance/insurance-payment03" className="text-decoration-none"><button className={styles['own-btn4']}>下一步</button></a> 
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
