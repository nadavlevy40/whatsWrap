import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { t } from './i18n';

export default function SlidePremiumVault({ data, lang = 'en' }) {
  useEffect(() => {
    if (navigator.vibrate) navigator.vibrate(50);
  }, []);

  const vault = data.premiumInsights?.theVault || {};
  const hallOfFame = vault.hallOfFame || [];

  return (
    <div className="relative flex flex-col h-full px-5 pt-10 pb-6 gap-4 overflow-y-auto" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-0 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3), transparent 65%)' }}
        />
        <motion.div
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 13, repeat: Infinity, delay: 4 }}
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.25), transparent 65%)' }}
        />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-purple-300/70 text-xs tracking-widest uppercase mb-1">✨ {t('premiumBadge', lang)}</p>
        <h2 className="text-white text-3xl font-black leading-tight">{t('premiumVaultTitle', lang)}</h2>
        <p className="text-white/40 text-sm mt-1">{t('premiumVaultSub', lang)}</p>
      </motion.div>

      <div className="flex flex-col gap-3 flex-1">
        <p className="text-white/40 text-xs uppercase tracking-widest">🏆 {t('hallOfFameLabel', lang)}</p>
        {hallOfFame.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: lang === 'he' ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className="rounded-2xl p-4 backdrop-blur-2xl"
            style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
          >
            <p className="text-yellow-300/60 text-xs mb-1">{item.sender}</p>
            <p className="text-white font-semibold text-base leading-snug">"{item.quote}"</p>
          </motion.div>
        ))}

        {vault.mostIgnoredTopic && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + hallOfFame.length * 0.15 }}
            className="rounded-2xl p-4 backdrop-blur-2xl mt-1"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)' }}
          >
            <p className="text-indigo-300 text-xs uppercase tracking-widest mb-2">👻 {t('mostIgnoredLabel', lang)}</p>
            <p className="text-white/80 text-sm leading-relaxed">{vault.mostIgnoredTopic}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}