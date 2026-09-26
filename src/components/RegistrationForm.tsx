import { useState, useRef, FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  User, Stethoscope, CalendarDays, Users, FileText,
  ShieldCheck, Loader2, Calendar,
} from 'lucide-react'
import TimeSlotPicker from './TimeSlotPicker'
import ConsultationModeSelector from './ConsultationModeSelector'
import GuardianSection from './GuardianSection'
import SuccessCard from './SuccessCard'

/* ── Types ── */
interface FormData {
  fullName: string
  dob: string
  age: string
  gender: string
  phone: string
  email: string
  language: string
  reason: string
  symptoms: string
  firstConsultation: string
  appointmentDate: string
  appointmentTime: string
  consultationMode: string
  guardian: {
    relationship: string
    name: string
    phone: string
    email: string
    contactMethod: string
  }
  emergency: {
    name: string
    phone: string
    relationship: string
  }
  showEmergency: boolean
  medications: string
  medicalHistory: string
  additionalInfo: string
  infoConsent: boolean
  commConsent: boolean
  accuracyConsent: boolean
}

type FieldError = Partial<Record<string, boolean>>

const initialForm: FormData = {
  fullName: '',
  dob: '',
  age: '',
  gender: '',
  phone: '',
  email: '',
  language: '',
  reason: '',
  symptoms: '',
  firstConsultation: 'Yes',
  appointmentDate: '',
  appointmentTime: '',
  consultationMode: '',
  guardian: { relationship: '', name: '', phone: '', email: '', contactMethod: '' },
  emergency: { name: '', phone: '', relationship: '' },
  showEmergency: false,
  medications: '',
  medicalHistory: '',
  additionalInfo: '',
  infoConsent: false,
  commConsent: false,
  accuracyConsent: false,
}

/* ── Section wrapper ── */
function Section({
  icon: Icon,
  label,
  title,
  index,
  children,
}: {
  icon: React.ElementType
  label: string
  title: string
  index: number
  children: React.ReactNode
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 * index, ease: 'easeOut' }}
      className="mb-10"
    >
      <div className="section-pill mb-3">
        <Icon size={14} />
        {label}
      </div>
      <h2 className="text-xl font-extrabold text-white mb-6 tracking-tight">{title}</h2>
      {children}
    </motion.section>
  )
}

/* ── Divider ── */
function Divider() {
  return <hr className="border-0 h-px my-6" style={{ background: 'rgba(255, 255, 255, 0.12)' }} />
}

