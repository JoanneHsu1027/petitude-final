import Image from 'next/image'

export default function Navbar() {
  return (
    <>
      {/* 電腦版 nav */}
      <nav
        className="navbar navbar-expand-lg navbar-light d-md-none d-lg-block d-sm-none d-md-block d-none d-sm-block"
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse justify-content-center">
            <ul className="navbar-nav">
              <NavItem href="#">
                <Image
                  src="/pics/about-icon.png"
                  alt=""
                  width={100}
                  height={100}
                />
              </NavItem>
              <NavItem href="#">
                <Image
                  src="/pics/product-icon.png"
                  alt=""
                  width={100}
                  height={100}
                />
              </NavItem>
              <NavItem href="#">
                <Image
                  src="/pics/insurance-icon.png"
                  alt=""
                  width={100}
                  height={100}
                />
              </NavItem>
              <NavItem href="#">
                <Image
                  src="/pics/petitude-icon.png"
                  alt=""
                  width={100}
                  height={100}
                />
              </NavItem>
              <NavItem href="#">
                <Image
                  src="/pics/funeral-icon.png"
                  alt=""
                  width={100}
                  height={100}
                />
              </NavItem>
              <NavItem href="#">
                <Image
                  src="/pics/forum-icon.png"
                  alt=""
                  width={100}
                  height={100}
                />
              </NavItem>
              <NavItem href="#">
                <Image
                  src="/pics/member-icon.png"
                  alt=""
                  width={100}
                  height={100}
                />
              </NavItem>
            </ul>
          </div>
        </div>
      </nav>

      {/* 手機版 nav */}
      <nav className="navbar navbar-expand-lg navbar-light d-lg-none d-xl-block d-xl-none d-xxl-block d-xxl-none p-0">
        <div className="container-fluid">
          <a className="navbar-brand mx-auto" href="#">
            <Image
              src="/pics/petitude-mobile-icon.png"
              alt=""
              width={100}
              height={100}
            />
          </a>
          <button
            className="navbar-toggler p-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  關於我們
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  購物商城
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  寵物保險
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  生命禮儀
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  貓狗論壇
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  會員中心
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style jsx>{`
        body {
          background-image: url(./pet_img/bg-img.png);
        }
        .navbar-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px; /* 調整項目之間的間距 */
          list-style-type: none;
          padding: 0;
        }
        .navbar-nav .nav-item {
          padding: 0;
          display: flex;
          align-items: center;
        }
        .navbar-nav .nav-link {
          padding: 0;
          margin: 0;
          color: inherit;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </>
  )
}

// 自訂的 NavItem 組件，包裝 Image 和 a 標籤
function NavItem({ children, href }) {
  return (
    <li className="nav-item">
      <a className="nav-link" href={href}>
        {children}
      </a>
    </li>
  )
}
