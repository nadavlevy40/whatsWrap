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
    </section>
  );
}