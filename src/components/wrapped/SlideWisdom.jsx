import { motion } from 'framer-motion';
import { t } from './i18n';

const COLORS = [
  'from-violet-900/60 to-purple-900/40',
  'from-rose-900/60 to-pink-900/40',
  'from-blue-900/60 to-cyan-900/40',
  'from-amber-900/60 to-orange-900/40',
  'from-emerald-900/60 to-teal-900/40',
];

const MOCK_WISDOM = [
  { sender: 'Alex', content: "wait that actually happened??" },
  { sender: 'Jordan', content: "i cannot deal with this rn 😭" },
  { sender: 'Alex', content: "bro we need to talk about this" },
  { sender: 'Jordan', content: "okay but why does this always happen" },
];

export default function SlideWisdom({ data, lang = 'en' }) {
  const sentences = (data.wisdomSentences?.length > 0 ? data.wisdomSentences : MOCK_WISDOM).slice(0, 6);

  return (
    <div className="w-full h-full flex flex-col px-5 py-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="text-4xl mb-2">💬</div>
        <h2 className="text-white font-black text-2xl leading-tight">{t('wisdomHeader', lang)}</h2>
        <p className="text-white/40 text-sm mt-1">{t('wisdomPhrasesSub', lang)}</p>
      </motion.div>

      <div className="flex flex-col gap-3">
        {sentences.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1, type: 'spring', damping: 16 }}
            className={`bg-gradient-to-br ${COLORS[i % COLORS.length]} rounded-2xl px-4 py-3 border border-white/10`}
          >
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-1">{s.sender}</p>
            <p className="text-white font-semibold text-sm leading-snug">"{s.content}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}