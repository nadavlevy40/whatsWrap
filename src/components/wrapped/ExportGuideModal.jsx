import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Inline phone mockup screenshots drawn with divs/SVG
function PhoneMockup({ children }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden border-2 border-zinc-200 bg-white shadow-sm">
      {/* Status bar */}
      <div className="bg-zinc-800 flex items-center justify-between px-3 py-1">
        <span className="text-white text-[9px]">9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-3 h-1.5 rounded-sm bg-white/70" />
          <div className="w-1 h-1 rounded-full bg-white/70" />
        </div>
      </div>
      {children}
    </div>
  );
}

function Step1Screen() {
  return (
    <PhoneMockup>
      {/* WhatsApp header */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#075E54' }}>
        <div className="w-8 h-8 rounded-full bg-zinc-400 flex items-center justify-center text-white text-xs font-bold">A</div>
        <div className="flex-1">
          <p className="text-white text-xs font-semibold">Alex 💬</p>
          <p className="text-white/60 text-[9px]">tap the name ↑</p>
        </div>
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white text-[8px]">📞</span>
          </div>
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white text-[8px]">⋮</span>
          </div>
        </div>
      </div>
      {/* Chat bubbles */}
      <div className="bg-[#ECE5DD] p-3 space-y-2 min-h-[80px]">
        <div className="flex justify-start">
          <div className="bg-white rounded-xl rounded-tl-sm px-3 py-1.5 max-w-[70%] shadow-sm">
            <p className="text-zinc-700 text-[10px]">Hey! 😊</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="rounded-xl rounded-tr-sm px-3 py-1.5 max-w-[70%] shadow-sm" style={{ background: '#DCF8C6' }}>
            <p className="text-zinc-700 text-[10px]">What's up?</p>
          </div>
        </div>
      </div>
      {/* Highlight arrow pointing up */}
      <div className="bg-yellow-50 border-t border-yellow-200 px-3 py-1.5 flex items-center gap-2">
        <span className="text-yellow-500 text-xs">☝️</span>
        <p className="text-yellow-700 text-[10px] font-semibold">Tap the contact name at the top</p>
      </div>
    </PhoneMockup>
  );
}

function Step2Screen() {
  return (
    <PhoneMockup>
      {/* Contact info header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-100" style={{ background: '#075E54' }}>
        <ChevronLeft size={14} className="text-white" />
        <p className="text-white text-xs font-semibold">Contact Info</p>
      </div>
      {/* Menu list */}
      <div className="bg-white divide-y divide-zinc-100">
        {['Media, links & docs', 'Starred messages', 'Mute notifications', 'Disappearing messages', 'Add to Home Screen'].map(item => (
          <div key={item} className="px-4 py-2.5 flex items-center justify-between">
            <span className="text-zinc-700 text-[10px]">{item}</span>
            <ChevronRight size={10} className="text-zinc-300" />
          </div>
        ))}
        {/* Highlighted Export Chat */}
        <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: 'rgba(124,58,237,0.08)', borderLeft: '3px solid #7c3aed' }}>
          <span className="text-purple-700 text-[10px] font-bold">Export Chat ← tap this!</span>
          <ChevronRight size={10} className="text-purple-400" />
        </div>
        <div className="px-4 py-2.5 flex items-center justify-between">
          <span className="text-zinc-700 text-[10px]">Clear chat</span>
          <ChevronRight size={10} className="text-zinc-300" />
        </div>
      </div>
    </PhoneMockup>
  );
}

function Step3Screen() {
  return (
    <PhoneMockup>
      {/* Modal dialog */}
      <div className="bg-[#ECE5DD] p-4 flex items-center justify-center min-h-[140px]">
        <div className="bg-white rounded-2xl shadow-lg w-full overflow-hidden">
          <div className="px-4 pt-4 pb-2 text-center border-b border-zinc-100">
            <p className="text-zinc-800 text-[11px] font-bold">Export Chat</p>
            <p className="text-zinc-500 text-[9px] mt-0.5">Include media from this chat?</p>
          </div>
          <div className="divide-y divide-zinc-100">
            <div className="px-4 py-2.5 text-center">
              <p className="text-zinc-400 text-[10px] line-through">Include Media</p>
            </div>
            <div className="px-4 py-2.5 text-center" style={{ background: 'rgba(124,58,237,0.08)' }}>
              <p className="text-purple-700 text-[10px] font-black">Without Media ✅ Choose this!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-purple-50 border-t border-purple-100 px-3 py-1.5 flex items-center gap-2">
        <span className="text-purple-500 text-xs">💡</span>
        <p className="text-purple-700 text-[10px] font-semibold">Always pick "Without Media" — smaller & faster</p>
      </div>
    </PhoneMockup>
  );
}

