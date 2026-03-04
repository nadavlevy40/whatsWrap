import { motion } from 'framer-motion';
import { t } from './i18n';

const MEDALS = [
  { label: '🥇', color: '#fbbf24', bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.4)', size: 'text-3xl' },
  { label: '🥈', color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.35)', size: 'text-2xl' },
  { label: '🥉', color: '#fb923c', bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.35)', size: 'text-xl' },
];

export default function SlideWordPodium({ data }) {
  const words = (data.topWords || []).filter(w => w?.word && w.count > 0);
  const top3 = words.slice(0, 3);
  const rest = words.slice(3, 10);

  return (
    <div className="w-full h-full flex flex-col px-5 pt-6 pb-4 gap-5 overflow-y-auto" dir="auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Most Used Words</p>
        <h2 className="text-white text-2xl font-black">The Word Podium 🏆</h2>
        <p className="text-white/40 text-xs mt-1">Your chat's most iconic vocabulary</p>
      </motion.div>

      {/* Top 3 */}
      <div className="flex flex-col gap-2">
        {top3.map((item, i) => (
          <motion.div key={item.word}
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.12, type: 'spring', damping: 15 }}
            className="flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{ background: MEDALS[i].bg, border: `1px solid ${MEDALS[i].border}` }}>
            <span className={`${MEDALS[i].size} flex-shrink-0`}>{MEDALS[i].label}</span>
            <span className="text-white font-black text-lg flex-1 capitalize">{item.word}</span>
            <span className="text-white/50 text-sm font-medium flex-shrink-0">{item.count.toLocaleString()}×</span>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/25 text-xs uppercase tracking-widest">Also trending</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Ranks 4–10 */}
      <div className="flex flex-col gap-1.5">
        {rest.map((item, i) => (
          <motion.div key={item.word}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 + i * 0.07 }}
            className="flex items-center gap-3 rounded-xl px-4 py-2.5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="text-white/25 text-xs w-5 text-right flex-shrink-0">#{i + 4}</span>
            <span className="text-white/80 font-semibold flex-1 capitalize">{item.word}</span>
            <span className="text-white/35 text-xs flex-shrink-0">{item.count.toLocaleString()}×</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}