import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_EMOJIS = ['😂', '❤️', '🔥', '😭', '😍', '🙏', '💀', '😅', '🥹', '😤', '🤣', '✨', '💯', '🫶', '🤯', '😩', '🫠', '💅', '👀', '🥺'];

function launchConfetti() {
  if (typeof window !== 'undefined' && window.confetti) {
    window.confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#c084fc', '#f472b6', '#fb7185', '#fbbf24'] });
  }
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function MultiChoiceQuestion({ questionNum, totalQuestions, label, prompt, emoji, options, correctAnswer, onAnswer }) {
  const [answered, setAnswered] = useState(null);
  const [shake, setShake] = useState(false);

  const shuffledOptions = useMemo(() => shuffle(options), []);

  const handleAnswer = (opt) => {
    if (answered) return;
    const correct = opt === correctAnswer;
    setAnswered({ chosen: opt, correct });
    if (correct) launchConfetti();
    else { setShake(true); setTimeout(() => setShake(false), 600); }
    setTimeout(() => onAnswer(correct), 1600);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-6" onClick={e => e.stopPropagation()}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">
          Round {questionNum} of {totalQuestions}
        </p>
        <div className="text-4xl mb-2">{emoji}</div>
        {label && <p className="text-white/60 text-sm mb-1">{label}</p>}
        <h2 className="text-white text-xl font-black leading-snug">{prompt}</h2>
      </motion.div>

      <motion.div
        animate={shake ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 gap-3 w-full">
        {shuffledOptions.map((opt, i) => {
          const isChosen = answered?.chosen === opt;
          const isCorrect = opt === correctAnswer;
          const showCorrect = answered && isCorrect;
          const showWrong = answered && isChosen && !isCorrect;
          return (
            <motion.button key={opt}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={!answered ? { scale: 1.04 } : {}}
              whileTap={!answered ? { scale: 0.96 } : {}}
              onClick={() => handleAnswer(opt)}
              disabled={!!answered}
              className="py-4 px-2 rounded-2xl font-bold text-white text-base transition-all duration-300 text-center"
              style={{
                background: showCorrect
                  ? 'linear-gradient(135deg, #059669, #10b981)'
                  : showWrong
                    ? 'linear-gradient(135deg, #dc2626, #ef4444)'
                    : 'rgba(255,255,255,0.08)',
                border: showCorrect
                  ? '2px solid #10b981'
                  : showWrong
                    ? '2px solid #ef4444'
                    : '2px solid rgba(255,255,255,0.12)',
                opacity: answered && !isChosen && !isCorrect ? 0.35 : 1,
              }}>
              {showCorrect ? '✅ ' : showWrong ? '❌ ' : ''}{opt}
            </motion.button>
          );
        })}
      </motion.div>

      {answered && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className={`text-center font-semibold text-sm ${answered.correct ? 'text-emerald-400' : 'text-red-400'}`}>
          {answered.correct ? '🎉 Nailed it!' : `The answer was "${correctAnswer}" 😅`}
        </motion.p>
      )}
    </div>
  );
}

function ScoreScreen({ score, total, onContinue }) {
  useEffect(() => { if (score >= total - 1) launchConfetti(); }, []);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-8 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10 }}
        className="text-8xl">{score === total ? '🏆' : score >= total / 2 ? '🤔' : '😬'}</motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Trivia Results</p>
        <h2 className="text-white font-black text-4xl">{score}/{total} Correct</h2>
        <p className="text-white/50 mt-2">
          {score === total ? 'You two are literally soulmates.' : score >= total / 2 ? 'Not bad — you know each other pretty well!' : 'Do you even know this person? 😂'}
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

