// import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import AuthContext, {
  AuthContextProvider,
} from '@/contexts/member/auth-context'
import { CartProvider } from '@/contexts/estore/CartContext'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import('bootstrap/dist/js/bootstrap')
  }, [])

  return (
    <AuthContextProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthContextProvider>
  )
}
