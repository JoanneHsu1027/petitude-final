import React from 'react'
import Layout from '@/components/layout/layout'
import styles from '../../styles/platforum/platforum-style.module.css'
import SideBarPc from '@/components/layout/side-bar-pc'
import NewsBlock from '../../components/platforum/news-block'
import LostBlock from '../../components/platforum/lost-block'
import ClassBlock from '../../components/platforum/class-block'
import Footer from '@/components/layout/footer'

export default function Platforum() {
  return (
    <>
      <section className={`d-flex flex-column h-100 ${styles.BgImg}`}>
        <Layout title="貓狗論壇" pageName="pet-insurance">
          <div className="container">
            <div className="row">
              <SideBarPc></SideBarPc>
              {/* section 這裡開始 */}
              <div className="col-xl-9 col-lg-12">
                <NewsBlock></NewsBlock>
                <LostBlock></LostBlock>
                <ClassBlock></ClassBlock>
              </div>
              {/* section 這裡結束 */}
            </div>
          </div>
        </Layout>
      </section>
    </>
  )
}
