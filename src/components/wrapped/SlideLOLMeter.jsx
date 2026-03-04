import { motion } from 'framer-motion';
import { t } from './i18n';

export default function SlideLOLMeter({ data, lang = 'en' }) {
  const [p1, p2] = data.participants;
  const s1 = data.laughCounts[p1] || 0;
  const s2 = data.laughCounts[p2] || 0;
  const total = s1 + s2 || 1;
  const p1Pct = Math.round((s1 / total) * 100);
  const p2Pct = 100 - p1Pct;
  const comedian = s1 >= s2 ? p1 : p2;
  const audience = s1 >= s2 ? p2 : p1;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-5 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-1">{t('laughterAnalysis', lang)}</p>
        <h2 className="text-white text-2xl font-black">{t('lolMeter', lang)}</h2>
        <p className="text-white/40 text-sm mt-1">{t('cracksUpMore', lang)}</p>
      </motion.div>

      {/* Score cards */}
      <div className="flex gap-3 w-full">
        {[p1, p2].map((p, i) => {
          const score = i === 0 ? s1 : s2;
          const isComedian = p === comedian;
          return (
            <motion.div key={p}
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.15, type: 'spring' }}
              className="flex-1 rounded-3xl p-4 text-center flex flex-col items-center gap-2"
              style={{
                background: isComedian ? 'rgba(251,191,36,0.12)' : 'rgba(255,255,255,0.05)',
                border: isComedian ? '1px solid rgba(251,191,36,0.4)' : '1px solid rgba(255,255,255,0.1)',
              }}>
              <span className="text-3xl">{isComedian ? '🎤' : '👂'}</span>
              <p className="text-white font-bold text-sm">{p}</p>
              <p className="text-white font-black text-3xl">{score.toLocaleString()}</p>
              <p className="text-white/40 text-xs">{t('laughEvents', lang)}</p>
              <div className="mt-1 px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  background: isComedian ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.06)',
                  color: isComedian ? '#fbbf24' : 'rgba(255,255,255,0.4)',
                }}>
                {isComedian ? t('theComedian', lang) : t('theAudience', lang)}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Comparison bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="w-full space-y-2">
        <div className="flex justify-between text-xs text-white/40">
          <span>{p1} {p1Pct}%</span>
          <span>{p2Pct}% {p2}</span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden flex" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${p1Pct}%` }} transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
            className="h-full rounded-l-full" style={{ background: 'linear-gradient(90deg, #7c3aed, #9333ea)' }} />
          <motion.div initial={{ width: 0 }} animate={{ width: `${p2Pct}%` }} transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
            className="h-full rounded-r-full" style={{ background: 'linear-gradient(90deg, #db2777, #ec4899)' }} />
        </div>
      </motion.div>

      {/* Detected patterns */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="w-full rounded-2xl px-4 py-3 text-center"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-white/40 text-xs">Detected: haha · lol · lmao · rofl · 😂 · 🤣 · 💀 · 😭</p>
      </motion.div>
    </div>
  );
}