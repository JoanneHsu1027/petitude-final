import React, { useState } from 'react'

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // 呼叫 API 來處理忘記密碼請求
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.json()
      if (result.success) {
        setMessage('請檢查您的電子郵件以重設密碼。')
        setError('')
      } else {
        setError('無法處理請求，請確認您的電子郵件地址。')
      }
    } catch (ex) {
      console.log(ex)
      setError('伺服器錯誤，請稍後再試。')
    }
  }

  return (
    <div className="p-4">
      <h2 className="mb-4">忘記密碼</h2>
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
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          送出重設連結
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
