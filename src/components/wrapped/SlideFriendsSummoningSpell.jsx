import { motion } from 'framer-motion';
import { t } from './i18n';

export default function SlideFriendsSummoningSpell({ data, lang = 'en' }) {
  const { summoningSpell } = data;

  if (!summoningSpell) {
    return (
      <div className="flex flex-col h-full items-center justify-center px-6 gap-4">
        <div className="text-4xl">🔮</div>
        <p className="text-white/40 text-center text-sm">{t('notEnoughData', lang)}</p>
      </div>
    );
  }

  const { user, keyword, triggerCount } = summoningSpell;

  return (
    <div className="flex flex-col h-full px-6 pt-10 pb-6 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-white/40 text-xs tracking-widest uppercase mb-1">{t('friendGroup', lang)}</p>
        <h2 className="text-white text-3xl font-black leading-tight">{t('theSummoningSpell', lang)}</h2>
        <p className="text-white/40 text-sm mt-2">{t('sayMagicWord', lang)}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
        className="rounded-3xl p-8 flex flex-col items-center gap-5 text-center flex-1"
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(219,39,119,0.15))', border: '1.5px solid rgba(192,132,252,0.4)' }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
          className="text-6xl"
        >
          🔮
        </motion.div>

        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3">{t('theInactiveOne', lang)}</p>
          <p className="text-white font-black text-2xl">{user}</p>
          <p className="text-white/40 text-sm mt-1">{t('usuallyMIA', lang)}</p>
        </div>

        <div className="w-full h-px bg-white/10" />

        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3">{t('summoningWord', lang)}</p>
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
            className="inline-block px-6 py-3 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', boxShadow: '0 0 40px rgba(192,132,252,0.4)' }}
          >
            <span className="text-white font-black text-3xl tracking-wide">{keyword.toUpperCase()}</span>
          </motion.div>
          <p className="text-white/40 text-sm mt-3">
            Triggered <span className="text-white font-bold">{triggerCount}x</span> replies from them
          </p>
        </div>

        <div className="w-full rounded-xl p-3 text-center"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-white/50 text-sm">
            "When you mention <span className="text-purple-300 font-bold">{keyword}</span>, <span className="text-pink-300 font-bold">{user}</span> wakes up!"
          </p>
        </div>
      </motion.div>
    </div>
  );
}