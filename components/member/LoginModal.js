import React, { useState, useEffect } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const Modal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const switchToSignup = () => setIsLogin(false)
  const switchToLogin = () => setIsLogin(true)

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
              <button
                type="button"
                className={`btn btn-link ${isLogin ? 'active' : ''}`}
                onClick={switchToLogin}
                disabled={isLogin}
                style={{ textDecoration: 'none' }}
              >
                Login
              </button>

              <button
                type="button"
                className={`btn btn-link ${!isLogin ? 'active' : ''}`}
                onClick={switchToSignup}
                disabled={!isLogin}
                style={{ textDecoration: 'none' }}
              >
                Sign Up
              </button>
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {isLogin ? (
              <LoginForm onClose={onClose} />
            ) : (
              <SignupForm onClose={onClose} switchToLogin={switchToLogin} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
