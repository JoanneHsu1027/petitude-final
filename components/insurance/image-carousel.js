import React from 'react'
import styled, { keyframes } from 'styled-components'

const slideAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`

const CarouselContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100px;
`

const ImageStrip = styled.div`
  display: flex;
  animation: ${slideAnimation} 13s linear infinite;
`

const ImageWrapper = styled.div`
  width: 10%;
  height: 100%;
  flex-shrink: 0;
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

  return (
    <CarouselContainer>
      <ImageStrip>
        {[...Array(20)].map((_, index) => (
          <ImageWrapper key={index}>
            <StyledImage
              loading="lazy"
              src={images[index % 2].src}
              alt=""
              rotate={images[index % 2].rotate}
            />
          </ImageWrapper>
        ))}
        {[...Array(20)].map((_, index) => (
          <ImageWrapper key={index + 20}>
            <StyledImage
              loading="lazy"
              src={images[index % 2].src}
              alt=""
              rotate={images[index % 2].rotate}
            />
          </ImageWrapper>
        ))}
      </ImageStrip>
    </CarouselContainer>
  )
}

export default ImageCarousel
