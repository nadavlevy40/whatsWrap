import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { t } from './i18n';

const PERSONA_CONFIG = [
  { key: 'mainCharacter',    titleKey: 'personaMainChar',     descKey: 'personaMainDesc',     color: '#fbbf24', bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.3)' },
  { key: 'therapist',        titleKey: 'personaTherapist',    descKey: 'personaTherapistDesc', color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.3)' },
  { key: 'chaosAgent',       titleKey: 'personaChaosAgent',   descKey: 'personaChaosDesc',     color: '#f87171', bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.3)' },
  { key: 'boomerInTraining', titleKey: 'personaBoomer',       descKey: 'personaBoomerDesc',    color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.3)' },
];

export default function SlidePremiumPersonas({ data, lang = 'en' }) {
  useEffect(() => {
    if (navigator.vibrate) navigator.vibrate(50);
  }, []);

  const premiumInsights = data.premiumInsights || data.aiInsights?.premiumInsights || {};
  const personas = premiumInsights.personas || {};

  return (
    <div
      className="flex flex-col h-full px-5 pt-10 pb-6 gap-4 relative overflow-hidden"
      dir={lang === 'he' ? 'rtl' : 'ltr'}
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[-30%] right-[-30%] w-[80%] h-[80%] rounded-full opacity-30"
          style={{ background: 'conic-gradient(from 0deg, #7c3aed, #be123c, #7c3aed)' }}
        />
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block" style={{ background: 'rgba(124,58,237,0.3)', color: '#c4b5fd' }}>
          {t('premiumBadge', lang)}
        </span>
        <h2 className="text-white text-3xl font-black leading-tight">{t('personasTitle', lang)}</h2>
        <p className="text-white/40 text-sm mt-1">{t('personasSub', lang)}</p>
      </motion.div>

      {/* Persona cards */}
      <div className="flex flex-col gap-3 flex-1 justify-center">
        {PERSONA_CONFIG.map(({ key, titleKey, descKey, color, bg, border }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 140 }}
            className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl px-4 py-3 flex items-center gap-3"
            style={{ background: bg, borderColor: border }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold" style={{ color }}>{t(titleKey, lang)}</p>
              <p className="text-white/40 text-xs leading-snug">{t(descKey, lang)}</p>
            </div>
            <p className="font-black text-base text-white truncate max-w-[100px] text-end">
              {personas[key] || '?'}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}