import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function launchConfetti() {
  if (typeof window !== 'undefined' && window.confetti) {
    window.confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#c084fc', '#f472b6', '#fb7185', '#fbbf24'] });
  }
}

function QuoteQuestion({ data, onAnswer }) {
  const quote = data.quotes[Math.floor(Math.random() * Math.min(data.quotes.length, 5))];
  const [answered, setAnswered] = useState(null);
  const [shake, setShake] = useState(false);

  const handleAnswer = (p) => {
    if (answered) return;
    const correct = p === quote.sender;
    setAnswered({ chosen: p, correct });
    if (correct) launchConfetti();
    else { setShake(true); setTimeout(() => setShake(false), 600); }
    setTimeout(() => onAnswer(correct), 1500);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Trivia Round 1</p>
        <h2 className="text-white text-2xl font-black">Who said this? 🤔</h2>
      </motion.div>

      <motion.div
        animate={shake ? { x: [-10, 10, -8, 8, -5, 5, 0], backgroundColor: ['rgba(239,68,68,0.3)', 'rgba(255,255,255,0.06)'] } : {}}
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full rounded-3xl p-6 text-center"
        style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-3xl mb-3">💬</p>
        <p className="text-white text-xl font-semibold italic">"{quote?.content}"</p>
      </motion.div>

      <div className="flex gap-3 w-full">
        {data.participants.map((p, i) => {
          const isChosen = answered?.chosen === p;
          const isCorrect = answered?.correct && isChosen;
          const isWrong = !answered?.correct && isChosen;
          return (
            <motion.button key={p}
              whileHover={!answered ? { scale: 1.04 } : {}}
              whileTap={!answered ? { scale: 0.96 } : {}}
              onClick={() => handleAnswer(p)}
              disabled={!!answered}
              className="flex-1 py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300"
              style={{
                background: isCorrect ? 'linear-gradient(135deg, #059669, #10b981)' :
                  isWrong ? 'linear-gradient(135deg, #dc2626, #ef4444)' :
                    i === 0 ? 'linear-gradient(135deg, #7c3aed, #9333ea)' : 'linear-gradient(135deg, #db2777, #ec4899)',
                opacity: answered && !isChosen ? 0.4 : 1,
              }}>
              {isCorrect ? '✅ Correct!' : isWrong ? '❌ Wrong!' : p}
            </motion.button>
          );
        })}
      </div>

      {answered && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className={`text-center font-semibold ${answered.correct ? 'text-emerald-400' : 'text-red-400'}`}>
          {answered.correct ? '🎉 You know each other so well!' : `It was ${quote?.sender}! Better luck next time 😅`}
        </motion.p>
      )}
    </div>
  );
}

function NightOwlQuestion({ data, onAnswer }) {
  const [answered, setAnswered] = useState(null);
  const [shake, setShake] = useState(false);
  const nightOwlWinner = data.nightOwlCounts[data.participants[0]] >= data.nightOwlCounts[data.participants[1]]
    ? data.participants[0] : data.participants[1];

  const handleAnswer = (p) => {
    if (answered) return;
    const correct = p === nightOwlWinner;
    setAnswered({ chosen: p, correct });
    if (correct) launchConfetti();
    else { setShake(true); setTimeout(() => setShake(false), 600); }
    setTimeout(() => onAnswer(correct), 1500);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Trivia Round 2</p>
        <h2 className="text-white text-2xl font-black">Who's the Night Owl? 🦉</h2>
        <p className="text-white/40 text-sm mt-1">Based on messages sent after midnight</p>
      </motion.div>

      <div className="flex gap-3 w-full">
        {data.participants.map((p) => (
          <motion.div key={p} className="flex-1 rounded-2xl p-4 text-center"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-3xl mb-1">🌙</p>
            <p className="text-white/60 text-xs">{data.nightOwlCounts[p]} late msgs</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3 w-full">
        {data.participants.map((p, i) => {
          const isChosen = answered?.chosen === p;
          const isCorrect = answered?.correct && isChosen;
          const isWrong = !answered?.correct && isChosen;
          return (
            <motion.button key={p}
              whileHover={!answered ? { scale: 1.04 } : {}}
              whileTap={!answered ? { scale: 0.96 } : {}}
              onClick={() => handleAnswer(p)}
              disabled={!!answered}
              className="flex-1 py-4 rounded-2xl font-bold text-white text-lg transition-all"
              style={{
                background: isCorrect ? 'linear-gradient(135deg, #059669, #10b981)' :
                  isWrong ? 'linear-gradient(135deg, #dc2626, #ef4444)' :
                    i === 0 ? 'linear-gradient(135deg, #7c3aed, #9333ea)' : 'linear-gradient(135deg, #db2777, #ec4899)',
                opacity: answered && !isChosen ? 0.4 : 1,
              }}>
              {isCorrect ? '✅ Correct!' : isWrong ? '❌ Wrong!' : p}
            </motion.button>
          );
        })}
      </div>

      {answered && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className={`text-center font-semibold ${answered.correct ? 'text-emerald-400' : 'text-red-400'}`}>
          {answered.correct ? '🎉 You know your night owl!' : `It was ${nightOwlWinner}! They never sleep 🌙`}
        </motion.p>
      )}
    </div>
  );
}

function ScoreScreen({ score, total, onContinue }) {
  useEffect(() => { if (score === total) launchConfetti(); }, []);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-8 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10 }}
        className="text-8xl">{score === total ? '🏆' : score > 0 ? '🤔' : '😬'}</motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Trivia Results</p>
        <h2 className="text-white font-black text-4xl">{score}/{total} Correct</h2>
        <p className="text-white/50 mt-2">
          {score === total ? 'You two are literally soulmates.' : score > 0 ? 'Not bad, you know each other pretty well!' : 'Do you even know this person? 😂'}
        </p>
      </motion.div>
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        onClick={onContinue}
        className="px-8 py-4 rounded-2xl font-bold text-white"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
        Continue →
      </motion.button>
    </div>
  );
}

export default function SlideTrivia({ data, onNext }) {
  const [step, setStep] = useState(0); // 0=quote, 1=nightowl, 2=score
  const [score, setScore] = useState(0);

  const handleAnswer = useCallback((correct) => {
    if (correct) setScore(s => s + 1);
    setStep(s => s + 1);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {step === 0 && (
        <motion.div key="quote" className="w-full h-full" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
          <QuoteQuestion data={data} onAnswer={handleAnswer} />
        </motion.div>
      )}
      {step === 1 && (
        <motion.div key="nightowl" className="w-full h-full" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
          <NightOwlQuestion data={data} onAnswer={handleAnswer} />
        </motion.div>
      )}
      {step === 2 && (
        <motion.div key="score" className="w-full h-full" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
          <ScoreScreen score={score} total={2} onContinue={onNext} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}