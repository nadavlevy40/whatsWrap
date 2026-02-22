import { motion } from 'framer-motion';

const PEEKS = [
  {
    rotate: -8,
    label: 'Winner 🏆',
    content: (
      <div className="flex flex-col items-center gap-3 py-2">
        <div className="text-5xl">🏆</div>
        <p className="text-white font-black text-lg text-center leading-tight">Alex talks <span className="text-yellow-300">20% more</span></p>
        <p className="text-white/40 text-xs text-center">7,841 messages sent</p>
        <div className="w-full h-2 rounded-full mt-1" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div className="h-full rounded-full" style={{ width: '60%', background: 'linear-gradient(90deg, #c084fc, #f472b6)' }} />
        </div>
      </div>
    ),
    gradient: 'linear-gradient(135deg, #1a0533, #3b0764)',
    border: 'rgba(192,132,252,0.4)',
  },
  {
    rotate: 3,
    label: 'Word Cloud ✨',
    content: (
      <div className="flex flex-col gap-2">
        <p className="text-white/40 text-xs text-center uppercase tracking-widest mb-1">Top Words</p>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {['literally', 'obsessed', 'bruh', 'actually', 'insane', 'lowkey', 'bestie'].map((w, i) => (
            <span key={w} className="px-2 py-0.5 rounded-lg font-bold text-white text-xs"
              style={{ background: ['#7c3aed','#db2777','#2563eb','#059669','#d97706','#7c3aed','#db2777'][i], fontSize: `${13 - i}px` }}>
              {w}
            </span>
          ))}
        </div>
      </div>
    ),
    gradient: 'linear-gradient(135deg, #0c1445, #1a0533)',
    border: 'rgba(244,114,182,0.4)',
  },
  {
    rotate: 7,
    label: 'Trivia ❓',
    content: (
      <div className="flex flex-col gap-3">
        <p className="text-white/40 text-xs text-center uppercase tracking-widest">Quick Question</p>
        <p className="text-white font-bold text-sm text-center leading-snug">Who sent "wait that actually happened??"</p>
        <div className="flex flex-col gap-2 mt-1">
          {['Alex ✅', 'Jordan ❌'].map((opt, i) => (
            <div key={i} className="rounded-xl px-3 py-2 text-xs font-semibold text-center"
              style={{ background: i === 0 ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.06)', border: `1px solid ${i === 0 ? 'rgba(52,211,153,0.5)' : 'rgba(255,255,255,0.1)'}`, color: i === 0 ? '#34d399' : 'rgba(255,255,255,0.5)' }}>
              {opt}
            </div>
          ))}
        </div>
      </div>
    ),
    gradient: 'linear-gradient(135deg, #0f2027, #1a0533)',
    border: 'rgba(52,211,153,0.3)',
  },
];

export default function LandingSneakPeeks() {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <p className="text-white/30 text-xs tracking-widest uppercase mb-2">Preview</p>
        <h2 className="text-white text-3xl font-black">What's Inside? 👀</h2>
        <p className="text-white/40 text-sm mt-2">A glimpse of your personalized story.</p>
      </motion.div>

      <div className="flex items-center justify-center gap-0 sm:gap-4 flex-wrap sm:flex-nowrap">
        {PEEKS.map((peek, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 40, rotate: peek.rotate * 0.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: peek.rotate }}
            whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
            viewport={{ once: true }} transition={{ delay: i * 0.15, type: 'spring', stiffness: 120, damping: 14 }}
            className="relative flex-shrink-0"
            style={{ zIndex: i === 1 ? 2 : 1, marginTop: i === 1 ? '-20px' : '0' }}>

            {/* Phone shell */}
            <div className="w-44 rounded-[28px] overflow-hidden shadow-2xl"
              style={{ background: peek.gradient, border: `1.5px solid ${peek.border}`, boxShadow: `0 25px 60px rgba(0,0,0,0.6), 0 0 40px ${peek.border}` }}>
              {/* Notch */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-14 h-1.5 rounded-full bg-white/10" />
              </div>
              {/* Screen content */}
              <div className="px-4 pb-5 pt-2 min-h-[180px] flex flex-col justify-center">
                {peek.content}
              </div>
              {/* Home indicator */}
              <div className="flex justify-center pb-3">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
            </div>

            {/* Label */}
            <p className="text-center text-white/40 text-xs mt-3 font-medium">{peek.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Gift Card Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.3, type: 'spring', stiffness: 100, damping: 18 }}
        className="mt-16 rounded-3xl overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, #1a0533 0%, #3b0764 50%, #1a0533 100%)', border: '1.5px solid rgba(192,132,252,0.35)', boxShadow: '0 30px 80px rgba(147,51,234,0.25)' }}>

        {/* Shimmer layer */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)' }} />

        <div className="relative flex flex-col sm:flex-row items-center gap-6 p-7 sm:p-9">
          {/* Big gift emoji */}
          <motion.div
            animate={{ rotate: [-4, 4, -4], scale: [1, 1.08, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl sm:text-7xl flex-shrink-0 select-none">
            🎁
          </motion.div>

          {/* Text */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                style={{ background: 'rgba(192,132,252,0.2)', color: '#c084fc', border: '1px solid rgba(192,132,252,0.35)' }}>
                ✨ The Perfect Gift
              </span>
            </div>
            <h3 className="text-white font-black text-2xl sm:text-3xl leading-tight mb-2">
              Wrap your chats.<br />
              <span style={{ background: 'linear-gradient(135deg, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Gift the laughs.
              </span>
            </h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              A Spotify Wrapped-style story — but make it personal. Share hilarious receipts, inside jokes, and proof of who texts more. The freshest, most vibe-coded gift of the year. 🔥
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            {['💀 Brutally Honest', '🔥 Genuinely Funny', '✨ Super Fresh Vibe'].map((tag) => (
              <div key={tag} className="px-4 py-2 rounded-2xl text-xs font-semibold text-white/80 whitespace-nowrap"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}