import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { t } from './i18n';

export default function SlidePremiumDeepDive({ data, lang = 'en' }) {
  useEffect(() => {
    if (navigator.vibrate) navigator.vibrate(50);
  }, []);

  const deepDive = data.premiumInsights?.relationshipDeepDive || {};

  return (
    <div className="relative flex flex-col h-full px-5 pt-10 pb-6 gap-4 overflow-y-auto" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -top-10 right-0 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.35), transparent 70%)' }}
        />
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 9, repeat: Infinity, delay: 3 }}
          className="absolute -bottom-10 left-0 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(220,38,127,0.3), transparent 70%)' }}
        />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-purple-300/70 text-xs tracking-widest uppercase mb-1">✨ {t('premiumBadge', lang)}</p>
        <h2 className="text-white text-3xl font-black leading-tight">{t('premiumDeepDiveTitle', lang)}</h2>
        <p className="text-white/40 text-sm mt-1">{t('premiumDeepDiveSub', lang)}</p>
      </motion.div>

      <div className="flex flex-col gap-3 flex-1">
        {deepDive.duoName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="rounded-3xl p-5 text-center backdrop-blur-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(220,38,127,0.15))', border: '1px solid rgba(192,132,252,0.4)' }}
          >
            <p className="text-purple-300 text-xs uppercase tracking-widest mb-2">🏷️ {t('duoNameLabel', lang)}</p>
            <p className="text-white font-black text-xl leading-tight">"{deepDive.duoName}"</p>
          </motion.div>
        )}

        {deepDive.firstVsLast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="rounded-3xl p-5 backdrop-blur-2xl"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)' }}
          >
            <p className="text-indigo-300 text-xs uppercase tracking-widest mb-2">⏳ {t('firstVsLastLabel', lang)}</p>
            <p className="text-white/80 text-sm leading-relaxed">{deepDive.firstVsLast}</p>
          </motion.div>
        )}

        {deepDive.apologyAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="rounded-3xl p-5 backdrop-blur-2xl"
            style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}
          >
            <p className="text-yellow-300 text-xs uppercase tracking-widest mb-2">🙏 {t('apologyAnalysisLabel', lang)}</p>
            <p className="text-white/80 text-sm leading-relaxed">{deepDive.apologyAnalysis}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}