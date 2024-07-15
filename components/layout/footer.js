import React from 'react'

export default function Footer() {
  return (
    <>
      <div className="container">
        <footer className="row row-cols-5 py-5 my-5 border-top">
          <div className="col">
            <a
              href="/"
              className="d-flex align-items-center mb-3 link-dark text-decoration-none"
            >
              {/* <svg className="bi me-2" width="40" height="32">
                <use xlink:href="#bootstrap"></use>
              </svg> */}
            </a>
            <p className="text-muted">
              © 2022 Petitude Company, Inc. All rights reserved.
            </p>
          </div>

          <div className="col"></div>

          <div className="col">
            <h5>會員專區</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  會員權益
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  隱私權政策
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Pricing
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  FAQs
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div className="col">
            <h5>購物須知</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  付款與配送方式
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  退換貨說明
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Pricing
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  FAQs
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div className="col">
            <h5>聯絡我們</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Facebook粉絲團
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Line官方粉絲團
                </a>
              </li>
              <li className="nav-item mb-2">客服專線: 02-12345678</li>
              <li className="nav-item mb-2">地址: 臺北市大安區信義路三段</li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  About
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
      {/* <div className="container-fluid">
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
      </div> */}
    </>
  )
}
