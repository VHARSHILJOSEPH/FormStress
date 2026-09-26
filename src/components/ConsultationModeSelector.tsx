import { motion } from 'framer-motion'
import { Building2, Video, Phone } from 'lucide-react'

interface ConsultationModeSelectorProps {
  value: string
  onChange: (val: string) => void
  hasError?: boolean
}

const modes = [
  {
    id: 'in-person',
    label: 'In Person',
    desc: 'Visit the clinic',
    icon: Building2,
  },
  {
    id: 'video',
    label: 'Video Consultation',
    desc: 'Face-to-face online',
    icon: Video,
  },
  {
    id: 'audio',
    label: 'Audio Consultation',
    desc: 'Phone / voice call',
    icon: Phone,
  },
]

export default function ConsultationModeSelector({
  value,
  onChange,
  hasError,
}: ConsultationModeSelectorProps) {
  return (
    <div>
      <label className="form-label">Consultation Mode *</label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {modes.map((mode) => {
          const selected = value === mode.id
          const Icon = mode.icon
          return (
            <motion.button
              key={mode.id}
              type="button"
              onClick={() => onChange(mode.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex flex-col items-center gap-2 p-5 rounded-2xl text-center outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-indigo-400/50"
              style={{
                cursor: 'pointer',
                background: selected
                  ? 'rgba(99, 102, 241, 0.2)'
                  : 'rgba(255, 255, 255, 0.04)',
                border: selected
                  ? '1px solid #818cf8'
                  : hasError
                  ? '1px solid #f87171'
                  : '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: selected
                  ? '0 0 24px rgba(99, 102, 241, 0.3)'
                  : 'none',
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-1"
                style={{
                  background: selected
                    ? 'rgba(99, 102, 241, 0.3)'
                    : 'rgba(255, 255, 255, 0.06)',
                }}
              >
                <Icon
                  size={22}
                  style={{
                    color: selected ? '#ffffff' : '#94a3b8',
                  }}
                />
              </div>
              <span
                className="text-sm font-bold"
                style={{ color: selected ? '#ffffff' : '#e2e8f0' }}
              >
                {mode.label}
              </span>
              <span className="text-xs text-slate-300 font-medium">{mode.desc}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