function buildQuestions(data) {
  const qs = [];
  const p = data.participants;
  const p0 = p[0];
  const p1 = p[1] || p[0];

  // Q1: Quote attribution (1st)
  if (data.quotes && data.quotes.length > 0) {
    const validQuotes = data.quotes.filter(q => q?.content && q?.sender && p.includes(q.sender));
    if (validQuotes.length > 0) {
      const quote = validQuotes[Math.floor(Math.random() * Math.min(validQuotes.length, 6))];
      qs.push({
        prompt: `"${quote.content}"`,
        emoji: '💬',
        questionLabel: 'Who said this? 👇',
        options: p.slice(0, 4),
        correct: quote.sender,
      });
    }
  }

  // Q2: Quote attribution (2nd — different quote)
  if (data.quotes && data.quotes.length > 1) {
    const validQuotes = data.quotes.filter(q => q?.content && q?.sender && p.includes(q.sender));
    if (validQuotes.length > 1) {
      const usedPrompt = qs[0]?.prompt;
      const remaining = validQuotes.filter(q => `"${q.content}"` !== usedPrompt);
      if (remaining.length > 0) {
        const quote = remaining[Math.floor(Math.random() * remaining.length)];
        qs.push({
          prompt: `"${quote.content}"`,
          emoji: '🤔',
          questionLabel: 'And who said this? 👇',
          options: p.slice(0, 4),
          correct: quote.sender,
        });
      }
    }
  }

  // Q3: Signature emoji for p0
  if (data.signatureEmojis?.[p0]) {
    const correctEmoji = data.signatureEmojis[p0];
    const wrongEmojis = ALL_EMOJIS.filter(e => e !== correctEmoji).sort(() => Math.random() - 0.5).slice(0, 3);
    qs.push({
      prompt: `What's ${p0}'s most-used emoji?`,
      emoji: '✨',
      options: shuffle([correctEmoji, ...wrongEmojis]),
      correct: correctEmoji,
    });
  }

  // Q4: Signature emoji for p1
  if (p1 !== p0 && data.signatureEmojis?.[p1]) {
    const correctEmoji = data.signatureEmojis[p1];
    const wrongEmojis = ALL_EMOJIS.filter(e => e !== correctEmoji && e !== data.signatureEmojis[p0]).sort(() => Math.random() - 0.5).slice(0, 3);
    qs.push({
      prompt: `And ${p1}'s most-used emoji?`,
      emoji: '🎭',
      options: shuffle([correctEmoji, ...wrongEmojis]),
      correct: correctEmoji,
    });
  }

  // Q5: Who replies faster? (avg reply time — lower = faster)
  if (data.replyTimes && p1 !== p0) {
    const faster = p.slice(0, 4).reduce((a, b) =>
      (data.replyTimes[a] || 999) <= (data.replyTimes[b] || 999) ? a : b
    );
    if (p.slice(0, 4).length >= 2) {
      qs.push({
        prompt: 'Who replies fastest on average?',
        emoji: '⚡',
        options: p.slice(0, 4),
        correct: faster,
      });
    }
  }

  // Q6: Who starts conversations more often?
  if (data.initiatorCounts && p1 !== p0) {
    const starter = p.reduce((a, b) => (data.initiatorCounts[b] || 0) > (data.initiatorCounts[a] || 0) ? b : a, p[0]);
    qs.push({
      prompt: 'Who breaks the silence and starts conversations more often?',
      emoji: '🗣️',
      options: p.slice(0, 4),
      correct: starter,
    });
  }

  // Q7: Top word — 3 decoys from words ranked 4-7
  if (data.topWords && data.topWords.length >= 4) {
    const correct = data.topWords[0].word;
    const decoys = data.topWords.slice(3, 7).map(w => w.word).sort(() => Math.random() - 0.5).slice(0, 3);
    qs.push({
      prompt: "Guess the word you used the most in this chat",
      emoji: '📝',
      options: shuffle([correct, ...decoys]),
      correct,
    });
  }

  // Q8: Night owl (most messages between midnight and 5am)
  if (data.nightOwlCounts && p1 !== p0) {
    const nightOwl = p.reduce((a, b) => (data.nightOwlCounts[b] || 0) > (data.nightOwlCounts[a] || 0) ? b : a, p[0]);
    qs.push({
      prompt: 'Who is most likely to be texting at 3am? 🌙',
      emoji: '🦉',
      options: p.slice(0, 4),
      correct: nightOwl,
    });
  }

  // Q9: Laugh count — who laughs more?
  if (data.laughCounts && p1 !== p0) {
    const funniest = p.reduce((a, b) => (data.laughCounts[b] || 0) > (data.laughCounts[a] || 0) ? b : a, p[0]);
    qs.push({
      prompt: 'Who sends more "haha", "lol" and laugh reactions?',
      emoji: '😂',
      options: p.slice(0, 4),
      correct: funniest,
    });
  }

  // Q10: Total messages ballpark
  if (data.totalMessages) {
    const real = data.totalMessages;
    // Generate 3 plausible but wrong ranges
    const ranges = [
      `${Math.round(real * 0.3).toLocaleString()} – ${Math.round(real * 0.45).toLocaleString()}`,
      `${Math.round(real * 0.55).toLocaleString()} – ${Math.round(real * 0.7).toLocaleString()}`,
      `${Math.round(real * 1.4).toLocaleString()} – ${Math.round(real * 1.7).toLocaleString()}`,
    ];
    const correctRange = `${Math.round(real * 0.9).toLocaleString()} – ${Math.round(real * 1.1).toLocaleString()}`;
    qs.push({
      prompt: 'How many total messages are in this chat?',
      emoji: '🔢',
      options: shuffle([correctRange, ...ranges]),
      correct: correctRange,
    });
  }

  return qs.slice(0, 10);
}

export default function SlideTrivia({ data, onNext }) {
  const questions = useMemo(() => buildQuestions(data), [data]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = useCallback((correct) => {
    if (correct) setScore(s => s + 1);
    setStep(s => s + 1);
  }, []);

  const total = questions.length;
  const isScore = step >= total;
  const q = questions[step];

  return (
    <AnimatePresence mode="wait">
      {!isScore && q ? (
        <motion.div key={`q-${step}`} className="w-full h-full"
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
          <MultiChoiceQuestion
            questionNum={step + 1}
            totalQuestions={total}
            label={q.questionLabel}
            prompt={q.prompt}
            emoji={q.emoji}
            options={q.options}
            correctAnswer={q.correct}
            onAnswer={handleAnswer}
          />
        </motion.div>
      ) : (
        <motion.div key="score" className="w-full h-full"
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
          <ScoreScreen score={score} total={total} onContinue={onNext} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}