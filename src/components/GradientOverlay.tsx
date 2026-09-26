export default function GradientOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0"
      style={{
        zIndex: 2,
        pointerEvents: 'none',
        background: `
          radial-gradient(circle at 75% 45%, rgba(99, 102, 241, 0.12), transparent 40%),
          linear-gradient(90deg, rgba(8,9,15,0.97) 0%, rgba(8,9,15,0.88) 40%, rgba(8,9,15,0.55) 100%)
        `,
      }}
    >
      {/* Stronger overlay on mobile via responsive div */}
      <div
        className="block lg:hidden absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(8,9,15,0.98) 0%, rgba(8,9,15,0.92) 100%)',
        }}
      />
    </div>
  )
}
