import { motion } from 'framer-motion';
import { t } from './i18n';

const PRICE_PER_SWEAR = 0.25;

export default function SlideSwearJar({ data, lang = 'en' }) {
  const counts = data.swearCounts || {};
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return null;

  const [winner, winnerCount] = sorted[0];
  const owes = (winnerCount * PRICE_PER_SWEAR).toFixed(2);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">The Swear Jar 🫙</p>
        <h2 className="text-white text-3xl font-black leading-tight">Who owes<br />the most?</h2>
      </motion.div>

      {/* Jar graphic */}
      <motion.div
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring', damping: 10 }}
        className="relative flex flex-col items-center">
        <div className="text-8xl">🫙</div>
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9, type: 'spring' }}
          className="absolute -bottom-2 -right-4 bg-yellow-400 text-black font-black text-xs px-2 py-1 rounded-full">
          ${owes}
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        className="w-full rounded-3xl p-6 text-center"
        style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(219,39,119,0.3))', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-white/60 text-sm mb-1">Most Potty-Mouthed</p>
        <p className="text-white font-black text-4xl mb-1">{winner}</p>
        <p className="text-white/50 text-sm">{winnerCount} swear words · owes <span className="text-yellow-400 font-bold">${owes}</span></p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex gap-3 w-full">
        {sorted.slice(0, 4).map(([name, count]) => (
          <div key={name} className="flex-1 rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <p className="text-white/40 text-xs mb-1 truncate">{name}</p>
            <p className="text-white font-bold">{count}</p>
            <p className="text-yellow-400 text-xs">${(count * PRICE_PER_SWEAR).toFixed(2)}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}