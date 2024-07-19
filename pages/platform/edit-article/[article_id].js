import React, { useState, useEffect } from 'react'
import styles from '../../../styles/platform/platform-style.module.css'
import { BsXLg } from 'react-icons/bs'
import Navbar from '@/components/layout/navbar'
import { useRouter } from 'next/router'
import { ARTICLE } from '@/configs/platform/api-path'

export default function EditArticle() {
  const router = useRouter()

  const [myForm, setMyForm] = useState({
    article_id: 0,
    article_name: '',
    article_content: '',
    fk_class_id: '',
    article_img: null,
  })

  const [imageFile, setImageFile] = useState(null) // 新增的狀態

  const onChange = (e) => {
    if (e.target.name === 'article_img') {
      // 判斷是否為圖片檔案的輸入
      setImageFile(e.target.files[0])
    } else {
      setMyForm({
        ...myForm,
        [e.target.name]: e.target.value,
      })
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('article_name', myForm.article_name)
      formData.append('article_content', myForm.article_content)
      formData.append('fk_class_id', myForm.fk_class_id)
      if (imageFile) {
        formData.append('article_img', imageFile) // 將圖片檔案加入到FormData
      }

      console.log('Submitting form data:', formData)

      const r = await fetch(`${ARTICLE}/${router.query.article_id}`, {
        method: 'PUT',
        body: formData,
      })

      console.log('Response:', r)

      const result = await r.json()
      console.log(result)
      if (result.success) {
        router.push('/platform/article')
      } else {
        console.log('Error:', result.error)
      }
    } catch (ex) {
      console.log('Exception:', ex)
    }
  }

  useEffect(() => {
    if (!router.isReady) return

    fetch(`${ARTICLE}/${router.query.article_id}`)
      .then((r) => r.json())
      .then((result) => {
        if (result.success) {
          setMyForm(result.data)
        } else {
          router.push('../article') // 跳回列表頁
        }
      })
      .catch((ex) => {})
  }, [router])

  return (
    <>
      <section style={{ height: '125vh' }} className={`${styles.BgImg}`}>
        <title>{'貓狗論壇 | Petitude'}</title>

        <Navbar />

        <div className="container-fluid col-xl-6 col-lg-12 mb-5">
          <div
            className={`container card my-3 ${styles.Rounded5} border-2 border-dark h-100 p-4 position-relative`}
          >
            <a
              href="../article"
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
                >
                  <option value={myForm.class_name} disabled>
                    --選擇主題--
                  </option>
                  <option value="1" defaultValue={myForm.fk_class_id === '1'}>
                    寵物遺失
                  </option>
                  <option value="2" defaultValue={myForm.fk_class_id === '2'}>
                    飼養心得
                  </option>
                  <option value="3" defaultValue={myForm.fk_class_id === '3'}>
                    聊天討論
                  </option>
                  <option value="4" defaultValue={myForm.fk_class_id === '4'}>
                    寵物健康醫療
                  </option>
                  <option value="5" defaultValue={myForm.fk_class_id === '5'}>
                    寵物營養
                  </option>
                  <option value="6" defaultValue={myForm.fk_class_id === '6'}>
                    寵物訓練
                  </option>
                  <option value="7" defaultValue={myForm.fk_class_id === '7'}>
                    寵物相關新聞
                  </option>
                </select>
                <div className="d-flex justify-content-center w-100">
                  <div className="w-100">
                    <label
                      htmlFor="article-title"
                      className="form-label mt-3 mb-0 ms-1"
                    >
                      文章標題
                    </label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="article-title"
                        name="article_name"
                        value={myForm.article_name}
                        onChange={onChange}
                      />
                    </div>
                    <label
                      htmlFor="article-content"
                      className="form-label ms-1 mt-1 mb-0"
                    >
                      文章內容
                    </label>
                    <div className="input-group mb-3">
                      <textarea
                        style={{ height: 250 }}
                        id="article-content"
                        name="article_content"
                        value={myForm.article_content}
                        onChange={onChange}
                        className={`form-control ${styles.Rounded5}`}
                      />
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
                <div className="d-flex flex-row-reverse">
                  <button
                    style={{ width: 150 }}
                    type="submit"
                    className={`btn btn-secondary ${styles.CreateArticleBtn} btn-lg rounded-pill mt-5`}
                  >
                    修改
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
