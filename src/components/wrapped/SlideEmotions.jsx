import { motion } from 'framer-motion';
import { t } from './i18n';

export default function SlideEmotions({ data, lang = 'en' }) {
  const [p1, p2] = data.participants;
  const laughWinner = data.laughCounts[p1] > data.laughCounts[p2] ? p1 : p2;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">{t('emotionalIntelligence', lang)}</p>
        <h2 className="text-white text-3xl font-black">{t('vibesAndLols', lang)}</h2>
      </motion.div>

      {/* Signature Emojis */}
      <div className="w-full space-y-3">
        <p className="text-white/40 text-xs text-center uppercase tracking-wider">{t('signatureEmoji', lang)}</p>
        <div className="flex gap-3">
          {[p1, p2].map((p, i) => (
            <motion.div key={p}
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.2, type: 'spring' }}
              className="flex-1 rounded-3xl p-5 text-center"
              style={{ background: i === 0 ? 'rgba(124,58,237,0.3)' : 'rgba(219,39,119,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-5xl mb-2">{data.signatureEmojis[p]}</p>
              <p className="text-white font-semibold text-sm">{p}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/10" />

      {/* Laugh counter */}
      <div className="w-full space-y-3">
        <p className="text-white/40 text-xs text-center uppercase tracking-wider">Who laughs more?</p>
        <div className="flex gap-3">
          {[p1, p2].map((p, i) => (
            <motion.div key={p}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.15 }}
              className="flex-1 rounded-3xl p-4 text-center"
              style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }}>
              <p className="text-white font-black text-2xl">{data.laughCounts[p]}</p>
              <p className="text-white/40 text-xs mt-0.5">ha-ha's</p>
              <p className="text-white/60 text-sm mt-1">{p}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="w-full rounded-2xl px-4 py-3 text-center"
          style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}>
          <p className="text-yellow-300 font-bold">😂 {laughWinner} finds everything funnier!</p>
        </motion.div>
      </div>
    </div>
  );
}