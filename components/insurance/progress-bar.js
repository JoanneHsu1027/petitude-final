import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './insurance.module.css'


export default function ProgressBar() {
    const [step, SetStep] = useState({
        title: "",
        pageName: ""
    })
 
  return (
    <>
       <div className="col-8" style={{padding:'0 50px'}}>        
        <div className="d-flex flex-row justify-content-center align-items-center">
          <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{width: '400px'}}>
            <img src="/pic/bread01.png" className="img-fluid" />
            <h5>寵物資料</h5>
          </div>
          <div className={styles['bread-bar']}></div>
          <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{width: '400px'}}>
            <img src="/pic/bread02-default.png" className="img-fluid" />
            <h5>保人資料</h5>
          </div>
          <div className={styles['bread-bar']}></div>
          <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{width: '400px'}}>
            <img src="/pic/bread03-default.png" className="img-fluid" />
            <h5>線上繳費</h5>
          </div>
          <div className={styles['bread-bar']}></div>
          <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{width: '400px'}}>
            <img src="/pic/bread04-default.png" className="img-fluid" />
            <h5>投保完成</h5>
          </div>
          </div>
       </div>
    </>
  )
}