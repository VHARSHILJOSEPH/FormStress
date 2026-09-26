import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface StaggeredFadeProps {
  text: string
  className?: string
}

export default function StaggeredFade({ text, className = '' }: StaggeredFadeProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true })

  const characters = text.split('')

  return (
    <h2 ref={ref} className={`inline-block ${className}`}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: 0.4,
            delay: i * 0.07,
            ease: 'easeOut',
          }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </h2>
  )
}