/* ── Main Form ── */
export default function RegistrationForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FieldError>({})
  const [loading, setLoading] = useState(false)
  const [regId, setRegId] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const today = new Date().toISOString().split('T')[0]

  /* Updaters */
  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: false }))
  }

  /* Validation */
  const validate = (): boolean => {
    const e: FieldError = {}
    if (!form.fullName.trim()) e.fullName = true
    if (!form.dob) e.dob = true
    if (!form.age || Number(form.age) < 1) e.age = true
    if (!form.gender) e.gender = true
    if (!form.phone.trim()) e.phone = true
    if (!form.reason) e.reason = true
    if (!form.appointmentDate) e.appointmentDate = true
    if (!form.appointmentTime) e.appointmentTime = true
    if (!form.consultationMode) e.consultationMode = true
    if (!form.infoConsent) e.infoConsent = true
    if (!form.commConsent) e.commConsent = true
    if (!form.accuracyConsent) e.accuracyConsent = true

    setErrors(e)

    if (Object.values(e).some(Boolean)) {
      const firstKey = Object.keys(e).find((k) => e[k])
      if (firstKey) {
        const el = document.getElementById(`field-${firstKey}`)
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return false
    }
    return true
  }

  /* Submit */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1600))
    const id = 'PAT-' + Math.random().toString(36).substring(2, 10).toUpperCase()
    setRegId(id)
    setLoading(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const reset = () => {
    setForm(initialForm)
    setErrors({})
    setRegId(null)
  }

  /* ── Success State ── */
  if (regId) {
    return <SuccessCard registrationId={regId} onReset={reset} />
  }

  /* ── Form ── */
  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 border-b border-white/10 pb-6"
      >
        <span
          className="text-xs font-bold uppercase tracking-[0.18em] mb-2 block text-indigo-400"
        >
          Patient Onboarding
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-white leading-tight">
          Patient Registration
        </h1>
        <p className="text-sm font-medium text-slate-300">
          Complete your details to schedule your consultation. Fields marked with <strong className="text-indigo-400">*</strong> are required.
        </p>
      </motion.div>

      {/* ══════════ 1. Personal Information ══════════ */}
      <Section icon={User} label="Personal" title="Personal Information" index={1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <div id="field-fullName" className="sm:col-span-2">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              className={`form-input ${errors.fullName ? 'error' : ''}`}
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={(e) => set('fullName', e.target.value)}
            />
            {errors.fullName && <p className="text-xs font-semibold mt-1.5 text-red-400">Full name is required</p>}
          </div>
          <div id="field-dob">
            <label className="form-label">Date of Birth *</label>
            <div className="relative">
              <input
                type="date"
                className={`form-input pr-10 ${errors.dob ? 'error' : ''}`}
                max={today}
                value={form.dob}
                onChange={(e) => set('dob', e.target.value)}
              />
              <Calendar size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            </div>
            {errors.dob && <p className="text-xs font-semibold mt-1.5 text-red-400">Date of birth is required</p>}
          </div>
          <div id="field-age">
            <label className="form-label">Age *</label>
            <input
              type="number"
              className={`form-input ${errors.age ? 'error' : ''}`}
              min={1}
              max={120}
              placeholder="Age"
              value={form.age}
              onChange={(e) => set('age', e.target.value)}
            />
            {errors.age && <p className="text-xs font-semibold mt-1.5 text-red-400">Valid age is required</p>}
          </div>
          <div id="field-gender">
            <label className="form-label">Gender *</label>
            <select
              className={`form-select ${errors.gender ? 'error' : ''}`}
              value={form.gender}
              onChange={(e) => set('gender', e.target.value)}
            >
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>
            {errors.gender && <p className="text-xs font-semibold mt-1.5 text-red-400">Gender is required</p>}
          </div>
          <div id="field-phone">
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              className={`form-input ${errors.phone ? 'error' : ''}`}
              placeholder="Enter phone number"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
            />
            {errors.phone && <p className="text-xs font-semibold mt-1.5 text-red-400">Phone number is required</p>}
          </div>
          <div>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="example@email.com"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Preferred Language</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. English, Telugu"
              value={form.language}
              onChange={(e) => set('language', e.target.value)}
            />
          </div>
        </div>
      </Section>

      <Divider />

      {/* ══════════ 2. Consultation Details ══════════ */}
      <Section icon={Stethoscope} label="Consultation" title="Consultation Details" index={2}>
        <div className="space-y-5">
          <div id="field-reason">
            <label className="form-label">Reason for Consultation *</label>
            <select
              className={`form-select ${errors.reason ? 'error' : ''}`}
              value={form.reason}
              onChange={(e) => set('reason', e.target.value)}
            >
              <option value="">Select reason</option>
              <option>Stress</option>
              <option>Anxiety</option>
              <option>Emotional Well-being</option>
              <option>Sleep Problems</option>
              <option>Work / Academic Stress</option>
              <option>General Consultation</option>
              <option>Follow-up Consultation</option>
              <option>Other</option>
            </select>
            {errors.reason && <p className="text-xs font-semibold mt-1.5 text-red-400">Please select a reason</p>}
          </div>

          <div>
            <label className="form-label">Current Symptoms</label>
            <textarea
              className="form-textarea"
              placeholder="Describe any current symptoms..."
              rows={3}
              value={form.symptoms}
              onChange={(e) => set('symptoms', e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Is this your first consultation? *</label>
            <div className="flex gap-4 mt-2">
              {['Yes', 'No'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => set('firstConsultation', opt)}
                  className="px-6 py-2.5 text-sm font-semibold rounded-xl transition-all"
                  style={{
                    background:
                      form.firstConsultation === opt
                        ? 'rgba(99, 102, 241, 0.25)'
                        : 'rgba(255, 255, 255, 0.04)',
                    border:
                      form.firstConsultation === opt
                        ? '1px solid #818cf8'
                        : '1px solid rgba(255, 255, 255, 0.12)',
                    color: form.firstConsultation === opt ? '#ffffff' : '#cbd5e1',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ══════════ 3. Appointment Preferences ══════════ */}
      <Section icon={CalendarDays} label="Appointment" title="Appointment Preferences" index={3}>
        <div className="space-y-6">
          <div id="field-appointmentDate">
            <label className="form-label">Preferred Date *</label>
            <div className="relative">
              <input
                type="date"
                className={`form-input pr-10 ${errors.appointmentDate ? 'error' : ''}`}
                min={today}
                value={form.appointmentDate}
                onChange={(e) => set('appointmentDate', e.target.value)}
              />
              <Calendar size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            </div>
            {errors.appointmentDate && <p className="text-xs font-semibold mt-1.5 text-red-400">Please select a date</p>}
          </div>

          <div id="field-appointmentTime">
            <TimeSlotPicker
              value={form.appointmentTime}
              onChange={(v) => set('appointmentTime', v)}
              hasError={!!errors.appointmentTime}
            />
            {errors.appointmentTime && <p className="text-xs font-semibold mt-1.5 text-red-400">Please select a time slot</p>}
          </div>

          <div id="field-consultationMode">
            <ConsultationModeSelector
              value={form.consultationMode}
              onChange={(v) => set('consultationMode', v)}
              hasError={!!errors.consultationMode}
            />
            {errors.consultationMode && <p className="text-xs font-semibold mt-1.5 text-red-400">Please select a consultation mode</p>}
          </div>
        </div>
      </Section>

      <Divider />

      {/* ══════════ 4. Guardian / Partner ══════════ */}
      <Section icon={Users} label="Guardian" title="Parent / Guardian / Partner Details" index={4}>
        <GuardianSection
          guardian={form.guardian}
          emergency={form.emergency}
          showEmergency={form.showEmergency}
          onGuardianChange={(g) => setForm((f) => ({ ...f, guardian: g }))}
          onEmergencyChange={(e) => setForm((f) => ({ ...f, emergency: e }))}
          onToggleEmergency={(show) => set('showEmergency', show)}
        />
      </Section>

      <Divider />

      {/* ══════════ 5. Additional Information ══════════ */}
      <Section icon={FileText} label="Additional" title="Additional Information" index={5}>
        <div className="space-y-5">
          <div>
            <label className="form-label">Current Medications</label>
            <textarea
              className="form-textarea"
              placeholder="List any current medications..."
              rows={3}
              value={form.medications}
              onChange={(e) => set('medications', e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Relevant Medical / Psychological History</label>
            <textarea
              className="form-textarea"
              placeholder="Provide any relevant medical background..."
              rows={3}
              value={form.medicalHistory}
              onChange={(e) => set('medicalHistory', e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Anything else the consultant should know?</label>
            <textarea
              className="form-textarea"
              placeholder="Any additional notes..."
              rows={3}
              value={form.additionalInfo}
              onChange={(e) => set('additionalInfo', e.target.value)}
            />
          </div>
        </div>
      </Section>

      <Divider />

      {/* ══════════ 6. Consent ══════════ */}
      <Section icon={ShieldCheck} label="Consent" title="Consent & Acknowledgements" index={6}>
        <div className="space-y-3">
          <div id="field-infoConsent">
            <label className="custom-checkbox" style={errors.infoConsent ? { borderColor: '#f87171' } : {}}>
              <input
                type="checkbox"
                checked={form.infoConsent}
                onChange={(e) => set('infoConsent', e.target.checked)}
              />
              <span>I consent to my information being used for consultation purposes. *</span>
            </label>
          </div>
          <div id="field-commConsent">
            <label className="custom-checkbox" style={errors.commConsent ? { borderColor: '#f87171' } : {}}>
              <input
                type="checkbox"
                checked={form.commConsent}
                onChange={(e) => set('commConsent', e.target.checked)}
              />
              <span>I consent to the processing of my information for appointment-related communication. *</span>
            </label>
          </div>
          <div id="field-accuracyConsent">
            <label className="custom-checkbox" style={errors.accuracyConsent ? { borderColor: '#f87171' } : {}}>
              <input
                type="checkbox"
                checked={form.accuracyConsent}
                onChange={(e) => set('accuracyConsent', e.target.checked)}
              />
              <span>I understand that the information provided should be accurate. *</span>
            </label>
          </div>
        </div>
      </Section>

      {/* ══════════ Submit ══════════ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={loading ? {} : { scale: 1.015 }}
          whileTap={loading ? {} : { scale: 0.985 }}
          className="w-full py-4 rounded-2xl font-extrabold text-base text-white outline-none transition-all duration-200 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-400/50 cursor-pointer"
          style={{
            background: loading
              ? 'rgba(99, 102, 241, 0.4)'
              : 'linear-gradient(135deg, #6366f1, #818cf8)',
            boxShadow: loading
              ? 'none'
              : '0 8px 28px rgba(99, 102, 241, 0.4)',
          }}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Processing Registration...
            </>
          ) : (
            'Register Patient'
          )}
        </motion.button>
      </motion.div>
    </form>
  )
}
