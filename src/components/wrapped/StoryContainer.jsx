import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProgressBar from './ProgressBar';
import StorySlide from './StorySlide';
import SlideVolume from './SlideVolume';
import SlideChatterbox from './SlideChatterbox';
import SlideVibeCheck from './SlideVibeCheck';
import SlideEmotions from './SlideEmotions';
import SlideTrivia from './SlideTrivia';
import SlidePaywall from './SlidePaywall';
import SlideShare from './SlideShare';

const SLIDES = ['volume', 'chatterbox', 'vibe', 'emotions', 'trivia', 'paywall', 'share'];

export default function StoryContainer({ data, onRestart }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [triviaComplete, setTriviaComplete] = useState(false);

  const goNext = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlide(s => s + 1);
    }
  }, [currentSlide]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(s => s - 1);
    }
  }, [currentSlide]);

  const handleTapZone = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.35) goPrev();
    else goNext();
  };

  const slideKey = SLIDES[currentSlide];

  return (
    <div className="fixed inset-0 flex items-center justify-center"
      style={{ background: '#000' }}>
      {/* Phone frame on desktop */}
      <div className="relative w-full h-full max-w-sm mx-auto overflow-hidden"
        style={{ maxHeight: '100dvh' }}>

        {/* Progress bars */}
        <ProgressBar total={SLIDES.length} current={currentSlide} />

        {/* Slides */}
        <div className="absolute inset-0 pt-10" onClick={handleTapZone}>
          <AnimatePresence mode="wait" custom={direction}>
            <StorySlide key={slideKey} index={currentSlide} direction={direction}>
              <div className="flex-1 flex flex-col h-full overflow-y-auto">
                {slideKey === 'volume' && <SlideVolume data={data} />}
                {slideKey === 'chatterbox' && <SlideChatterbox data={data} />}
                {slideKey === 'vibe' && <SlideVibeCheck data={data} />}
                {slideKey === 'emotions' && <SlideEmotions data={data} />}
                {slideKey === 'trivia' && (
                  <SlideTrivia data={data} onNext={goNext} />
                )}
                {slideKey === 'paywall' && <SlidePaywall data={data} onUnlock={goNext} />}
                {slideKey === 'share' && <SlideShare data={data} onRestart={onRestart} />}
              </div>
            </StorySlide>
          </AnimatePresence>
        </div>

        {/* Tap hints - small arrows */}
        {currentSlide > 0 && (
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-50 w-8 h-16 flex items-center justify-center opacity-30 hover:opacity-60 transition-opacity">
            <div className="w-2 h-2 border-l-2 border-t-2 border-white rotate-[-45deg]" />
          </button>
        )}
        {currentSlide < SLIDES.length - 1 && (
          <button onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-50 w-8 h-16 flex items-center justify-center opacity-30 hover:opacity-60 transition-opacity">
            <div className="w-2 h-2 border-r-2 border-t-2 border-white rotate-45" />
          </button>
        )}

        {/* Restart */}
        <button onClick={onRestart}
          className="absolute top-6 right-4 z-50 text-white/40 hover:text-white/80 text-xs transition-colors">
          ✕
        </button>
      </div>
    </div>
  );
}