import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './insurance.module.css'

const steps = [
  {
    title: '寵物資料',
    activeImg: '/pic/bread01.png',
    defaultImg: '/pic/bread01.png',
  },
  {
    title: '保人資料',
    activeImg: '/pic/bread02.png',
    defaultImg: '/pic/bread02-default.png',
  },
  {
    title: '線上繳費',
    activeImg: '/pic/bread03.png',
    defaultImg: '/pic/bread03-default.png',
  },
  {
    title: '投保完成',
    activeImg: '/pic/bread04.png',
    defaultImg: '/pic/bread04-default.png',
  },
]

export default function ProgressBarCopy({ currentStep }) {
  return (
    <div className="col-8" style={{ padding: '0 50px' }}>
      <div className="d-flex flex-row justify-content-center align-items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className="d-flex flex-column justify-content-center align-items-center text-center"
              style={{ width: '400px' }}
            >
              <img
                src={
                  index === 0 || index <= currentStep
                    ? step.activeImg
                    : step.defaultImg
                }
                className="img-fluid"
                alt={step.title}
              />
              <h5>{step.title}</h5>
            </div>
            {index < steps.length - 1 && (
              <div
                className={
                  index < currentStep
                    ? styles['bread-bar-active']
                    : styles['bread-bar']
                }
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
