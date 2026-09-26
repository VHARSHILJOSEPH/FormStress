import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = ['Wander', 'Archive', 'Story', 'Connect']

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 sm:py-8 flex items-center justify-between">
      {/* Brand */}
      <a
        href="#"
        className="text-white uppercase font-light text-sm sm:text-base tracking-[0.3em] hover:opacity-80 transition-opacity"
      >
        ORGANIC VISIONS
      </a>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-xs uppercase tracking-[0.2em] text-white/80 font-light hover:text-white transition-colors duration-300"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Mobile Hamburger Toggle */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-white/90 p-2 focus:outline-none"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Glass Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-16 left-4 right-4 z-50 md:hidden mobile-menu-glass rounded-2xl py-8 flex flex-col items-center gap-5"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.05 + index * 0.06,
                  ease: 'easeOut',
                }}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.25em] text-white/90 font-light hover:text-white transition-colors"
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
