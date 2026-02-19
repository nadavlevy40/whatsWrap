import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProgressBar from './ProgressBar';
import StorySlide from './StorySlide';

// Couple slides
import SlideVolume from './SlideVolume';
import SlideChatterbox from './SlideChatterbox';
import SlideWordPodium from './SlideWordPodium';
import SlideLOLMeter from './SlideLOLMeter';
import SlideGhostInitiator from './SlideGhostInitiator';
import SlideEmotions from './SlideEmotions';
import SlideTrivia from './SlideTrivia';

// Family slides
import SlideFamilyMediaMogul from './SlideFamilyMediaMogul';
import SlideFamilyGhost from './SlideFamilyGhost';
import SlideFamilyCapsLock from './SlideFamilyCapsLock';
import SlideFamilyAwards from './SlideFamilyAwards';

// Friends slides
import SlideFriendsRoastMaster from './SlideFriendsRoastMaster';
import SlideFriendsNightShift from './SlideFriendsNightShift';
import SlideFriendsSummoningSpell from './SlideFriendsSummoningSpell';

// Shared
import SlidePaywall from './SlidePaywall';
import SlideShare from './SlideShare';

const SLIDE_SETS = {
  couple: ['volume', 'chatterbox', 'podium', 'lol', 'ghost', 'emotions', 'trivia', 'paywall', 'share'],
  family: ['volume', 'family-media', 'family-ghost', 'family-caps', 'family-awards', 'paywall', 'share'],
  friends: ['volume', 'chatterbox', 'friends-roast', 'friends-night', 'friends-summon', 'podium', 'paywall', 'share'],
};

export default function StoryContainer({ data, mode, onRestart }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const SLIDES = SLIDE_SETS[mode] || SLIDE_SETS.couple;

  const goNext = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlide(s => s + 1);
    }
  }, [currentSlide, SLIDES.length]);

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

  const renderSlide = () => {
    switch (slideKey) {
      case 'volume':        return <SlideVolume data={data} />;
      case 'chatterbox':    return <SlideChatterbox data={data} />;
      case 'podium':        return <SlideWordPodium data={data} />;
      case 'lol':           return <SlideLOLMeter data={data} />;
      case 'ghost':         return <SlideGhostInitiator data={data} />;
      case 'emotions':      return <SlideEmotions data={data} />;
      case 'trivia':        return <SlideTrivia data={data} onNext={goNext} />;
      case 'family-media':  return <SlideFamilyMediaMogul data={data} />;
      case 'family-ghost':  return <SlideFamilyGhost data={data} />;
      case 'family-caps':   return <SlideFamilyCapsLock data={data} />;
      case 'family-awards': return <SlideFamilyAwards data={data} />;
      case 'friends-roast': return <SlideFriendsRoastMaster data={data} />;
      case 'friends-night': return <SlideFriendsNightShift data={data} />;
      case 'friends-summon':return <SlideFriendsSummoningSpell data={data} />;
      case 'paywall':       return <SlidePaywall data={data} onUnlock={goNext} />;
      case 'share':         return <SlideShare data={data} onRestart={onRestart} />;
      default:              return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ background: '#000' }}>
      <div className="relative w-full h-full max-w-sm mx-auto overflow-hidden" style={{ maxHeight: '100dvh' }}>

        <ProgressBar total={SLIDES.length} current={currentSlide} />

        <div className="absolute inset-0 pt-10" onClick={handleTapZone}>
          <AnimatePresence mode="wait" custom={direction}>
            <StorySlide key={slideKey} index={currentSlide} direction={direction}>
              <div className="flex-1 flex flex-col h-full overflow-y-auto">
                {renderSlide()}
              </div>
            </StorySlide>
          </AnimatePresence>
        </div>

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

        <button onClick={onRestart}
          className="absolute top-6 right-4 z-50 text-white/40 hover:text-white/80 text-xs transition-colors">
          ✕
        </button>
      </div>
    </div>
  );
}