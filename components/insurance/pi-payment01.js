import React from 'react'
import ProgressBar from './progress-bar'
import styles from './insurance.module.css'

export default function PiPayment01() {
  return (
    <>
      <div className="container-fluid mb-5">
        <div className="row justify-content-center">
          {/* 進度條 */}
          <ProgressBar />
          {/* 投保寵物資料 */}
          <div className="col-8" style={{marginTop: '30px'}}>
            <h4 className={styles['top-frame']}>投保寵物資料</h4>
            <div className={`d-flex justify-content-center ${styles['data-frame']}`}>
              <div className="col-6 justify-content-center align-items-center px-5">
                <form>
                  <label htmlFor="policyholder_IDcard"><h5 className={styles['text-color']} style={{marginBottom: '11px'}}>要保人身份證字號(寵物登記紀錄之飼主)</h5></label>
                  <input className={styles['sheet-input']} type="text" placeholder="請輸入身分證字號" id="policyholder_IDcard" />
                  <label htmlFor="pet_name"><h5 className={`${styles['text-color']} mt-4`} style={{marginBottom: '11px'}}>寵物姓名</h5></label>
                  <input className={styles['sheet-input']} type="text" placeholder="請輸入寵物姓名" id="pet_name" />
                  <label htmlFor="pet_chip"><h5 className={`${styles['text-color']} mt-4`} style={{marginBottom: '11px'}}>寵物晶片序號</h5></label>
                  <input className={styles['sheet-input']} type="text" placeholder="請輸入寵物晶片號碼10-15碼" id="pet_chip" />
                  <h5 className={`${styles['text-color']} mt-4`} style={{marginBottom: '11px'}}>保險期間</h5>
                  <h5 className={styles['own-green']}>2024-07-15  零時起至 2025-07-15  零時止</h5>
                  <h5 className={`${styles['text-color']} mt-4`} style={{marginBottom: '11px'}}>保險方案</h5>
                  <h5 className={styles['own-green']}>基礎方案</h5>
                </form>
              </div>
              <div className="col-6 d-flex flex-column justify-content-start align-items-center" style={{padding: '0 20px 20px 20px'}}>
                <img src="/pic/pet-upload.png" className="img-fluid rounded-circle mb-4" style={{backgroundColor: '#D9D9D9', width: '60%'}} />
                <button className={`${styles['own-btn2']} border-0`}>上傳寵物大頭照</button>
              </div>
            </div>
          </div>
          {/* 投保寵物主動告知事項 */}
          <div className="col-8" style={{marginTop: '30px'}}>
            <h4 className={styles['top-frame']}>投保寵物主動告知事項</h4>
            <div className={`d-flex justify-content-center ${styles['data-frame']}`}>
              <div className="col-12 justify-content-center align-items-center px-5">
                <form>
                  <div>
                    <h5 className={styles['text-color']} style={{marginBottom: '1.25rem'}}>敬請對下列告知事項應據實告知並親自填寫，如有為隱匿或遺漏不為說明，或為不實的說明，足以影響本公司對危險的評估，依保險法第六十四條規定保險公司得解除契約</h5>
                  </div>
                  <div className="me-5 form-check" style={{padding: 0, margin: 0}}>
                    <div className="d-flex" style={{marginBottom: '1.25rem'}}>
                      <div className="col-8">                
                        <h5>是否有投保其他寵物保險?</h5> 
                      </div>
                      <div className="col-4 d-flex justify-content-start align-items-center">
                        <div className="form-check d-flex align-items-center">
                          <input className="form-check-input me-2" style={{margin: 0}} type="radio" name={1} id defaultChecked required />
                          <label className="form-check-label d-flex align-items-center me-2" htmlFor>
                            <h5 style={{margin: 0}}>否</h5>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input className="form-check-input me-2" style={{margin: 0}} type="radio" name={1} id />
                          <label className="form-check-label d-flex align-items-center" htmlFor>
                            <h5 style={{margin: 0}}>是</h5>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex" style={{marginBottom: '1.25rem'}}>
                      <div className="col-8">                
                        <h5>過去一年內被保險寵物是否服用或施打疫苗(含狂犬病疫苗)?</h5> 
                      </div>
                      <div className="col-4 d-flex justify-content-start align-items-center">
                        <div className="form-check d-flex align-items-center">
                          <input className="form-check-input me-2" style={{margin: 0}} type="radio" name={2} id defaultChecked required />
                          <label className="form-check-label d-flex align-items-center me-2" htmlFor>
                            <h5 style={{margin: 0}}>否</h5>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input className="form-check-input me-2" style={{margin: 0}} type="radio" name={2} id />
                          <label className="form-check-label d-flex align-items-center" htmlFor>
                            <h5 style={{margin: 0}}>是</h5>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex" style={{marginBottom: '1.25rem'}}>
                      <div className="col-8">                
                        <h5>被保險寵物最近二個月內是否曾因疾病或傷害接受醫師治療、診療或用藥?</h5> 
                      </div>
                      <div className="col-4 d-flex justify-content-start align-items-center">
                        <div className="form-check d-flex align-items-center">
                          <input className="form-check-input me-2" style={{margin: 0}} type="radio" name={3} id defaultChecked required />
                          <label className="form-check-label d-flex align-items-center me-2" htmlFor>
                            <h5 style={{margin: 0}}>否</h5>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input className="form-check-input me-2" style={{margin: 0}} type="radio" name={3} id />
                          <label className="form-check-label d-flex align-items-center" htmlFor>
                            <h5 style={{margin: 0}}>是</h5>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex" style={{marginBottom: '1.25rem'}}>
                      <div className="col-8">                
                        <h5>目前被保險寵物身體是否有被診斷出以下疾病或障礙?</h5>
                        <h5>◎失明   ◎四肢缺陷   ◎出血、腹瀉   ◎耳聾</h5> 
                      </div>
                      <div className="col-4 d-flex justify-content-start align-items-center">
                        <div className="form-check d-flex align-items-center">
                          <input className="form-check-input me-2" style={{margin: 0}} type="radio" name={4} id defaultChecked required />
                          <label className="form-check-label d-flex align-items-center me-2" htmlFor>
                            <h5 style={{margin: 0}}>否</h5>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input className="form-check-input me-2" style={{margin: 0}} type="radio" name={4} id />
                          <label className="form-check-label d-flex align-items-center" htmlFor>
                            <h5 style={{margin: 0}}>是</h5>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="col-8">                
                        <h5>被保險寵物如有體檢，檢體內容是否有異常項目?</h5>
                        <h5 style={{color: 'red'}}>異常項目包含: 癌症、膝蓋骨異位、髖關節發育不良、椎間盤突出、心臟疾病、腎臟疾病、癲癇、糖尿病、甲狀腺疾病或其他疾病</h5> 
                      </div>
                      <div className="col-4 d-flex justify-content-start align-items-center">
                        <div className="form-check d-flex align-items-center">
                          <input className="form-check-input me-2" style={{margin: 0}} type="radio" name={5} id defaultChecked required />
                          <label className="form-check-label d-flex align-items-center me-2" htmlFor>
                            <h5 style={{margin: 0}}>否</h5>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input className="form-check-input me-2" style={{margin: 0}} type="radio" name={5} id />
                          <label className="form-check-label d-flex align-items-center" htmlFor>
                            <h5 style={{margin: 0}}>是</h5>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* 同意聲明告知 */}
          <div className="col-8" style={{marginTop: '30px'}}>
            <h4 className={styles['top-frame']}>同意聲明告知</h4>
            <div className={styles['data-frame']}>
              <div className="col-12 justify-content-center align-items-center">
                <form>
                  <div className="d-flex justify-content-around">
                    <div className={`form-check ${styles['cfm-frame']}`}>
                      <input className="form-check-input" style={{border: '3px solid #B7B7B7', margin: '0 5px 0 0'}} type="checkbox" defaultValue id="flexCheckDefault" required />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        個資法告知事項
                      </label>
                    </div>
                    <div className={`form-check ${styles['cfm-frame']}`}>
                      <input className="form-check-input" style={{border: '3px solid #B7B7B7', margin: '0 5px 0 0'}} type="checkbox" defaultValue id="flexCheckDefault1" required />
                      <label className="form-check-label" htmlFor="flexCheckDefault1">
                        寵度產險服務使用約定書
                      </label>
                    </div>
                    <div className={`form-check ${styles['cfm-frame']}`}>
                      <input className="form-check-input" style={{border: '3px solid #B7B7B7', margin: '0 5px 0 0'}} type="checkbox" defaultValue id="flexCheckDefault2" required />
                      <label className="form-check-label" htmlFor="flexCheckDefault2">
                        網路投保聲明事項
                      </label>
                    </div>
                    <div className={`form-check ${styles['cfm-frame']}`}>
                      <input className="form-check-input" style={{border: '3px solid #B7B7B7', margin: '0 5px 0 0'}} type="checkbox" defaultValue id="flexCheckDefault3" required />
                      <label className="form-check-label" htmlFor="flexCheckDefault3">
                        網路保險服務聲明事項
                      </label>
                    </div>               
                  </div>
                  <textarea rows={10} className={`mt-3 ${styles.InfoDetail}`} defaultValue={"                \n              "} />
                </form>
              </div>        
            </div>
          </div>
          {/* 確認同意 */}
          <div className="col-8">
            <div className="form-check align-items-center my-3" style={{padding: 0}}>
              <input className="form-check-input" style={{border: '3px solid #B7B7B7', marginLeft: 0, padding: 0}} type="checkbox" defaultValue id="flexCheckDefault4" required />
              <label className="form-check-label ms-2" htmlFor="flexCheckDefault4">
                <h5 style={{marginBottom: 0}}>我已詳閱並同意以上聲明事項 </h5>
              </label>
            </div>
            <div className="form-check mb-3 d-flex align-items-start" style={{margin: 0, padding: 0}}>
              <input className="form-check-input" style={{border: '3px solid #B7B7B7', marginLeft: 0, paddingTop: 10}} type="checkbox" defaultValue id="flexCheckDefault5" />
              <label className="form-check-label ms-2" htmlFor="flexCheckDefault5">
                <h5 style={{marginBottom: 0}}>本人同意所蒐集之聯絡資料(姓名、地址、email)作為寵度保險依金控法第43條第2項，進行共同行銷之特定目的使用。如未勾選不影響本次投保權益，可直接進行下一步</h5>
              </label>
            </div>        
          </div>
          {/* 下一步 */}
          <div className="col-8">
            <div>
              <div className="d-flex justify-content-center align-items-center">
                <a href="/insurance" className="text-decoration-none"><button className={styles['own-btn4']}>返回</button></a>
                <a href="/insurance/insurance-payment02" className="text-decoration-none"><button className={styles['own-btn4']}>下一步</button></a>  
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
