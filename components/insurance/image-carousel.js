import React, { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

const slideAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`

const CarouselContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 60px;
`

const ImageStrip = styled.div`
  display: flex;
  width: 200%;
  height: 100%;
  animation: ${slideAnimation} 20s linear infinite;
`

const ImageWrapper = styled.div`
  flex: 0 0 5%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transform: ${(props) => (props.rotate ? 'rotate(-13deg)' : 'none')};
`

const ImageCarousel = () => {
  const images = [
    { src: '/pi-pic/Dog_Bone.png', rotate: true },
    { src: '/pi-pic/Fish_Bone.png', rotate: false },
  ]
  const stripRef = useRef(null)

  useEffect(() => {
    const strip = stripRef.current
    if (strip) {
      const resetAnimation = () => {
        strip.style.animation = 'none'
        strip.offsetHeight // 觸發重排
        strip.style.animation = null
      }

      window.addEventListener('resize', resetAnimation)
      return () => window.removeEventListener('resize', resetAnimation)
    }
  }, [])

  const renderImages = () => {
    return [...Array(20)].flatMap((_, index) =>
      images.map((img, imgIndex) => (
        <ImageWrapper key={`${index}-${imgIndex}`}>
          <StyledImage src={img.src} alt="" rotate={img.rotate} />
        </ImageWrapper>
      )),
    )
  }

  return (
    <CarouselContainer>
      <ImageStrip ref={stripRef}>{renderImages()}</ImageStrip>
    </CarouselContainer>
  )
}

export default ImageCarousel
