import React, { useState } from 'react'
import { useAuth } from '@/contexts/member/auth-context'
import ForgotPassword from './ForgotPassword'
import { auth, provider } from '@/path/to/firebaseConfig'
import { signInWithPopup } from 'firebase/auth'
import { API_SERVER } from '@/configs/api-path'

const LoginForm = ({ onClose, switchToSignup }) => {
  const { login, updateUser } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(email, password)
    if (success) {
      onClose() // 登入成功後關閉 Modal
    } else {
      setError('無效的電子郵件或密碼')
    }
  }

  const handleForgotPassword = () => {
    setShowForgotPassword(true)
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const idToken = await user.getIdToken()

      // 將 ID Token 發送到後端
      const response = await fetch(`${API_SERVER}/api/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      })

      const data = await response.json()

      if (data.success) {
        // 將用戶資料存入 localStorage，並更新 AuthContext 狀態
        const authData = {
          b2c_id: data.b2c_id,
          b2c_name: data.b2c_name,
          b2c_email: data.b2c_email,
          token: idToken, // 如果需要保存 token
        }
        localStorage.setItem('petmember-auth', JSON.stringify(authData))
        updateUser(authData) // 更新 AuthContext 的狀態
        console.log('用戶資料已存入 localStorage:', authData)
        onClose() // 登入成功後關閉 Modal
      } else {
        console.error(data.error)
      }
    } catch (error) {
      console.error('Error during Google login:', error)
    }
  }

  return (
    <div className="p-4">
      {showForgotPassword ? (
        <ForgotPassword onClose={onClose} />
      ) : (
        <>
          <h2 className="mb-4">登入</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                會員信箱:
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                會員密碼:
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary">
              登入
            </button>
            <button
              type="button"
              className="btn btn-link"
              onClick={handleForgotPassword}
            >
              忘記密碼
            </button>
            <button
              type="button"
              className="btn btn-link"
              onClick={handleGoogleLogin}
            >
              使用 Google 登入
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default LoginForm
