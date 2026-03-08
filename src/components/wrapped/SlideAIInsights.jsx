import { motion } from 'framer-motion';
import { t } from './i18n';

function CoupleDynamic({ ai, lang = 'en' }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">AI Relationship Analysis 🤖</p>
        <h2 className="text-white text-3xl font-black leading-tight">{ai.dynamic || 'Your Dynamic'}</h2>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
        className="flex gap-3 w-full">
        <div className="flex-1 rounded-3xl p-4 text-center" style={{ background: 'linear-gradient(135deg, rgba(30,30,60,0.8), rgba(80,20,80,0.8))', border: '1px solid rgba(255,255,255,0.12)' }}>
          <div className="text-3xl mb-2">🐱</div>
          <p className="text-white/50 text-xs uppercase tracking-wide mb-1">Black Cat</p>
          <p className="text-white font-black text-xl">{ai.blackCatUser}</p>
        </div>
        <div className="flex-1 rounded-3xl p-4 text-center" style={{ background: 'linear-gradient(135deg, rgba(30,60,30,0.8), rgba(20,80,20,0.8))', border: '1px solid rgba(255,255,255,0.12)' }}>
          <div className="text-3xl mb-2">🐶</div>
          <p className="text-white/50 text-xs uppercase tracking-wide mb-1">Golden Retriever</p>
          <p className="text-white font-black text-xl">{ai.goldenRetrieverUser}</p>
        </div>
      </motion.div>

      {ai.dynamicRoast && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="w-full rounded-2xl px-5 py-4"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-white/50 text-xs mb-2 uppercase tracking-wide">The Roast ☕</p>
          <p className="text-white/90 text-sm leading-relaxed italic">"{ai.dynamicRoast}"</p>
        </motion.div>
      )}

      {ai.evolution && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
          className="w-full rounded-2xl px-5 py-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-white/50 text-xs mb-2 uppercase tracking-wide">The Evolution 📈</p>
          <p className="text-white/70 text-sm leading-relaxed">{ai.evolution}</p>
        </motion.div>
      )}

      {ai.mostApologetic && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="w-full rounded-xl px-4 py-3 text-center" style={{ background: 'rgba(255,200,100,0.08)' }}>
          <p className="text-yellow-300/70 text-sm">🙏 Most Apologetic: <span className="font-bold text-yellow-200">{ai.mostApologetic}</span></p>
        </motion.div>
      )}
    </div>
  );
}

function FriendsInsights({ ai }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">AI Group Analysis 🤖</p>
        <h2 className="text-white text-3xl font-black">The Verdict</h2>
      </motion.div>

      {ai.unhingedQuote && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
          className="w-full rounded-3xl p-5"
          style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(219,39,119,0.2))', border: '1px solid rgba(255,100,100,0.2)' }}>
          <p className="text-white/50 text-xs uppercase tracking-wide mb-2">🤪 Most Unhinged Quote</p>
          <p className="text-white font-bold text-sm leading-relaxed italic">"{ai.unhingedQuote.text}"</p>
          <p className="text-white/50 text-xs mt-2">— {ai.unhingedQuote.sender}</p>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        className="flex gap-3 w-full">
        {ai.therapist && (
          <div className="flex-1 rounded-2xl p-4 text-center" style={{ background: 'rgba(100,200,100,0.1)', border: '1px solid rgba(100,200,100,0.15)' }}>
            <div className="text-2xl mb-1">🧠</div>
            <p className="text-green-300/60 text-xs uppercase tracking-wide mb-1">Group Therapist</p>
            <p className="text-white font-black">{ai.therapist}</p>
          </div>
        )}
        {ai.patient && (
          <div className="flex-1 rounded-2xl p-4 text-center" style={{ background: 'rgba(200,100,100,0.1)', border: '1px solid rgba(200,100,100,0.15)' }}>
            <div className="text-2xl mb-1">😮‍💨</div>
            <p className="text-red-300/60 text-xs uppercase tracking-wide mb-1">The Patient</p>
            <p className="text-white font-black">{ai.patient}</p>
          </div>
        )}
      </motion.div>

      {ai.delusionalAward && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
          className="w-full rounded-2xl px-5 py-4"
          style={{ background: 'rgba(255,200,50,0.08)', border: '1px solid rgba(255,200,50,0.12)' }}>
          <p className="text-yellow-300/70 text-xs uppercase mb-2">🏆 Delusional Award: <span className="font-bold text-yellow-200">{ai.delusionalAward.user}</span></p>
          <p className="text-white/70 text-sm">{ai.delusionalAward.reason}</p>
        </motion.div>
      )}
    </div>
  );
}

function FamilyInsights({ ai, participants }) {
  const boomerEntries = Object.entries(ai.boomerScores || {}).sort((a, b) => b[1] - a[1]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">AI Family Analysis 🤖</p>
        <h2 className="text-white text-3xl font-black">Boomer Score</h2>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="w-full space-y-3">
        {boomerEntries.map(([name, score], i) => (
          <div key={name} className="flex items-center gap-3">
            <p className="text-white/70 text-sm w-24 truncate">{name}</p>
            <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <motion.div
                className="h-full rounded-full flex items-center justify-end pr-3"
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(8, score)}%` }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                style={{ background: score > 60 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'linear-gradient(90deg, #7c3aed, #db2777)' }}>
                <span className="text-white text-xs font-bold">{score}</span>
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>

      {ai.ignoredAward && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
          className="w-full rounded-3xl p-5"
          style={{ background: 'linear-gradient(135deg, rgba(100,100,150,0.3), rgba(80,30,100,0.3))', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-white/50 text-xs uppercase mb-2">👻 Left On Read Award</p>
          <p className="text-white font-black text-xl mb-1">{ai.ignoredAward.user}</p>
          <p className="text-white/60 text-sm">{ai.ignoredAward.roast}</p>
        </motion.div>
      )}
    </div>
  );
}

export default function SlideAIInsights({ data }) {
  const ai = data.aiInsights;
  const mode = data.mode || 'couple';

  if (!ai) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-white/30 text-sm">AI insights unavailable</p>
      </div>
    );
  }

  const modeAI = ai[mode] || ai;

  if (mode === 'couple') return <CoupleDynamic ai={modeAI} />;
  if (mode === 'friends') return <FriendsInsights ai={modeAI} />;
  if (mode === 'family') return <FamilyInsights ai={modeAI} participants={data.participants} />;
  return null;
}