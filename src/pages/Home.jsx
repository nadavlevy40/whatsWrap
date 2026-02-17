import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingScreen from '../components/wrapped/LandingScreen';
import LoadingScreen from '../components/wrapped/LoadingScreen';
import StoryContainer from '../components/wrapped/StoryContainer';
import { parseChatFile, generateMockData } from '../components/wrapped/chatParser';

// Load confetti lazily
if (typeof window !== 'undefined' && !window.confetti) {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js';
  document.head.appendChild(script);
}

export default function Home() {
  const [phase, setPhase] = useState('landing');
  const [chatData, setChatData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = useCallback((file) => {
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const data = parseChatFile(text);
      if (!data || data.participants.length < 2) {
        setError("Couldn't parse this file. Make sure it's a WhatsApp export (.txt). Using demo data instead.");
        setChatData(generateMockData());
      } else {
        setChatData(data);
      }
      setPhase('loading');
    };
    reader.readAsText(file);
  }, []);

  const handleMockData = useCallback(() => {
    setChatData(generateMockData());
    setPhase('loading');
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setPhase('story');
  }, []);

  const handleRestart = useCallback(() => {
    setPhase('landing');
    setChatData(null);
    setError(null);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <AnimatePresence mode="wait">
        {phase === 'landing' && (
          <motion.div key="landing" className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <LandingScreen onFileUpload={handleFileUpload} onUseMockData={handleMockData} />
            {error && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 rounded-xl text-sm max-w-sm text-center">
                {error}
              </div>
            )}
          </motion.div>
        )}
        {phase === 'loading' && (
          <motion.div key="loading" className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <LoadingScreen onComplete={handleLoadingComplete} />
          </motion.div>
        )}
        {phase === 'story' && chatData && (
          <motion.div key="story" className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <StoryContainer data={chatData} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}