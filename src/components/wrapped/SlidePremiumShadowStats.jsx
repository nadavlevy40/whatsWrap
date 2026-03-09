import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { t } from './i18n';

export default function SlidePremiumShadowStats({ data, lang = 'en' }) {
  useEffect(() => {
    if (navigator.vibrate) navigator.vibrate(50);
  }, []);

  const { participants = [], doubleDownCounts = {}, lastWordCounts = {} } = data;
  const premiumInsights = data.premiumInsights || data.aiInsights?.premiumInsights || {};

  const doubleDownWinner = [...participants].sort((a, b) => (doubleDownCounts[b] || 0) - (doubleDownCounts[a] || 0))[0];
  const lastWordWinner = [...participants].sort((a, b) => (lastWordCounts[b] || 0) - (lastWordCounts[a] || 0))[0];

  return (
    <div
      className="flex flex-col h-full px-5 pt-10 pb-6 gap-4 relative overflow-hidden"
      dir={lang === 'he' ? 'rtl' : 'ltr'}
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] rounded-full"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full"
          style={{ background: 'radial-gradient(circle, #be123c 0%, transparent 70%)' }}
        />
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block" style={{ background: 'rgba(124,58,237,0.3)', color: '#c4b5fd' }}>
          {t('premiumBadge', lang)}
        </span>
        <h2 className="text-white text-3xl font-black leading-tight">{t('shadowStatsTitle', lang)}</h2>
        <p className="text-white/40 text-sm mt-1">{t('shadowStatsSub', lang)}</p>
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-2 gap-3 flex-1">
        {/* Double-Down */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
          className="col-span-2 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-5"
        >
          <p className="text-white/50 text-xs mb-1">{t('doubleDownTitle', lang)}</p>
          <p className="text-white font-black text-2xl">{doubleDownWinner || '—'}</p>
          <p className="text-white/30 text-xs mt-1">{t('doubleDownDesc', lang)}</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {participants.map(p => (
              <div key={p} className="flex flex-col items-center gap-1">
                <div className="text-xs text-white/60 truncate max-w-[60px]">{p}</div>
                <div className="text-purple-300 font-bold text-sm">{doubleDownCounts[p] || 0}×</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Last Word */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-4"
        >
          <p className="text-white/50 text-xs mb-1">{t('lastWordTitle', lang)}</p>
          <p className="text-white font-black text-lg">{lastWordWinner || '—'}</p>
          <p className="text-white/30 text-xs mt-1">{lastWordCounts[lastWordWinner] || 0}×</p>
          <p className="text-white/25 text-xs mt-2 leading-snug">{t('lastWordDesc', lang)}</p>
        </motion.div>

        {/* Vibe Shift */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-4"
        >
          <p className="text-white/50 text-xs mb-1">{t('vibeShiftTitle', lang)}</p>
          <p className="text-white/80 text-xs leading-relaxed mt-1">
            {premiumInsights.vibeShiftTimeline || '...'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}