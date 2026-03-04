import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { t } from './i18n';

function formatMinutes(mins) {
  if (!mins && mins !== 0) return '—';
  if (mins < 1) return '< 1 min';
  if (mins < 60) return `${Math.round(mins)} min`;
  const h = Math.floor(mins / 60);
  const m = Math.round(mins % 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export default function SlideGhostInitiator({ data, lang = 'en' }) {
  const [p1, p2] = data.participants;
  const replyTimes = data.replyTimes || { [p1]: 8, [p2]: 45 };
  const initiators = data.initiatorCounts || { [p1]: 60, [p2]: 40 };

  const t1 = replyTimes[p1] || 0;
  const t2 = replyTimes[p2] || 0;
  const ghost = t1 >= t2 ? p1 : p2;
  const faster = t1 < t2 ? p1 : p2;

  const totalInit = (initiators[p1] || 0) + (initiators[p2] || 0) || 1;
  const pieData = [
    { name: p1, value: initiators[p1] || 0 },
    { name: p2, value: initiators[p2] || 0 },
  ];
  const COLORS = ['#9333ea', '#ec4899'];
  const bigInitiator = (initiators[p1] || 0) >= (initiators[p2] || 0) ? p1 : p2;

  return (
    <div className="w-full h-full flex flex-col px-5 pt-6 pb-4 gap-5 overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-1">{t('conversationDynamics', lang)}</p>
        <h2 className="text-white text-2xl font-black">{t('ghostInitiator', lang)}</h2>
      </motion.div>

      {/* Reply times */}
      <div>
        <p className="text-white/40 text-xs uppercase tracking-wider mb-2 text-center">{t('avgReplyTime', lang)}</p>
        <div className="flex gap-3">
          {[p1, p2].map((p, i) => {
            const mins = replyTimes[p] || 0;
            const isGhost = p === ghost;
            return (
              <motion.div key={p}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15, type: 'spring' }}
                className="flex-1 rounded-2xl p-4 text-center"
                style={{
                  background: isGhost ? 'rgba(99,102,241,0.12)' : 'rgba(16,185,129,0.1)',
                  border: isGhost ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(16,185,129,0.3)',
                }}>
                <span className="text-2xl block mb-1">{isGhost ? '👻' : '⚡'}</span>
                <p className="text-white font-bold text-sm">{p}</p>
                <p className="text-white font-black text-xl mt-1">{formatMinutes(mins)}</p>
                <p className="text-xs mt-1 font-semibold"
                  style={{ color: isGhost ? '#818cf8' : '#34d399' }}>
                  {isGhost ? t('theGhost', lang) : t('speedRacer', lang)}
                </p>
              </motion.div>
            );
          })}
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="text-center text-white/30 text-xs mt-2">
          {typeof t('ghostTakes', lang) === 'function' ? t('ghostTakes', lang)(ghost, formatMinutes(Math.abs(t1 - t2))) : `${ghost} takes ${formatMinutes(Math.abs(t1 - t2))} longer to reply`}
        </motion.p>
      </div>

      <div className="w-full h-px bg-white/10" />

      {/* Initiator pie */}
      <div>
        <p className="text-white/40 text-xs uppercase tracking-wider mb-2 text-center">Who Starts Conversations?</p>
        <p className="text-white/25 text-xs text-center mb-3">(message after 6h+ silence)</p>
        <div className="flex items-center gap-4">
          <div style={{ width: 110, height: 110 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={28} outerRadius={50} paddingAngle={3} startAngle={90} endAngle={450}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {pieData.map((item, i) => (
              <motion.div key={item.name}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: COLORS[i] }} />
                <span className="text-white/70 text-sm font-medium flex-1">{item.name}</span>
                <span className="text-white font-bold text-sm">{Math.round((item.value / totalInit) * 100)}%</span>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="mt-2 px-3 py-1.5 rounded-xl text-xs font-bold text-center"
              style={{ background: 'rgba(236,72,153,0.15)', color: '#f472b6', border: '1px solid rgba(236,72,153,0.25)' }}>
              🚀 {bigInitiator} keeps the chat alive!
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}