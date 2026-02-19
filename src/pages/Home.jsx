import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingScreen from '../components/wrapped/LandingScreen';
import LoadingScreen from '../components/wrapped/LoadingScreen';
import StoryContainer from '../components/wrapped/StoryContainer';
import ModeSelector from '../components/wrapped/ModeSelector';
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
  const [mode, setMode] = useState('couple');
  const [error, setError] = useState(null);

  const suggestMode = (data) => {
    if (!data) return 'couple';
    return data.participants.length > 2 ? 'friends' : 'couple';
  };

  const handleFileUpload = useCallback((file) => {
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const data = parseChatFile(text);
      if (!data || data.participants.length < 2) {
        setError("Couldn't parse this file. Make sure it's a WhatsApp export (.txt). Using demo data instead.");
        const mock = generateMockData('couple');
        setChatData(mock);
        setMode('couple');
        setPhase('select_mode');
      } else {
        setChatData(data);
        setMode(suggestMode(data));
        setPhase('select_mode');
      }
    };
    reader.readAsText(file);
  }, []);

  const handleMockData = useCallback(() => {
    // Default to couple mock for demo
    const mock = generateMockData('couple');
    setChatData(mock);
    setMode('couple');
    setPhase('select_mode');
  }, []);

  const handleModeSelect = useCallback((selectedMode) => {
    // If mode changes, reload mock data matching the mode (for demo)
    if (chatData?.isMock) {
      setChatData(generateMockData(selectedMode));
    }
    setMode(selectedMode);
    setPhase('loading');
  }, [chatData]);

  const handleLoadingComplete = useCallback(() => {
    setPhase('story');
  }, []);

  const handleRestart = useCallback(() => {
    setPhase('landing');
    setChatData(null);
    setMode('couple');
    setError(null);
  }, []);

  if (phase === 'landing') {
    return (
      <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <LandingScreen onFileUpload={handleFileUpload} onUseMockData={handleMockData} />
        {error && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 rounded-xl text-sm max-w-sm text-center">
            {error}
          </div>
        )}
      </div>
    );
  }

  if (phase === 'select_mode') {
    return (
      <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <ModeSelector suggestedMode={mode} onSelect={handleModeSelect} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <motion.div key="loading" className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <LoadingScreen onComplete={handleLoadingComplete} />
          </motion.div>
        )}
        {phase === 'story' && chatData && (
          <motion.div key="story" className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <StoryContainer data={chatData} mode={mode} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}