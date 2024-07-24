import React, { useEffect, useRef, useState } from 'react'
import styles from '@/components/insurance/insurance.module.css'
import Card from '../common/insurance-card'

export default function InsuranceSection() {
  // 滾輪動畫
  const [isVisible, setIsVisible] = useState(false)
  const imageRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1, // 當10%的元素可見時觸發
      },
    )
    if (imageRef.current) {
      observer.observe(imageRef.current)
    }
    return () => {
      observer.unobserve(imageRef.current)
    }
  }, [])

  return (
    <>
      <div
        className={`container-fluid d-flex flex-column justify-content-center ${styles['bg-image']}`}
        style={{ padding: 0 }}
      >
        <div className="row justify-content-center">
          <div className="col-3">
            <img
              className="w-100"
              loading="lazy"
              src="/pi-pic/title_of_insurance.png"
              alt=""
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-5" style={{ marginBottom: '-50px' }}>
            <h2
              className={`d-flex justify-content-center ${styles['own-blue']}`}
            >
              我們是您的最佳選擇
            </h2>
          </div>
        </div>

        <div
          className="row"
          style={{ paddingRight: '60px', paddingLeft: '60px' }}
        >
          <div
            ref={imageRef}
            style={{ position: 'relative', width: '100%', height: '100%' }}
          >
            <img
              src="./pi-pic/scrollDownPrint.png"
              className={`${styles.fadeInImage} ${isVisible ? styles.animate : ''}`}
              style={{
                position: 'absolute',
                top: '-9.375rem',
                left: '-15.625rem',
              }}
            />
          </div>

          <div className="col-12 d-flex justify-content-around">
            <Card
              cardStyle={styles.cardUp}
              imageSrc="./pi-pic/full_secure.png"
              title="保障全面"
              text="涵蓋意外、疾病、手術等多種醫療費用，讓您的寵物在需要醫療時得到全面的保障"
            />
            <Card
              cardStyle={styles.cardDown}
              imageSrc="./pi-pic/convenient.png"
              title="方案靈活"
              text="提供多樣化的保險方案，可以根據寵物的狀況以及您的預算，選擇最適合的方案 "
            />
            <Card
              cardStyle={styles.cardDown}
              imageSrc="./pi-pic/fast.png"
              title="理賠快速"
              text="迅速處理您的理賠申請，減少等待時間，確保寵物及時獲得治療"
            />
            <Card
              cardStyle={styles.cardUp}
              imageSrc="./pi-pic/professional.png"
              title="客服專業"
              text="擁有專業的客服團隊，隨時為您解答有關保險的各種疑問。讓您感到安心和滿意"
            />
          </div>
        </div>
      </div>
    </>
  )
}
