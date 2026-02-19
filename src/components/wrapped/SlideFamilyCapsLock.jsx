import { motion } from 'framer-motion';

export default function SlideFamilyCapsLock({ data }) {
  const { participants, capsLockCounts = {} } = data;
  const sorted = [...participants].sort((a, b) => (capsLockCounts[b] || 0) - (capsLockCounts[a] || 0));
  const winner = sorted[0];
  const max = capsLockCounts[winner] || 1;

  const ENERGY_LABELS = ['ABSOLUTELY SCREAMING', 'Very Enthusiastic', 'Normal Energy', 'Calm', 'Zen Mode'];

  return (
    <div className="flex flex-col h-full px-6 pt-10 pb-6 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Family Roles</p>
        <h2 className="text-white text-3xl font-black leading-tight">The Loudest 📣</h2>
        <p className="text-white/40 text-sm mt-2">WHO TYPES LIKE THIS THE MOST?</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
        className="rounded-3xl p-6 text-center"
        style={{ background: 'rgba(239,68,68,0.12)', border: '1.5px solid rgba(239,68,68,0.3)' }}
      >
        <div className="text-5xl mb-3">📣</div>
        <p className="text-red-400 font-black text-2xl">{winner}</p>
        <p className="text-white/50 text-sm mt-1">{capsLockCounts[winner] || 0} ALL-CAPS words</p>
        <p className="text-white/30 text-xs mt-2 italic">
          {ENERGY_LABELS[0]}
        </p>
      </motion.div>

      <div className="flex flex-col gap-3 flex-1">
        {sorted.map((p, i) => {
          const count = capsLockCounts[p] || 0;
          const pct = max > 0 ? Math.round((count / max) * 100) : 0;
          const energy = ENERGY_LABELS[Math.min(i, ENERGY_LABELS.length - 1)];
          return (
            <motion.div key={p}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
              className="flex flex-col gap-1"
            >
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm font-medium">{p}</span>
                <span className="text-white/30 text-xs">{energy}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ background: i === 0 ? 'linear-gradient(90deg, #ef4444, #f87171)' : 'linear-gradient(90deg, #6366f1, #818cf8)' }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}