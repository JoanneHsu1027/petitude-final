import React, { useEffect, useState } from 'react'
import { RE_MESSAGE } from '@/configs/platform/api-path'
import moment from 'moment-timezone'
import styles from '../../../styles/platform/platform-style.module.css'
import { GoDash } from 'react-icons/go'

export default function MessageId({ message_id }) {
  const [replies, setReplies] = useState([])
  const [error, setError] = useState(null)
  const [isHidden, setIsHidden] = useState(true) // 預設隱藏留言

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const res = await fetch(`${RE_MESSAGE}/${message_id}/replies`)
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`)
        }
        const data = await res.json()
        setReplies(data)
        // 如果有回覆，顯示「查看其他留言」按鈕
        setIsHidden(true) // 預設隱藏留言
      } catch (error) {
        console.error('Fetch error:', error)
        setError(error.message)
      }
    }

    if (message_id) {
      fetchReplies()
    }
  }, [message_id])

  if (error) {
    return <div>錯誤: {error}</div>
  }

  const handleToggleReplies = () => {
    setIsHidden(!isHidden)
  }

  return (
    <>
      {replies.length > 0 && (
        <button
          className={`${styles.BtnReset} ${styles.LightGray} pt-3 `}
          onClick={handleToggleReplies}
        >
          {isHidden ? (
            <>
              <GoDash /> 查看其他 {replies.length} 則留言
            </>
          ) : (
            <>
              <GoDash /> 隱藏留言
            </>
          )}
        </button>
      )}
      {!isHidden &&
        replies.map((reply) => {
          const dateFormat = moment(reply.message_date).format(
            'YYYY-MM-DD HH:mm',
          )
          return (
            <div
              key={reply.re_message_id}
              className="d-flex border-bottom mt-3 mx-1 px-2"
            >
              <div className="me-2">
                <img src="/forum-pic/avatar.png" alt="" />
              </div>
              <div className="flex-grow-1 me-2">
                <p className="fw-bold">{reply.b2c_name}</p>
                <p>{reply.re_message_content}</p>
                <div className="d-flex">
                  <p className="me-4">{dateFormat}</p>
                </div>
              </div>
            </div>
          )
        })}
    </>
  )
}
