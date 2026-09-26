import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, ChevronDown, Plus, X } from 'lucide-react'

interface GuardianData {
  relationship: string
  name: string
  phone: string
  email: string
  contactMethod: string
}

interface EmergencyData {
  name: string
  phone: string
  relationship: string
}

interface GuardianSectionProps {
  guardian: GuardianData
  emergency: EmergencyData
  showEmergency: boolean
  onGuardianChange: (g: GuardianData) => void
  onEmergencyChange: (e: EmergencyData) => void
  onToggleEmergency: (show: boolean) => void
}

const relationships = ['Parent', 'Guardian', 'Partner', 'Spouse', 'Other', 'None']
const contactMethods = ['Phone', 'SMS', 'WhatsApp', 'Email']

const revealVariants = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: { opacity: 1, height: 'auto', marginTop: 20 },
  exit: { opacity: 0, height: 0, marginTop: 0 },
}

export default function GuardianSection({
  guardian,
  emergency,
  showEmergency,
  onGuardianChange,
  onEmergencyChange,
  onToggleEmergency,
}: GuardianSectionProps) {
  const [relOpen, setRelOpen] = useState(false)

  const update = (field: keyof GuardianData, val: string) => {
    onGuardianChange({ ...guardian, [field]: val })
  }

  const updateEmergency = (field: keyof EmergencyData, val: string) => {
    onEmergencyChange({ ...emergency, [field]: val })
  }

  const showFields = guardian.relationship !== '' && guardian.relationship !== 'None'

  return (
    <div>
      {/* Relationship selector */}
      <label className="form-label">Who should we associate with your registration?</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setRelOpen(!relOpen)}
          className="form-input flex items-center justify-between w-full text-left"
          style={{ cursor: 'pointer' }}
        >
          <span style={{ color: guardian.relationship ? '#e2e8f0' : '#64748b' }}>
            {guardian.relationship || 'Select relationship'}
          </span>
          <ChevronDown
            size={16}
            className="text-text-muted transition-transform"
            style={{ transform: relOpen ? 'rotate(180deg)' : 'rotate(0)' }}
          />
        </button>
        <AnimatePresence>
          {relOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden"
              style={{
                background: '#1a1d2a',
                border: '1px solid var(--color-border)',
                zIndex: 50,
                boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
              }}
            >
              {relationships.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    update('relationship', r)
                    setRelOpen(false)
                  }}
                  className="w-full px-4 py-3 text-left text-sm transition-colors hover:bg-white/5"
                  style={{
                    color: guardian.relationship === r ? '#a5b4fc' : '#cbd5e1',
                    background: guardian.relationship === r ? 'rgba(99,102,241,0.08)' : 'transparent',
                  }}
                >
                  {r}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Conditional guardian fields */}
      <AnimatePresence>
        {showFields && (
          <motion.div
            variants={revealVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter full name"
                  value={guardian.name}
                  onChange={(e) => update('name', e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Relationship</label>
                <input
                  type="text"
                  className="form-input"
                  value={guardian.relationship}
                  readOnly
                  style={{ opacity: 0.7, cursor: 'default' }}
                />
              </div>
              <div>
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter phone number"
                  value={guardian.phone}
                  onChange={(e) => update('phone', e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter email"
                  value={guardian.email}
                  onChange={(e) => update('email', e.target.value)}
                />
              </div>
            </div>

            {/* Contact method */}
            <div className="mt-4">
              <label className="form-label">Preferred Contact Method</label>
              <div className="flex flex-wrap gap-2">
                {contactMethods.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => update('contactMethod', m)}
                    className="px-4 py-2 text-sm rounded-lg font-medium transition-all"
                    style={{
                      background:
                        guardian.contactMethod === m
                          ? 'rgba(99,102,241,0.15)'
                          : 'rgba(255,255,255,0.03)',
                      border:
                        guardian.contactMethod === m
                          ? '1px solid rgba(99,102,241,0.4)'
                          : '1px solid var(--color-border)',
                      color: guardian.contactMethod === m ? '#a5b4fc' : '#94a3b8',
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emergency contact toggle */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => onToggleEmergency(!showEmergency)}
          className="flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: showEmergency ? '#a5b4fc' : '#94a3b8' }}
        >
          {showEmergency ? <X size={15} /> : <Plus size={15} />}
          {showEmergency ? 'Remove emergency contact' : 'Add emergency contact'}
        </button>

        <AnimatePresence>
          {showEmergency && (
            <motion.div
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div
                className="rounded-2xl p-5 mt-4"
                style={{
                  background: 'rgba(15,17,25,0.5)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Users size={14} className="text-accent-light" />
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Emergency Contact
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="form-label">Contact Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Full name"
                      value={emergency.name}
                      onChange={(e) => updateEmergency('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Phone number"
                      value={emergency.phone}
                      onChange={(e) => updateEmergency('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Relationship</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Sibling, Friend"
                      value={emergency.relationship}
                      onChange={(e) => updateEmergency('relationship', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
