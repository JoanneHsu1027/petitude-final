import React, { useState } from 'react'
import styles from '../../styles/platform/platform-style.module.css'
import { BsXLg } from 'react-icons/bs'
import Navbar from '@/components/layout/navbar'
import { useRouter } from 'next/router'
import { ARTICLE_ADD_POST } from '@/configs/platform/api-path'
import Swal from 'sweetalert2'

export default function CreateArticle() {
  const router = useRouter()
  const [previewURL, setPreviewURL] = useState('')

  const [myForm, setMyForm] = useState({
    article_name: '',
    article_content: '',
    fk_class_id: '',
    article_img: null,
  })

  const [myFormErrors, setMyFormErrors] = useState({
    article_name: '',
    article_content: '',
    fk_class_id: '',
  })

  const [imageFile, setImageFile] = useState(null) // 新增的狀態
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onChange = (e) => {
    const { name, value, files } = e.target

    if (name === 'article_img') {
      // 判斷是否為圖片檔案的輸入並檢查文件
      if (files && files[0]) {
        setImageFile(files[0])
        // 產生預覽網址
        setPreviewURL(URL.createObjectURL(files[0]))
      } else {
        setImageFile(null)
        setPreviewURL('')
      }
    } else {
      setMyForm({
        ...myForm,
        [name]: value,
      })

      // 如果用戶填寫了某個欄位，則清除相應的錯誤提示
      if (value.trim() !== '') {
        setMyFormErrors({
          ...myFormErrors,
          [name]: '',
        })
      }
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!myForm.fk_class_id) {
      errors.fk_class_id = '請選擇主題'
    }
    if (!myForm.article_name) {
      errors.article_name = '標題不能空白'
    }
    if (!myForm.article_content) {
      errors.article_content = '內容不能空白'
    }
    setMyFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const formData = new FormData()
    formData.append('article_name', myForm.article_name)
    formData.append('article_content', myForm.article_content)
    formData.append('fk_class_id', myForm.fk_class_id)
    if (imageFile) {
      formData.append('article_img', imageFile) // 將圖片檔案加入到FormData
    }

    console.log('Submitting form data:', formData)

    const r = await fetch(ARTICLE_ADD_POST, {
      method: 'POST',
      body: formData,
    })

    console.log('Response:', r)

    const result = await r.json()
    console.log(result)
    if (result.success) {
      setIsSubmitted(true) // 表單提交成功後，更新狀態
      Swal.fire({
        icon: 'success',
        title: '建立成功',
        showConfirmButton: false,
        timer: 1500,
      })
      router.push('/platform/article')
    }
  }

  return (
    <>
      <section style={{ height: '100%' }} className={`${styles.BgImg}`}>
        <title>{'貓狗論壇 | Petitude'}</title>

        <Navbar />

        <div className="container-fluid col-xl-6 col-lg-12 mb-5">
          <div
            className={`container card my-3 ${styles.Rounded5} border-2 border-dark h-100 p-4 position-relative`}
          >
            <a
              href="./article"
              className={`${styles.AReset} position-absolute top-0 end-0 me-4 mt-4`}
            >
              <BsXLg className="display-3"></BsXLg>
            </a>
            <div className="row mt-5">
              <form onSubmit={onSubmit} encType="multipart/form-data">
                <select
                  style={{ width: 150 }}
                  className="form-select rounded-pill"
                  id="inputGroupSelect01"
                  onChange={onChange}
                  name="fk_class_id"
                  value={myForm.fk_class_id} // 確保選擇器的值與狀態一致
                >
                  <option value="" disabled>
                    --選擇主題--
                  </option>
                  <option value="1">寵物遺失</option>
                  <option value="2">飼養心得</option>
                  <option value="3">聊天討論</option>
                  <option value="4">寵物健康醫療</option>
                  <option value="5">寵物營養</option>
                  <option value="6">寵物訓練</option>
                  <option value="7">寵物相關新聞</option>
                </select>
                <div className="form-text text-danger ms-2">
                  {myFormErrors.fk_class_id}
                </div>
                <div className="d-flex justify-content-center w-100">
                  <div className="w-100">
                    <label
                      htmlFor="article-title"
                      className="form-label mt-3 mb-0 ms-1"
                    >
                      文章標題
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="article-title"
                        name="article_name"
                        value={myForm.article_name}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-text text-danger mb-3 ms-2">
                      {myFormErrors.article_name}
                    </div>
                    <label
                      htmlFor="article-content"
                      className="form-label ms-1 mt-1 mb-0"
                    >
                      文章內容
                    </label>
                    <div className="input-group">
                      <textarea
                        style={{ height: 250 }}
                        id="article-content"
                        name="article_content"
                        value={myForm.article_content}
                        onChange={onChange}
                        className={`form-control ${styles.Rounded5}`}
                      />
                    </div>
                    <div className="form-text text-danger mb-3 ms-2">
                      {myFormErrors.article_content}
                    </div>
                  </div>
                </div>
                <input
                  style={{ width: 240 }}
                  type="file"
                  className="form-control rounded-pill mt-2"
                  aria-label="Upload"
                  name="article_img" // 新增的name屬性
                  onChange={onChange} // 捕捉圖片輸入變化
                />
                {previewURL && (
                  <div className="d-flex justify-content-center mt-3">
                    <img className="w-75 " src={previewURL} alt="預覽圖片" />
                  </div>
                )}
                <div className="d-flex flex-row-reverse">
                  <button
                    style={{ width: 150 }}
                    type="submit"
                    className={`btn btn-secondary ${styles.CreateArticleBtn} btn-lg rounded-pill mt-5`}
                  >
                    建立文章
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div style={{ height: 5 }} className={`${styles.BgImg}`}></div>
      </section>
    </>
  )
}
