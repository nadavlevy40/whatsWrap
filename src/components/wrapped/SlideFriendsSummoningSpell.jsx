import { motion } from 'framer-motion';

export default function SlideFriendsSummoningSpell({ data }) {
  const { summoningSpells = [] } = data;

  if (!summoningSpells.length) {
    return (
      <div className="flex flex-col h-full px-6 pt-10 pb-6 items-center justify-center gap-4">
        <div className="text-5xl">🔮</div>
        <p className="text-white text-xl font-bold text-center">No Summoning Spells Found</p>
        <p className="text-white/40 text-sm text-center">Everyone in this group is equally active!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full px-6 pt-10 pb-6 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Secret Weapon</p>
        <h2 className="text-white text-3xl font-black leading-tight">The Summoning<br />Spell 🔮</h2>
        <p className="text-white/40 text-sm mt-2">Certain words bring the lurkers to life.</p>
      </motion.div>

      <div className="flex flex-col gap-4 flex-1">
        {summoningSpells.map((spell, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.15, type: 'spring', stiffness: 120 }}
            className="rounded-3xl p-5"
            style={{ background: 'rgba(192,132,252,0.12)', border: '1.5px solid rgba(192,132,252,0.35)' }}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl flex-shrink-0">🔮</div>
              <div className="flex-1">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">When you mention</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {spell.keywords.map(kw => (
                    <span key={kw}
                      className="px-3 py-1 rounded-full font-black text-sm"
                      style={{ background: 'rgba(192,132,252,0.3)', color: '#c084fc', border: '1px solid rgba(192,132,252,0.5)' }}>
                      {kw}
                    </span>
                  ))}
                </div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">wakes up</p>
                <p className="text-white font-black text-xl">{spell.user}</p>
                <p className="text-white/30 text-xs mt-1">{spell.activations} times activated</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="text-white/20 text-xs text-center"
      >
        Use this knowledge wisely 🧙
      </motion.p>
    </div>
  );
}