import { motion } from 'framer-motion';
import { t } from './i18n';

export default function SlideFriendsNightShift({ data, lang = 'en' }) {
  const { participants, nightOwlCounts = {} } = data;
  const sorted = [...participants].sort((a, b) => (nightOwlCounts[b] || 0) - (nightOwlCounts[a] || 0));
  const winner = sorted[0];
  const max = nightOwlCounts[winner] || 1;

  return (
    <div className="flex flex-col h-full px-6 pt-10 pb-6 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-white/40 text-xs tracking-widest uppercase mb-1">{t('friendGroup', lang)}</p>
        <h2 className="text-white text-3xl font-black leading-tight">{t('theNightShift', lang)}</h2>
        <p className="text-white/40 text-sm mt-2">{t('whoKeepsGroupAlive', lang)}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
        className="rounded-3xl p-6 text-center"
        style={{ background: 'rgba(99,102,241,0.15)', border: '1.5px solid rgba(99,102,241,0.4)' }}
      >
        <div className="text-5xl mb-3">🌙</div>
        <p className="text-indigo-300 font-black text-2xl">{winner}</p>
        <p className="text-white/50 text-sm mt-1">{nightOwlCounts[winner] || 0} messages after midnight</p>
        <p className="text-white/30 text-xs mt-2 italic">"Sleep is overrated anyway"</p>
      </motion.div>

      <div className="flex flex-col gap-3 flex-1">
        {sorted.map((p, i) => {
          const count = nightOwlCounts[p] || 0;
          const pct = max > 0 ? Math.round((count / max) * 100) : 0;
          return (
            <motion.div key={p}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-white/60 text-sm w-20 truncate">{p}</span>
              <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ background: i === 0 ? 'linear-gradient(90deg, #6366f1, #a78bfa)' : 'linear-gradient(90deg, #374151, #6b7280)' }}
                />
              </div>
              <span className="text-white/40 text-xs w-8 text-right">{count}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}