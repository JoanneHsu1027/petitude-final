import React from 'react'
import Image from 'next/image'

export default function ImageComponent({
  src,
  alt,
  width,
  height,
  style,
  className,
}) {
  return (
    <div style={style} className={className}>
      {/* 定義個名為ImageComponent的元件，接收src、alt、width和height作為props */}
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  )
}
