import React, { useState } from 'react'
import styles from '../../styles/platform/platform-style.module.css'
import { BsXLg } from 'react-icons/bs'
import Navbar from '@/components/layout/navbar'
import { useRouter } from 'next/router'
import { ARTICLE_ADD_POST } from '@/configs/platform/api-path'

export default function CreateArticle() {
  const router = useRouter()

  const [myForm, setMyForm] = useState({
    article_name: '',
    article_content: '',
    article_topic: '',
  })

  const onChange = (e) => {
    setMyForm({
      ...myForm,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('article_name', myForm.article_name)
      formData.append('article_content', myForm.article_content)
      formData.append('article_topic', myForm.article_topic)

      const r = await fetch(ARTICLE_ADD_POST, {
        method: 'POST',
        body: formData,
      })
      const result = await r.json()
      console.log(result)
      if (result.success) {
        router.push('/platform/article')
      } else {
        // Handle error if needed
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <>
      <section style={{ height: '125vh' }} className={`${styles.BgImg}`}>
        <title>{'貓狗論壇 | Petitude'}</title>

        <Navbar />

        <div className="container-fluid col-xl-6 col-lg-12 mb-5">
          <div
            className={`container card my-3 ${styles.Rounded5} border-2 border-dark h-100 p-4`}
          >
            <div className="row">
              <a
                href="./article"
                className={`${styles.AReset} d-flex flex-row-reverse`}
              >
                <BsXLg className="display-1"></BsXLg>
              </a>
              <form onSubmit={onSubmit}>
                <select
                  style={{ width: 150 }}
                  className="form-select rounded-pill"
                  id="inputGroupSelect01"
                  onChange={onChange}
                  name="article_topic"
                >
                  <option value="">選擇主題</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
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
                />
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
      </section>
    </>
  )
}
