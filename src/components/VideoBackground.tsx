export default function VideoBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover object-center"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
      />
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
    </div>
  )
}
