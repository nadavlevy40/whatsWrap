import { useState, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProgressBar from './ProgressBar';
import StorySlide from './StorySlide';
import SlideVolume from './SlideVolume';
import SlideChatterbox from './SlideChatterbox';
import SlideWordPodium from './SlideWordPodium';
import SlideWisdom from './SlideWisdom';
import SlideLOLMeter from './SlideLOLMeter';
import SlideGhostInitiator from './SlideGhostInitiator';
import SlideEmotions from './SlideEmotions';
import SlideTrivia from './SlideTrivia';
import SlidePaywall from './SlidePaywall';
import SlideShare from './SlideShare';
// Family slides
import SlideFamilyMediaMogul from './SlideFamilyMediaMogul';
import SlideFamilyGhost from './SlideFamilyGhost';
import SlideFamilyCapsLock from './SlideFamilyCapsLock';
import SlideFamilyAwards from './SlideFamilyAwards';
// Friends slides
import SlideFriendsRoastMaster from './SlideFriendsRoastMaster';
import SlideFriendsNightShift from './SlideFriendsNightShift';
import SlideFriendsSummoningSpell from './SlideFriendsSummoningSpell';
// New slides
import SlideErrorBoundary from './SlideErrorBoundary';
import SlideDoubleText from './SlideDoubleText';
import SlideYapper from './SlideYapper';
import SlideSwearJar from './SlideSwearJar';
import SlideAIInsights from './SlideAIInsights';
import SlidePremiumShadowStats from './SlidePremiumShadowStats';
import SlidePremiumPersonas from './SlidePremiumPersonas';
import SlidePremiumDeepDive from './SlidePremiumDeepDive';
import SlidePremiumVault from './SlidePremiumVault';
import SlideClashReport from './SlideClashReport';

const SLIDES_BY_MODE = {
  couple: ['volume', 'chatterbox', 'double_text', 'yapper', 'swear_jar', 'podium', 'wisdom', 'lol', 'ghost', 'emotions', 'ai_insights', 'clash_report', 'trivia', 'paywall', 'premium_shadow', 'premium_personas', 'premium_deepdive', 'premium_vault', 'share'],
  family: ['volume', 'chatterbox', 'family_media', 'family_ghost', 'family_caps', 'wisdom', 'family_awards', 'double_text', 'swear_jar', 'ai_insights', 'paywall', 'premium_shadow', 'premium_personas', 'premium_deepdive', 'premium_vault', 'share'],
  friends: ['volume', 'chatterbox', 'friends_roast', 'friends_night', 'friends_summon', 'double_text', 'yapper', 'swear_jar', 'podium', 'wisdom', 'ai_insights', 'paywall', 'premium_shadow', 'premium_personas', 'premium_deepdive', 'premium_vault', 'share'],
};

export default function StoryContainer({ data, mode = 'couple', onRestart, isAdmin = false }) {
  const lang = data.lang || 'en';
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const SLIDES = useMemo(() => {
    const baseSlides = SLIDES_BY_MODE[mode] || SLIDES_BY_MODE.couple;
    // Admins bypass paywall — remove 'paywall' slide
    return isAdmin ? baseSlides.filter(s => s !== 'paywall') : baseSlides;
  }, [mode, isAdmin]);

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
    // Don't navigate if clicking on interactive elements
    if (e.target.closest('button, input, a')) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeft = x < rect.width * 0.35;
    // In RTL, left = forward, right = back
    if (lang === 'he') {
      if (isLeft) goNext(); else goPrev();
    } else {
      if (isLeft) goPrev(); else goNext();
    }
  };

  const slideKey = SLIDES[currentSlide];

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ background: '#000' }} dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <div className="relative w-full h-full max-w-sm mx-auto overflow-hidden" style={{ maxHeight: '100dvh' }}>
        <ProgressBar total={SLIDES.length} current={currentSlide} />

        <div className="absolute inset-0 pt-10" onClick={handleTapZone}>
          <AnimatePresence mode="wait" custom={direction}>
            <StorySlide key={slideKey} index={currentSlide} direction={direction}>
              <SlideErrorBoundary key={slideKey}>
              <div className="flex-1 flex flex-col h-full overflow-y-auto">
                {/* Couple slides */}
                {slideKey === 'volume' && <SlideVolume data={data} lang={lang} />}
                {slideKey === 'chatterbox' && <SlideChatterbox data={data} lang={lang} />}
                {slideKey === 'podium' && <SlideWordPodium data={data} lang={lang} />}
                {slideKey === 'lol' && <SlideLOLMeter data={data} lang={lang} />}
                {slideKey === 'ghost' && <SlideGhostInitiator data={data} lang={lang} />}
                {slideKey === 'emotions' && <SlideEmotions data={data} lang={lang} />}
                {slideKey === 'wisdom' && <SlideWisdom data={data} lang={lang} />}
                {slideKey === 'trivia' && <SlideTrivia data={data} onNext={goNext} lang={lang} />}
                {/* Family slides */}
                {slideKey === 'family_media' && <SlideFamilyMediaMogul data={data} lang={lang} />}
                {slideKey === 'family_ghost' && <SlideFamilyGhost data={data} lang={lang} />}
                {slideKey === 'family_caps' && <SlideFamilyCapsLock data={data} lang={lang} />}
                {slideKey === 'family_awards' && <SlideFamilyAwards data={data} lang={lang} />}
                {/* Friends slides */}
                {slideKey === 'friends_roast' && <SlideFriendsRoastMaster data={data} lang={lang} />}
                {slideKey === 'friends_night' && <SlideFriendsNightShift data={data} lang={lang} />}
                {slideKey === 'friends_summon' && <SlideFriendsSummoningSpell data={data} lang={lang} />}
                {/* New slides */}
                {slideKey === 'double_text' && <SlideDoubleText data={data} lang={lang} />}
                {slideKey === 'yapper' && <SlideYapper data={data} lang={lang} />}
                {slideKey === 'swear_jar' && <SlideSwearJar data={data} lang={lang} />}
                {slideKey === 'ai_insights' && <SlideAIInsights data={data} lang={lang} />}
                {slideKey === 'clash_report' && <SlideClashReport data={data} lang={lang} />}
                {/* Premium slides */}
                {slideKey === 'premium_shadow' && <SlidePremiumShadowStats data={data} lang={lang} />}
                {slideKey === 'premium_personas' && <SlidePremiumPersonas data={data} lang={lang} />}
                {slideKey === 'premium_deepdive' && <SlidePremiumDeepDive data={data} lang={lang} />}
                {slideKey === 'premium_vault' && <SlidePremiumVault data={data} lang={lang} />}
                {/* Shared */}
                {slideKey === 'paywall' && <SlidePaywall data={data} onUnlock={goNext} lang={lang} />}
                {slideKey === 'share' && <SlideShare data={data} onRestart={onRestart} lang={lang} />}
              </div>
              </SlideErrorBoundary>
            </StorySlide>
          </AnimatePresence>
        </div>

        {currentSlide > 0 && (
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-50 w-8 h-16 flex items-center justify-center opacity-30 hover:opacity-60 transition-opacity">
            <div className={`w-2 h-2 border-l-2 border-t-2 border-white ${lang === 'he' ? 'rotate-[135deg]' : 'rotate-[-45deg]'}`} />
          </button>
        )}
        {currentSlide < SLIDES.length - 1 && (
          <button onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-50 w-8 h-16 flex items-center justify-center opacity-30 hover:opacity-60 transition-opacity">
            <div className={`w-2 h-2 border-r-2 border-t-2 border-white ${lang === 'he' ? 'rotate-[-135deg]' : 'rotate-45'}`} />
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