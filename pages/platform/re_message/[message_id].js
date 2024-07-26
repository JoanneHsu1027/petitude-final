import React, { useEffect, useState } from 'react'
import { RE_MESSAGE } from '@/configs/platform/api-path'
import { useRouter } from 'next/router'

export default function MessageId({ message_id }) {
  const router = useRouter()
  const [replies, setReplies] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const res = await fetch(`${RE_MESSAGE}/${message_id}/replies`)
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`)
        }
        const data = await res.json()
        setReplies(data)
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

  return (
    <>
      {/* 回覆留言區塊 */}
      {replies.map((reply, index) => (
        <div key={index} className="d-flex border-bottom mt-2 mx-1 px-2">
          <div className="me-2">
            <img src="/forum-pic/avatar.png" alt="" />
          </div>
          <div className="flex-grow-1 me-2">
            <p>b2c_name</p>
            <p>{reply.re_message_content}</p>
            <div className="d-flex">
              <p className="me-4">
                {new Date(reply.re_message_date).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

// 假設在頁面組件中使用這個 MessageId 組件
export async function getServerSideProps(context) {
  const { message_id } = context.params

  return {
    props: {
      message_id,
    },
  }
}
