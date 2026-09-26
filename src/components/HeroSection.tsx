import { motion } from 'framer-motion'
import StaggeredFade from './StaggeredFade'

interface HeroSectionProps {
  onBegin?: () => void
}

export default function HeroSection({ onBegin }: HeroSectionProps) {
  return (
    <section className="relative z-10 flex flex-col items-center text-center px-5 sm:px-8 pt-12 sm:pt-16 md:pt-24 pb-16 max-w-5xl mx-auto">
      {/* Garamond Staggered Heading */}
      <h1 className="font-garamond text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-normal text-white leading-[1.08] tracking-tight mb-6 sm:mb-8 flex flex-col items-center">
        <StaggeredFade text="WITNESS THE" />
        <StaggeredFade text="HIDDEN REALM" />
      </h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6, ease: 'easeOut' }}
        className="text-white/70 font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-xs sm:max-w-md mb-8 sm:mb-10"
      >
        An odyssey through delicate living forms,
        <br className="hidden sm:inline" /> revealed by lens and curiosity.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        type="button"
        onClick={onBegin}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.0, ease: 'easeOut' }}
        className="liquid-glass rounded-full px-7 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm font-light text-white/90 uppercase tracking-[0.18em] sm:tracking-[0.2em] cursor-pointer"
      >
        Begin the Experience
      </motion.button>
    </section>
  )
}
