import React from 'react'
import Layout from '@/components/layout/layout'
import styles from '../../styles/platform/platform-style.module.css'
import { BsXLg } from 'react-icons/bs'

export default function CreateArticle() {
  return (
    <>
      <section className={`${styles.BgImg}`}>
        <Layout title="貓狗論壇" pageName="pet-insurance">
          <>
            {/* section 這裡開始 */}
            <div className="container-fluid col-xl-6 col-lg-12 mb-5">
              <div
                className={`container card my-3 ${styles.Rounded5} border-2 border-dark h-100 p-4`}
              >
                <div className="row">
                  <a
                    href="./article-list"
                    className={`${styles.AReset} d-flex flex-row-reverse`}
                  >
                    <BsXLg className="display-1"></BsXLg>
                  </a>
                  <select
                    style={{ width: 150 }}
                    className="form-select rounded-pill ms-2"
                    id="inputGroupSelect01"
                  >
                    <option selected="">選擇主題</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
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
                          className={`form-control ${styles.Rounded5}`}
                          name=""
                          defaultValue={''}
                        />
                      </div>
                    </div>
                  </div>
                  <input
                    style={{ width: 240 }}
                    type="file"
                    className="form-control rounded-pill ms-2 mt-2"
                    aria-label="Upload"
                  />
                  <label className="d-flex flex-row-reverse">
                    <button
                      style={{ width: 150 }}
                      type="button"
                      className={`btn btn-secondary ${styles.CreateArticleBtn} btn-lg rounded-pill mt-5`}
                    >
                      建立文章
                    </button>
                  </label>
                </div>
              </div>
            </div>
            {/* section 這裡結束 */}
          </>
        </Layout>
      </section>
    </>
  )
}
