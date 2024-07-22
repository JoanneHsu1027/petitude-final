import React from 'react'

const StarTwinkle = () => {
  return (
    <div className="sky">
      {Array.from({ length: 1 }).map((_, i) => (
        <img
          className="star"
          src="/funeral/shiba.png" // 替换为实际星星图片路径
          alt="star"
          style={{ '--i': i + 1, animationDelay: `${i * 0.5}s` }} // 设置不同的动画延迟
          key={i}
        />
      ))}
      <style jsx>{`
        .star-container {
          position: fixed; /* 固定在视口 */
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none; /* 不影响其他元素的交互 */
          z-index: -1; /* 确保在其他内容后面 */
        }

        .sky {
          position: fixed; /* 固定在视口 */
          overflow: hidden;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: -1;
        }

        .star {
          position: absolute;
          width: 10rem;
          height: 10rem;
          border-radius: 50%;
          animation:
            twinkle 8s infinite,
            moveVertical 8s infinite;
          top: calc(100% * var(--i) / 10); /* 初始垂直位置 */
          z-index: -1;
          object-fit: contain; /* 确保图片保持比例 */
          transform: rotate(-20deg);
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 1; /* 起始和结束时的透明度 */
          }
          50% {
            opacity: 1; /* 中间状态的透明度 */
          }
        }

        @keyframes moveVertical {
          0% {
            top: 10;
          }
          50% {
            top: 100%; /* 向下移动到视口底部 */
          }
          100% {
            top: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default StarTwinkle
