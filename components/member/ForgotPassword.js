import React, { useState } from 'react'
import {
  MEMBER_FORGETPASSWORD_POST,
  VERIFY_RESET_CODE_POST,
  RESET_PASSWORD_POST,
} from '@/configs/api-path'

const ForgotPasswordForm = ({ onClose }) => {
  const [email, setEmail] = useState('')
  const [resetCode, setResetCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [step, setStep] = useState('request') // 'request' 或 'verify' 或 'reset'
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // 處理請求 OTP
  const handleRequestOTP = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(MEMBER_FORGETPASSWORD_POST, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.json()
      if (result.success) {
        setMessage('驗證碼已發送到您的郵箱')
        setError('')
        setStep('verify')
      } else {
        setError(result.error || '請求失敗')
        setMessage('')
      }
    } catch (error) {
      setError('請求失敗')
      setMessage('')
    }
  }

  // 處理驗證 OTP
  const handleVerifyCode = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(VERIFY_RESET_CODE_POST, {
        method: 'POST',
        body: JSON.stringify({ code: resetCode }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.json()
      if (result.success) {
        setMessage('驗證碼驗證成功，請設置新密碼')
        setError('')
        setStep('reset')
      } else {
        setError(result.error || '驗證碼驗證失敗')
        setMessage('')
      }
    } catch (error) {
      setError('驗證碼驗證失敗')
      setMessage('')
    }
  }

  // 處理密碼重設
  const handleResetPassword = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(RESET_PASSWORD_POST, {
        method: 'POST',
        body: JSON.stringify({ resetCode, newPassword }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.json()
      if (result.success) {
        setMessage('密碼已成功重設')
        setError('')
        onClose()
      } else {
        setError(result.error || '重設密碼失敗')
        setMessage('')
      }
    } catch (error) {
      setError('重設密碼失敗')
      setMessage('')
    }
  }

  return (
    <div className="p-4">
      <h2 className="mb-4">
        {step === 'request'
          ? '忘記密碼'
          : step === 'verify'
            ? '驗證驗證碼'
            : '重設密碼'}
      </h2>
      {step === 'request' && (
        <form onSubmit={handleRequestOTP}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              電子郵件:
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
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary">
            發送驗證碼
          </button>
        </form>
      )}
      {step === 'verify' && (
        <form onSubmit={handleVerifyCode}>
          <div className="mb-3">
            <label htmlFor="resetCode" className="form-label">
              驗證碼:
            </label>
            <input
              id="resetCode"
              type="text"
              className="form-control"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
            />
          </div>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary">
            驗證驗證碼
          </button>
        </form>
      )}
      {step === 'reset' && (
        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              新密碼:
            </label>
            <input
              id="newPassword"
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary">
            重設密碼
          </button>
        </form>
      )}
    </div>
  )
}

export default ForgotPasswordForm
