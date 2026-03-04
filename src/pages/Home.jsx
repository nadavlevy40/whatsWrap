import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingScreen from '../components/wrapped/LandingScreen';
import LoadingScreen from '../components/wrapped/LoadingScreen';
import StoryContainer from '../components/wrapped/StoryContainer';
import ModeSelector from '../components/wrapped/ModeSelector';
import LanguageSelector from '../components/wrapped/LanguageSelector';
import { generateMockData, parseChatFile } from '../components/wrapped/chatParser';
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
  const [lang, setLang] = useState('en');
  const [error, setError] = useState(null);
  const [rawChatText, setRawChatText] = useState(null);
  const [loadingDone, setLoadingDone] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);

  // Check URL param for admin bypass
  const urlParams = new URLSearchParams(window.location.search);
  const isAdminByUrl = urlParams.get('admin') === 'true';

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
      const hasTimestamps = /\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4}/.test(text.slice(0, 2000));
      if (!hasTimestamps || text.length < 50) {
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
      // Parse locally for accurate stats (fast, handles large files)
      const localData = parseChatFile(rawChatText);

      if (!localData || !localData.participants || localData.participants.length === 0) {
        setError("Couldn't parse the chat file. Make sure it's a WhatsApp .txt export.");
        setPhase('landing');
        return;
      }

      // Send a small sample to OpenAI just for quotes & signature emojis enrichment
      try {
        const mid = Math.floor(rawChatText.length / 2);
        const sample = rawChatText.slice(0, 5000) + '\n...\n' + rawChatText.slice(mid, mid + 3000);
        const response = await base44.functions.invoke('analyzeChat', {
          chatText: sample,
          mode: selectedMode,
        });
        const aiData = response.data;
        const merged = {
          ...localData,
          mode: selectedMode,
          quotes: (aiData?.quotes?.length > (localData?.quotes?.length || 0)) ? aiData.quotes : localData.quotes,
          signatureEmojis: aiData?.signatureEmojis || localData.signatureEmojis,
        };
        setChatData(merged);
      } catch (err) {
        // Fall back to pure local parse
        setChatData({ ...localData, mode: selectedMode });
      }
    } else {
      // Demo mode
      setChatData(generateMockData(selectedMode));
    }
  }, [rawChatText]);

  const handleLoadingComplete = useCallback(() => {
    setLoadingDone(true);
  }, []);

  useEffect(() => {
    if (isAdminByUrl) {
      setIsAdmin(true);
      setAdminChecked(true);
      return;
    }
    base44.auth.me().then(user => {
      if (!user) {
        base44.auth.redirectToLogin(window.location.href);
        return;
      }
      if (user.role === 'admin') setIsAdmin(true);
    }).catch(() => {
      base44.auth.redirectToLogin(window.location.href);
    }).finally(() => setAdminChecked(true));
  }, []);

  useEffect(() => {
    if (loadingDone && chatData && phase === 'loading' && adminChecked) {
      setPhase('story');
    }
  }, [loadingDone, chatData, phase, adminChecked]);

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
            <StoryContainer data={chatData} mode={mode} onRestart={handleRestart} isAdmin={isAdmin} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}