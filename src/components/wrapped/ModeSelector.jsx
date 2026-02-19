import { motion } from 'framer-motion';
import { Heart, Home, Zap } from 'lucide-react';

const MODES = [
  {
    id: 'couple',
    icon: Heart,
    label: 'Couple',
    sub: 'Romantic & Roast',
    color: '#f472b6',
    bg: 'rgba(244,114,182,0.15)',
    border: 'rgba(244,114,182,0.35)',
    glow: 'rgba(244,114,182,0.3)',
  },
  {
    id: 'family',
    icon: Home,
    label: 'Family',
    sub: 'Wholesome & Chaotic',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.12)',
    border: 'rgba(52,211,153,0.3)',
    glow: 'rgba(52,211,153,0.25)',
  },
  {
    id: 'friends',
    icon: Zap,
    label: 'Friends',
    sub: 'Banter & Triggers',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.12)',
    border: 'rgba(251,191,36,0.3)',
    glow: 'rgba(251,191,36,0.25)',
  },
];

export default function ModeSelector({ suggestedMode, onSelect }) {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-6"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1a0533 40%, #24074a 100%)' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-white/30 text-xs tracking-widest uppercase mb-3">Step 2 of 2</p>
          <h1 className="text-white text-3xl font-black leading-tight mb-2">
            What kind of chat<br />is this?
          </h1>
          <p className="text-white/40 text-sm">Pick a mode for your personalized story.</p>
        </motion.div>

        <div className="w-full flex flex-col gap-3">
          {MODES.map((mode, i) => {
            const Icon = mode.icon;
            const isSuggested = mode.id === suggestedMode;
            return (
              <motion.button
                key={mode.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelect(mode.id)}
                className="w-full flex items-center gap-4 rounded-2xl p-4 text-left transition-all"
                style={{
                  background: mode.bg,
                  border: `1.5px solid ${mode.border}`,
                  boxShadow: isSuggested ? `0 0 30px ${mode.glow}` : 'none',
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${mode.bg}`, border: `1px solid ${mode.border}` }}>
                  <Icon size={22} style={{ color: mode.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg">{mode.label}</span>
                    {isSuggested && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: mode.bg, border: `1px solid ${mode.border}`, color: mode.color }}>
                        Suggested
                      </span>
                    )}
                  </div>
                  <p className="text-white/40 text-sm">{mode.sub}</p>
                </div>
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: isSuggested ? mode.color : 'rgba(255,255,255,0.2)' }}>
                  {isSuggested && <div className="w-2.5 h-2.5 rounded-full" style={{ background: mode.color }} />}
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-white/20 text-xs text-center"
        >
          You can always change this later
        </motion.p>
      </div>
    </div>
  );
}