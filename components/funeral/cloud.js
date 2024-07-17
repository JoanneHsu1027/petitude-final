import React from 'react'
import { useSpring, animated } from 'react-spring'

const Cloud = ({ style }) => {
  const props = useSpring({
    loop: true,
    to: async (next) => {
      while (true) {
        await next({ x: 650, y: 0 })
        await next({ x: 700, y: 30 })
        await next({ x: 750, y: 0 })
        await next({ x: 800, y: 30 })
        await next({ x: 850, y: 0 })
        await next({ x: 900, y: 0 })
        await next({ x: 950, y: 30 })
        await next({ x: 1000, y: 30 })
        await next({ x: 1050, y: 0 })
        await next({ x: 1100, y: 30 })
        await next({ x: 1050, y: 0 })
        await next({ x: 1000, y: 30 })
        await next({ x: 950, y: 0 })
        await next({ x: 900, y: 30 })
        await next({ x: 850, y: 0 })
        await next({ x: 800, y: 30 })
        await next({ x: 750, y: 0 })
        await next({ x: 700, y: 30 })
        await next({ x: 650, y: 0 })
      }
    },
    from: { x: 650, y: 0 },
    config: { duration: 1000 },
  })

  return (
    <animated.div className="cloud" style={{ ...props, ...style }}>
      <img src="/funeral/cloud.png" style={{ width: '10%' }} alt="Cloud" />
    </animated.div>
  )
}

const MemorialPage = () => {
  return (
    <div
      className="sky"
      style={{
        position: 'absolute',
        width: '100%',
        height: '100vh',
        baclgroundColor: 'transparent',
        overflow: 'hidden',
        zIndex: '1',
      }}
    >
      <div style={{ marginTop: '2%', marginLeft: '0%', width: '70%' }}>
        <Cloud />
      </div>
    </div>
  )
}

export default MemorialPage
