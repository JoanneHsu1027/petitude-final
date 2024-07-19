// components/member/LoginModal.js
import React, { useState } from 'react'

const LoginModal = ({ onClose, onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onLogin(credentials)
  }

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              登入
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                登入
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
