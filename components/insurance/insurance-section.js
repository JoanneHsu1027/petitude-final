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
        threshold: 0.5, // 當50%的元素可見時觸發
        rootMargin: '0px',
      },
    )
    const currentRef = imageRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <>
      <div
        className={`container-fluid d-flex flex-column justify-content-center ${styles['bg-image']} ${styles.allFont}${styles.framePadding}`}
      >
        <div className="row justify-content-center">
          <div className="col-md-3 col-10 d-flex justify-content-center">
            <img
              className={styles.titlePic}
              // className="w-100"
              loading="lazy"
              src="/pi-pic/title_of_insurance.png"
              alt=""
            />
          </div>
        </div>
        <div
          className="row"
          // ref={imageRef}
        >
          <div className={`col-12 ${styles.sloganSpace}`}>
            <h2
              className={`d-flex justify-content-center ${styles['own-blue']}`}
            >
              我們是您的最佳選擇
            </h2>
          </div>
        </div>

        <div className={`row ${styles.framePadding} `}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* {isVisible && ( */}
            <img
              src="./pi-pic/scrollDownPrint.png"
              // className={`${styles.fadeInImage} ${styles.animate}`}
              className={styles.animateLoop}
              style={{
                width: '25%',
                position: 'absolute',
                top: '-180px',
                right: '0px',
              }}
            />
            {/* <div 
              className={styles.animateLoop}
              style={{
                width: '25%',
                height: '100px',
                position: 'absolute',
                top: '0',
                right: '0',
                backgroundColor: 'yellow',
              }}
            >
              Test Animation
            </div> */}
            {/* )} */}
          </div>

          <div className="col-12 d-flex flex-sm-row flex-column justify-content-around">
            <div className="col-md-3 col-12">
              <Card
                cardStyle={styles.cardUp}
                imageSrc="./pi-pic/full_secure.png"
                title="保障全面"
                text="涵蓋意外、疾病、手術等多種醫療費用，讓您的寵物在需要醫療時得到全面的保障"
              />
            </div>
            <div className="col-md-3 col-12">
              <Card
                cardStyle={styles.cardDown}
                imageSrc="./pi-pic/convenient.png"
                title="方案靈活"
                text="提供多樣化的保險方案，可以根據寵物的狀況以及您的預算，選擇最適合的方案 "
              />
            </div>
            <div className="col-md-3 col-12">
              <Card
                cardStyle={styles.cardDown}
                imageSrc="./pi-pic/fast.png"
                title="理賠快速"
                text="迅速處理您的理賠申請，減少等待時間，確保寵物及時獲得治療"
              />
            </div>
            <div className="col-md-3 col-12">
              <Card
                cardStyle={styles.cardUp}
                imageSrc="./pi-pic/professional.png"
                title="客服專業"
                text="擁有專業的客服團隊，隨時為您解答有關保險的各種疑問。讓您感到安心和滿意"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
