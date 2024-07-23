import React, { useState } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'
import styles from '../../../styles/platform/platform-style.module.css'

export default function ClassSection() {
  const [activeTab, setActiveTab] = useState('tab1')
  const [hoveredImg, setHoveredImg] = useState({
    tab1: '/forum-pic/p01.png',
    tab2: '/forum-pic/p01.png',
    tab3: '/forum-pic/p01.png',
  })

  const handleTabClick = (event) => {
    event.preventDefault()
    const targetTab = event.currentTarget.getAttribute('data-target')
    setActiveTab(targetTab)
  }

  const handleMouseOver = (event, tab, img) => {
    event.preventDefault()
    setHoveredImg((prevState) => ({
      ...prevState,
      [tab]: `/forum-pic/${img}.png`,
    }))
  }

  return (
    <>
      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
          overflow-x: hidden;
          overflow-y: hidden;
        }
      `}</style>
      <div
        className={`card my-5 border-5 ${styles.Rounded5} ${styles.BorderCoffee}`}
      >
        <div className="mx-5 mt-4 pt-2">
          <nav className={`border-bottom d-flex text-nowrap overflow-scroll`}>
            <a
              className={`py-3 px-3 ${styles.AReset} nav-change nav-link ${activeTab === 'tab1' ? styles.MyActive : ''} text-black`}
              href="#"
              onClick={handleTabClick}
              data-target="tab1"
            >
              寵物營養
            </a>
            <a
              className={`py-3 px-3 ${styles.AReset} nav-change nav-link ${activeTab === 'tab2' ? styles.MyActive : ''} text-black`}
              href="#"
              onClick={handleTabClick}
              data-target="tab2"
            >
              飼養心得
            </a>
            <a
              className={`py-3 px-3 ${styles.AReset} nav-change nav-link ${activeTab === 'tab3' ? styles.MyActive : ''} text-black`}
              href="#"
              onClick={handleTabClick}
              data-target="tab3"
            >
              聊天討論
            </a>
          </nav>
        </div>
        <div className="mt-2 mb-4 mx-2">
          <div
            id="tab1"
            className={`content-change tab-content ${activeTab === 'tab1' ? 'd-block' : 'd-none'}`}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block class-content ps-1 pe-0 pt-5">
                  <img
                    className="ps-5 img-fluid"
                    id="main-img1"
                    src={hoveredImg.tab1}
                    alt="p01"
                  />
                </div>
                <div className="col-lg-7 col-md-12 d-flex flex-column align-items-center justify-content-center">
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="http://localhost:3000/platform/article/24"
                      onMouseOver={(e) => handleMouseOver(e, 'tab1', 'p01')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        如何為你的寵物制定健康的飲食計劃
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="http://localhost:3000/platform/article/25"
                      onMouseOver={(e) => handleMouseOver(e, 'tab1', 'p02')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        寵物需要的必需營養素
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="http://localhost:3000/platform/article/28"
                      onMouseOver={(e) => handleMouseOver(e, 'tab1', 'p03')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        手工自製寵物食品的注意事項
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="http://localhost:3000/platform/article/26"
                      onMouseOver={(e) => handleMouseOver(e, 'tab1', 'p04')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        如何選擇適合你寵物的食物品牌
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="http://localhost:3000/platform/article/27"
                      onMouseOver={(e) => handleMouseOver(e, 'tab1', 'p05')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        如何應對寵物的飲食過敏
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="tab2"
            className={`content-change tab-content ${activeTab === 'tab2' ? 'd-block' : 'd-none'}`}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block class-content ps-1 pe-0 pt-5">
                  <img
                    className="ps-5 img-fluid"
                    id="main-img2"
                    src={hoveredImg.tab2}
                    alt="p01"
                  />
                </div>
                <div className="col-lg-7 col-md-12 d-flex flex-column align-items-center justify-content-center">
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="#"
                      onMouseOver={(e) => handleMouseOver(e, 'tab2', 'p01')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        飼養貓咪的那些事
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="#"
                      onMouseOver={(e) => handleMouseOver(e, 'tab2', 'p02')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        飼養狗狗的快樂與挑戰
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="#"
                      onMouseOver={(e) => handleMouseOver(e, 'tab2', 'p03')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        初次飼養兔子的經驗分享
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="#"
                      onMouseOver={(e) => handleMouseOver(e, 'tab2', 'p04')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        養倉鼠的甜蜜時光
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="#"
                      onMouseOver={(e) => handleMouseOver(e, 'tab2', 'p05')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        分辨優良貓舍的初步鋩角
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="tab3"
            className={`content-change tab-content ${activeTab === 'tab3' ? 'd-block' : 'd-none'}`}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block class-content ps-1 pe-0 pt-5">
                  <img
                    className="ps-5 img-fluid"
                    id="main-img3"
                    src={hoveredImg.tab3}
                    alt="p01"
                  />
                </div>
                <div className="col-lg-7 col-md-12 d-flex flex-column align-items-center justify-content-center">
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="#"
                      onMouseOver={(e) => handleMouseOver(e, 'tab3', 'p01')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        你的寵物有什麼有趣的行為？
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="#"
                      onMouseOver={(e) => handleMouseOver(e, 'tab3', 'p02')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        如何選擇合適的飼料？
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="#"
                      onMouseOver={(e) => handleMouseOver(e, 'tab3', 'p03')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        你家的寵物會做什麼特技？
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="#"
                      onMouseOver={(e) => handleMouseOver(e, 'tab3', 'p04')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        你們會帶寵物出國旅行嗎？
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="#"
                      onMouseOver={(e) => handleMouseOver(e, 'tab3', 'p05')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        飼養寵物的最佳居住環境？
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column align-items-end mt-4 me-5 mb-2">
            <a
              className={`${styles.AReset}`}
              style={{ color: 'black' }}
              href="../../platform/class"
            >
              <span style={{ color: '#f6d554' }}>
                <BsPlusCircleFill />
              </span>
              &nbsp;View more
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
