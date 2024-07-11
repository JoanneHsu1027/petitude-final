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
      accidentExpense: '$4500',
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
          <div className="col-12" style={{ height: '7.5rem' }}>
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
        <div className="row" style={{ padding: '0 60px' }}>
          <div
            className="col-lg-5 d-flex align-items-center justify-content-end"
            style={{ paddingLeft: 20 }}
          >
            <div
              className={`${styles['stats-container']} text-center`}
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
            <div>
              <img
                className="img-fluid"
                loading="lazy"
                src="/pi-pic/point-line.png"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-2 d-flex align-items-center pt-5">
            <ul className="list-unstyled" style={{ width: '100%' }}>
              {accidentTypes.map((accident, index) => (
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
                    className={`rounded-circle ${styles.circleColorChange} ${iconClicked === index ? styles.clicked : ''}`}
                  >
                    <img
                      loading="lazy"
                      src={accident.icon}
                      alt={accident.accidentType}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-5">
            <div
              className="d-flex justify-content-start"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                padding: 80,
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
        <div className="col-12" style={{ height: '7.5rem' }}>
          <img
            className="w-100 h-100"
            loading="lazy"
            src="/pi-pic/section2-bottom-bar2.png"
            alt=""
          />
        </div>
      </div>
    </>
  )
}
