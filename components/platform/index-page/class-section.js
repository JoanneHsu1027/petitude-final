import React, { useState } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'
import styles from '../../../styles/platform/platform-style.module.css'

export default function ClassSection() {
  const [activeTab, setActiveTab] = useState('tab1')
  const [hoveredImg, setHoveredImg] = useState({
    tab1: '/forum-pic/p01.png',
    tab2: '/forum-pic/p06.png',
    tab3: '/forum-pic/p011.png',
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
        className={`card my-5 border-5 ${styles.Rounded5} ${styles.BorderCoffee} ${styles.AllFont}`}
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
                      href="http://localhost:3000/platform/article/29"
                      onMouseOver={(e) => handleMouseOver(e, 'tab1', 'p01')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        為你的寵物制定健康飲食計劃
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="http://localhost:3000/platform/article/28"
                      onMouseOver={(e) => handleMouseOver(e, 'tab1', 'p02')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        如何應對寵物的食物過敏
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="http://localhost:3000/platform/article/27"
                      onMouseOver={(e) => handleMouseOver(e, 'tab1', 'p03')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        如何處理寵物的體重問題
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
                        如何為你的寵物選擇適合的飼料
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="http://localhost:3000/platform/article/39"
                      onMouseOver={(e) => handleMouseOver(e, 'tab1', 'p05')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        確保您毛小孩的健康飲食
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
                      href="http://localhost:3000/platform/article/13"
                      onMouseOver={(e) => handleMouseOver(e, 'tab2', 'p06')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        寵物健康與飲食的重要性
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="http://localhost:3000/platform/article/12"
                      onMouseOver={(e) => handleMouseOver(e, 'tab2', 'p07')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        如何照顧老年貓
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="http://localhost:3000/platform/article/11"
                      onMouseOver={(e) => handleMouseOver(e, 'tab2', 'p08')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        如何訓練你的狗狗
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="http://localhost:3000/platform/article/10"
                      onMouseOver={(e) => handleMouseOver(e, 'tab2', 'p09')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        飼養寵物的心得
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="http://localhost:3000/platform/article/9"
                      onMouseOver={(e) => handleMouseOver(e, 'tab2', 'p10')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        與寵物共度美好時光
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
                      href="http://localhost:3000/platform/article/40"
                      onMouseOver={(e) => handleMouseOver(e, 'tab3', 'p11')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        為什麼我的狗喜歡追尾巴？
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="http://localhost:3000/platform/article/36"
                      onMouseOver={(e) => handleMouseOver(e, 'tab3', 'p12')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        如何與寵物建立深厚的情感聯繫
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="http://localhost:3000/platform/article/35"
                      onMouseOver={(e) => handleMouseOver(e, 'tab3', 'p13')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        如何為寵物選擇適合的床鋪
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="http://localhost:3000/platform/article/34"
                      onMouseOver={(e) => handleMouseOver(e, 'tab3', 'p14')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        如何應對寵物的分離焦慮
                      </p>
                    </a>
                  </div>
                  <div className={`hover-change border-bottom ${styles.W80}`}>
                    <a
                      className={`${styles.AReset} ms-1`}
                      href="http://localhost:3000/platform/article/33"
                      onMouseOver={(e) => handleMouseOver(e, 'tab3', 'p15')}
                    >
                      <p
                        className={`px-4 ${styles.Hover} ${styles.TitleOverHide} w-100`}
                      >
                        如何選擇合適的寵物玩具
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
