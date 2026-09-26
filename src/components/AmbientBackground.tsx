import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const shapes = [
  { size: 340, color: 'rgba(99,102,241,0.07)', blur: 80, x: '72%', y: '25%', duration: 28 },
  { size: 220, color: 'rgba(139,92,246,0.06)', blur: 60, x: '80%', y: '55%', duration: 34 },
  { size: 160, color: 'rgba(59,130,246,0.05)', blur: 50, x: '65%', y: '70%', duration: 22 },
  { size: 280, color: 'rgba(99,102,241,0.04)', blur: 70, x: '85%', y: '15%', duration: 40 },
  { size: 120, color: 'rgba(168,85,247,0.06)', blur: 40, x: '60%', y: '40%', duration: 26 },
  { size: 90,  color: 'rgba(99,102,241,0.08)', blur: 30, x: '75%', y: '80%', duration: 32 },
]

const ring = {
  size: 260,
  x: '74%',
  y: '42%',
}

export default function AmbientBackground() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 20, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 20, damping: 30 })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const handleMouse = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 20
      const cy = (e.clientY / window.innerHeight - 0.5) * 20
      mouseX.set(cx)
      mouseY.set(cy)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [reducedMotion, mouseX, mouseY])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden"
      style={{ zIndex: 1, pointerEvents: 'none', userSelect: 'none' }}
    >
      <motion.div style={{ x: springX, y: springY }} className="w-full h-full relative">
        {/* Floating orbs */}
        {shapes.map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full ambient-shape"
            style={{
              width: s.size,
              height: s.size,
              left: s.x,
              top: s.y,
              background: s.color,
              filter: `blur(${s.blur}px)`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={
              reducedMotion
                ? {}
                : {
                    y: [0, -15, 0, 12, 0],
                    x: [0, 8, 0, -8, 0],
                    scale: [1, 1.05, 1, 0.97, 1],
                  }
            }
            transition={{
              duration: s.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Ring shape */}
        <motion.div
          className="absolute ambient-shape"
          style={{
            width: ring.size,
            height: ring.size,
            left: ring.x,
            top: ring.y,
            transform: 'translate(-50%, -50%)',
            border: '1.5px solid rgba(99,102,241,0.12)',
            borderRadius: '50%',
          }}
          animate={
            reducedMotion
              ? {}
              : {
                  rotate: [0, 360],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{
            rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
            scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
          }}
        />

        {/* Second ring */}
        <motion.div
          className="absolute ambient-shape"
          style={{
            width: ring.size * 0.65,
            height: ring.size * 0.65,
            left: '78%',
            top: '38%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(139,92,246,0.08)',
            borderRadius: '50%',
          }}
          animate={
            reducedMotion
              ? {}
              : { rotate: [360, 0] }
          }
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        />

        {/* Dot cluster */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute rounded-full ambient-shape"
            style={{
              width: 3 + i * 1.5,
              height: 3 + i * 1.5,
              left: `${68 + i * 4}%`,
              top: `${30 + i * 8}%`,
              background: 'rgba(99,102,241,0.2)',
            }}
            animate={
              reducedMotion
                ? {}
                : {
                    opacity: [0.2, 0.6, 0.2],
                    y: [0, -6, 0],
                  }
            }
            transition={{
              duration: 4 + i * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.8,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
