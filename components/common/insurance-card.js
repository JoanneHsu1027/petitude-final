import React from 'react'
import styles from '@/components/insurance/insurance.module.css'
import Link from 'next/link'

export default function InsuranceCard({ cardStyle, imageSrc, title, text }) {
  return (
    <>
      <div className={cardStyle}>
        <Link
          href="/insurance"
          className="text-decoration-none d-flex justify-content-center"
        >
          <div
            className="card"
            style={{
              width: '80%',
              border: '4px solid #6A513D',
              borderRadius: '20px',
            }}
          >
            <img
              src={imageSrc}
              className="card-img-top"
              style={{
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                objectFit: 'cover',
              }}
              alt="..."
            />
            <div className="card-body">
              <h5 className={`card-title ${styles['own-orange']}`}>{title}</h5>
              <p className={`card-text ${styles['text-color']}`}>{text}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
