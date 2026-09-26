import { motion } from 'framer-motion'
import { Sun, CloudSun, Moon } from 'lucide-react'

interface TimeSlotPickerProps {
  value: string
  onChange: (val: string) => void
  hasError?: boolean
}

const UNAVAILABLE = new Set(['10:30 AM', '02:00 PM', '02:30 PM', '06:30 PM'])

const groups = [
  {
    label: 'Morning',
    icon: Sun,
    slots: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
  },
  {
    label: 'Afternoon',
    icon: CloudSun,
    slots: [
      '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
      '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    ],
  },
  {
    label: 'Evening',
    icon: Moon,
    slots: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'],
  },
]

export default function TimeSlotPicker({ value, onChange, hasError }: TimeSlotPickerProps) {
  return (
    <div>
      <label className="form-label">Preferred Time *</label>
      <p className="text-xs text-slate-300 mb-4 font-medium">
        Select an available time slot for your consultation.
      </p>

      <div
        className="rounded-2xl p-5 space-y-5"
        style={{
          background: 'rgba(15, 18, 30, 0.75)',
          border: hasError
            ? '1px solid #f87171'
            : '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        {groups.map((group) => {
          const Icon = group.icon
          return (
            <div key={group.label}>
              <div className="flex items-center gap-2 mb-3">
                <Icon size={14} className="text-indigo-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {group.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {group.slots.map((slot) => {
                  const disabled = UNAVAILABLE.has(slot)
                  const selected = value === slot
                  return (
                    <motion.button
                      key={slot}
                      type="button"
                      disabled={disabled}
                      onClick={() => !disabled && onChange(slot)}
                      whileHover={!disabled ? { scale: 1.04 } : {}}
                      whileTap={!disabled ? { scale: 0.97 } : {}}
                      className="relative text-sm font-semibold rounded-xl px-4 py-2.5 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
                      style={{
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        opacity: disabled ? 0.35 : 1,
                        background: selected
                          ? 'rgba(99, 102, 241, 0.25)'
                          : 'rgba(255, 255, 255, 0.05)',
                        border: selected
                          ? '1px solid #818cf8'
                          : '1px solid rgba(255, 255, 255, 0.12)',
                        color: selected
                          ? '#ffffff'
                          : disabled
                          ? '#64748b'
                          : '#cbd5e1',
                        boxShadow: selected
                          ? '0 0 20px rgba(99, 102, 241, 0.35)'
                          : 'none',
                      }}
                    >
                      {slot}
                    </motion.button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
