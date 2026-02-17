import { motion } from 'framer-motion';

const BG_GRADIENTS = [
  'linear-gradient(160deg, #0f0c29 0%, #1a0533 50%, #24074a 100%)',
  'linear-gradient(160deg, #09090f 0%, #1e0a2e 50%, #2d0b4a 100%)',
  'linear-gradient(160deg, #070b1a 0%, #0d1f3c 50%, #1a0533 100%)',
  'linear-gradient(160deg, #0f0c29 0%, #1a1a40 50%, #24074a 100%)',
  'linear-gradient(160deg, #0a0a1a 0%, #1a0533 50%, #0f1f35 100%)',
];

export default function StorySlide({ children, index, direction = 1 }) {
  const bg = BG_GRADIENTS[index % BG_GRADIENTS.length];
  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      style={{ background: bg }}
      initial={{ opacity: 0, x: direction * 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -60 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}