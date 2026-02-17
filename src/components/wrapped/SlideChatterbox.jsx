import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';

export default function SlideChatterbox({ data }) {
  const [p1, p2] = data.participants;
  const c1 = data.msgCounts[p1];
  const c2 = data.msgCounts[p2];
  const total = c1 + c2;
  const winner = c1 > c2 ? p1 : p2;
  const winnerCount = Math.max(c1, c2);
  const loserCount = Math.min(c1, c2);
  const pct = Math.round((winnerCount / loserCount - 1) * 100);

  const chartData = data.participants.map(p => ({ name: p, messages: data.msgCounts[p] }));

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">The Chatterbox</p>
        <h2 className="text-white text-3xl font-black">Who talks more?</h2>
      </motion.div>

      <motion.div initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
        className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barCategoryGap="35%">
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 700 }} />
            <Bar dataKey="messages" radius={[12, 12, 4, 4]} isAnimationActive animationBegin={600} animationDuration={1000}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={i === 0 ? 'url(#grad1)' : 'url(#grad2)'} />
              ))}
            </Bar>
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#db2777" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="flex gap-4 w-full">
        {data.participants.map((p) => (
          <div key={p} className="flex-1 rounded-2xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)' }}>
            <p className="text-white/50 text-xs mb-1">{p}</p>
            <p className="text-white font-black text-2xl">{((data.msgCounts[p] / total) * 100).toFixed(0)}%</p>
          </div>
        ))}
      </motion.div>

      {/* Winner declaration */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
        className="w-full rounded-2xl px-6 py-4 text-center"
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(219,39,119,0.3))', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-white font-bold text-lg">
          🏆 <span style={{ color: '#c084fc' }}>{winner}</span> talks {pct}% more!
        </p>
      </motion.div>
    </div>
  );
}