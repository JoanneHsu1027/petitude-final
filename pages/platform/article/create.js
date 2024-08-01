import React, { useState, useEffect } from 'react'
import styles from '../../../styles/platform/platform-style.module.css'
import { BsXLg } from 'react-icons/bs'
import Navbar from '@/components/layout/navbar'
import { useRouter } from 'next/router'
import { ARTICLE_ADD_POST } from '@/configs/platform/api-path'
import Swal from 'sweetalert2'

export default function CreateArticle() {
  const router = useRouter()
  const [previewURL, setPreviewURL] = useState('')
  const [myForm, setMyForm] = useState({
    fk_b2c_id: '', // 初始化為空字串
    article_name: '',
    article_content: '',
    fk_class_id: '',
    article_img: null,
  })

  const [myFormErrors, setMyFormErrors] = useState({
    fk_b2c_id: '',
    article_name: '',
    article_content: '',
    fk_class_id: '',
  })

  const [imageFile, setImageFile] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [titleLength, setTitleLength] = useState(0)
  const [contentLength, setContentLength] = useState(0)

  useEffect(() => {
    // 假設資料存在於 localStorage
    const userData = JSON.parse(localStorage.getItem('petmember-auth'))
    if (userData && userData.b2c_id) {
      setMyForm((prevForm) => ({
        ...prevForm,
        fk_b2c_id: userData.b2c_id,
      }))
    }
  }, [])

  const onChange = (e) => {
    const { name, value, files } = e.target

    if (name === 'article_img') {
      if (files && files[0]) {
        setImageFile(files[0])
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

      if (value.trim() !== '') {
        setMyFormErrors({
          ...myFormErrors,
          [name]: '',
        })
      }

      if (name === 'article_name') {
        setTitleLength(value.length)
      }

      if (name === 'article_content') {
        setContentLength(value.length)
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
    formData.append('fk_b2c_id', myForm.fk_b2c_id) // 加入 fk_b2c_id
    if (imageFile) {
      formData.append('article_img', imageFile)
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
      setIsSubmitted(true)
      Swal.fire({
        icon: 'success',
        title: '建立成功',
        showConfirmButton: false,
        timer: 1500,
      })
      router.push('/platform/article')
    }
  }

  // 自動填入預設內容
  const autoFillForm = () => {
    setMyForm({
      ...myForm,
      fk_class_id: '3',
      article_name: '如何與寵物建立深厚的情感聯繫',
      article_content: `寵物對許多人來說，不僅僅是伴侶，更是家庭的一員。與寵物建立深厚的情感聯繫，不僅能夠提升寵物的幸福感，還能增進主人與寵物之間的互動和理解。這篇文章將探討如何與寵物建立深厚的情感聯繫。

首先，花時間陪伴寵物是建立情感聯繫的關鍵。每天定時與寵物互動，不論是散步、玩耍還是僅僅陪伴在身邊，都能讓寵物感受到主人的關愛和重視。這些日常互動不僅能夠讓寵物感到安心，也能加深彼此的信任。

其次，理解寵物的行為和需求也是非常重要的。每個寵物都有自己獨特的性格和偏好，通過觀察和了解它們的行為，我們可以更好地滿足它們的需求。比如，有些狗狗喜歡追逐遊戲，而有些貓咪則喜愛安靜地躺在窗邊晒太陽。尊重和滿足寵物的這些需求，能夠讓它們感到被愛和重視。

另外，通過訓練和學習新技能，也能增進與寵物的情感聯繫。學習新的指令或技能不僅能夠讓寵物變得更加聽話，還能通過共同的努力和互動，讓主人和寵物之間的關係變得更加緊密。使用正向強化的方法，給予獎勳和讚美，可以讓訓練過程變得愉快而有效。

最後，健康的生活方式對於寵物的幸福感也是至關重要的。確保寵物獲得足夠的運動、健康的飲食以及定期的健康檢查，不僅能夠讓它們保持身體健康，還能增進與主人的情感聯繫。健康的寵物會更加活潑和愉快，這也能夠反過來增強主人對寵物的愛。`,
    })
    setTitleLength('如何與寵物建立深厚的情感聯繫'.length)
    setContentLength(
      `寵物對許多人來說，不僅僅是伴侶，更是家庭的一員。與寵物建立深厚的情感聯繫，不僅能夠提升寵物的幸福感，還能增進主人與寵物之間的互動和理解。這篇文章將探討如何與寵物建立深厚的情感聯繫。

首先，花時間陪伴寵物是建立情感聯繫的關鍵。每天定時與寵物互動，不論是散步、玩耍還是僅僅陪伴在身邊，都能讓寵物感受到主人的關愛和重視。這些日常互動不僅能夠讓寵物感到安心，也能加深彼此的信任。

其次，理解寵物的行為和需求也是非常重要的。每個寵物都有自己獨特的性格和偏好，通過觀察和了解它們的行為，我們可以更好地滿足它們的需求。比如，有些狗狗喜歡追逐遊戲，而有些貓咪則喜愛安靜地躺在窗邊晒太陽。尊重和滿足寵物的這些需求，能夠讓它們感到被愛和重視。

另外，通過訓練和學習新技能，也能增進與寵物的情感聯繫。學習新的指令或技能不僅能夠讓寵物變得更加聽話，還能通過共同的努力和互動，讓主人和寵物之間的關係變得更加緊密。使用正向強化的方法，給予獎勳和讚美，可以讓訓練過程變得愉快而有效。

最後，健康的生活方式對於寵物的幸福感也是至關重要的。確保寵物獲得足夠的運動、健康的飲食以及定期的健康檢查，不僅能夠讓它們保持身體健康，還能增進與主人的情感聯繫。健康的寵物會更加活潑和愉快，這也能夠反過來增強主人對寵物的愛。`
        .length,
    )
  }

  return (
    <>
      <section
        style={{ height: '100%' }}
        className={`${styles.BgImg} ${styles.AllFont}`}
      >
        <title>{'貓狗論壇 | Petitude'}</title>

        <Navbar />

        <div className="container-fluid col-xl-6 col-lg-12 mb-5 pt-4">
          <div
            className={`container card my-3 ${styles.Rounded5} border-2 border-dark h-100 p-4 position-relative`}
          >
            <a
              href="./"
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
                  value={myForm.fk_class_id}
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
                    <div className="d-flex position-relative">
                      <div className="form-text text-danger mb-3 ms-2">
                        {myFormErrors.article_name}
                      </div>
                      <button
                        type="button"
                        onClick={autoFillForm}
                        className={`form-text mb-3 ms-2 position-absolute  top-0 end-0 me-3 ${styles.BtnReset}`}
                      >
                        {`字數: ${titleLength}/100`}
                      </button>
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
                    <div className="d-flex position-relative">
                      <div className="form-text text-danger mb-3 ms-2">
                        {myFormErrors.article_content}
                      </div>
                      <div className="form-text mb-3 ms-2 position-absolute  top-0 end-0 me-3">
                        {`字數: ${contentLength}/1000`}
                      </div>
                    </div>
                  </div>
                </div>
                <input
                  style={{ width: 240 }}
                  type="file"
                  className="form-control rounded-pill mt-2"
                  aria-label="Upload"
                  name="article_img"
                  onChange={onChange}
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
        <div className={`${styles.BgImg} pb-5`}></div>
      </section>
    </>
  )
}
