import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { t } from './i18n';

const PERSONA_CONFIG = [
  { key: 'mainCharacter',    icon: '🎭', bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.35)',   labelKey: 'mainCharacterLabel' },
  { key: 'therapist',        icon: '🧠', bg: 'rgba(99,102,241,0.12)',  border: 'rgba(99,102,241,0.35)',  labelKey: 'therapistPersonaLabel' },
  { key: 'chaosAgent',       icon: '🌪️', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.35)',  labelKey: 'chaosAgentLabel' },
  { key: 'boomerInTraining', icon: '👴', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.35)',  labelKey: 'boomerInTrainingLabel' },
];

export default function SlidePremiumPersonas({ data, lang = 'en' }) {
  useEffect(() => {
    if (navigator.vibrate) navigator.vibrate(50);
  }, []);

  const personas = data.premiumInsights?.personas || {};

  return (
    <div className="relative flex flex-col h-full px-5 pt-10 pb-6 gap-4" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{ background: 'conic-gradient(from 0deg, rgba(139,92,246,0.15), rgba(220,38,127,0.15), rgba(245,158,11,0.1), rgba(139,92,246,0.15))' }}
        />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-purple-300/70 text-xs tracking-widest uppercase mb-1">✨ {t('premiumBadge', lang)}</p>
        <h2 className="text-white text-3xl font-black leading-tight">{t('premiumPersonasTitle', lang)}</h2>
        <p className="text-white/40 text-sm mt-1">{t('premiumPersonasSub', lang)}</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {PERSONA_CONFIG.map(({ key, icon, bg, border, labelKey }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 150 }}
            className="rounded-3xl p-4 flex flex-col gap-2 backdrop-blur-2xl"
            style={{ background: bg, border: `1px solid ${border}` }}
          >
            <div className="text-3xl">{icon}</div>
            <p className="text-white/50 text-xs uppercase tracking-wide">{t(labelKey, lang)}</p>
            <p className="text-white font-black text-base leading-tight">{personas[key] || '—'}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}