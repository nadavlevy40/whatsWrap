import { motion } from 'framer-motion';
import { t } from './i18n';

export default function SlideDoubleText({ data, lang = 'en' }) {
  const counts = data.doubleTextCounts || {};
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return null;

  const [winner, winnerCount] = sorted[0];
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">{t('doubleTextCrown', lang)}</p>
        <h2 className="text-white text-3xl font-black leading-tight">{t('doubleTextHeader', lang).split('\n').map((l,i) => <span key={i}>{l}{i===0&&<br/>}</span>)}</h2>
      </motion.div>

      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, type: 'spring', damping: 12 }}
        className="relative flex flex-col items-center gap-2">
        <div className="text-6xl">💬</div>
        <div className="absolute -top-2 -right-4 text-4xl animate-bounce">💬</div>
        <p className="text-white/40 text-sm mt-2">{t('doubleTextSentBefore', lang)}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        className="w-full rounded-3xl p-6 text-center"
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(219,39,119,0.4))', border: '1px solid rgba(255,255,255,0.12)' }}>
        <p className="text-white/60 text-sm mb-1">{t('impatient', lang)}</p>
        <p className="text-white font-black text-4xl mb-1">{winner}</p>
        <p className="text-white/50 text-sm">{winnerCount.toLocaleString()} {t('doubleTexts', lang)}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="flex gap-3 w-full">
        {sorted.map(([name, count]) => (
          <div key={name} className="flex-1 rounded-2xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <p className="text-white/50 text-xs mb-1 truncate">{name}</p>
            <p className="text-white font-bold text-xl">{count}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}