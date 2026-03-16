import { motion } from 'framer-motion';

const BG_GRADIENTS = [
  'linear-gradient(160deg, #0f0c29 0%, #1a0533 50%, #24074a 100%)',
  'linear-gradient(160deg, #09090f 0%, #1e0a2e 50%, #2d0b4a 100%)',
  'linear-gradient(160deg, #070b1a 0%, #0d1f3c 50%, #1a0533 100%)',
  'linear-gradient(160deg, #0f0c29 0%, #1a1a40 50%, #24074a 100%)',
  'linear-gradient(160deg, #0a0a1a 0%, #1a0533 50%, #0f1f35 100%)',
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
    }
  }),
};

export default function StorySlide({ children, index, direction = 1 }) {
  const bg = BG_GRADIENTS[index % BG_GRADIENTS.length];
  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      style={{ background: bg }}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      custom={direction}
    >
      {children}
    </motion.div>
  );
}