function Step4Screen() {
  return (
    <PhoneMockup>
      {/* Share sheet */}
      <div className="bg-zinc-100 p-3 min-h-[140px]">
        <p className="text-zinc-500 text-[9px] text-center mb-2 font-semibold uppercase tracking-wide">Share / Save As...</p>
        <div className="bg-white rounded-xl overflow-hidden shadow divide-y divide-zinc-100">
          <div className="px-4 py-2.5 flex items-center gap-3">
            <span className="text-lg">📂</span>
            <span className="text-zinc-700 text-[10px]">Save to Files</span>
          </div>
          <div className="px-4 py-2.5 flex items-center gap-3">
            <span className="text-lg">✉️</span>
            <span className="text-zinc-700 text-[10px]">Mail to yourself</span>
          </div>
          <div className="px-4 py-2.5 flex items-center gap-3">
            <span className="text-lg">☁️</span>
            <span className="text-zinc-700 text-[10px]">Save to Drive / iCloud</span>
          </div>
        </div>
        <p className="text-zinc-500 text-[9px] text-center mt-2">The .txt file is now on your device — ready to upload!</p>
      </div>
      <div className="bg-emerald-50 border-t border-emerald-100 px-3 py-1.5 flex items-center gap-2">
        <span className="text-emerald-500 text-xs">✅</span>
        <p className="text-emerald-700 text-[10px] font-semibold">Now go back to WhatsWrap and upload the .txt file</p>
      </div>
    </PhoneMockup>
  );
}

const STEPS = [
  {
    num: 1,
    title: 'Open the Chat',
    text: 'Open the WhatsApp chat you want to analyze, then tap the contact or group name at the very top.',
    Screen: Step1Screen,
  },
  {
    num: 2,
    title: 'Tap "Export Chat"',
    text: 'Scroll down in the contact/group info page and tap "Export Chat". On Android, tap "More" → "Export Chat".',
    Screen: Step2Screen,
  },
  {
    num: 3,
    title: 'Choose "Without Media"',
    text: 'Always select "Without Media" — it creates a compact .txt file that uploads in seconds.',
    Screen: Step3Screen,
  },
  {
    num: 4,
    title: 'Save & Upload',
    text: 'Save the file to your phone, email it to yourself, or drop it directly here on WhatsWrap.',
    Screen: Step4Screen,
  },
];

export default function ExportGuideModal({ onClose }) {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
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
              <h2 className="text-zinc-900 font-black text-lg leading-tight">WhatsApp Chat</h2>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors flex-shrink-0 ml-3">
              <X size={16} className="text-zinc-500" />
            </button>
          </div>

          {/* Step dots */}
          <div className="flex items-center justify-center gap-2 pt-4 px-6">
            {STEPS.map((s, i) => (
              <button key={i} onClick={() => setActiveStep(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === activeStep ? 20 : 8,
                  height: 8,
                  background: i === activeStep ? 'linear-gradient(135deg, #7c3aed, #db2777)' : '#e4e4e7',
                }} />
            ))}
          </div>

          {/* Step content */}
          <div className="px-6 py-5 space-y-4 overflow-y-auto max-h-[65vh]">
            <AnimatePresence mode="wait">
              <motion.div key={activeStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-3">
                {/* Step label */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-black text-xs text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
                    {step.num}
                  </div>
                  <p className="text-zinc-900 font-bold text-sm">{step.title}</p>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">{step.text}</p>
                {/* Screen illustration */}
                <step.Screen />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="px-6 pb-5 flex gap-3">
            {activeStep > 0 && (
              <button onClick={() => setActiveStep(s => s - 1)}
                className="flex-1 py-3 rounded-2xl border border-zinc-200 text-zinc-600 font-semibold text-sm flex items-center justify-center gap-1 hover:bg-zinc-50 transition-colors">
                <ChevronLeft size={16} /> Back
              </button>
            )}
            {activeStep < STEPS.length - 1 ? (
              <button onClick={() => setActiveStep(s => s + 1)}
                className="flex-1 py-3 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-1 transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={onClose}
                className="flex-1 py-3 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-1 transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
                Got it! Let's go 🚀
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}