import { motion } from 'framer-motion'
import { CheckCircle2, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface SuccessCardProps {
  registrationId: string
  onReset: () => void
}

export default function SuccessCard({ registrationId, onReset }: SuccessCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(registrationId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-card p-10 text-center max-w-lg mx-auto"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
      >
        <CheckCircle2
          size={64}
          className="mx-auto mb-5"
          style={{ color: 'var(--color-success)' }}
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-2xl font-bold mb-2"
        style={{ color: 'var(--color-success)' }}
      >
        Registration Successful
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="text-sm text-text-secondary mb-6"
      >
        Your consultation has been scheduled. Please save your registration ID.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl mb-6"
        style={{
          background: 'rgba(15,17,25,0.7)',
          border: '1px solid var(--color-border)',
        }}
      >
        <span
          className="text-xl font-extrabold tracking-widest"
          style={{ fontFamily: "'Inter', monospace" }}
        >
          {registrationId}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="p-2 rounded-lg transition-colors hover:bg-white/5"
          title="Copy ID"
        >
          {copied ? (
            <Check size={16} style={{ color: 'var(--color-success)' }} />
          ) : (
            <Copy size={16} className="text-text-muted" />
          )}
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        <p className="text-xs text-text-muted mb-6">
          You will receive a confirmation shortly via your preferred contact method.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium px-6 py-3 rounded-xl transition-all"
          style={{
            color: '#a5b4fc',
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          Register Another Patient
        </button>
      </motion.div>
    </motion.div>
  )
}
