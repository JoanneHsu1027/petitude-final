import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'
// import Image from 'next/image'
import ScrollToTopButton from '@/components/funeral/scrollToTop'

export default function Question() {
  return (
    <>
      <div className="container-fluid mb-5 allFont">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-8">
            <h2 className="text-center my-5">常見問題</h2>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    寵物往生/寵物離開了該怎麼處理?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      讓寶貝以舒服的姿勢平躺著，請將寶貝底部鋪上尿布墊或毛巾以防分泌物髒污到寶貝身上，注意室內溫度不要過高或陽光曝曬導致身體腐敗加速，可開啟風扇或冷氣
                      依個人宗教信仰為寶貝祈福與寶貝好好告別，撥打我們電話02-77467949我們將安排專員到府協助處理。
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    寵物往生眼睛為什麼不能闔上?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      寵物眼睛組織構造與人不同，故無法闔上為正常現象不用過於擔心。
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    寵物火化/動物火化/動物焚化是否可以到場參加?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ul>
                      <li>
                        團體火化
                        <ul>
                          <li>
                            無法，因一次火化數量眾多故不開放觀禮，火化圓滿後可至園區追思祭拜
                          </li>
                        </ul>
                      </li>
                      <br />
                      <li>
                        個別火化
                        <ul>
                          <li>
                            可以，可依家人方便的時間預約安排，送寶貝最後一哩路。
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    寵物殯葬/寵物禮儀的服務流程?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ul>
                      <li>
                        團體火化
                        <ul>
                          <li>到府到院接送</li>
                          <li>聽經安置8小時候入冰櫃</li>
                          <li>隔日早上進行團體火化</li>
                          <li>寵物火化前祭拜及喊火儀式</li>
                          <li>寵物後世圓滿後海葬</li>
                        </ul>
                      </li>
                      <br />
                      <li>
                        個別火化
                        <ul>
                          <li>到府到院接送</li>
                          <li>大體淨身美容SPA(依個人需求)</li>
                          <li>聽經安置8小時入冰櫃</li>
                          <li>預約安排寵物火化道別時間</li>
                          <li>寵物火化前祭拜及道別</li>
                          <li>喊火儀式</li>
                          <li>撿骨</li>
                          <li>
                            寵物骨灰罐裝帶回/寵物樹葬/寵物盆栽葬/寵物塔位安寧
                          </li>
                          <li>後續關懷-頭七百日對年及各大小法會</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    生命禮儀的服務時間?
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ul>
                      <li>365天全年無休</li>
                      <li>24H專人到府服務</li>
                      <li>寵物善終專線:02-0000-0000</li>
                      <li>LINE官方帳號:@petitude52</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC&display=swap');

        .allFont {
          font-family: 'Noto Serif TC', serif;
          font-weight: 900;
        }
        .accordion-item .accordion-button {
          background-color: #ffe4c4;
          color: #515151;
          font-weight: bolder;
        }
        .accordion-body {
          background-color: white;
          color: #515151;
        }

        @media (max-width: 768px) {
          .col-md-8 {
            width: 100%;
            padding: 5%;
          }
        }
      `}</style>
    </>
  )
}
