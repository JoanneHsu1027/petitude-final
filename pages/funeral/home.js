import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from '../../components/common/funeral/button'
import ImageComponent from '../../components/common/funeral/image'
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
    <div className="container-fluid" style={{ padding: '0', margin: '0' }}>
      <div className="row" style={{ padding: '0', margin: '0' }}>
        <div
          className="headPic"
          style={{
            width: '100%',
            height: '100px',
            overflow: 'hidden',
            position: 'relative',
            margin: '0',
            padding: '0',
          }}
        >
          <ImageComponent
            src="/funeral/Vector 436.png"
            alt="Description of the image"
            width={1200}
            height={100}
            style={{
              transform: 'rotate(180deg)',
              margin: '0',
              padding: '0',
              zIndex: '0',
            }}
          />
        </div>
      </div>
      <div className="row" style={{ padding: '0 60px', marginTop: '-30px' }}>
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
              width={200}
              height={100}
              style={{
                marginBottom: '20px',
                zIndex: '1',
                position: 'relative',
              }}
            />
            <ImageComponent
              className="img1"
              src="/funeral/1.jpg"
              alt="Description of the image"
              width={200}
              height={180}
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
            width={300}
            height={400}
            style={{
              borderRadius: '30px 0 30px 0',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 3,
            }}
          />
        </div>
        <div className="col-md-5 rightSection" style={{ padding: '0' }}>
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
              <Button onClick={handleShow} className="btn btn-secondary">
                進入頁面
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="bottomPic"
        style={{
          width: '100vw',
          height: '100px',
          overflow: 'hidden',
          position: 'relative',
          marginTop: '-12px',
          zIndex: 1,
        }}
      >
        {/* 底下波浪圖 */}
        <ImageComponent
          src="/funeral/Vector 436.png"
          alt=""
          width={1200}
          height={100}
          style={{ position: 'relative', zIndex: 0 }}
        />
      </div>
    </div>
  )
}

// ----------------------------------------
// <div>
//   <h1>Welcome to my home page!!!</h1>
//   {/* 引入button做成組件 */}
//   <Button onClick={handleClick}>Click Me!!!</Button>
//   <Button onClick={handleShow}>Open Modal</Button>

//   {/* 引入modal做成組件 */}
//   <ModalComponent show={showModal} onHide={handleClose}>
//     <ModalComponent.Header closeButton>
//       <ModalComponent.Title>Modal Title</ModalComponent.Title>
//     </ModalComponent.Header>
//     <ModalComponent.Body>
//       {/* Modal 内容 */}
//       <p>Modal content goes here.</p>
//     </ModalComponent.Body>
//     <ModalComponent.Footer>
//       <Button onClick={handleClose}>關閉</Button>
//       <Button onClick={handleClose}>確認</Button>
//     </ModalComponent.Footer>
//   </ModalComponent>

//   {/* 引入image做組件 */}
//   <ImageComponent
//     src="/funeral/1.jpg"
//     alt="Description of the image"
//     width={600}
//     height={400}
//   />
// </div>
