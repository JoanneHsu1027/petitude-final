import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ImageComponent from '../../components/funeral/common/image'
// import ModalComponent from '../component/common/modal'
// import { transform } from 'next/dist/build/swc'
import Link from 'next/link'

export default function HomePage() {
  // 設置按鈕點擊事件
  const handleClick = () => {
    alert('Button clicked')
  }
  // 設置modal開關狀態
  const [showModal, setShowModal] = useState(false)

  // 開啟modal, modal呈現true打開
  const handleShow = () => setShowModal(true)

  // 關閉modal, modal呈現false縮起
  const handleClose = () => setShowModal(false)

  return (
    <div
      className="container-fluid d-flex justify-content-center"
      style={{ padding: '0', margin: '0', minHeight: '100vh' }}
    >
      <div className="row">
        {/* head */}
        <div
          className="headPic"
          style={{
            width: '100%',
            height: '100px',
            overflow: 'hidden',
            position: 'fixed',
            top: '0',
            zIndex: '0',
          }}
        >
          <ImageComponent
            src="/funeral/Vector 436.png"
            alt="Description of the image"
            width={2000}
            height={100}
            style={{
              transform: 'rotate(180deg)',
              margin: '0',
              padding: '0',
            }}
          />
        </div>
        {/* head */}
        {/* left */}
        <div
          className="col-md-7 leftSection"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0',
          }}
        >
          <div className="leftCard">
            <ImageComponent
              className="indexIcon"
              src="/funeral/title.png"
              alt="Description of the image"
              width={220}
              height={100}
              style={{
                marginBottom: '20px',
                zIndex: '2',
                position: 'relative',
              }}
            />
            <ImageComponent
              className="img1"
              src="/funeral/1.jpg"
              alt="Description of the image"
              width={300}
              height={280}
              style={{
                marginRight: '20px',
                borderRadius: '20px',
                overflow: 'hidden',
                zIndex: '1',
                position: 'relative',
              }}
            />
          </div>
          <ImageComponent
            className="img1"
            src="/funeral/3.jpg"
            alt="Description of the image"
            width={400}
            height={500}
            style={{
              borderRadius: '30px 0 30px 0',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 3,
            }}
          />
        </div>
        {/* left */}
        {/* right */}
        <div
          className="col-md-5 rightSection"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0',
          }}
        >
          <div
            className="textSection"
            style={{
              borderRadius: '30px',
              marginTop: '60px',
              position: 'relative',
              zIndex: 3,
            }}
          >
            <h6>生命禮儀</h6>
            <p>
              我們提供各項寵物禮儀服務客製化每位毛小孩的旅程，全程協助陪伴每位家屬，學習悲傷，轉悲為喜。你會發現，毛小孩教會我們的至始至終都是愛
            </p>
            <ImageComponent
              src="/funeral/Line 25.png"
              alt="Description of the image"
              width={5}
              height={30}
              style={{ marginBottom: '10px' }}
            />
            <p>
              是你讓我了解生命的美好，讓我懂得如何去愛去珍惜，
              放心，我會遵守約定，帶你住進美麗的森林裡，這是我的責任，也是我對你永遠守護的承諾！
            </p>
          </div>
          {/*按鈕 */}
          <div
            className="btnSec"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <Link href="/funeral/funeral/masonry">
              <button onClick={handleShow} className="btn btn-secondary">
                進入頁面
              </button>
            </Link>
          </div>
        </div>
        {/* right */}

        {/* bottom */}
        <div
          className="bottomPic"
          style={{
            width: '100%',
            height: '100px',
            overflow: 'hidden',
            position: 'fixed',
            bottom: '0',
            zIndex: '0',
          }}
        >
          {/* 底下波浪圖 */}
          <ImageComponent
            src="/funeral/Vector 436.png"
            alt=""
            width={2000}
            height={100}
            style={{ position: 'relative' }}
          />
        </div>
      </div>
    </div>
  )
}
