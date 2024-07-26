import React from 'react'

export default function MessageId() {
  return (
    <>
      {/* 回覆留言區塊 */}

      <div className="d-flex border-bottom mt-2 mx-1 px-2">
        <div className="me-2">
          <img src="/forum-pic/avatar.png" alt="" />
        </div>
        <div className="flex-grow-1 me-2">
          <p>b2c_name</p>
          <p>re_message_content</p>
          <div className="d-flex">
            <p className="me-4">re_message_date</p>
          </div>
        </div>
      </div>
    </>
  )
}
