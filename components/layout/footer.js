import React from 'react'

export default function Footer() {
  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-between">
          <div className="col-sm-3 d-flex flex-column align-items-start mt-auto">
            <h6 className="m-0 fw-bolder">會員專區</h6>
            <a href="#">會員權益</a>
            <a href="#">隱私權政策</a>
          </div>
          <div className="col-sm-3 d-flex flex-column align-items-start mt-auto">
            <h6 className="m-0 fw-bolder">購物須知</h6>
            <a href="#">付款與配送方式</a>
            <a href="#">退換貨說明</a>
          </div>
          <div className="col-sm-3 d-flex flex-column align-items-start mt-auto">
            <h6 className="m-0 fw-bolder">關於我們</h6>
            <a href="#">品牌故事</a>
            <p className="m-0">統一編號: 12345678</p>
          </div>
          <div className="col-sm-3 d-flex flex-column align-items-start mt-auto">
            <h6 className="m-0 fw-bolder">聯絡我們</h6>
            <a href="#">Facebook粉絲團</a>
            <a href="#">Line官方粉絲團</a>
            <p className="m-0">客服專線: 02-12345678</p>
            <p className="m-0">地址: 臺北市大安區信義路三段</p>
          </div>
        </div>
      </div>
    </>
  )
}
