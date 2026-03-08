import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, MessageCircle } from 'lucide-react';
import { t } from './i18n';

function generateShareUrl() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const code = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `chatrewind.app/share/${code}`;
}

function QRPlaceholder({ url }) {
  // Simple visual QR placeholder — static grid pattern
  const cells = useMemo(() => {
    const seed = url.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return Array.from({ length: 25 }, (_, i) => ((seed * (i + 7) * 13) % 17) > 7);
  }, [url]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="p-3 bg-white rounded-2xl">
        <div className="grid gap-[2px]" style={{ gridTemplateColumns: 'repeat(5, 1fr)', width: 80, height: 80 }}>
          {cells.map((filled, i) => (
            <div key={i} className="rounded-[2px]" style={{ background: filled ? '#1a0533' : 'white' }} />
          ))}
        </div>
      </div>
      <p className="text-white/40 text-xs text-center">{t('scanToOpen', lang)}</p>
    </div>
  );
}

export default function SlideShare({ data, onRestart, lang = 'en' }) {
  const shareUrl = useMemo(generateShareUrl, []);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${shareUrl}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const msgText = lang === 'he'
      ? `🎉 תראו את הוואטסראפ שלנו! https://${shareUrl}`
      : `🎉 Check out our WhatsApp Wrapped report! https://${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msgText)}`, '_blank');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-6 relative overflow-hidden" onClick={e => e.stopPropagation()}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.35) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)' }} />
      </div>

      {/* Success badge */}
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', damping: 12 }}
        className="relative z-10 flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
          style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
          ✓
        </div>
        <p className="text-white/50 text-xs tracking-widest uppercase">{t('reportUnlocked', lang)}</p>
        <h2 className="text-white text-2xl font-black text-center leading-tight">
          {t('shareHeadline', lang).split('\n')[0]}<br />
          <span style={{ background: 'linear-gradient(135deg, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t('shareHeadline', lang).split('\n')[1] || t('shareHeadlineAccent', lang)}
          </span>
        </h2>
      </motion.div>

      {/* Card */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: 'spring' }}
        className="w-full relative z-10 rounded-3xl p-6 space-y-5"
        style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(192,132,252,0.2)' }}>

        {/* Link + Copy */}
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{t('yourUniqueLink', lang)}</p>
          <div className="flex items-center gap-2 rounded-2xl overflow-hidden"
            style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <input
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent text-white/80 text-sm px-4 py-3 outline-none min-w-0 font-mono"
            />
            <button onClick={handleCopy}
              className="px-4 py-3 flex items-center gap-1.5 text-sm font-semibold transition-all flex-shrink-0"
              style={{ color: copied ? '#10b981' : '#c084fc' }}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? t('copied', lang) : t('copyLink', lang)}
            </button>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex justify-center">
          <QRPlaceholder url={shareUrl} />
        </div>

        {/* WhatsApp button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleWhatsApp}
          className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 text-base"
          style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}>
          <MessageCircle size={18} />
          {t('shareWhatsApp', lang)}
        </motion.button>
      </motion.div>

      {/* Restart */}
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        onClick={onRestart}
        className="relative z-10 text-white/30 hover:text-white/60 text-sm transition-colors">
        {t('startOver', lang)}
      </motion.button>
    </div>
  );
}