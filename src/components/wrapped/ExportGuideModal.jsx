import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const STEPS = [
  {
    num: 1,
    title: 'Open Chat Info',
    text: 'Go to the chat you want to analyze and tap the name at the top.',
    placeholder: '[Image: Tap Chat Name]',
  },
  {
    num: 2,
    title: "Find 'Export Chat'",
    text: "Scroll down and tap 'Export Chat'. (On Android, tap 'More' first).",
    placeholder: '[Image: Export Button]',
  },
  {
    num: 3,
    title: 'Save Without Media',
    text: "Choose 'Without Media' (important!). Then save the .txt file to your phone's files.",
    placeholder: "[Image: Select 'Without Media']",
  },
];

export default function ExportGuideModal({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ type: 'spring', damping: 22, stiffness: 200 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-zinc-900 font-black text-lg leading-tight">How to Export Your</h2>
              <h2 className="text-zinc-900 font-black text-lg leading-tight">Chat History</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors flex-shrink-0 ml-3"
            >
              <X size={16} className="text-zinc-500" />
            </button>
          </div>

          {/* Steps */}
          <div className="px-6 py-5 space-y-6 overflow-y-auto max-h-[70vh]">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex gap-4"
              >
                {/* Step number */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm text-white"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
                  {step.num}
                </div>

                <div className="flex-1 space-y-2">
                  <p className="text-zinc-900 font-bold text-sm">{step.title}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{step.text}</p>

                  {/* Image placeholder */}
                  <div className="w-full h-24 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                    <span className="text-zinc-400 text-xs text-center px-4">{step.placeholder}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Footer tip */}
            <div className="rounded-2xl bg-purple-50 border border-purple-100 px-4 py-3">
              <p className="text-purple-700 text-xs font-medium text-center">
                💡 The exported file will be a <strong>.txt</strong> file — that's the one you upload here.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}