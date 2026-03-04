import { motion } from 'framer-motion';
import { t } from './i18n';

const ROTATIONS = [-6, 4, -3, 7, -5];
const COLORS = [
  'linear-gradient(135deg, #c084fc, #f472b6)',
  'linear-gradient(135deg, #f472b6, #fb7185)',
  'linear-gradient(135deg, #818cf8, #c084fc)',
  'linear-gradient(135deg, #34d399, #60a5fa)',
  'linear-gradient(135deg, #fbbf24, #f472b6)',
];

export default function SlideVibeCheck({ data, lang = 'en' }) {
  const words = data.topWords;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">{t('theVibeCheck', lang)}</p>
        <h2 className="text-white text-3xl font-black">{t('sharedObsessions', lang)}</h2>
        <p className="text-white/40 text-sm mt-1">{t('wordsDefineYou', lang)}</p>
      </motion.div>

      {/* Word cloud */}
      <div className="flex flex-col items-center gap-3 w-full">
        {words.map((item, i) => (
          <motion.div key={item.word}
            initial={{ opacity: 0, scale: 0.5, rotate: ROTATIONS[i] }}
            animate={{ opacity: 1, scale: 1, rotate: ROTATIONS[i] / 3 }}
            transition={{ delay: 0.3 + i * 0.15, type: 'spring', damping: 12, stiffness: 100 }}
            className="px-6 py-2 rounded-2xl font-black cursor-default select-none"
            style={{
              background: COLORS[i],
              fontSize: `clamp(20px, ${5 - i}vw + 18px, ${42 - i * 5}px)`,
              WebkitTextFillColor: 'white',
            }}>
            {item.word}
          </motion.div>
        ))}
      </div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="text-white/30 text-xs text-center italic">
        These are your private universe's keywords
      </motion.p>
    </div>
  );
}