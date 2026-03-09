import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { t } from './i18n';

export default function SlidePremiumDeepDive({ data, lang = 'en' }) {
  useEffect(() => {
    if (navigator.vibrate) navigator.vibrate(50);
  }, []);

  const premiumInsights = data.premiumInsights || data.aiInsights?.premiumInsights || {};
  const deepDive = premiumInsights.relationshipDeepDive || {};

  return (
    <div
      className="flex flex-col h-full px-5 pt-10 pb-6 gap-4 relative overflow-hidden"
      dir={lang === 'he' ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[10%] left-[10%] w-[80%] h-[80%] rounded-full"
          style={{ background: 'radial-gradient(circle, #be123c 0%, #7c3aed 50%, transparent 75%)' }}
        />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block" style={{ background: 'rgba(124,58,237,0.3)', color: '#c4b5fd' }}>
          {t('premiumBadge', lang)}
        </span>
        <h2 className="text-white text-3xl font-black leading-tight">{t('deepDiveTitle', lang)}</h2>
        <p className="text-white/40 text-sm mt-1">{t('deepDiveSub', lang)}</p>
      </motion.div>

      <div className="flex flex-col gap-3 flex-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
          className="backdrop-blur-2xl shadow-2xl rounded-3xl p-5 text-center border"
          style={{ background: 'rgba(124,58,237,0.15)', borderColor: 'rgba(167,139,250,0.4)' }}
        >
          <p className="text-purple-300 text-xs font-bold mb-2">{t('duoNameLabel', lang)}</p>
          <p className="text-white font-black text-2xl leading-tight">{deepDive.duoName || '...'}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-4"
        >
          <p className="text-pink-300 text-xs font-bold mb-2">{t('firstVsLastLabel', lang)}</p>
          <p className="text-white/70 text-sm leading-relaxed">{deepDive.firstVsLast || '...'}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-4"
        >
          <p className="text-amber-300 text-xs font-bold mb-2">{t('apologyAnalysisLabel', lang)}</p>
          <p className="text-white/70 text-sm leading-relaxed">{deepDive.apologyAnalysis || '...'}</p>
        </motion.div>
      </div>
    </div>
  );
}