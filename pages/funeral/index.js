import React from 'react'
import Layout from '../../components/layout/layout'
import Head from 'next/head'

  return (
    <Layout title="首頁" pageName="home">
      <Head>
        <meta keyword="angela" />
      </Head>
      <h1>Home</h1>
    </Layout>
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
