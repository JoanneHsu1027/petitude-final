# NEXT-MUSIC

## 開始順序

clone 專案

```sh
git clone https://github.com/JinChang0501/final.git
```

同時建立及切換分支

```sh
git switch -c 分支名稱
```

下載依賴

```sh
npm i
```

運行專案

```sh
npm run dev
```

## 資料夾解說 ( 由上而下 )

### assets

- 主要存放需要經過`Webpack`處理的靜態資源

- 不能通過`URL`直接訪問，需要通過`import`語句引入到組件中

```jsx
import exampleImage from '../assets/example.png'

function MyComponent() {
  return <img src={exampleImage} alt="Example" />
}
```

### components

- 如元件要套樣式在自己資料夾新增`.scss`檔，然後在元件裡面`import`，不要在`styles`裡面寫元件樣式

- 裡面已建好大家的資料夾，裡面已有`index.js`在裡面寫即可

- 如要新增資料夾裝檔案，在自己資料夾新建並以檔案名稱命名，裡面建`index.js`檔案

- `checkout`資料夾是結帳流程進度條，ex: '購物車', '運送', '付款', '明細'，元件寫在`blocks`資料夾裡，在`index.js`引入

- `layout`資料夾是共同使用版面
  - `admin-layout`是登入後版面
  - `default-layout`是共用版面 ex: navbar、footer
  - `landing-layout`是 head 及 title

### configs

- `next`連接`node`的`config`我把他註釋起來了，如果沒註釋要把`node`打開才可以打開`next`

### hooks

- 裡面已建好大家的資料夾，裡面已有`index.js`在裡面寫即可

- 如要新增資料夾裝檔案，在自己資料夾新建並以檔案名稱命名，裡面建`index.js`檔案

### pages

- 裡面已建好大家的資料夾，裡面已有`index.js`在裡面寫即可

- `_app.js`頂層`components`，導入`globals.scss`、`bootstrap`、`DefaultLayout`

- `_document.js`是`Next.js`框架中用來自定義`HTML`文檔結構的文件，它允許你覆寫默認的`HTML`文檔結構，添加或修改`HTML`和`body`標籤內的內容和屬性，這個文件中的內容會應用到每個頁面，因此你可以在這裡設定一些全局的設置和樣式，包含`html`、`head`、`body`、`main`、`script`標籤，如要在`html`、`body`增加類名或是在`head`新增`meta`標籤在這個檔案裡面新增

- `admin.js`登入的檔案??? JIN 在自己看老師檔案查一下 XD

- `dashboard.js`套用`AdminLayout`，取代原本的`DefaultLayout`

- `index.js`我們的主要網頁，在裡面導入所有東西

### public

- `images`裡面已建好大家的資料夾，照片放各自的資料夾，裡面有`.gitkeep`如果有放入照片後把他刪除即可

- `favicon.ico`到時候可以換成我們自己的 LOGO

### styles

- 裡面已建好大家的資料夾，裡面已建好大家的`.scss`在裡面寫即可

## 功能收錄

### 使用自定義`Layout`

- 引入自己的`Layout`，最下方加上引入自定義`Layout`

```jsx
import React from 'react'
import TicketLayout from '@/components/layout/ticket-layout'

export default function Ticket() {
  return <div></div>
}

Ticket.getLayout = function getLayout(page) {
  return <TicketLayout>{page}</TicketLayout>
}
```

### 新增頁面`title` ( 使用`Head`組件設置標題 )

- 即時渲染：瀏覽器在初次加載頁面時就能獲得正確的標題，這對於用戶體驗和`SEO`都有好處

- 可維護性：每個頁面獨立設置標題，代碼清晰，便於維護

- 統一管理：如果未來需要變更標題的格式或結構，只需修改`Head`組件中的設置，簡化了維護工作

```jsx
import Head from 'next/head'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404找不到頁面</title>
      </Head>
      <h1>404 - Page Not Found</h1>
    </>
  )
}
```

### `DefaultLayout`頂天立地

- `index.js`最外層`div`要`d-flex`、`flex-column`、`vh-100`，`container`外層的`main`可加上背景或是背景圖片

```jsx
import React from 'react'
import Head from 'next/head'
import Nav from './nav'
import Footer from './footer'

export default function DefaultLayout() {
  return (
    <>
      <div className="d-flex flex-column vh-100">
        <Nav />
        <main className="flex-shrink-0 bg-primary">
          <div className="container">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  )
}
```

- `footer.js`的`footer`要`mt-auto`

```jsx
import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className="footer mt-auto"></footer>
    </>
  )
}
```

### `content`固定在`nav`和`footer`之間的`Layout`

