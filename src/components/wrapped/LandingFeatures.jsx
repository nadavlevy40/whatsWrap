import { motion } from 'framer-motion';
import { Sparkles, Gift, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: Sparkles,
    title: 'AI-Powered Insights',
    text: 'Beyond simple counting. Our engine detects sentiment, laughter patterns, and your unique shared vocabulary.',
    color: 'rgba(192,132,252,0.2)',
    border: 'rgba(192,132,252,0.3)',
    iconColor: '#c084fc',
  },
  {
    icon: Gift,
    title: 'The Perfect Digital Gift',
    text: 'Forget boring cards. Send a personalized, interactive story that proves how much you talk (and who loves who more).',
    color: 'rgba(244,114,182,0.2)',
    border: 'rgba(244,114,182,0.3)',
    iconColor: '#f472b6',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy First',
    text: 'Your data never leaves your device. We analyze everything locally in your browser. Zero server uploads.',
    color: 'rgba(52,211,153,0.15)',
    border: 'rgba(52,211,153,0.25)',
    iconColor: '#34d399',
  },
];

export default function LandingFeatures() {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <p className="text-white/30 text-xs tracking-widest uppercase mb-2">The Why</p>
        <h2 className="text-white text-3xl font-black">More Than Just Stats.</h2>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              className="rounded-3xl p-6 flex flex-col gap-4"
              style={{ background: f.color, border: `1px solid ${f.border}`, backdropFilter: 'blur(10px)' }}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: `${f.color}`, border: `1px solid ${f.border}` }}>
                <Icon size={20} style={{ color: f.iconColor }} />
              </div>
              <h3 className="text-white font-bold text-base leading-snug">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}