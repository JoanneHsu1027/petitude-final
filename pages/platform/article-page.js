import React from 'react'
import Layout from '@/components/layout/layout'
import styles from '../../styles/platform/platform-style.module.css'
import SideBarPc from '@/components/platform/side-bar-pc'
import { BsChevronLeft } from 'react-icons/bs'
import { BsFillPencilFill } from 'react-icons/bs'
import { BsBookmarkFill } from 'react-icons/bs'
import { BsFillShareFill } from 'react-icons/bs'
import ReMessageBlock from '@/components/platform/re-message-block'

export default function ArticlePage() {
  return (
    <>
      <section className={`${styles.BgImg}`}>
        <Layout title="貓狗論壇" pageName="pet-insurance">
          <div className="container mb-5">
            <div className="row">
              <SideBarPc></SideBarPc>
              {/* section 這裡開始 */}
              <div className="col-xl-9 col-lg-12">
                {/* article-page 這裡開始 */}
                <div
                  className={`container card my-1 ${styles.Rounded5} border-0 h-100 px-2`}
                >
                  <div className="row">
                    <div className="col-lg-12 col-md-12 d-flex flex-column justify-content-center mt-4">
                      {/* mobile only go-back-page-btn */}
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          top: '142px',
                          left: '12px',
                        }}
                        className="border rounded bg-white d-flex justify-content-center align-items-center position-fixed d-xl-none d-xxl-block d-xxl-none"
                      >
                        <a className={`${styles.AReset}`} href="./article-list">
                          <BsChevronLeft></BsChevronLeft>
                        </a>
                      </div>

                      <div>
                        {/* article-content 這裡開始 */}
                        <section>
                          {/* head */}
                          <div className="border-bottom border-secondary mt-3 mx-2">
                            <h2>文章名稱</h2>
                            <div className="d-flex me-3">
                              <div className="m-2 d-flex flex-grow-1 word-wrap">
                                <a className={`${styles.AReset}`} href="">
                                  <p className="border border-dark rounded-3 me-2 word-wrap">
                                    主題名稱
                                  </p>
                                </a>
                                <p className="me-1 word-wrap">
                                  2024-05-29 12:27
                                </p>
                              </div>
                              <a
                                className={`${styles.AReset} ${styles.LightGray}`}
                              >
                                <BsFillPencilFill
                                  className={`mb-1`}
                                ></BsFillPencilFill>
                                編輯
                              </a>
                            </div>
                          </div>

                          {/* main */}
                          <div className="mx-4 my-4">
                            <p>
                              首先說我一向支持領養代替購買，自己的貓也是領養來的。但我理解有人就是喜歡品種貓，否則寵物版也不會幾乎每天都有人問貓舍評價了。
                              這篇文是我整理了很多貓舍的經驗文與朋友經驗下濃縮的貓舍初步判斷標準。這個標準不是單純的「合法」而更傾向重視動物福利的道德層面。
                              一些常見細節不會特別打出來，但如果有疑問我還是會回覆接解釋，也歡迎各位補充。
                            </p>
                            <p>
                              * 當你瀏覽貓舍網站時，以下只要任一符合就危險
                              1.沒有繁殖業與買賣業特寵字號、貓舍主人與營業登記人不是同一位
                              2.貓舍繁殖超過2種品種 3.一隻種貓兩年生超過三胎
                              4.沒有貓咪生活環境的照片或影片，都是可愛的擺拍照
                              5.每胎出生的數量異常（每次都超過七、八隻等）
                              6.父母的花紋和孩子的花紋對不上
                              7.大量的現貨貓甚至特定花色（正常貓舍都是要預約的）
                              8.種公種母超過七歲
                              9.沒有明確的繁殖計畫或是基因篩檢的證明
                            </p>
                            <p>
                              溝通時有下列任一情況就建議換家
                              1.沒有綠單or綠單要加錢
                              2.貓舍主人對於照顧貓的說明不清楚（例如怎麼保養毛髮、餵食等）
                              3.貓舍主人沒有問你任何問題就同意賣貓（品種貓超嬌貴的，正常的培育者會對自己的貓充滿愛與驕傲，他們也會挑主人的）
                              4.暗示可以不結紮、不打晶片、讓你帶小貓走
                              5.沒辦法拿出種公種母的晶片號碼（這是法律上有義務提供的，請堅定的提出要求）
                              6.沒有種公種母的退休計畫 7.貓咪沒出生就付訂
                              8.金額異常低廉卻要求後續購買該貓舍自產飼料鮮食
                            </p>
                            <p>
                              到現場需要觀察以下情況，有的話收手為上
                              1.讓你隨便抱小貓（小貓超容易生病，正常人不會讓外人隨便接觸）
                              2.沒有任何居家防護措施
                              3.貓咪眼睛、耳朵、皮膚有任何的髒污或異常
                              4.長毛貓貓舍沒有空調都是NG 5.只談價錢不談貓咪照顧
                              6.不用預約直接去的店都不是正常的
                            </p>
                            <p>
                              領貓必備 1.前一天或當天的健檢報告
                              2.血統書（最好能請貓舍直接讓協會把綠單寄給你，現在都是email了）
                              3.晶片資料 4.打完兩劑疫苗才能帶
                              5.是否有遺傳病的合約（這點見仁見智，但我建議確認一下至少有一年的保證期）
                            </p>
                            <p>
                              *
                              我絕對不鼓勵購買寵物，但再怎麼樣希望無良貓舍可以逐步消失。如果真的要買貓，也請做足功課挑選重視動物福利的優良貓舍。
                              我相信譴責可能無法遏止買賣的發生，但推廣知識可能有機會帶來環境的轉變。
                              最後給大家看看我家成貓領養的米克斯孩子，真的好可愛。
                            </p>
                          </div>

                          {/* foot */}
                          <div className="border-bottom border-secondary d-flex justify-content-around pb-4">
                            <a
                              className={`${styles.AReset} ${styles.LightGray} ${styles.FavHover}`}
                            >
                              <BsBookmarkFill
                                className={`mb-1`}
                              ></BsBookmarkFill>
                              收藏
                            </a>
                            <a
                              className={`${styles.AReset} ${styles.LightGray}`}
                            >
                              <BsFillShareFill
                                className={`mb-1`}
                              ></BsFillShareFill>
                              分享
                            </a>
                          </div>
                        </section>
                        {/* article-content 這裡結束 */}
                        {/* message-content 這裡開始 */}
                        <section>
                          <ReMessageBlock></ReMessageBlock>
                          <ReMessageBlock></ReMessageBlock>
                          <ReMessageBlock></ReMessageBlock>
                          <ReMessageBlock></ReMessageBlock>
                        </section>
                        {/* message-content 這裡結束 */}
                        {/* re-message-block 這裡開始 */}
                        <div className="position-sticky bottom-0 ">
                          <div className="p-3">
                            <input
                              style={{ height: '45px' }}
                              className={`card w-100 border-3 ${styles.BorderBlue} ${styles.SetPlaceholder}`}
                              type="text"
                              placeholder="回覆......"
                            />
                          </div>
                        </div>
                        {/* re-message-block 這裡結束 */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* article-page 這裡結束 */}
              </div>
              {/* section 這裡結束 */}
            </div>
          </div>
        </Layout>
      </section>
    </>
  )
}
