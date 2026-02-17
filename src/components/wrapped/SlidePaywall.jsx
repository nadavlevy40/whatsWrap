import { motion } from 'framer-motion';
import { Lock, Zap, Star, FileText, Flame } from 'lucide-react';

export default function SlidePaywall({ data }) {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-6 relative overflow-hidden">
      {/* Blurred stats behind */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 blur-md opacity-30 pointer-events-none select-none px-6">
        <div className="text-6xl text-white font-black">SECRET STATS</div>
        <div className="flex gap-3">
          <div className="w-20 h-20 bg-purple-500 rounded-2xl" />
          <div className="w-20 h-20 bg-pink-500 rounded-2xl" />
          <div className="w-20 h-20 bg-indigo-500 rounded-2xl" />
        </div>
        <div className="h-20 w-full bg-white/20 rounded-xl" />
      </div>

      {/* Premium card */}
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.3, type: 'spring' }}
        className="w-full relative z-10 rounded-3xl overflow-hidden"
        style={{ background: 'rgba(15,12,41,0.9)', backdropFilter: 'blur(30px)', border: '1px solid rgba(192,132,252,0.3)' }}>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(219,39,119,0.4))' }}>
          <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-4xl mb-2">🔒</motion.div>
          <p className="text-white/60 text-xs tracking-widest uppercase">Premium Feature</p>
          <h2 className="text-white text-2xl font-black mt-1">Roast Mode</h2>
          <p className="text-white/60 text-sm mt-1">Unlock the full spicy report</p>
        </div>

        <div className="p-6 space-y-4">
          {/* Features */}
          {[
            { icon: <Flame size={16} />, label: 'Roast Mode', desc: 'Savage AI analysis of your chat' },
            { icon: <FileText size={16} />, label: 'PDF Export', desc: 'Beautiful shareable report' },
            { icon: <Star size={16} />, label: 'Deep Stats', desc: 'Response time, conversation starters & more' },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(219,39,119,0.4))' }}>
                <span className="text-purple-300">{f.icon}</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{f.label}</p>
                <p className="text-white/40 text-xs">{f.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Price */}
          <div className="flex items-baseline justify-center gap-1 pt-2">
            <span className="text-white/40 text-sm line-through">$9.99</span>
            <span className="text-white font-black text-4xl">$4.99</span>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setClicked(true)}
            className="w-full py-4 rounded-2xl font-black text-white text-lg flex items-center justify-center gap-2 transition-all"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
            <Zap size={20} className="text-yellow-300" />
            {clicked ? 'Coming Soon 🚀' : 'Unlock Full Report'}
          </motion.button>

          <p className="text-center text-white/30 text-xs">One-time payment · No subscription</p>
        </div>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="text-white/30 text-xs text-center relative z-10">
        Made with 💜 — Your data never leaves your device
      </motion.p>
    </div>
  );
}

import { useState } from 'react';