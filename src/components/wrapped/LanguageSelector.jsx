import { motion } from 'framer-motion';

const LANGUAGES = [
  { id: 'en', flag: '🇺🇸', label: 'English', sub: 'For English chats' },
  { id: 'he', flag: '🇮🇱', label: 'עברית', sub: 'לשיחות בעברית' },
];

export default function LanguageSelector({ onSelect }) {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-6"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1a0533 40%, #24074a 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-white/30 text-xs tracking-widest uppercase mb-3">Step 1 of 3</p>
          <h1 className="text-white text-3xl font-black leading-tight mb-2">
            Chat Language?
          </h1>
          <p className="text-white/40 text-sm">We'll parse your chat accordingly</p>
        </motion.div>

        <div className="w-full flex flex-col gap-3">
          {LANGUAGES.map((lang, i) => (
            <motion.button
              key={lang.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                document.documentElement.dir = lang.id === 'he' ? 'rtl' : 'ltr';
                document.documentElement.lang = lang.id;
                onSelect(lang.id);
              }}
              className="w-full flex items-center gap-4 rounded-2xl p-5 text-left transition-all"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1.5px solid rgba(255,255,255,0.12)',
              }}
            >
              <span className="text-4xl flex-shrink-0">{lang.flag}</span>
              <div>
                <p className="text-white font-bold text-xl">{lang.label}</p>
                <p className="text-white/40 text-sm">{lang.sub}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}