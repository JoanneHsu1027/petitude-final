import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout/layout'
import styles from '../../../styles/platform/platform-style.module.css'
import SideBarPc from '@/components/platform/side-bar-pc'
import {
  BsChevronLeft,
  BsFillPencilFill,
  BsBookmarkFill,
  BsFillShareFill,
} from 'react-icons/bs'
import { IoSend } from 'react-icons/io5'
import { useRouter } from 'next/router'
import {
  ARTICLE_PAGE,
  MESSAGE_ADD_POST,
  RE_MESSAGE_ADD_POST,
  FAVORITE_ADD_POST,
  FAVORITE_CHECK,
  FAVORITE_REMOVE,
} from '@/configs/platform/api-path'
import moment from 'moment-timezone'
import LoginModal from '@/components/member/LoginModal'
import { useAuth } from '@/contexts/member/auth-context'
import swal from 'sweetalert2'
import ReMessage from '@/components/platform/re_message/[message_id]'
import CartIcon from '@/components/estore/carticon'
import MobileGotop from '@/components/platform/mobile-gotop'

export default function ArticleId() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const { auth } = useAuth()
  const [articleData, setArticleData] = useState({})
  const [messages, setMessages] = useState([])
  const [imageLoaded, setImageLoaded] = useState(true) // 用來追蹤圖片是否成功加載
  const [replyToMessageId, setReplyToMessageId] = useState(null) // 用來跟蹤正在回覆的留言ID
  const [searchKeyword, setSearchKeyword] = useState(router.query.keyword || '')
  const [replyInput, setReplyInput] = useState('') // 新增的回覆輸入框的狀態
  const [reMessInput, setReMessInput] = useState('') // 新增的回覆輸入框的狀態
  const [isFavorite, setIsFavorite] = useState(false) // 收藏狀態

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword)
    router.push(`/platform/article?keyword=${encodeURIComponent(keyword)}`)
  }

  useEffect(() => {
    if (!router.isReady) return

    fetch(`${ARTICLE_PAGE}/${router.query.article_id}`)
      .then((r) => r.json())
      .then((myData) => {
        console.log('Article data:', myData)
        setArticleData(myData.article)
        setMessages(myData.messages)
        setImageLoaded(true) // 確保每次加載時都重置 imageLoaded 狀態
      })
      .catch((error) => {
        console.error('Error fetching article:', error)
      })

    if (auth.b2c_id) {
      checkFavoriteStatus()
    }
  }, [router.query.article_id, router.isReady, auth.b2c_id]) // 依賴 router.query.article_id 和 auth.b2c_id

  useEffect(() => {
    if (articleData.article_img) {
      const img = new Image()
      img.src = `http://localhost:3001/uploads/${articleData.article_img}`
      img.onload = () => setImageLoaded(true)
      img.onerror = () => setImageLoaded(false)
    }
  }, [articleData.article_img])

  const handleEditClick = () => {
    console.log('Auth b2c_id:', auth.b2c_id)
    console.log('Article fk_b2c_id:', articleData.fk_b2c_id)

    if (!auth.b2c_id) {
      swal
        .fire({
          text: '請先登入會員！',
          icon: 'error',
        })
        .then(() => {
          setShowModal(true) // 在警告框關閉後顯示登入視窗
        })
    } else if (auth.b2c_id !== articleData.fk_b2c_id) {
      swal.fire({
        text: '您沒有權限編輯此文章！',
        icon: 'error',
      })
    } else {
      router.push(`./edit/${router.query.article_id}`)
    }
  }

  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch(
        `${FAVORITE_CHECK}/${auth.b2c_id}/${router.query.article_id}`,
      )
      const data = await response.json()
      if (response.ok && data.isFavorite) {
        setIsFavorite(true)
      } else {
        setIsFavorite(false)
      }
    } catch (error) {
      console.error('Error checking favorite status:', error)
    }
  }

  const handleFavoriteClick = async () => {
    if (!auth.b2c_id) {
      swal.fire({ text: '請先登入會員！', icon: 'error' }).then(() => {
        setShowModal(true)
      })
    } else {
      try {
        const method = isFavorite ? 'DELETE' : 'POST'
        const url = isFavorite
          ? `${FAVORITE_REMOVE}/${auth.b2c_id}/${router.query.article_id}`
          : FAVORITE_ADD_POST
        const body = isFavorite
          ? null
          : JSON.stringify({
              fk_b2c_id: auth.b2c_id,
              fk_article_id: articleData.article_id,
            })

        const response = await fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: body,
        })

        const data = await response.json()
        if (response.ok && data.success) {
          setIsFavorite(!isFavorite)
          swal.fire({
            text: isFavorite ? '已取消收藏！' : '收藏成功！',
            icon: 'success',
          })
        } else {
          swal.fire({
            text: isFavorite ? '取消收藏失敗！' : '收藏失敗！',
            icon: 'error',
          })
        }
      } catch (error) {
        console.error('操作失敗:', error)
        swal.fire({ text: '操作失敗！', icon: 'error' })
      }
    }
  }

  const handleReplyClick = (messageId) => {
    if (!auth.b2c_id) {
      swal
        .fire({
          text: '請先登入會員！',
          icon: 'error',
        })
        .then(() => {
          setShowModal(true) // 在警告框關閉後顯示登入視窗
        })
    } else {
      setReplyToMessageId(messageId)
    }
  }

  const handleReplyInputChange = (e) => {
    setReplyInput(e.target.value)
  }

  const handleReMessInputChange = (e) => {
    setReMessInput(e.target.value)
  }

  const handleReplySubmit = async (e) => {
    // 檢查用戶是否已登入
    if (!auth.b2c_id) {
      swal
        .fire({
          text: '請先登入會員！',
          icon: 'error',
        })
        .then(() => {
          setShowModal(true) // 在警告框关闭后显示登录窗口
        })
      e.preventDefault() // 阻止表單提交
      return // 返回，避免進行後續操作
    }

    // 檢查輸入框是否有值
    if (replyInput.trim() === '') {
      swal.fire({
        text: '留言內容不能為空！',
        icon: 'warning',
      })
      e.preventDefault() // 阻止表單提交
      return // 返回，避免進行後續操作
    }

    const replyData = {
      message_content: replyInput,
      fk_article_id: articleData.article_id,
      fk_b2c_id: auth.b2c_id,
      message_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      parent_message_id: replyToMessageId,
    }

    try {
      const response = await fetch(MESSAGE_ADD_POST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(replyData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        swal
          .fire({
            text: '留言已送出！',
            icon: 'success',
          })
          .then(() => {
            // 在提示框關閉後，清空輸入框並更新留言列表
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                ...replyData,
                b2c_name: auth.b2c_name,
                message_id: data.message_id,
              },
            ])
            setReplyInput('')
            setReplyToMessageId(null)

            window.location.reload()
          })
      } else {
        swal.fire({
          text: '留言添加失敗！',
          icon: 'error',
        })
      }
    } catch (error) {
      console.error('提交回覆錯誤:', error)
      swal.fire({
        text: '留言添加失敗！',
        icon: 'error',
      })
    }
  }

  const handleReMessageSubmit = async (e) => {
    // 檢查輸入框是否有值
    if (reMessInput.trim() === '') {
      swal.fire({
        text: '留言內容不能為空！',
        icon: 'warning',
      })
      e.preventDefault()
      return // 返回，避免進行後續操作
    }

    const reMessData = {
      re_message_content: reMessInput,
      re_message_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      fk_message_id: replyToMessageId,
      fk_b2c_id: auth.b2c_id,
    }

    try {
      const response = await fetch(RE_MESSAGE_ADD_POST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reMessData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        swal
          .fire({
            text: '回覆留言已送出！',
            icon: 'success',
          })
          .then(() => {
            // 在提示框關閉後，清空輸入框並更新留言列表
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                ...reMessData,
                b2c_name: auth.b2c_name,
                re_message_id: data.re_message_id,
              },
            ])
            setReMessInput('')
            setReplyToMessageId(null)

            window.location.reload()
          })
      } else {
        swal.fire({
          text: '回覆留言添加失敗！',
          icon: 'error',
        })
      }
    } catch (error) {
      console.error('提交回覆錯誤:', error)
      swal.fire({
        text: '回覆留言添加失敗！',
        icon: 'error',
      })
    }
  }

  return (
    <>
      <section className={`${styles.BgImg} ${styles.AllFont}`}>
        <Layout title={articleData.article_name} pageName="platform">
          <div className="container mb-5">
            <div className="row">
              <SideBarPc onSearch={handleSearch} />
              <div className="col-xl-9 col-lg-12">
                <div
                  className={`container card my-1 ${styles.Rounded5} border-0 h-100 px-3`}
                >
                  <div className="row">
                    <div className="col-lg-12 col-md-12 d-flex flex-column justify-content-center mt-4">
                      {/* 返回按鈕 */}
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          top: '240px',
                          left: '12px',
                        }}
                        className="border rounded bg-white d-flex justify-content-center align-items-center position-fixed d-xl-none d-xxl-block d-xxl-none"
                      >
                        <a className={`${styles.AReset}`} href="../article">
                          <BsChevronLeft></BsChevronLeft>
                        </a>
                      </div>

                      {/* 文章內容 */}
                      <div>
                        <section>
                          <div className="container">
                            <div className="row d-flex justify-content-center">
                              <div className="col-lg-11 border-bottom border-secondary mt-3 mx-2">
                                <h2 className="ms-2">
                                  {articleData.article_name}
                                </h2>
                                <div className="d-flex me-3 ms-2">
                                  <div className="m-2 d-flex flex-grow-1 word-wrap">
                                    <a className={`${styles.AReset}`} href="">
                                      <p className="border px-1 border-dark rounded-3 me-2 word-wrap">
                                        {articleData.class_name}
                                      </p>
                                    </a>
                                    <p className="me-1 word-wrap">
                                      {articleData.article_date}
                                    </p>
                                  </div>
                                  {auth.b2c_id === articleData.fk_b2c_id && (
                                    <button
                                      className={`${styles.BtnReset} ${styles.LightGray}`}
                                      onClick={handleEditClick}
                                    >
                                      <BsFillPencilFill
                                        className={`mb-1`}
                                      ></BsFillPencilFill>
                                      編輯
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* 主內容 */}
                          <div
                            style={{ minHeight: '40vh' }}
                            className="mx-4 mt-4"
                          >
                            <div className="d-flex justify-content-center">
                              <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ width: '100%' }}
                              >
                                <pre
                                  style={{
                                    whiteSpace: 'pre-wrap',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word',
                                  }}
                                  className={`col-lg-10 text-start lh-lg h6 text  ${styles.AllFont}`}
                                >
                                  {articleData.article_content}
                                </pre>
                              </div>
                            </div>
                            <div className="d-flex justify-content-center mt-3 mb-4">
                              {imageLoaded ? (
                                <img
                                  className={`w-75`}
                                  src={`http://localhost:3001/uploads/${articleData.article_img}`}
                                  onError={() => setImageLoaded(false)}
                                />
                              ) : null}
                            </div>
                          </div>

                          {/* 功能連結 */}
                          <div className="container">
                            <div className="row d-flex justify-content-center">
                              <div className=" col-lg-11 border-bottom border-secondary d-flex justify-content-around pb-4 mb-3">
                                <button
                                  className={`${styles.BtnReset} ${styles.LightGray} ${styles.FavHover} ${isFavorite ? styles.FavSet : ''} me-4`}
                                  onClick={handleFavoriteClick}
                                >
                                  <BsBookmarkFill
                                    className={`mb-1`}
                                  ></BsBookmarkFill>
                                  收藏
                                </button>
                                <button
                                  className={`${styles.BtnReset} ${styles.LightGray} ${styles.ShareHover} ms-4`}
                                >
                                  <BsFillShareFill
                                    className={`mb-1`}
                                  ></BsFillShareFill>
                                  分享
                                </button>
                              </div>
                            </div>
                          </div>
                        </section>

                        {/* 留言區塊 */}

                        <div
                          style={{ minHeight: '50vh' }}
                          className="container"
                        >
                          <div className="row d-flex justify-content-center">
                            <div className="col-lg-10">
                              <section className="w-100">
                                {messages.length > 0 ? (
                                  messages.map((message) => {
                                    const dateFormat = moment(
                                      message.message_date,
                                    ).format('YYYY-MM-DD HH:MM')
                                    return (
                                      <div key={message.message_id}>
                                        <div className="d-flex border-bottom pt-2 mb-2 mx-1 px-2">
                                          <div className="me-2">
                                            <img
                                              src="/forum-pic/avatar.png"
                                              alt=""
                                            />
                                          </div>
                                          <div className="flex-grow-1 me-2 pb-3">
                                            <p className="fw-bold">
                                              {message.b2c_name}
                                            </p>
                                            <p>{message.message_content}</p>
                                            <div className="d-flex ">
                                              <span className="me-4">
                                                {dateFormat}
                                              </span>
                                              <button
                                                className={`${styles.BtnReset} ${styles.LightGray}`}
                                                onClick={() =>
                                                  handleReplyClick(
                                                    message.message_id,
                                                  )
                                                }
                                              >
                                                回覆
                                              </button>
                                            </div>
                                            {replyToMessageId ===
                                              message.message_id && (
                                              <form
                                                onSubmit={handleReMessageSubmit}
                                                className="pt-3 pb-1 d-flex"
                                              >
                                                <input
                                                  style={{ height: '40px' }}
                                                  className={`card border-3 ${styles.W80} ${styles.SetPlaceholder2} ${styles.BorderEndDel} border-end-0`}
                                                  type="text"
                                                  placeholder="回覆......"
                                                  value={reMessInput}
                                                  onChange={
                                                    handleReMessInputChange
                                                  }
                                                />
                                                <button
                                                  style={{ height: '40px' }}
                                                  className={`${styles.BorderStartDel} card border-3 border-start-0`}
                                                  type="submit"
                                                >
                                                  <IoSend className="mt-2 me-1 text-black-50" />
                                                </button>
                                              </form>
                                            )}
                                            {/* 回覆留言區塊 */}

                                            <ReMessage
                                              message_id={message.message_id}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })
                                ) : (
                                  <p className="text-center mt-2">
                                    目前還沒有留言，成為第一個留言的人吧！
                                  </p>
                                )}
                              </section>
                            </div>
                          </div>
                        </div>

                        {/* 回覆留言區塊 */}
                        <div className="position-sticky bottom-0">
                          <form onSubmit={handleReplySubmit}>
                            <div className="p-3 d-flex justify-content-center">
                              <input
                                style={{ height: '45px' }}
                                className={`card ${styles.W80} border-3 ${styles.BorderBlue} ${styles.SetPlaceholder} ${styles.BorderEndDel} border-end-0`}
                                type="text"
                                placeholder="留言......"
                                value={replyInput}
                                onChange={handleReplyInputChange}
                              />
                              <button
                                style={{ height: '45px' }}
                                className={`${styles.BorderStartDel} ${styles.BorderBlue} card border-3 border-start-0`}
                                type="submit"
                              >
                                <IoSend
                                  style={{ marginTop: 10, color: '#4CB1C8' }}
                                  className="me-1"
                                />
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MobileGotop />
          <CartIcon />
        </Layout>
      </section>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  )
}
