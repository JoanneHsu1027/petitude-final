import { createContext, useContext, useEffect, useState } from 'react'
import { JWT_LOGIN_POST } from '@/configs/api-path'
import { auth, provider } from '@/path/to/firebaseConfig' // 引入 Firebase 配置
import { signInWithPopup } from 'firebase/auth'

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
  const [authState, setAuthState] = useState(emptyAuth)

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
        setAuthState(result.data)
      }
      return result.success
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const idToken = await user.getIdToken()

      // 將 ID Token 發送到後端
      const response = await fetch('/api/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      })

      const data = await response.json()

      if (data.success) {
        // 更新 AuthContext 的狀態
        const userData = {
          b2c_id: data.b2c_id,
          b2c_email: data.b2c_email,
          b2c_name: data.b2c_name,
          token: idToken,
        }
        // 保留現有的用戶信息
        setAuthState((prevState) => ({ ...prevState, ...userData }))
        localStorage.setItem(
          storageKey,
          JSON.stringify({ ...authState, ...userData }),
        )
      } else {
        console.error(data.error)
      }
    } catch (error) {
      console.error('Error during Google login:', error)
    }
  }

  const logout = () => {
    localStorage.removeItem(storageKey)
    setAuthState(emptyAuth)
    console.log('Logged out and localStorage cleared')
  }

  const getAuthHeader = () => {
    if (authState.token) {
      return {
        Authorization: `Bearer ${authState.token}`,
      }
    }
    return {}
  }

  const updateUser = (updatedUser) => {
    const updatedAuth = { ...authState, ...updatedUser }
    setAuthState(updatedAuth)
    localStorage.setItem(storageKey, JSON.stringify(updatedAuth))
  }

  // 當用戶重刷頁面時，從 localStorage 載入狀態
  useEffect(() => {
    const str = localStorage.getItem(storageKey)
    if (str) {
      try {
        const data = JSON.parse(str)
        if (data?.b2c_id && data?.token) {
          setAuthState(data)
        }
      } catch (error) {
        console.error('Failed to parse auth data:', error)
      }
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        login,
        loginWithGoogle,
        logout,
        auth: authState,
        getAuthHeader,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthContext
