import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingScreen from '../components/wrapped/LandingScreen';
import LoadingScreen from '../components/wrapped/LoadingScreen';
import StoryContainer from '../components/wrapped/StoryContainer';
import ModeSelector from '../components/wrapped/ModeSelector';
import { generateMockData } from '../components/wrapped/chatParser';
import { base44 } from '@/api/base44Client';

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
  const [rawChatText, setRawChatText] = useState(null);
  const [loadingDone, setLoadingDone] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    base44.auth.me().then(user => {
      if (user?.role === 'admin') setIsAdmin(true);
    }).catch(() => {});
  }, []);

  const suggestMode = (data) => {
    if (!data) return 'couple';
    return data.participants.length > 2 ? 'friends' : 'couple';
  };

  const handleFileUpload = useCallback((file) => {
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      // Quick validation: check if it looks like a WhatsApp export
      // Support formats: DD/MM/YY, MM/DD/YYYY, [DD/MM/YY], DD.MM.YY, DD-MM-YY etc.
      const hasTimestamps = /[\[（]?\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4}/.test(text.slice(0, 1000));
      const hasMessages = /[\-\]] [^:]+:/.test(text.slice(0, 1000));
      if ((!hasTimestamps && !hasMessages) || text.length < 50) {
        setError("Couldn't recognize this file. Make sure it's a WhatsApp .txt export.");
        return;
      }
      setRawChatText(text);
      // Quick count of participants from first 200 lines to suggest mode
      const lines = text.split('\n').slice(0, 200);
      const senders = new Set();
      lines.forEach(l => {
        const m = l.match(/- ([^:]+):/);
        if (m) senders.add(m[1].trim());
      });
      const suggested = senders.size > 2 ? 'friends' : 'couple';
      setMode(suggested);
      setPhase('select_mode');
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

  const handleModeSelect = useCallback(async (selectedMode) => {
    setMode(selectedMode);
    setPhase('loading');

    if (rawChatText) {
      // Real file: analyze with OpenAI
      try {
        const response = await base44.functions.invoke('analyzeChat', {
          chatText: rawChatText,
          mode: selectedMode,
        });
        const data = response.data;
        if (data.error) throw new Error(data.error);
        setChatData({ ...data, mode: selectedMode });
      } catch (err) {
        setError('AI analysis failed: ' + err.message + '. Using demo data.');
        setChatData(generateMockData(selectedMode));
      }
    } else {
      // Demo mode
      setChatData(generateMockData(selectedMode));
    }
  }, [rawChatText]);

  const handleLoadingComplete = useCallback(() => {
    setLoadingDone(true);
  }, []);

  // Move to story once BOTH loading animation is done AND chatData is ready
  useEffect(() => {
    if (loadingDone && chatData && phase === 'loading') {
      setPhase('story');
    }
  }, [loadingDone, chatData, phase]);

  const handleRestart = useCallback(() => {
    setPhase('landing');
    setChatData(null);
    setMode('couple');
    setError(null);
    setRawChatText(null);
    setLoadingDone(false);
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
            <LoadingScreen onComplete={handleLoadingComplete} isProcessing={!!rawChatText && !chatData} />
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