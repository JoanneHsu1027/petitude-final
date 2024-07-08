<<<<<<< HEAD
// import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import('bootstrap/dist/js/bootstrap')
  }, [])

  return <Component {...pageProps} />
}
=======
import '@/styles/globals.css'
import { useEffect } from 'react';


export default function MyApp({ Component, pageProps }) {
  // 使用自訂在頁面層級的版面(layout)
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <Component {...pageProps} />
  )
}
>>>>>>> origin/Jeremy