- 計算出`nav`和`footer`的高度，然後`calc(100vh - (navHeight+footerHeight))`，再將高度設定給`main`，並且下一層的`container`需加上`h-100`

- 在自己的頁面的每個需要固定在`nav`和`footer`之間的元素都需加上`h-100`

- 如有元素需在裡面可以往下滾動加上`overflow-x-hidden`、`overflow-y-auto`就可以

### `Image`填滿父元素

- 外層`div`需有寬高並且加上`position-relative`，`Image`加上`layout="fill"`

# `globals.scss`

- `@import '~bootstrap/scss/bootstrap';`這行上面放`bootstrap`的覆蓋樣式，下面放`bootstrap`的自訂樣式和`CSS`的自定樣式

- `bootstrap`自定義類名如下 :

### container

- music-container

### 字型

- chb-h1
- chb-h2
- chb-h3
- chb-h4
- chb-h5
- chb-h6
- chb-h7
- chb-p
- chb-p-14
- chb-p-12

- chr-h1
- chr-h2
- chr-h3
- chr-h4
- chr-h5
- chr-h6
- chr-h7
- chr-p
- chr-p-14
- chr-p-12

- eng-h1
- eng-h2
- eng-h3
- eng-h4
- eng-h5
- eng-h6
- eng-h7
- eng-p

### 顏色

- purple1
- purple2
- purple3
- black95
- black90
- black80
- black60
- black40
- black30
- black20
- A
- B
- C
- D
- E

## `bootstrap`的`scss`如何覆寫或自定義類名

### `@import '~bootstrap/scss/bootstrap';`這行上面覆寫 scss，下面自定義類名

- 覆寫`scss`

```scss
$card-border-radius: 0;
```

- 覆寫`color`，保留原始類名+自定義類名

```scss
$theme-colors: (
  'primary': #0d6efd,
  'secondary': #6c757d,
  'success': #198754,
  'info': #0dcaf0,
  'warning': #ffc107,
  'danger': #dc3545,
  'light': #f8f9fa,
  'dark': #212529,
  // 新增自定義顏色
  'purple1': #685beb,
);
```

- 覆寫`container`，中間的`container`是寫死的

```scss
$container-max-widths: (
  xs: 334px,
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1600px,
);
```

- 自定義`container`，可以根據你的螢幕大小自動扣左右`padding`

```scss
$container-padding-x-large: 160px;
$container-padding-x-small: 28px;

@mixin large-container($padding-x: $container-padding-x-large) {
  width: 100%;
  padding-right: $padding-x;
  padding-left: $padding-x;
  margin-right: auto;
  margin-left: auto;
}

@mixin small-container($padding-x: $container-padding-x-small) {
  width: 100%;
  padding-right: $padding-x;
  padding-left: $padding-x;
  margin-right: auto;
  margin-left: auto;
}

// 定義媒體查詢
@media (min-width: 1921px) {
  .music-container {
    @include large-container($container-padding-x-large);
  }
}

@media (max-width: 1920px) and (min-width: 391px) {
  .music-container {
    @include large-container($container-padding-x-large);
  }
}

@media (max-width: 390px) {
  .music-container {
    @include small-container($container-padding-x-small);
  }
}
```

# jsx style 寫法

## className ( 使用`bootstrap`類名 )

```jsx
export default function Index() {
  return (
    <>
      <div className={'eng-h1'}>HIIII</div>
    </>
  )
}
```

## module.scss ( 導入 module.scss )

```jsx
import styles from './test.module.scss'
export default function Index() {
  return (
    <>
      <div className={styles.myClass}>Styled with CSS Module</div>
      <div className={styles['my-table']}>Styled with CSS Module</div>
      <div className={`${styles.test} ${styles.spacing}`}>
        Styled with CSS Module
      </div>
      <div className={`${styles.test} ${styles.spacing} eng-h1 ps-5`}>
        HIIII
      </div>
    </>
  )
}
```

## style 內聯寫法 ( camelCase )

```jsx
export default function Footer() {
  return (
    <>
      <footer
        className="footer bg-purple2 py-3 text-center"
        style={{ marginTop: 'auto' }}
      ></footer>
    </>
  )
}
```

## style jsx

```jsx
export default function DefaultLayout({ title = 'Music', children }) {
  return (
    <div className="stickyfooter">
      <Head>
        <title>{title}</title>
      </Head>
      <Nav />
      <div className="container">
        <div>{children}</div>
      </div>
      <Footer />
      <style jsx>{`
        .stickyfooter {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
      `}</style>
    </div>
  )
}
```

## storage.scss

- 這是我存放我查找`scss`和`css`自定義語法的檔案不用管他
