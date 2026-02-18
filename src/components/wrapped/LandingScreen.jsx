import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Upload, Zap, ChevronRight, HelpCircle } from 'lucide-react';
import ExportGuideModal from './ExportGuideModal';

export default function LandingScreen({ onFileUpload, onUseMockData }) {
  const [isDragging, setIsDragging] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const fileRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.txt')) onFileUpload(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileUpload(file);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1a0533 40%, #24074a 100%)' }}>

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.4) 0%, transparent 70%)' }} />
        <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 70%)' }} />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center gap-10">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
          <Zap size={14} className="text-yellow-400" />
          <span className="text-white/80 text-xs font-medium tracking-widest uppercase">WhatsApp Wrapped 2024</span>
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
          <h1 className="text-6xl font-black text-white leading-none tracking-tight mb-4">
            Reveal Your<br />
            <span style={{ background: 'linear-gradient(135deg, #c084fc, #f472b6, #fb7185)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Chat DNA
            </span>
          </h1>
          <p className="text-white/50 text-lg font-light">Your conversation, reimagined.</p>
        </motion.div>

        {/* Drop Zone */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}
          className="w-full">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className="relative w-full cursor-pointer rounded-3xl border-2 border-dashed transition-all duration-300 p-10 flex flex-col items-center gap-4 group"
            style={{
              borderColor: isDragging ? 'rgba(192,132,252,0.8)' : 'rgba(255,255,255,0.2)',
              background: isDragging ? 'rgba(147,51,234,0.15)' : 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(10px)',
            }}>
            <motion.div animate={isDragging ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(192,132,252,0.3), rgba(244,114,182,0.3))' }}>
              <Upload size={28} className="text-purple-300" />
            </motion.div>
            <div className="text-center">
              <p className="text-white font-semibold text-lg mb-1">{isDragging ? 'Drop it! 🎯' : 'Drop your chat export'}</p>
              <p className="text-white/40 text-sm">WhatsApp .txt file · Tap to browse</p>
            </div>
            <input ref={fileRef} type="file" accept=".txt" className="hidden" onChange={handleFileChange} />
          </div>
        </motion.div>

        {/* Export guide link */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}>
          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors text-xs mx-auto"
          >
            <HelpCircle size={13} />
            <span>Need help exporting your chat? <span className="underline underline-offset-2">View Guide.</span></span>
          </button>
        </motion.div>

        {/* Divider */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex items-center gap-4 w-full">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-xs uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </motion.div>

        {/* Mock Data Button */}
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          onClick={onUseMockData}
          className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
          <Zap size={18} className="text-yellow-300" />
          Try Demo — No File Needed
          <ChevronRight size={18} className="opacity-70" />
        </motion.button>

        {/* Privacy Badge */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="flex items-center gap-2">
          <Shield size={14} className="text-emerald-400" />
          <span className="text-emerald-400/70 text-xs font-medium">100% Secure · Offline Processing · Nothing Leaves Your Device</span>
        </motion.div>
      </div>
    </div>
  );
}