import { useRef } from 'react'
import VideoBackground from './components/VideoBackground'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import RegistrationForm from './components/RegistrationForm'

export default function App() {
  const registrationRef = useRef<HTMLDivElement>(null)

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen bg-[#010101] text-white overflow-x-hidden">
      {/* ── Fixed Persistent Video Background (The 3D Visual Asset) ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <VideoBackground />
      </div>

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Hero Section (Synthetic Nature) ── */}
      <HeroSection onBegin={scrollToRegistration} />

      {/* ── Registration Section (Scrolling over static background) ── */}
      <section
        ref={registrationRef}
        id="registration"
        className="relative z-10 mx-auto px-5 sm:px-8 py-16 sm:py-24"
        style={{ maxWidth: 840 }}
      >
        <div className="glass-card px-7 sm:px-12 py-10 sm:py-14 relative z-10">
          <RegistrationForm />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/50 mt-12 pb-6 tracking-wider">
          Organic Visions · NeuroVR Patient Portal
        </p>
      </section>
    </div>
  )
}
