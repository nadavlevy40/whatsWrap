import { motion } from 'framer-motion';

export default function SlideVolume({ data }) {
  const total = data.totalMessages || Object.values(data.msgCounts || {}).reduce((a, b) => a + b, 0);
  const num = total.toLocaleString();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 text-center gap-8">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <p className="text-white/50 text-sm font-medium tracking-widest uppercase mb-4">Total Messages</p>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', damping: 12, stiffness: 100 }}>
          <span className="font-black text-white leading-none"
            style={{ fontSize: 'clamp(72px, 20vw, 120px)', background: 'linear-gradient(135deg, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {num}
          </span>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="space-y-2">
        <p className="text-white text-2xl font-bold">messages sent.</p>
        <p className="text-white/50 text-lg">You two couldn't stop talking. 💬</p>
      </motion.div>

      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.1, duration: 0.8 }}
        className="w-24 h-1 rounded-full"
        style={{ background: 'linear-gradient(90deg, #7c3aed, #db2777)' }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
        className="flex gap-4">
        {data.participants.map((p, i) => (
          <div key={p} className="text-center px-5 py-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
            <p className="text-white/50 text-xs mb-1">{p}</p>
            <p className="text-white font-bold text-xl">{(data.msgCounts[p] || 0).toLocaleString()}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}