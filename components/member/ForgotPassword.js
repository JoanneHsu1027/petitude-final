import React, { useState } from 'react'
import { MEMBER_FORGETPASSWORD_POST } from '@/configs/api-path'
const ForgotPasswordForm = ({ onClose }) => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
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
        setMessage('OTP 已發送到您的信箱')
        setError('')
      } else {
        setError(result.error || '請求失敗')
        setMessage('')
      }
    } catch (error) {
      setError('請求失敗')
      setMessage('')
    }
  }

  return (
    <div className="p-4">
      <h2 className="mb-4">忘記密碼</h2>
      <form onSubmit={handleSubmit}>
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
          發送 OTP
        </button>
      </form>
    </div>
  )
}

export default ForgotPasswordForm
