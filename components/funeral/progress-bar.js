import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../../components/funeral/funeral.module.css'
import { useProgress } from '../../contexts/funeral/ProgressContext'

const steps = [
  {
    title: '寵物資料',
    activeImg: '/pi-pic/bread01.png',
    defaultImg: '/pi-pic/bread01.png',
  },
  {
    title: '保人資料',
    activeImg: '/pi-pic/bread02-active.png',
    defaultImg: '/pi-pic/bread02-default.png',
  },
  {
    title: '線上繳費',
    activeImg: '/pi-pic/bread03-active.png',
    defaultImg: '/pi-pic/bread03-default.png',
  },
  {
    title: '投保完成',
    activeImg: '/pi-pic/bread04-active.png',
    defaultImg: '/pi-pic/bread04-default.png',
  },
]

export default function ProgressBarCopy() {
  const { currentStep, setCurrentStep } = useProgress()
  const [localStep, setLocalStep] = useState(0)

  useEffect(() => {
    const title = document.title
    const stepIndex = steps.findIndex((step) => title.includes(step.title))

    if (stepIndex !== -1) {
      setCurrentStep(stepIndex)
      setLocalStep(stepIndex)
    }
  }, [setCurrentStep])

  return (
    <>
      <div>
        <p>Current step: {currentStep}</p>
        <p>Local step: {localStep}</p>
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
                      index <= currentStep ? step.activeImg : step.defaultImg
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
      </div>
    </>
  )
}
