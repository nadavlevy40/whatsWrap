// Central translations for all app UI strings
// Usage: import { t } from './i18n'; t('key', lang)

const translations = {
  // Landing / flow steps
  stepLanguage: { en: 'Step 1 of 3', he: 'שלב 1 מתוך 3' },
  stepMode:     { en: 'Step 3 of 3', he: 'שלב 3 מתוך 3' },

  // SlideVolume
  totalMessages:    { en: 'Total Messages', he: 'סך הודעות' },
  messagesSent:     { en: 'messages sent.', he: 'הודעות נשלחו.' },
  couldntStop:      { en: "You couldn't stop talking. 💬", he: 'לא הצלחתם להפסיק לדבר. 💬' },

  // SlideChatterbox
  theChatterbox:    { en: 'The Chatterbox', he: 'המדבר/ת בלי הפסקה' },
  whoTalksMore:     { en: 'Who talks more?', he: 'מי מדבר יותר?' },
  talksPctMore:     { en: (name, pct) => `🏆 ${name} talks ${pct}% more!`, he: (name, pct) => `🏆 ${name} מדבר/ת ${pct}% יותר!` },

  // SlideLOLMeter
  laughterAnalysis: { en: 'Laughter Analysis', he: 'ניתוח צחוקים' },
  lolMeter:         { en: 'The LOL Meter 😂', he: 'מד החחח 😂' },
  cracksUpMore:     { en: 'Who cracks up more?', he: 'מי מתפקע יותר?' },
  laughEvents:      { en: 'laugh events', he: 'ארועי צחוק' },
  theComedian:      { en: '😂 The Comedian', he: '😂 הקומיקאי/ת' },
  theAudience:      { en: '👀 The Audience', he: '👀 הקהל' },
  detectedPatterns: { en: 'Detected: haha · lol · lmao · rofl · 😂 · 🤣 · 💀 · 😭', he: 'זוהו: חחח · לול · lmao · 😂 · 🤣 · 💀 · 😭' },

  // SlideGhostInitiator
  conversationDynamics: { en: 'Conversation Dynamics', he: 'דינמיקת שיחות' },
  ghostInitiator:       { en: 'Ghost & Initiator 👻', he: 'הרוח ומתחיל/ת השיחה 👻' },
  avgReplyTime:         { en: 'Average Reply Time', he: 'זמן תגובה ממוצע' },
  theGhost:             { en: 'The Ghost 🕯️', he: 'הרוח 🕯️' },
  speedRacer:           { en: 'Speed Racer ⚡', he: 'ספרינטר/ית ⚡' },
  ghostTakes:           { en: (name, time) => `${name} takes ${time} longer to reply — Playing Hard to Get 😏`, he: (name, time) => `${name} לוקח/ת ${time} יותר לענות — קשה להשג 😏` },
  whoStartsConvos:      { en: 'Who Starts Conversations?', he: 'מי פותח/ת שיחות?' },
  afterSilence:         { en: '(message after 6h+ silence)', he: '(הודעה אחרי שקט של 6 שעות+)' },
  keepsChatAlive:       { en: (name) => `🚀 ${name} keeps the chat alive!`, he: (name) => `🚀 ${name} שומר/ת על הצ\'אט חי!` },

  // SlideEmotions
  emotionalIntelligence: { en: 'Emotional Intelligence', he: 'אינטליגנציה רגשית' },
  vibesAndLols:          { en: 'Vibes & LOLs', he: 'ויבס וצחוקים' },
  signatureEmoji:        { en: 'Signature Emoji', he: 'אמוג\'י חתימה' },
  whoLaughsMore:         { en: 'Who laughs more?', he: 'מי צוחק/ת יותר?' },
  hahas:                 { en: "ha-ha's", he: "חחח'ים" },
  findsEverythingFunny:  { en: (name) => `😂 ${name} finds everything funnier!`, he: (name) => `😂 ${name} מוצא/ת הכל יותר מצחיק!` },

  // SlideVibeCheck
  theVibeCheck:         { en: 'The Vibe Check', he: 'בדיקת הויב' },
  sharedObsessions:     { en: 'Your shared obsessions', he: 'האובססיות המשותפות שלכם' },
  wordsDefineYou:       { en: 'Words that define you two 👀', he: 'מילים שמגדירות אתכם 👀' },
  privateUniverse:      { en: "These are your private universe's keywords", he: 'אלו המילות מפתח של היקום הפרטי שלכם' },

  // SlideWordPodium
  topWords:             { en: 'Top Words', he: 'המילים הכי נפוצות' },
  wordPodiumTitle:      { en: 'The Word Podium 🏆', he: 'פודיום המילים 🏆' },
  wordPodiumSub:        { en: 'Most used words in your chat', he: 'המילים הנפוצות ביותר בצ\'אט' },
  timesUsed:            { en: (n) => `${n}×`, he: (n) => `${n} פעמים` },
  alsoTrending:         { en: 'Also trending', he: 'גם בטרנד' },

  // Family slides
  familyRoles:          { en: 'Family Roles', he: 'תפקידים משפחתיים' },
  familyWrapped:        { en: 'Family Wrapped', he: 'ספונות משפחתי' },
  familyAwards:         { en: 'Family Awards 🏅', he: 'פרסי המשפחה 🏅' },
  resultsAreIn:         { en: 'The results are in.', he: 'התוצאות הגיעו.' },

  theOrganizer:         { en: 'The Organizer', he: 'המארגן/ת' },
  organizerDesc:        { en: 'Always planning dinner, meetups & schedules', he: 'תמיד מתכנן/ת ארוחות, מפגשים וסדרי יום' },
  theComedianAward:     { en: 'The Comedian', he: 'הקומיקאי/ת' },
  comedianDesc:         { en: 'Keeps everyone laughing', he: 'משמח/ת את כולם' },
  theNightOwlAward:     { en: 'The Night Owl', he: 'יצור הלילה' },
  nightOwlDesc:         { en: 'Still texting at 3am', he: 'עדיין שולח/ת הודעות ב-3 בלילה' },
  theLoudest:           { en: 'The Loudest', he: 'הכי רועש/ת' },
  loudestDesc:          { en: 'TYPES LIKE THIS A LOT', he: 'מקליד/ה ככה הרבה' },

  // SlideFamilyCapsLock
  theLoudestTitle:      { en: 'The Loudest 📣', he: 'הכי רועש/ת 📣' },
  whoTypesCaps:         { en: 'WHO TYPES LIKE THIS THE MOST?', he: 'מי מקליד/ה ככה הכי הרבה?' },
  allCapsWords:         { en: (n) => `${n} ALL-CAPS words`, he: (n) => `${n} מילים בקאפס` },
  energyLabels:         {
    en: ['ABSOLUTELY SCREAMING', 'Very Enthusiastic', 'Normal Energy', 'Calm', 'Zen Mode'],
    he: ['צועק/ת ממש', 'נלהב/ת מאוד', 'אנרגיה רגילה', 'רגוע/ה', 'מצב זן'],
  },

  // SlideFamilyGhost
  familyGhostTitle:     { en: 'The Ghost 👻', he: 'הרוח 👻' },
  readsEverything:      { en: 'Reads everything. Replies… eventually.', he: 'קורא/ת הכל. עונה… בסופו של דבר.' },
  onlyContributed:      { en: (name, pct) => `Only contributed ${pct}% of all messages`, he: (name, pct) => `תרם/ה רק ${pct}% מכל ההודעות` },
  sawItBusy:            { en: '"I saw it but I was busy"', he: '"ראיתי אבל הייתי עסוק/ה"' },
  topChatter:           { en: 'Top chatter by contrast:', he: 'הכי פעיל/ה לעומת זאת:' },
  messages:             { en: 'messages', he: 'הודעות' },

  // SlideFamilyMediaMogul
  theMediaMogul:        { en: 'The Media Mogul 📸', he: 'מוגול המדיה 📸' },
  whoSpamsGifs:         { en: 'Who spams the group with GIFs & images?', he: 'מי מפציץ/ה את הקבוצה עם GIFs ותמונות?' },
  mediaSent:            { en: (n) => `${n} media messages sent`, he: (n) => `${n} הודעות מדיה נשלחו` },
  goodMorningEnergy:    { en: '"Good morning 🌅" energy detected', he: 'זוהתה אנרגיית "בוקר טוב 🌅"' },

  // Friends slides
  friendGroup:          { en: 'Friend Group', he: 'קבוצת חברים' },
  theRoastMaster:       { en: 'The Roast Master 🔥', he: 'מלך/מלכת הצחוק 🔥' },
  mostLolInGroup:       { en: 'Most lol, lmao, dead & 😂 in the group.', he: 'הכי הרבה חחח, lmao, מת/ה ו-😂 בקבוצה.' },
  laughReactions:       { en: (n) => `${n} laugh reactions`, he: (n) => `${n} תגובות צחוק` },
  groupDeadWithout:     { en: 'The group chat would be dead without them', he: 'הקבוצה הייתה מתה בלעדיהם' },

  theNightShift:        { en: 'The Night Shift 🌙', he: 'משמרת הלילה 🌙' },
  whoKeepsGroupAlive:   { en: 'Who keeps the group alive after midnight?', he: 'מי שומר/ת על הקבוצה חיה אחרי חצות?' },
  messagesAfterMidnight:{ en: (n) => `${n} messages after midnight`, he: (n) => `${n} הודעות אחרי חצות` },
  sleepOverrated:       { en: '"Sleep is overrated anyway"', he: '"שינה זה ממילא מוגזם"' },

  theSummoningSpell:    { en: 'The Summoning Spell 🔮', he: 'לחש הקסם 🔮' },
  sayMagicWord:         { en: 'Say the magic word and they appear.', he: 'תגיד/י את המילה הקסומה והם מופיעים.' },
  theInactiveOne:       { en: 'The Inactive One', he: 'הכי פחות פעיל/ה' },
  usuallyMIA:           { en: 'Usually MIA in the chat', he: 'בדרך כלל נעדר/ת מהצ\'אט' },
  summoningWord:        { en: 'Their Summoning Word', he: 'מילת הקסם שלהם' },
  triggeredReplies:     { en: (n) => `Triggered ${n}x replies from them`, he: (n) => `עוררה ${n} תגובות מהם` },
  whenYouMention:       { en: (kw, name) => `"When you mention ${kw}, ${name} wakes up!"`, he: (kw, name) => `"כשמזכירים את ${kw}, ${name} מתעורר/ת!"` },
  notEnoughData:        { en: 'Not enough data to find a summoning spell!', he: 'אין מספיק נתונים למציאת לחש קסם!' },

  // SlideShare
  yourWrapped:          { en: 'Your Wrapped is Ready! 🎉', he: 'הספונות שלכם מוכן! 🎉' },
  shareTitle:           { en: 'Share Your Story', he: 'שתפו את הסיפור שלכם' },
  copyLink:             { en: 'Copy Link', he: 'העתק קישור' },
  copied:               { en: 'Copied!', he: 'הועתק!' },
  shareWhatsApp:        { en: 'Share on WhatsApp', he: 'שתף בוואטסאפ' },
  startOver:            { en: 'Start Over', he: 'התחל מחדש' },

  // SlidePaywall
  unlockPremium:        { en: 'Unlock Premium', he: 'פתח פרמיום' },
  unlockBtn:            { en: 'Unlock Full Wrapped ✨', he: 'פתח את הספונות המלא ✨' },
};

export function t(key, lang = 'en') {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] ?? entry['en'] ?? key;
}

// Helper to check if language is RTL
export function isRTL(lang) {
  return lang === 'he';
}