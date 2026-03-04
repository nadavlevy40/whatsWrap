import { motion } from 'framer-motion';
import { t } from './i18n';

function computeAwards(data, lang = 'en') {
  const { participants, msgCounts = {}, laughCounts = {}, nightOwlCounts = {}, capsLockCounts = {}, mediaCounts = {} } = data;

  const awards = [];

  // The Organizer: uses words like dinner, time, when, plan, meet
  const organizer = participants.reduce((best, p) => {
    const score = (data.organizerScore || {})[p] || 0;
    return (!best || score > (data.organizerScore || {})[best]) ? p : best;
  }, null);
  if (organizer) awards.push({ emoji: '📋', title: t('theOrganizer', lang), desc: t('organizerDesc', lang), winner: organizer });

  // The Comedian
  const comedian = participants.reduce((best, p) => {
    return (!best || (laughCounts[p] || 0) > (laughCounts[best] || 0)) ? p : best;
  }, null);
  if (comedian) awards.push({ emoji: '🎭', title: t('theComedianAward', lang), desc: t('comedianDesc', lang), winner: comedian });

  // The Night Owl
  const nightOwl = participants.reduce((best, p) => {
    return (!best || (nightOwlCounts[p] || 0) > (nightOwlCounts[best] || 0)) ? p : best;
  }, null);
  if (nightOwl) awards.push({ emoji: '🦉', title: t('theNightOwlAward', lang), desc: t('nightOwlDesc', lang), winner: nightOwl });

  // The Loudest
  const loudest = participants.reduce((best, p) => {
    return (!best || (capsLockCounts[p] || 0) > (capsLockCounts[best] || 0)) ? p : best;
  }, null);
  if (loudest) awards.push({ emoji: '📣', title: t('theLoudest', lang), desc: t('loudestDesc', lang), winner: loudest });

  return awards.slice(0, 4);
}

export default function SlideFamilyAwards({ data }) {
  const awards = computeAwards(data);

  const COLORS = [
    { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.3)', text: '#fbbf24' },
    { bg: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.3)', text: '#c084fc' },
    { bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)', text: '#34d399' },
    { bg: 'rgba(244,114,182,0.12)', border: 'rgba(244,114,182,0.3)', text: '#f472b6' },
  ];

  return (
    <div className="flex flex-col h-full px-6 pt-10 pb-6 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Family Wrapped</p>
        <h2 className="text-white text-3xl font-black leading-tight">Family<br />Awards 🏅</h2>
        <p className="text-white/40 text-sm mt-2">The results are in.</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {awards.map((award, i) => (
          <motion.div key={award.title}
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 150 }}
            className="rounded-2xl p-4 flex flex-col gap-2"
            style={{ background: COLORS[i].bg, border: `1px solid ${COLORS[i].border}` }}
          >
            <div className="text-2xl">{award.emoji}</div>
            <p className="text-white font-black text-sm leading-tight">{award.title}</p>
            <p className="text-white/30 text-xs leading-snug">{award.desc}</p>
            <p className="font-bold text-sm mt-auto" style={{ color: COLORS[i].text }}>{award.winner}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}