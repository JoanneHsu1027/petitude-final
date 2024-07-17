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
      <div
        className="container-fluid d-flex justify-content-center"
        style={{ padding: '0', margin: '0' }}
      >
        <div className="row">
          <div className="col-12  d-flex justify-content-center">
            {/* left */}
            <div className="col-md-3 leftSection justify-content-center ms-5 p-0 mt-5">
              <div>
                <img
                  className="indexIcon ms-3 mt-3"
                  src="/funeral/title.png"
                  alt=""
                  style={{
                    width: '80%',
                  }}
                />
              </div>
              <div>
                <img
                  className="img1"
                  src="/funeral/1.jpg"
                  alt=""
                  style={{
                    width: '90%',
                    borderRadius: '20px',
                    marginTop: '2rem',
                  }}
                />
              </div>
            </div>
            {/* left */}
            {/* middle */}
            <div className="col-md-3 middleSection p-0 m-0">
              <img
                className="img1 mt-5"
                src="/funeral/3.jpg"
                alt=""
                style={{
                  width: '90%',
                  height: '80%',
                  borderRadius: '30px 0 30px 0',
                  overflow: 'hidden',
                  position: 'relative',
                  zIndex: 3,
                }}
              />
            </div>
            {/* middle */}
            {/* right */}
            <div
              className="col-md-6 rightSection"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div className="textSection pe-5">
                <div>
                  <h3>生命禮儀</h3>
                  <p>
                    我們提供各項寵物禮儀服務客製化每位毛小孩的旅程，全程協助陪伴每位家屬，學習悲傷，轉悲為喜。你會發現，毛小孩教會我們的至始至終都是愛
                  </p>
                  <img
                    src="/funeral/Line 25.png"
                    alt="Description of the image"
                    width={5}
                    height={30}
                    style={{ marginBottom: '10px' }}
                  />
                  <p>
                    是你讓我了解生命的美好，讓我懂得如何去愛去珍惜，
                    放心，我會遵守約定，帶你住進美麗的森林裡，這是我的責任，也是我對你永遠守護的承諾！
                  </p>
                </div>

                <div
                  className="btnSec"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                >
                  <button
                    onClick={handleRouter}
                    className="btn btn-warning mt-4"
                  >
                    進入頁面
                  </button>
                </div>
              </div>
              {/*按鈕 */}
            </div>
            {/* right */}
          </div>
        </div>
      </div>
    </>
  )
}
