import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { t } from './i18n';

export default function SlidePremiumShadowStats({ data, lang = 'en' }) {
  useEffect(() => {
    if (navigator.vibrate) navigator.vibrate(50);
  }, []);

  const { participants = [], doubleDownCounts = {}, lastWordCounts = {}, apologyCountsLocal = {} } = data;
  const premiumInsights = data.premiumInsights || {};

  const topDoubleDown = [...participants].sort((a, b) => (doubleDownCounts[b] || 0) - (doubleDownCounts[a] || 0))[0];
  const topLastWord = [...participants].sort((a, b) => (lastWordCounts[b] || 0) - (lastWordCounts[a] || 0))[0];
  const topApology = [...participants].sort((a, b) => (apologyCountsLocal[b] || 0) - (apologyCountsLocal[a] || 0))[0];

  return (
    <div className="relative flex flex-col h-full px-5 pt-10 pb-6 gap-4" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(220,38,127,0.4), transparent 70%)' }}
        />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-purple-300/70 text-xs tracking-widest uppercase mb-1">✨ {t('premiumBadge', lang)}</p>
        <h2 className="text-white text-3xl font-black leading-tight">{t('premiumShadowTitle', lang)}</h2>
        <p className="text-white/40 text-sm mt-1">{t('premiumShadowSub', lang)}</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {/* Double Down */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="col-span-2 rounded-3xl p-5 backdrop-blur-2xl"
          style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)' }}
        >
          <p className="text-purple-300 text-xs uppercase tracking-widest mb-2">🔁 {t('doubleDownAward', lang)}</p>
          <p className="text-white font-black text-xl">{topDoubleDown}</p>
          <p className="text-white/50 text-sm mt-1">{doubleDownCounts[topDoubleDown] || 0} {t('doubleDownDesc', lang)}</p>
        </motion.div>

        {/* Last Word */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
          className="rounded-3xl p-4 backdrop-blur-2xl"
          style={{ background: 'rgba(220,38,127,0.12)', border: '1px solid rgba(220,38,127,0.3)' }}
        >
          <p className="text-pink-300 text-xs uppercase tracking-widest mb-2">🏁 {t('lastWordObsession', lang)}</p>
          <p className="text-white font-black text-lg leading-tight">{topLastWord}</p>
          <p className="text-white/50 text-xs mt-1">{lastWordCounts[topLastWord] || 0}×</p>
        </motion.div>

        {/* Apology */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
          className="rounded-3xl p-4 backdrop-blur-2xl"
          style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)' }}
        >
          <p className="text-yellow-300 text-xs uppercase tracking-widest mb-2">🙏 {t('apologyCounter', lang)}</p>
          <p className="text-white font-black text-lg leading-tight">{topApology}</p>
          <p className="text-white/50 text-xs mt-1">{apologyCountsLocal[topApology] || 0}×</p>
        </motion.div>

        {/* Vibe Shift */}
        {premiumInsights.vibeShiftTimeline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="col-span-2 rounded-3xl p-5 backdrop-blur-2xl"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">📈 {t('vibeShiftTitle', lang)}</p>
            <p className="text-white/80 text-sm leading-relaxed italic">"{premiumInsights.vibeShiftTimeline}"</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}