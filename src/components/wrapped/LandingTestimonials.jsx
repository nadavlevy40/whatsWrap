import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "I finally proved to my boyfriend that I'm the funny one in the relationship. The 'Laugh Meter' doesn't lie!",
    author: 'Sarah & Mike, together 3 years.',
    tag: 'Couple',
    tagColor: 'rgba(244,114,182,0.25)',
    tagBorder: 'rgba(244,114,182,0.5)',
    tagText: '#f472b6',
    stars: 5,
  },
  {
    quote: "We used this for our family group chat. Finding out Mom is the 'Ghost' of the group was the highlight of our Sunday dinner.",
    author: 'The Cohen Family.',
    tag: 'Group Chat',
    tagColor: 'rgba(99,102,241,0.25)',
    tagBorder: 'rgba(99,102,241,0.5)',
    tagText: '#818cf8',
    stars: 5,
  },
  {
    quote: "The 'Roast Mode' destroyed us. It knew exactly that we only talk about food. 10/10 would recommend.",
    author: 'Jessica & Dan.',
    tag: 'BFFs',
    tagColor: 'rgba(52,211,153,0.2)',
    tagBorder: 'rgba(52,211,153,0.4)',
    tagText: '#34d399',
    stars: 5,
  },
];

export default function LandingTestimonials() {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 pb-16">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <p className="text-white/30 text-xs tracking-widest uppercase mb-2">Social Proof</p>
        <h2 className="text-white text-3xl font-black">Stories from the Chat. 💬</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.12 }}
            className="rounded-3xl p-6 flex flex-col gap-4 justify-between"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
            {/* Stars */}
            <div className="flex gap-0.5">
              {Array.from({ length: t.stars }).map((_, s) => (
                <span key={s} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>

            {/* Quote */}
            <p className="text-white/80 text-sm leading-relaxed flex-1">"{t.quote}"</p>

            {/* Footer */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <p className="text-white/35 text-xs">{t.author}</p>
              <span className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: t.tagColor, border: `1px solid ${t.tagBorder}`, color: t.tagText }}>
                {t.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}