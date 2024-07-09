import React, { Children } from 'react'

export default function Button({ onClick, children, className, style }) {
  return (
    <button onClick={onClick} className={className} style={style}>
      {children}
    </button>
  )
}
