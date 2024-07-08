import React, { useState } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'
import styles from './platforum-style.module.css'

export default function ClassBlock() {
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
    <div
      className={`card my-5 border-5 ${styles.Rounded5} ${styles.BorderCoffee}`}
    >
      <div className="mx-5 mt-4">
        <nav className="nav border-bottom">
          <a
            className={`${styles.AReset} nav-change nav-link ${activeTab === 'tab1' ? styles.MyActive : ''} text-black`}
            href="#"
            onClick={handleTabClick}
            data-target="tab1"
          >
            寵物遺失
          </a>
          <a
            className={`${styles.AReset} nav-change nav-link ${activeTab === 'tab2' ? styles.MyActive : ''} text-black`}
            href="#"
            onClick={handleTabClick}
            data-target="tab2"
          >
            飼養心得
          </a>
          <a
            className={`${styles.AReset} nav-change nav-link ${activeTab === 'tab3' ? styles.MyActive : ''} text-black`}
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
              <div className="col-lg-5 d-none d-lg-block class-content px-0 pt-5">
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
                    href="#"
                    onMouseOver={(e) => handleMouseOver(e, 'tab1', 'p01')}
                  >
                    <p className={`ps-4 ${styles.Hover}`}>
                      我的狗狗不見了，有人見過嗎？
                    </p>
                  </a>
                </div>
                <div className={`hover-change border-bottom ${styles.W80}`}>
                  <a
                    className={`${styles.AReset} ms-1`}
                    href="#"
                    onMouseOver={(e) => handleMouseOver(e, 'tab1', 'p02')}
                  >
                    <p className={`ps-4 ${styles.Hover}`}>
                      貓咪走失，懇請大家幫忙找尋
                    </p>
                  </a>
                </div>
                <div className={`hover-change border-bottom ${styles.W80}`}>
                  <a
                    className={`${styles.AReset} ms-1`}
                    href="#"
                    onMouseOver={(e) => handleMouseOver(e, 'tab1', 'p03')}
                  >
                    <p className={`ps-4 ${styles.Hover}`}>
                      小兔子不見了，急尋！
                    </p>
                  </a>
                </div>
                <div className={`hover-change border-bottom ${styles.W80}`}>
                  <a
                    className={`${styles.AReset} ms-1`}
                    href="#"
                    onMouseOver={(e) => handleMouseOver(e, 'tab1', 'p04')}
                  >
                    <p className={`ps-4 ${styles.Hover}`}>
                      小鳥飛走了，懇請幫忙找尋
                    </p>
                  </a>
                </div>
                <div className={`hover-change border-bottom ${styles.W80}`}>
                  <a
                    className={`${styles.AReset} ms-1`}
                    href="#"
                    onMouseOver={(e) => handleMouseOver(e, 'tab1', 'p05')}
                  >
                    <p className={`ps-4 ${styles.Hover}`}>三花虎斑貓走失</p>
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
              <div className="col-lg-5 d-none d-lg-block class-content px-0 pt-5">
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
                    <p className={`ps-4 ${styles.Hover}`}>飼養貓咪的那些事</p>
                  </a>
                </div>
                <div className={`hover-change border-bottom ${styles.W80}`}>
                  <a
                    className={`${styles.AReset} ms-1`}
                    href="#"
                    onMouseOver={(e) => handleMouseOver(e, 'tab2', 'p02')}
                  >
                    <p className={`ps-4 ${styles.Hover}`}>
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
                    <p className={`ps-4 ${styles.Hover}`}>
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
                    <p className={`ps-4 ${styles.Hover}`}>養倉鼠的甜蜜時光</p>
                  </a>
                </div>
                <div className={`hover-change border-bottom ${styles.W80}`}>
                  <a
                    className={`${styles.AReset} ms-1`}
                    href="#"
                    onMouseOver={(e) => handleMouseOver(e, 'tab2', 'p05')}
                  >
                    <p className={`ps-4 ${styles.Hover}`}>
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
              <div className="col-lg-5 d-none d-lg-block class-content px-0 pt-5">
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
                    <p className={`ps-4 ${styles.Hover}`}>
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
                    <p className={`ps-4 ${styles.Hover}`}>
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
                    <p className={`ps-4 ${styles.Hover}`}>
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
                    <p className={`ps-4 ${styles.Hover}`}>
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
                    <p className={`ps-4 ${styles.Hover}`}>
                      飼養寵物的最佳居住環境？
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-end mt-4 me-5 mb-2">
          <a className={`${styles.AReset}`} style={{ color: 'black' }} href="#">
            <span style={{ color: '#f6d554' }}>
              <BsPlusCircleFill />
            </span>
            &nbsp;View more
          </a>
        </div>
      </div>
    </div>
  )
}
