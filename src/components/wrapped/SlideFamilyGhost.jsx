import { motion } from 'framer-motion';
import { t } from './i18n';

export default function SlideFamilyGhost({ data, lang = 'en' }) {
  const { participants, msgCounts = {}, totalMessages } = data;
  const sorted = [...participants].sort((a, b) => (msgCounts[a] || 0) - (msgCounts[b] || 0));
  const ghost = sorted[0];
  const ghostPct = totalMessages > 0 ? Math.round(((msgCounts[ghost] || 0) / totalMessages) * 100) : 0;

  return (
    <div className="flex flex-col h-full px-6 pt-10 pb-6 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-white/40 text-xs tracking-widest uppercase mb-1">{t('familyRoles', lang)}</p>
        <h2 className="text-white text-3xl font-black leading-tight">{t('familyGhostTitle', lang)}</h2>
        <p className="text-white/40 text-sm mt-2">{t('readsEverything', lang)}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
        className="rounded-3xl p-8 flex flex-col items-center gap-4"
        style={{ background: 'rgba(99,102,241,0.12)', border: '1.5px solid rgba(99,102,241,0.3)' }}
      >
        <div className="text-6xl">👻</div>
        <p className="text-indigo-300 font-black text-2xl">{ghost}</p>
        <p className="text-white/50 text-sm text-center">
          {t('onlyContributed', lang)(ghost, ghostPct)}
        </p>
        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }} animate={{ width: `${ghostPct}%` }} transition={{ delay: 0.6, duration: 1 }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #6366f1, #818cf8)' }}
          />
        </div>
        <p className="text-white/30 text-xs italic text-center">{t('sawItBusy', lang)}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="rounded-2xl p-4 text-center"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <p className="text-white/40 text-sm">{t('topChatter', lang)}</p>
        <p className="text-white font-bold text-lg mt-1">{sorted[sorted.length - 1]}</p>
        <p className="text-white/30 text-xs">{msgCounts[sorted[sorted.length - 1]] || 0} {t('messages', lang)}</p>
      </motion.div>
    </div>
  );
}