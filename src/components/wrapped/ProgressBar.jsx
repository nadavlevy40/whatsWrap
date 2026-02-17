import { motion } from 'framer-motion';

export default function ProgressBar({ total, current }) {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex gap-1.5 p-3 safe-top">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex-1 h-0.5 rounded-full bg-white/20 overflow-hidden">
          {i < current && (
            <div className="h-full w-full bg-white rounded-full" />
          )}
          {i === current && (
            <motion.div className="h-full bg-white rounded-full"
              initial={{ width: '0%' }} animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }} />
          )}
        </div>
      ))}
    </div>
  );
}