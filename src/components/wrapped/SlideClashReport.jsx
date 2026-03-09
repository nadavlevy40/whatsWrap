import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { t } from './i18n';

export default function SlideClashReport({ data, lang = 'en' }) {
  useEffect(() => {
    if (navigator.vibrate) navigator.vibrate([40, 30, 40]);
  }, []);

  const { participants = [], apologyCountsLocal = {}, tensionCounts = {} } = data;
  const clashAnalysis = data.aiInsights?.couple?.clashAnalysis || {};
  const p1 = participants[0] || '?';
  const p2 = participants[1] || '?';

  return (
    <div
      className="flex flex-col h-full px-5 pt-10 pb-6 gap-4 relative overflow-hidden"
      dir={lang === 'he' ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(160deg, #1a0010 0%, #0d0020 100%)' }} />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] rounded-full -z-10"
        style={{ background: 'radial-gradient(circle, #be123c 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] rounded-full -z-10"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block" style={{ background: 'rgba(190,18,60,0.3)', color: '#fda4af' }}>
          {t('clashReportBadge', lang)}
        </span>
        <h2 className="text-white text-3xl font-black leading-tight whitespace-pre-line">{t('clashReportTitle', lang)}</h2>
        <p className="text-white/40 text-sm mt-1">{t('clashReportSub', lang)}</p>
      </motion.div>

      {/* VS Split */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
        className="relative flex rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
        style={{ minHeight: '100px' }}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-1 py-4" style={{ background: 'rgba(190,18,60,0.25)' }}>
          <p className="text-white font-black text-base truncate px-2 max-w-full text-center">{p1}</p>
          <p className="text-red-300 font-black text-3xl">{apologyCountsLocal[p1] ?? 0}</p>
          <p className="text-white/40 text-xs">{t('clashApologies', lang)}</p>
          <p className="text-red-400/70 font-bold text-lg mt-1">{tensionCounts[p1] ?? 0}</p>
          <p className="text-white/30 text-xs">{t('clashTension', lang)}</p>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white border-2 border-white/30"
          style={{ background: 'linear-gradient(135deg, #be123c, #7c3aed)' }}>
          {t('clashVS', lang)}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-1 py-4" style={{ background: 'rgba(124,58,237,0.25)' }}>
          <p className="text-white font-black text-base truncate px-2 max-w-full text-center">{p2}</p>
          <p className="text-purple-300 font-black text-3xl">{apologyCountsLocal[p2] ?? 0}</p>
          <p className="text-white/40 text-xs">{t('clashApologies', lang)}</p>
          <p className="text-purple-400/70 font-bold text-lg mt-1">{tensionCounts[p2] ?? 0}</p>
          <p className="text-white/30 text-xs">{t('clashTension', lang)}</p>
        </div>
      </motion.div>

      <div className="flex flex-col gap-2 flex-1">
        {clashAnalysis.mostCommonArgument && (
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
            className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3"
          >
            <p className="text-red-300 text-xs font-bold mb-1">{t('clashMostCommon', lang)}</p>
            <p className="text-white/80 text-sm leading-snug">{clashAnalysis.mostCommonArgument}</p>
          </motion.div>
        )}
        <div className="grid grid-cols-2 gap-2">
          {clashAnalysis.thePeacemaker && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-3 py-3"
            >
              <p className="text-green-300 text-xs font-bold mb-1">{t('clashPeacemaker', lang)}</p>
              <p className="text-white font-black text-base">{clashAnalysis.thePeacemaker}</p>
            </motion.div>
          )}
          {clashAnalysis.theStubbornOne && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-3 py-3"
            >
              <p className="text-orange-300 text-xs font-bold mb-1">{t('clashStubbornOne', lang)}</p>
              <p className="text-white font-black text-base">{clashAnalysis.theStubbornOne}</p>
            </motion.div>
          )}
        </div>
        {clashAnalysis.resolutionStyle && (
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3"
          >
            <p className="text-purple-300 text-xs font-bold mb-1">{t('clashResolution', lang)}</p>
            <p className="text-white/80 text-sm leading-snug italic">"{clashAnalysis.resolutionStyle}"</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}