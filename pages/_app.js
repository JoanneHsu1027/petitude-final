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