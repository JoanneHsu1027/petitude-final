import { createContext, useContext, useEffect, useState } from 'react'
import { JWT_LOGIN_POST } from '../configs/api-path'

// 會員登入ContextProvider

const AuthContext = createContext()
// 保有狀態
// login
// logout
// getAuthHeader

// component

const storageKey = 'funeral-auth'

const emptyAuth = {
  b2c_id: 0,
  b2c_email: '',
  b2c_name: '',
  token: '',
}

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(emptyAuth)

  const login = async (b2c_email, b2c_password) => {
    try {
      const r = await fetch(JWT_LOGIN_POST, {
        method: 'POST',
        body: JSON.stringify({ b2c_email, b2c_password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await r.json()
      if (result.success) {
        // token 和用戶的相關資料存到 localStorage
        localStorage.setItem(storageKey, JSON.stringify(result.data))

        // **** 變更狀態
        setAuth(result.data)
      }

      return result.success
    } catch (ex) {
      console.log(ex)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem(storageKey)
    setAuth(emptyAuth)
  }

  const getAuthHeader = () => {
    if (auth.token) {
      return {
        Authorization: `Bearer ${auth.token}`,
      }
    } else {
      return {}
    }
  }

  // 用戶如果重刷頁面, 狀態可以由 localStorage 載入
  useEffect(() => {
    const str = localStorage.getItem(storageKey)
    if (!str) return
    try {
      const data = JSON.parse(str)
      if (data?.b2c_id && data?.token) {
        setAuth(data)
      }
    } catch (ex) {}
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, auth, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthContext
