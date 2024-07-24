import React, { useEffect, useRef, useState } from 'react'
import styles from './insurance.module.css'
import Link from 'next/link'
import ProgressBarCopy from './progress-bar-copy'
import withProgressBar from './withProgressBar'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { agreements } from './agreements'
import { z } from 'zod'
import Swal from 'sweetalert2'

function PiPayment01() {
  // 驗證寵物姓名用
  const [NameError, setNameError] = useState('')
  const validateName = (name) => {
    return name && name.trim().length >= 1
  }

  // 驗證寵物晶片序號的函數
  const [chipError, setChipError] = useState('')
  const validateChip = (chip) => {
    return /^\d{10,15}$/.test(chip)
  }

  // 驗證聲明書用
  const [agreementsError, setAgreementsError] = useState('')
  // 驗證已讀用
  const [checkedReadError, setCheckedReadError] = useState('')

  // 驗證
  const formSchema = z.object({
    pet_name: z.string().min(1, { message: '請輸入寵物名字' }),
    pet_chip: z
      .string()
      .refine(validateChip, { message: '請輸入正確的晶片序號' }),
    disclosure1: z.enum(['是', '否']),
    disclosure2: z.enum(['是', '否']),
    disclosure3: z.enum(['是', '否']),
    disclosure4: z.enum(['是', '否']),
    disclosure5: z.enum(['是', '否']),
    agreementsStatus: z
      .object({
        agreementItem01: z.boolean(),
        agreementItem02: z.boolean(),
        agreementItem03: z.boolean(),
        agreementItem04: z.boolean(),
      })
      .refine((obj) => Object.values(obj).every(Boolean), {
        message: '請同意所有聲明事項',
        path: ['agreementsStatus'],
      }),
    checkedRead: z.boolean().refine((val) => val === true, {
      message: '請勾選',
    }),
  })

  // 聲明書勾選確認
  const [agreementsStatus, setAgreementsStatus] = useState({
    agreementItem01: false,
    agreementItem02: false,
    agreementItem03: false,
    agreementItem04: false,
  })

  const [data, setData] = useState(null)

  // 傳入保險開始日期
  const [dates, setDates] = useState({ startDate: null, endDate: null })

  //處理時區問題
  const formatDate = (date) => {
    if (!date) return '' //如果日期無效,返回空字串
    return date
      .toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Taipei', // 使用台北時區
      })
      .replace(/\//g, '-') // 將斜線替換為連字符，以保持 YYYY-MM-DD 格式
  }

  // 取得選擇的保險方案
  const [planType, setPlanType] = useState('')
  // 為了聲明勾選的狀況
  const [agreementClicked, setAgreementClicked] = useState(new Set())
  // 為了顯示選擇的聲明內容
  const [selectedAgreement, setSelectedAgreement] = useState(agreements[0])
  // 為了已詳閱並同意以上聲明事項
  const [checkedRead, setCheckedRead] = useState(false)

  // 預覽和上傳寵物大頭照
  // 記錄選擇的圖檔(File物件)
  const [selectedImg, setSelectedImg] = useState(
    '/pi-pic/pet-upload-default.png',
  )
  // 預覽圖片的網址
  const [previewURL, setPreviewURL] = useState('/pi-pic/pet-upload-default.png')
  // 伺服器回傳訊息
  const [message, setMessage] = useState('')
  // 檔案輸入參考
  const fileInputRef = React.createRef()
  // localStorage大小限制(5MB)
  // const LOCALSTORAGE_LIMIT = 5 * 1024 * 1024
  // localStorage大小限制(100kb)
  const LOCALSTORAGE_LIMIT = 100 * 1024 // 100KB 的大小限制
  // 為了主動告知事項
  const [disclosure1, setDisclosure1] = useState('否')
  const [disclosure2, setDisclosure2] = useState('否')
  const [disclosure3, setDisclosure3] = useState('否')
  const [disclosure4, setDisclosure4] = useState('否')
  const [disclosure5, setDisclosure5] = useState('否')

  const router = useRouter()

  const handleImgClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (e) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (!file) {
        setMessage('沒有選擇檔案')
        return
      }

      if (file.size > LOCALSTORAGE_LIMIT) {
        setMessage('圖片大小超過 100kb 限制，請選擇較小的圖片')
        return
      }
      setMessage('')
      setSelectedImg(file)
      const newPreviewUrl = URL.createObjectURL(file)
      setPreviewURL(newPreviewUrl)
    }
  }

  const handleImageUpload = () => {
    if (selectedImg instanceof File) {
      // 將圖片轉換為 base64
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        if (base64String.length > LOCALSTORAGE_LIMIT) {
          setMessage('圖片大小超過 100kb 限制')
          return
        }
        try {
          // 保存到 localStorage
          localStorage.setItem('petPhoto', base64String)
          setMessage('照片已成功上傳!')
        } catch (e) {
          setMessage('上傳照片失敗, 可能是超出 100kb 限制')
        }
      }
      reader.readAsDataURL(selectedImg)
    } else {
      setMessage('請先選擇一張新圖片')
    }
  }

  // 處理點擊聲明書
  const handleClick = (id) => {
    setAgreementsStatus((prevStatus) => {
      // 如果已經是true，就不能取消
      if (prevStatus[id]) return prevStatus

      return {
        ...prevStatus,
        [id]: true,
      }
    })

    setSelectedAgreement(agreements.find((agreement) => agreement.id === id))
  }
  // 以點擊過的聲明書仍可對應顯示
  const handleAgreementClick = (id) => {
    setSelectedAgreement(agreements.find((agreement) => agreement.id === id))
  }

  const formRef = useRef(null)

  //寄出表單
  const handleSubmit = (e) => {
    e.preventDefault()

    //重置所有錯誤訊息
    setNameError('')
    setChipError('')
    setAgreementsError('')
    setCheckedReadError('')

    const formData = new FormData(formRef.current)
    // const petChip = formData.get('pet_chip')
    const formDataObject = Object.fromEntries(formData.entries())

    formDataObject.agreementsStatus = {
      agreementItem01: agreementsStatus.agreementItem01,
      agreementItem02: agreementsStatus.agreementItem02,
      agreementItem03: agreementsStatus.agreementItem03,
      agreementItem04: agreementsStatus.agreementItem04,
    }
    formDataObject.checkedRead = checkedRead

    try {
      // 驗證表單數據
      const validatedData = formSchema.parse(formDataObject)
      // 檢查是否有任何告知事項選擇了"是"
      if (
        [
          'disclosure1',
          'disclosure2',
          'disclosure3',
          'disclosure4',
          'disclosure5',
        ].some((key) => validatedData[key] === '是')
      ) {
        throw new Error('由於您在告知事項中選擇了"是"，無法進行投保。')
      }

      // 格式化保險結束日期
      const formatedEndDate = dates.endDate
        ? `${dates.endDate.getFullYear()}-${String(dates.endDate.getMonth() + 1).padStart(2, '0')}-${String(dates.endDate.getDate()).padStart(2, '0')}`
        : ''

      // 保存所有數據到 localStorage
      localStorage.setItem(
        'petBasicData',
        JSON.stringify({
          PetName: validatedData.pet_name,
          PetChip: validatedData.pet_chip,
          insuranceEndDate: formatedEndDate,
        }),
      )

      // 成功提示
      // Swal.fire({
      //   icon: 'success',
      //   title: '資料已成功保存',
      //   text: '請繼續下一步',
      // }).then(() => {
      //   // 跳轉下一頁
      //   router.push('/insurance/insurance-payment02')
      // })
      // 跳轉下一頁
      router.push('/insurance/insurance-payment02')
    } catch (error) {
      if (error.errors) {
        error.errors.forEach((err) => {
          switch (err.path[0]) {
            case 'pet_name':
              setNameError(err.message)
              break
            case 'pet_chip':
              setChipError(err.message)
              break
            case 'agreementsStatus':
              setAgreementsError(err.message)
              break
            case 'checkedRead':
              setCheckedReadError(err.message)
              break
          }
        })

        // 顯示錯誤訊息
        Swal.fire({
          icon: 'error',
          title: '保存失敗',
          text: '請檢查所有欄位',
        })
      } else {
        // 處理其他錯誤

        Swal.fire({
          icon: 'error',
          title: '保存失敗',
          text: error.message || '保存失敗, 請檢查所有欄位',
        })
      }
    }
  }

  // 暫存寵物圖片
  useEffect(() => {
    const savedImg = localStorage.getItem('petPhoto')
    if (savedImg) {
      setPreviewURL(savedImg)
      setSelectedImg(savedImg)
    }
  }, [])

  useEffect(() => {
    // 這個代碼塊只會在客戶端執行
    // 取得並解析 localStorage 中的資料
    const catData = localStorage.getItem('catInsuranceData')
    const dogData = localStorage.getItem('dogInsuranceData')
    const parseData = JSON.parse(catData || dogData) // 整合貓跟狗的資料
    setData(parseData)

    // 取得保險方案
    const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan'))
    if (selectedPlan) {
      setPlanType(selectedPlan.type)
    }
  }, [])

  useEffect(() => {
    if (data && data.insuranceStartDate) {
      // 取得保險起始日期並計算結束日期
      const startDate = new Date(data.insuranceStartDate)
      const endDate = new Date(startDate) //保險結束日期
      endDate.setFullYear(endDate.getFullYear() + 1)

      setDates({ startDate, endDate })
    }
  }, [data])

  if (!data || !dates.startDate) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>寵物資料 | Petitude</title>
      </Head>
      <div className="container-fluid mb-5">
        <div className="row justify-content-center">
          {/* 進度條 */}
          <ProgressBarCopy />

          {/* 投保寵物資料 */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="col-8 d-flex flex-column justify-content-center align-items-center"
          >
            <div className="col-12" style={{ marginTop: '30px' }}>
              <h4 className={styles['top-frame']}>投保寵物資料</h4>

              <div
                className={`d-flex justify-content-center ${styles['data-frame']}`}
              >
                <div className="col-6 justify-content-center align-items-center px-5">
                  <label htmlFor="pet_name">
                    <h5
                      className={`${styles['text-color']} mt-4`}
                      style={{ marginBottom: '11px' }}
                    >
                      寵物姓名
                    </h5>
                  </label>
                  <input
                    className={styles['sheet-input']}
                    type="text"
                    placeholder="請輸入寵物姓名"
                    id="pet_name"
                    name="pet_name"
                  />
                  {NameError && <p style={{ color: 'red' }}>{NameError}</p>}
                  <label htmlFor="pet_chip">
                    <h5
                      className={`${styles['text-color']} mt-4`}
                      style={{ marginBottom: '11px' }}
                    >
                      寵物晶片序號
                    </h5>
                  </label>
                  <input
                    className={styles['sheet-input']}
                    type="text"
                    placeholder="請輸入寵物晶片號碼10-15碼"
                    id="pet_chip"
                    name="pet_chip"
                  />
                  {chipError && <p style={{ color: 'red' }}>{chipError}</p>}
                  <h5
                    className={`${styles['text-color']} mt-4`}
                    style={{ marginBottom: '11px' }}
                  >
                    保險期間
                  </h5>
                  <h5 className={styles['own-green']}>
                    {formatDate(dates.startDate)} 零時起至{' '}
                    {formatDate(dates.endDate)} 零時止
                  </h5>
                  <h5
                    className={`${styles['text-color']} mt-4`}
                    style={{ marginBottom: '11px' }}
                  >
                    保險方案
                  </h5>
                  <h5 className={styles['own-green']}>{planType}</h5>
                  {/* </form> */}
                </div>
                <div
                  className="col-6 d-flex flex-column justify-content-start align-items-center"
                  style={{
                    padding: '0 20px 20px 20px',
                  }}
                >
                  <div
                    className=" img-fluid rounded-circle mb-3"
                    onClick={handleImgClick}
                    style={{
                      width: '250px',
                      height: '250px',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={previewURL}
                      className=" mb-4"
                      style={{
                        backgroundColor: '#D9D9D9',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                      }}
                      // 圖案點了可以選擇上傳圖片
                      alt="Pet"
                    />
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    accept="image/*"
                  />
                  <button
                    className={`${styles['own-btn2']} border-0`}
                    style={{ width: '50%' }}
                    type="button"
                    onClick={handleImageUpload}
                  >
                    點擊上傳照片
                  </button>
                  {message && <p style={{ color: 'orange' }}> {message}</p>}
                </div>
              </div>
            </div>

            {/* 投保寵物主動告知事項 */}
            <div className="col-12" style={{ marginTop: '30px' }}>
              <h4 className={styles['top-frame']}>投保寵物主動告知事項</h4>
              <div
                className={`d-flex justify-content-center ${styles['data-frame']}`}
              >
                <div className="col-12 justify-content-center align-items-center px-5">
                  {/* <form> */}
                  <div>
                    <h5
                      className={styles['text-color']}
                      style={{ marginBottom: '1.25rem' }}
                    >
                      敬請對下列告知事項應據實告知並親自填寫，如有為隱匿或遺漏不為說明，或為不實的說明，足以影響本公司對危險的評估，依保險法第六十四條規定保險公司得解除契約
                    </h5>
                  </div>
                  <div
                    className="me-5 form-check"
                    style={{ padding: 0, margin: 0 }}
                  >
                    <div className="d-flex" style={{ marginBottom: '1.25rem' }}>
                      <div className="col-8">
                        <h5>是否有投保其他寵物保險?</h5>
                      </div>
                      <div className="col-4 d-flex justify-content-start align-items-center">
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure1"
                            id="disclosure1No"
                            value="否"
                            checked={disclosure1 === '否'}
                            onChange={() => setDisclosure1('否')}
                          />
                          <label
                            className="form-check-label d-flex align-items-center me-2"
                            htmlFor="disclosure1No"
                          >
                            <h5 style={{ margin: 0 }}>否</h5>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure1"
                            id="disclosure1Yes"
                            value="是"
                            checked={disclosure1 === '是'}
                            onChange={() => setDisclosure1('是')}
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor="disclosure1Yes"
                          >
                            <h5 style={{ margin: 0 }}>是</h5>{' '}
                            {disclosure1 === '是' && (
                              <span style={{ color: 'red', marginLeft: '5px' }}>
                                如選是則無法投保
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex" style={{ marginBottom: '1.25rem' }}>
                      <div className="col-8">
                        <h5>
                          過去一年內被保險寵物是否服用或施打疫苗(含狂犬病疫苗)?
                        </h5>
                      </div>
                      <div className="col-4 d-flex justify-content-start align-items-center">
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure2"
                            id="disclosure2No"
                            value="否"
                            checked={disclosure2 === '否'}
                            onChange={() => setDisclosure2('否')}
                          />
                          <label
                            className="form-check-label d-flex align-items-center me-2"
                            htmlFor="disclosure2No"
                          >
                            <h5 style={{ margin: 0 }}>否</h5>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure2"
                            id="disclosure2Yes"
                            value="是"
                            checked={disclosure2 === '是'}
                            onChange={() => setDisclosure2('是')}
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor="disclosure2Yes"
                          >
                            <h5 style={{ margin: 0 }}>是</h5>
                            {disclosure2 === '是' && (
                              <span style={{ color: 'red', marginLeft: '5px' }}>
                                如選是則無法投保
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex" style={{ marginBottom: '1.25rem' }}>
                      <div className="col-8">
                        <h5>
                          被保險寵物最近二個月內是否曾因疾病或傷害接受醫師治療、診療或用藥?
                        </h5>
                      </div>
                      <div className="col-4 d-flex justify-content-start align-items-center">
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure3"
                            id="disclosure3No"
                            value="否"
                            checked={disclosure3 === '否'}
                            onChange={() => setDisclosure3('否')}
                          />
                          <label
                            className="form-check-label d-flex align-items-center me-2"
                            htmlFor="disclosure3No"
                          >
                            <h5 style={{ margin: 0 }}>否</h5>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure3"
                            id="disclosure3Yes"
                            value="是"
                            checked={disclosure3 === '是'}
                            onChange={() => setDisclosure3('是')}
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor="disclosure3Yes"
                          >
                            <h5 style={{ margin: 0 }}>是</h5>
                            {disclosure3 === '是' && (
                              <span style={{ color: 'red', marginLeft: '5px' }}>
                                如選是則無法投保
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex" style={{ marginBottom: '1.25rem' }}>
                      <div className="col-8">
                        <h5>目前被保險寵物身體是否有被診斷出以下疾病或障礙?</h5>
                        <h5>◎失明 ◎四肢缺陷 ◎出血、腹瀉 ◎耳聾</h5>
                      </div>
                      <div className="col-4 d-flex justify-content-start align-items-center">
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure4"
                            id="disclosure4No"
                            value="否"
                            checked={disclosure4 === '否'}
                            onChange={() => setDisclosure4('否')}
                          />
                          <label
                            className="form-check-label d-flex align-items-center me-2"
                            htmlFor="disclosure4No"
                          >
                            <h5 style={{ margin: 0 }}>否</h5>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure4"
                            id="disclosure4Yes"
                            value="是"
                            checked={disclosure4 === '是'}
                            onChange={() => setDisclosure4('是')}
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor
                          >
                            <h5 style={{ margin: 0 }}>是</h5>
                            {disclosure4 === '是' && (
                              <span style={{ color: 'red', marginLeft: '5px' }}>
                                如選是則無法投保
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="col-8">
                        <h5>被保險寵物如有體檢，檢體內容是否有異常項目?</h5>
                        <h5 style={{ color: 'red' }}>
                          異常項目包含:
                          癌症、膝蓋骨異位、髖關節發育不良、椎間盤突出、心臟疾病、腎臟疾病、癲癇、糖尿病、甲狀腺疾病或其他疾病
                        </h5>
                      </div>
                      <div className="col-4 d-flex justify-content-start align-items-center">
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure5"
                            id="disclosure5No"
                            value="否"
                            checked={disclosure5 === '否'}
                            onChange={() => setDisclosure5('否')}
                          />
                          <label
                            className="form-check-label d-flex align-items-center me-2"
                            htmlFor="disclosure5No"
                          >
                            <h5 style={{ margin: 0 }}>否</h5>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            style={{ margin: 0 }}
                            type="radio"
                            name="disclosure5"
                            id="disclosure5Yes"
                            value="是"
                            checked={disclosure5 === '是'}
                            onChange={() => setDisclosure5('是')}
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor
                          >
                            <h5 style={{ margin: 0 }}>是</h5>
                            {disclosure5 === '是' && (
                              <span style={{ color: 'red', marginLeft: '5px' }}>
                                如選是則無法投保
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
            {/* 同意聲明告知 */}
            <div className="col-12" style={{ marginTop: '30px' }}>
              <div className={styles['top-frame']}>
                <h4>同意聲明告知</h4>
              </div>
              <div className={styles['data-frame']}>
                <div className="col-12 justify-content-center">
                  {/* <form> */}
                  <div className="d-flex justify-content-around">
                    {agreements.map((agreement, index) => (
                      <div
                        key={index}
                        className={`form-check ${styles['cfm-frame']} ${agreementClicked.has(agreement.id) ? styles.read : ''}`}
                        onClick={() => handleAgreementClick(agreement.id)}
                      >
                        <input
                          className="form-check-input"
                          style={{
                            border: '3px solid #B7B7B7',
                            margin: '0 5px 0 0',
                          }}
                          type="checkbox"
                          onChange={() => handleClick(agreement.id)}
                          checked={agreementsStatus[agreement.id]}
                          id={agreement.id}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={agreement.id}
                        >
                          {agreement.agreementSubject}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-center pt-2">
                    {agreementsError && (
                      <p style={{ color: 'red' }}>{agreementsError}</p>
                    )}
                  </div>
                  <textarea
                    rows={10}
                    className={`mt-3 ${styles.InfoDetail} border-0 no-outline`}
                    value={selectedAgreement.agreementContent}
                    readOnly
                  />
                  {/* </form> */}
                </div>
              </div>
            </div>
            {/* 確認同意 */}
            <div className="col-12">
              <div
                className="form-check align-items-center my-3"
                style={{ padding: 0 }}
              >
                <input
                  className="form-check-input"
                  style={{
                    border: '3px solid #B7B7B7',
                    marginLeft: 0,
                    padding: 0,
                  }}
                  id="flexCheckDefault4"
                  type="checkbox"
                  checked={checkedRead}
                  onChange={(e) => setCheckedRead(e.target.checked)}
                />
                <label
                  className="form-check-label d-flex ms-2"
                  htmlFor="flexCheckDefault4"
                >
                  <h5 className="ms-2 me-3" style={{ marginBottom: 0 }}>
                    我已詳閱並同意以上聲明事項{' '}
                  </h5>
                  {checkedReadError && (
                    <p style={{ color: 'red' }}>{checkedReadError}</p>
                  )}
                </label>
              </div>
              <div
                className="form-check mb-3 d-flex align-items-start"
                style={{ margin: 0, padding: 0 }}
              >
                <input
                  className="form-check-input"
                  style={{
                    border: '3px solid #B7B7B7',
                    marginLeft: 0,
                    paddingTop: 10,
                  }}
                  type="checkbox"
                  defaultValue
                  id="flexCheckDefault5"
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault5"
                >
                  <h5 style={{ marginBottom: 0 }}>
                    本人同意所蒐集之聯絡資料(姓名、地址、email)作為寵度保險依金控法第43條第2項，進行共同行銷之特定目的使用。如未勾選不影響本次投保權益，可直接進行下一步
                  </h5>
                </label>
              </div>
            </div>

            {/* 下一步 */}
            <div className="col-12">
              <div>
                <div className="d-flex justify-content-center align-items-center">
                  <Link href="/insurance" className="text-decoration-none">
                    <button className={styles['own-btn4']}>返回</button>
                  </Link>
                  <button
                    className={styles['own-btn4']}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    下一步
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default withProgressBar(PiPayment01)
