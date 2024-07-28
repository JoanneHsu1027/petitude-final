import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRouter } from 'next/router'
import MemorialPage from '@/components/funeral/cloud'

export default function HomePage() {
  const router = useRouter()
  const handleRouter = () => {
    router.push('/funeral')
  }

  return (
    <>
      <MemorialPage />
      <div className="container-fluid d-flex justify-content-center p-0 mb-5">
        <div className="row justify-content-center w-100">
          <div className="col-12 d-flex flex-column flex-md-row justify-content-center">
            {/* left */}
            <div className="left col-12 col-md-3 d-flex flex-column align-items-center p-0">
              <div className="w-100 text-center">
                <img
                  className="indexIcon img-fluid ms-3 mt-3"
                  src="/funeral/title.png"
                  alt=""
                  style={{ maxWidth: '80%' }}
                />
              </div>
              <div className="w-100 text-center">
                <img
                  className="img1 img-fluid"
                  src="/funeral/1.jpg"
                  alt=""
                  style={{
                    maxWidth: '90%',
                    borderRadius: '20px',
                  }}
                />
              </div>
            </div>
            {/* middle */}
            <div className="col-12 col-md-3 d-flex justify-content-center align-items-center p-0 m-0 mt-md-0">
              <img
                className="img2 img-fluid"
                src="/funeral/16.jpg"
                alt=""
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '30px 0 30px 0',
                  overflow: 'hidden',
                  position: 'relative',
                  zIndex: 3,
                }}
              />
            </div>
            {/* right */}
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
              <div className="textSection pe-md-5 mt-0">
                <div>
                  <h3>生命禮儀</h3>
                  <p>
                    我們提供各項寵物禮儀服務客製化每位毛小孩的旅程，全程協助陪伴每位家屬，學習悲傷，轉悲為喜。你會發現，毛小孩教會我們的至始至終都是愛
                  </p>
                  <img
                    className="line"
                    src="/funeral/Line 25.png"
                    alt=""
                    width={5}
                    height={30}
                  />
                  <p>
                    是你讓我了解生命的美好，讓我懂得如何去愛去珍惜，
                    放心，我會遵守約定，帶你住進美麗的森林裡，這是我的責任，也是我對你永遠守護的承諾！
                  </p>
                </div>
                <div className="btnSec d-flex justify-content-center">
                  <button
                    onClick={handleRouter}
                    className="btn btn-warning mt-4"
                  >
                    進入頁面
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .left {
          margin-top: 4rem;
        }
        .indexIcon {
          width: 80%;
          margin-bottom: -3rem;
        }
        .responsiveImg {
          width: 80%;
          border-radius: 20px;
          margin-top: 2rem;
        }

        .img1 {
          width: 100%;
          border-radius: 20px;
          margin-top: 4rem;
        }
        .img2 {
          width: 90%;
        }
        .line {
          margin-bottom: 1rem;
        }
        .textSection {
          padding: 2rem 2rem;
          margin-top: 10%;
        }
        .btn:hover {
          background-color: #6a513d;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .left {
            margin-top: 1rem;
          }
          .indexIcon {
            width: 60%;
            margin-bottom: 2rem;
            margin-top: -5rem;
          }
          .img1 {
            width: 55%;
            margin-top: 0;
          }
          .img2 {
            width: 55%;
            margin-top: 1rem;
          }
          .line {
            transform: rotate(90deg);
          }
          .leftSection {
            display: flex;
            justify-content: space-between;
          }

          .leftSection img {
            max-width: 80%;
          }
          .textSection {
            text-align: center;
            margin: '8% 0';
            padding: 1rem 2rem;
          }
          .btn:hover {
            background-color: #6a513d;
            color: #ffffff;
          }
        }
      `}</style>
    </>
  )
}
