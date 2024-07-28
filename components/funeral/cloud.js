import React from 'react'
import { useSpring, animated } from 'react-spring'

const Cloud = ({ style }) => {
  const props = useSpring({
    loop: true,
    to: async (next) => {
      while (true) {
        await next({ x: 950, y: 10 })
        await next({ x: 1000, y: -10 })
        await next({ x: 1050, y: 10 })
        await next({ x: 1100, y: -10 })
        await next({ x: 1150, y: 10 })
        await next({ x: 1200, y: -10 })
        await next({ x: 1250, y: 10 })
        await next({ x: 1300, y: -10 })
        await next({ x: 1350, y: 10 })
        await next({ x: 1400, y: -10 })
        await next({ x: 1450, y: 10 })
        await next({ x: 1500, y: -10 })
        await next({ x: 1550, y: 10 })
        await next({ x: 1600, y: -10 })
        await next({ x: 1650, y: 10 })
        await next({ x: 1650, y: -10 })
        await next({ x: 1600, y: 10 })
        await next({ x: 1550, y: -10 })
        await next({ x: 1500, y: 10 })
        await next({ x: 1450, y: -10 })
        await next({ x: 1400, y: 10 })
        await next({ x: 1350, y: -10 })
        await next({ x: 1300, y: 10 })
        await next({ x: 1250, y: -10 })
        await next({ x: 1200, y: 10 })
        await next({ x: 1150, y: -10 })
        await next({ x: 1100, y: 10 })
        await next({ x: 1050, y: -10 })
        await next({ x: 1000, y: 10 })
        await next({ x: 950, y: -10 })
      }
    },
    from: { x: 950, y: 0 },
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
        height: '40%',
        backgroundColor: 'transparent',
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
