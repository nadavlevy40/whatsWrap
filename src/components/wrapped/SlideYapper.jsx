import { motion } from 'framer-motion';

export default function SlideYapper({ data }) {
  const avgs = data.avgWordsPerMessage || {};
  const sorted = Object.entries(avgs).sort((a, b) => b[1] - a[1]);
  if (sorted.length < 2) return null;

  const [yapper, yapperAvg] = sorted[0];
  const [quiet, quietAvg] = sorted[sorted.length - 1];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Yapper vs. One-Word Wonder</p>
        <h2 className="text-white text-3xl font-black leading-tight">Who writes<br />essays?</h2>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
        className="flex gap-4 w-full">
        {/* Yapper */}
        <div className="flex-1 rounded-3xl p-5 text-center flex flex-col items-center gap-2"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(219,39,119,0.4))', border: '1px solid rgba(255,255,255,0.12)' }}>
          <div className="text-3xl">🗣️</div>
          <p className="text-white/50 text-xs uppercase tracking-wide">Yapper</p>
          <p className="text-white font-black text-2xl leading-tight">{yapper}</p>
          <p className="text-white/70 text-sm">{yapperAvg.toFixed(1)} words/msg</p>
        </div>
        {/* One-word wonder */}
        <div className="flex-1 rounded-3xl p-5 text-center flex flex-col items-center gap-2"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="text-3xl">🤐</div>
          <p className="text-white/50 text-xs uppercase tracking-wide">One-Word Wonder</p>
          <p className="text-white font-black text-2xl leading-tight">{quiet}</p>
          <p className="text-white/50 text-sm">{quietAvg.toFixed(1)} words/msg</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
        className="w-full rounded-2xl px-5 py-4 text-center"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-white/70 text-sm">
          <span className="text-purple-300 font-bold">{yapper}</span> writes {(yapperAvg / quietAvg).toFixed(1)}x more words per message than <span className="text-pink-300 font-bold">{quiet}</span>
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex gap-3 w-full">
        {sorted.map(([name, avg]) => (
          <div key={name} className="flex-1 rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <p className="text-white/40 text-xs mb-1 truncate">{name}</p>
            <p className="text-white font-bold">{avg.toFixed(1)}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}