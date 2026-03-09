import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { t } from './i18n';

export default function SlidePremiumVault({ data, lang = 'en' }) {
  useEffect(() => {
    if (navigator.vibrate) navigator.vibrate(50);
  }, []);

  const premiumInsights = data.premiumInsights || data.aiInsights?.premiumInsights || {};
  const vault = premiumInsights.theVault || {};
  const hallOfFame = vault.hallOfFame || [];
  const mostIgnoredTopic = vault.mostIgnoredTopic || '';

  const QUOTE_COLORS = [
    { bg: 'rgba(124,58,237,0.15)', border: 'rgba(167,139,250,0.35)', name: '#c4b5fd' },
    { bg: 'rgba(190,18,60,0.15)', border: 'rgba(251,113,133,0.35)', name: '#fda4af' },
    { bg: 'rgba(217,119,6,0.15)', border: 'rgba(252,211,77,0.35)', name: '#fcd34d' },
  ];

  return (
    <div
      className="flex flex-col h-full px-5 pt-10 pb-6 gap-4 relative overflow-hidden"
      dir={lang === 'he' ? 'rtl' : 'ltr'}
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[0%] left-[-10%] w-[70%] h-[70%] rounded-full"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute top-[0%] right-[-10%] w-[60%] h-[60%] rounded-full"
          style={{ background: 'radial-gradient(circle, #be123c 0%, transparent 70%)' }}
        />
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block" style={{ background: 'rgba(124,58,237,0.3)', color: '#c4b5fd' }}>
          {t('premiumBadge', lang)}
        </span>
        <h2 className="text-white text-3xl font-black leading-tight">{t('vaultTitle', lang)}</h2>
        <p className="text-white/40 text-sm mt-1">{t('vaultSub', lang)}</p>
      </motion.div>

      {/* Hall of Fame */}
      <div className="flex flex-col gap-3 flex-1">
        <p className="text-white/50 text-xs font-bold tracking-widest uppercase">{t('hallOfFameLabel', lang)}</p>
        {hallOfFame.slice(0, 3).map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 130 }}
            className="bg-white/10 backdrop-blur-2xl border shadow-2xl rounded-2xl p-4"
            style={{ background: QUOTE_COLORS[i].bg, borderColor: QUOTE_COLORS[i].border }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: QUOTE_COLORS[i].name }}>{item.sender}</p>
            <p className="text-white/80 text-sm leading-relaxed italic">"{item.quote}"</p>
          </motion.div>
        ))}

        {/* Most Ignored Topic */}
        {mostIgnoredTopic && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-4"
          >
            <p className="text-white/50 text-xs font-bold mb-1">{t('mostIgnoredLabel', lang)}</p>
            <p className="text-white/70 text-sm">{mostIgnoredTopic}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}