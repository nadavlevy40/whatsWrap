import { motion } from 'framer-motion';

function CoupleInsights({ insights }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-5">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">AI Deep Dive 🤖</p>
        <h2 className="text-white text-3xl font-black leading-tight">{insights.dynamic}</h2>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
        className="flex gap-3 w-full">
        <div className="flex-1 rounded-2xl p-4 text-center" style={{ background: 'rgba(124,58,237,0.25)', border: '1px solid rgba(124,58,237,0.4)' }}>
          <div className="text-2xl mb-1">🖤</div>
          <p className="text-white/50 text-xs mb-1">Black Cat</p>
          <p className="text-white font-bold">{insights.blackCatUser}</p>
        </div>
        <div className="flex-1 rounded-2xl p-4 text-center" style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }}>
          <div className="text-2xl mb-1">🐕</div>
          <p className="text-white/50 text-xs mb-1">Golden Retriever</p>
          <p className="text-white font-bold">{insights.goldenRetrieverUser}</p>
        </div>
      </motion.div>

      {insights.dynamicRoast && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="w-full rounded-2xl p-4"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-white/40 text-xs mb-2">🔥 The Roast</p>
          <p className="text-white/90 text-sm leading-relaxed italic">"{insights.dynamicRoast}"</p>
        </motion.div>
      )}

      {insights.evolution && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="w-full rounded-2xl p-4"
          style={{ background: 'rgba(255,255,255,0.05)' }}>
          <p className="text-white/40 text-xs mb-2">📈 Evolution</p>
          <p className="text-white/70 text-sm leading-relaxed">{insights.evolution}</p>
        </motion.div>
      )}

      {insights.mostApologetic && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          className="w-full rounded-2xl p-3 text-center"
          style={{ background: 'rgba(255,255,255,0.05)' }}>
          <span className="text-white/50 text-xs">Most Apologetic: </span>
          <span className="text-white font-bold text-sm">🙏 {insights.mostApologetic}</span>
        </motion.div>
      )}
    </div>
  );
}

function FriendsInsights({ insights }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-5">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">AI Deep Dive 🤖</p>
        <h2 className="text-white text-3xl font-black leading-tight">Group Therapy</h2>
      </motion.div>

      {insights.unhingedQuote && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
          className="w-full rounded-2xl p-5"
          style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(219,39,119,0.2))', border: '1px solid rgba(239,68,68,0.3)' }}>
          <p className="text-white/50 text-xs mb-2">🤯 Most Unhinged Quote</p>
          <p className="text-white text-sm italic leading-relaxed">"{insights.unhingedQuote.text}"</p>
          <p className="text-white/40 text-xs mt-2">— {insights.unhingedQuote.sender}</p>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex gap-3 w-full">
        {insights.therapist && (
          <div className="flex-1 rounded-2xl p-4 text-center" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
            <div className="text-2xl mb-1">🧠</div>
            <p className="text-white/50 text-xs mb-1">Therapist</p>
            <p className="text-white font-bold text-sm">{insights.therapist}</p>
          </div>
        )}
        {insights.patient && (
          <div className="flex-1 rounded-2xl p-4 text-center" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
            <div className="text-2xl mb-1">🛋️</div>
            <p className="text-white/50 text-xs mb-1">The Patient</p>
            <p className="text-white font-bold text-sm">{insights.patient}</p>
          </div>
        )}
      </motion.div>

      {insights.delusionalAward && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="w-full rounded-2xl p-4"
          style={{ background: 'rgba(255,255,255,0.07)' }}>
          <p className="text-white/50 text-xs mb-1">🏆 Delusional Award → <span className="text-yellow-400">{insights.delusionalAward.user}</span></p>
          <p className="text-white/70 text-sm">{insights.delusionalAward.reason}</p>
        </motion.div>
      )}
    </div>
  );
}

function FamilyInsights({ insights }) {
  const boomerScores = insights.boomerScores || {};
  const sorted = Object.entries(boomerScores).sort((a, b) => b[1] - a[1]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-5">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">AI Deep Dive 🤖</p>
        <h2 className="text-white text-3xl font-black leading-tight">Boomer Score™</h2>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="w-full space-y-3">
        {sorted.map(([name, score], i) => (
          <motion.div key={name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-3">
            <p className="text-white/70 text-sm w-20 truncate">{name}</p>
            <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                className="h-full rounded-full"
                style={{ background: score > 70 ? 'linear-gradient(90deg,#f97316,#ef4444)' : 'linear-gradient(90deg,#7c3aed,#db2777)' }} />
            </div>
            <p className="text-white font-bold text-sm w-8 text-right">{score}</p>
          </motion.div>
        ))}
      </motion.div>

      {insights.ignoredAward && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="w-full rounded-2xl p-4"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-white/50 text-xs mb-1">👻 Left on Read Award → <span className="text-pink-400 font-bold">{insights.ignoredAward.user}</span></p>
          <p className="text-white/70 text-sm">{insights.ignoredAward.roast}</p>
        </motion.div>
      )}
    </div>
  );
}

export default function SlideAIInsights({ data }) {
  const insights = data.aiInsights;
  const mode = data.mode || 'couple';

  if (!insights) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center gap-4">
        <div className="text-5xl">🤖</div>
        <p className="text-white/50 text-lg">AI insights not available</p>
      </div>
    );
  }

  if (mode === 'friends') return <FriendsInsights insights={insights} />;
  if (mode === 'family') return <FamilyInsights insights={insights} />;
  return <CoupleInsights insights={insights} />;
}