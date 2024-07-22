import React, { useState } from 'react'
import styles from '@/components/insurance/insurance.module.css'

export default function PetSick() {
  const accidentTypes = [
    {
      accidentType: '腸胃炎',
      accidentExpense: '$2,500',
      icon: '/pi-pic/dog-stoma3.png',
    },
    {
      accidentType: '心臟病',
      accidentExpense: '$4,500',
      icon: '/pi-pic/dog-heart.png',
    },
    {
      accidentType: '膿皮症',
      accidentExpense: '$3,000',
      icon: '/pi-pic/dog-skin.png',
    },
    {
      accidentType: '椎間盤突出',
      accidentExpense: '$11,000',
      icon: '/pi-pic/dog-accident.png',
    },
  ]

  const [selectedAccident, setSelectedAccident] = useState(accidentTypes[0])

  const [iconClicked, setIconClicked] = useState(null)

  const handleIconClick = (index) => {
    setSelectedAccident(accidentTypes[index])
    setIconClicked(index)
  }
  return (
    <>
      <div className="container-fluid" style={{ padding: 0 }}>
        <div className="row">
          <div className={`col-12 ${styles.barHight}`}>
            <img
              className="w-100"
              loading="lazy"
              src="/pi-pic/section2-top-bar2.png"
              alt=""
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-2">
            <h2
              className={`d-flex justify-content-center ${styles['text-color']}`}
            >
              常見醫療花費
            </h2>
          </div>
        </div>
        {/* 電腦版 */}
        <div
          className={`row ${styles.forDeskTop}`}
          style={{ padding: '0 60px' }}
        >
          <div
            className="col-lg-4 d-flex align-items-center justify-content-end"
            style={{ paddingLeft: 20 }}
          >
            <div
              className={`col-9 ${styles['stats-container']} text-center`}
              style={{ padding: '1.25rem 3.125rem', width: '100%}' }}
            >
              <h4 style={{ fontWeight: '700' }}>
                {selectedAccident.accidentType}
              </h4>
              <h5>平均每次治療金額</h5>
              <h4 className={styles['own-orange']} style={{ margin: 0 }}>
                {selectedAccident.accidentExpense}
              </h4>
            </div>
            <div className="col-3">
              <img
                className="img-fluid"
                loading="lazy"
                src="/pi-pic/point-line.png"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-3 col-xxl-2 d-flex align-items-center pt-3">
            <ul className="list-unstyled" style={{ width: '100%' }}>
              {accidentTypes.map((accident, index) => (
                // eslint-disable-next-line
                <li
                  key={index}
                  onClick={() => handleIconClick(index)}
                  className={`d-flex ${
                    index === 0 || index === 3
                      ? 'justify-content-end'
                      : 'justify-content-start'
                  }`}
                  style={
                    index === 1
                      ? { marginBottom: '3.125rem' }
                      : { marginBottom: '0.5rem' }
                  }
                >
                  <div
                    className={`rounded-circle d-flex justify-content-center align-items-center ${styles.circleColorChange} ${iconClicked === index ? styles.clicked : ''}`}
                  >
                    <img
                      style={{ width: '80%', height: '80%' }}
                      loading="lazy"
                      src={accident.icon}
                      alt={accident.accidentType}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-5 col-xxl-6">
            <div
              className="d-flex justify-content-center"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            >
              <img
                className="img-fluid"
                loading="lazy"
                src="/pi-pic/dog-for-sick02.png"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* 手機板 */}
        <div className={`row ${styles.forPhone}`} style={{ padding: '0 60px' }}>
          <div
            className="col-lg-5 d-flex flex-column align-items-center justify-content-center"
            style={{ paddingLeft: 20 }}
          >
            <div className="pt-1">
              <div className="d-flex justify-content-evenly">
                {accidentTypes.map((accident, index) => (
                  // eslint-disable-next-line
                  <div
                    key={index}
                    onClick={() => handleIconClick(index)}
                    className={`rounded-circle d-flex justify-content-center align-items-center ${styles.circleColorChange} ${iconClicked === index ? styles.clicked : ''}`}
                  >
                    <img
                      style={{ width: '80%', height: '80%' }}
                      className="img-fluid"
                      loading="lazy"
                      src={accident.icon}
                      alt={accident.accidentType}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`${styles['stats-container']} ${styles['sick-expense']} text-center mt-3`}
            >
              <h4 style={{ fontWeight: '700' }}>
                {selectedAccident.accidentType}
              </h4>
              <h5>平均每次治療金額</h5>
              <h4 className={styles['own-orange']} style={{ margin: 0 }}>
                {selectedAccident.accidentExpense}
              </h4>
            </div>
            {/* <div>
              <img
                className="img-fluid"
                loading="lazy"
                src="/pi-pic/point-line.png"
                alt=""
              />
            </div> */}
          </div>

          <div className="col-lg-5">
            <div
              className="d-flex justify-content-center"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            >
              <img
                className="img-fluid"
                loading="lazy"
                src="/pi-pic/dog-for-sick02.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className={`col-12 ${styles.barHight}`}>
            <img
              className="w-100 h-100"
              loading="lazy"
              src="/pi-pic/section2-bottom-bar2.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  )
}
