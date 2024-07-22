import { createContext, useContext, useEffect, useState } from 'react'
import { JWT_LOGIN_POST } from '@/configs/api-path'

const AuthContext = createContext()
const storageKey = 'petmember-auth'

// 定義初始空狀態
const emptyAuth = {
  b2c_id: '',
  b2c_email: '',
  b2c_name: '',
  token: '',
}

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(emptyAuth)

  const login = async (b2c_email, b2c_password) => {
    try {
      const response = await fetch(JWT_LOGIN_POST, {
        method: 'POST',
        body: JSON.stringify({ b2c_email, b2c_password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.json()
      if (result.success) {
        // 儲存 token 和用戶的相關資料到 localStorage
        localStorage.setItem(storageKey, JSON.stringify(result.data))
        // 更新狀態
        setAuth(result.data)
      }
      return result.success
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem(storageKey)
    setAuth(emptyAuth)
    console.log('Logged out and localStorage cleared')
  }

  const getAuthHeader = () => {
    if (auth.token) {
      return {
        Authorization: `Bearer ${auth.token}`,
      }
    }
    return {}
  }

  const updateUser = (updatedUser) => {
    const updatedAuth = { ...auth, ...updatedUser }
    setAuth(updatedAuth)
    localStorage.setItem(storageKey, JSON.stringify(updatedAuth))
  }

  // 當用戶重刷頁面時，從 localStorage 載入狀態
  useEffect(() => {
    const str = localStorage.getItem(storageKey)
    if (str) {
      try {
        const data = JSON.parse(str)
        if (data?.b2c_id && data?.token) {
          setAuth(data)
        }
      } catch (error) {
        console.error('Failed to parse auth data:', error)
      }
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ login, logout, auth, getAuthHeader, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthContext
