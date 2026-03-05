import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_TEXTS = [
  'Reading 14,382 messages... 📬',
  'Detecting sarcasm... 🙄',
  'Calculating love percentage... 💘',
  'Counting eye rolls... 👀',
  'Identifying bad excuses... 😅',
  'Measuring chaotic energy... ⚡',
  'Analyzing 3am thoughts... 🌙',
  'Ranking drama levels... 🎭',
  'Finding your villain era... 😈',
  'Almost done cooking... 🔥',
];

export default function LoadingScreen({ onComplete, isProcessing = false }) {
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex(i => (i + 1) % LOADING_TEXTS.length);
    }, 800);
    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 100;
        // While AI is processing: slow crawl up to 95%, never stuck
        if (isProcessing) {
          const remaining = 95 - p;
          if (remaining <= 0) return p;
          // Increment shrinks as we approach 95 — feels natural, never stops
          return p + Math.max(0.05, remaining * 0.012);
        }
        // AI done: rush to 100
        if (p >= 100) {
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [isProcessing, onComplete]);

  // Trigger completion when progress hits 100 and not processing
  useEffect(() => {
    if (!isProcessing && progress >= 100) {
      setTimeout(onComplete, 400);
    }
  }, [progress, isProcessing, onComplete]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1a0533 40%, #24074a 100%)' }}>

      {/* Pulsing rings */}
      {[1, 2, 3].map(i => (
        <motion.div key={i}
          animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
          className="absolute w-32 h-32 rounded-full border border-purple-400/30" />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-10 px-8 w-full max-w-sm">
        {/* Icon */}
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
          💬
        </motion.div>

        {/* Scanning text */}
        <div className="h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p key={textIndex}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-white/80 text-lg font-medium text-center">
              {LOADING_TEXTS[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full space-y-3">
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #7c3aed, #db2777, #f472b6)',
              }} />
          </div>
          <p className="text-center text-white/40 text-sm">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
}