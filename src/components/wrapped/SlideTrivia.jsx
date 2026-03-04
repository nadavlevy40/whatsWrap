import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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

  // Q1: Who said this quote?
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

  // Q2: Most active day of week
  if (data.dayOfWeekData) {
    const topDay = data.dayOfWeekData.reduce((a, b) => b.count > a.count ? b : a, data.dayOfWeekData[0]);
    const wrongDays = DAYS.filter(d => d !== topDay.day).sort(() => Math.random() - 0.5).slice(0, 3);
    qs.push({
      prompt: 'Which day do you chat the most?',
      emoji: '📅',
      options: shuffle([topDay.day, ...wrongDays]),
      correct: topDay.day,
    });
  }

  // Q3: Signature emoji for p0
  if (data.signatureEmojis?.[p0]) {
    const correctEmoji = data.signatureEmojis[p0];
    const wrongEmojis = ALL_EMOJIS.filter(e => e !== correctEmoji).sort(() => Math.random() - 0.5).slice(0, 3);
    qs.push({
      prompt: `What's ${p0}'s signature emoji?`,
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
      prompt: `What's ${p1}'s signature emoji?`,
      emoji: '🎭',
      options: shuffle([correctEmoji, ...wrongEmojis]),
      correct: correctEmoji,
    });
  }

  // Q5: Night Owl
  if (data.nightOwlCounts) {
    const nightOwl = p.reduce((a, b) => (data.nightOwlCounts[b] || 0) > (data.nightOwlCounts[a] || 0) ? b : a, p[0]);
    qs.push({
      prompt: "Who's texting at 3am like a gremlin? 🌙",
      emoji: '🦉',
      options: p.slice(0, 4),
      correct: nightOwl,
    });
  }

  // Q6: Who laughs more?
  if (data.laughCounts && p1 !== p0) {
    const funnier = (data.laughCounts[p0] || 0) >= (data.laughCounts[p1] || 0) ? p0 : p1;
    qs.push({
      prompt: 'Who sends more laugh reactions (lol, 😂, haha...)?',
      emoji: '😂',
      options: p.slice(0, 4),
      correct: funnier,
    });
  }

  // Q7: Who starts conversations more?
  if (data.initiatorCounts && p1 !== p0) {
    const starter = (data.initiatorCounts[p0] || 0) >= (data.initiatorCounts[p1] || 0) ? p0 : p1;
    qs.push({
      prompt: 'Who starts the conversation more often?',
      emoji: '🚀',
      options: p.slice(0, 4),
      correct: starter,
    });
  }

  // Q8: Who replies faster?
  if (data.replyTimes && p1 !== p0) {
    const faster = (data.replyTimes[p0] || 999) <= (data.replyTimes[p1] || 999) ? p0 : p1;
    qs.push({
      prompt: 'Who replies faster on average?',
      emoji: '⚡',
      options: p.slice(0, 4),
      correct: faster,
    });
  }

  // Q9: Most active hour
  if (data.hourlyData) {
    const topHour = data.hourlyData.reduce((a, b) => b.total > a.total ? b : a, data.hourlyData[0]);
    const formatHour = h => h === 0 ? '12am' : h < 12 ? `${h}am` : h === 12 ? '12pm' : `${h - 12}pm`;
    const wrongHours = [3, 9, 14, 20, 22].filter(h => h !== topHour.hour).sort(() => Math.random() - 0.5).slice(0, 3);
    qs.push({
      prompt: 'What hour is your chat most active?',
      emoji: '🕐',
      options: shuffle([formatHour(topHour.hour), ...wrongHours.map(formatHour)]),
      correct: formatHour(topHour.hour),
    });
  }

  // Q10: Second quote if available
  if (data.quotes && data.quotes.length > 1) {
    const validQuotes = data.quotes.filter(q => q?.content && q?.sender && p.includes(q.sender));
    if (validQuotes.length > 1) {
      const quote = validQuotes[Math.min(validQuotes.length - 1, 3 + Math.floor(Math.random() * 3))];
      if (quote && !qs.find(q => q.prompt === `"${quote.content}"`)) {
        qs.push({
          prompt: `"${quote.content}"`,
          emoji: '🤔',
          questionLabel: 'Who said this one? 👇',
          options: p.slice(0, 4),
          correct: quote.sender,
        });
      }
    }
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