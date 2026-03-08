// Central translations for all app UI strings
// Usage: import { t } from './i18n'; t('key', lang)

const translations = {
  // Landing / flow steps
  stepLanguage: { en: 'Step 1 of 3', he: 'שלב 1 מתוך 3' },
  stepMode:     { en: 'Step 3 of 3', he: 'שלב 3 מתוך 3' },

  // SlideVolume
  totalMessages:    { en: 'Total Messages', he: 'סך הודעות' },
  messagesSent:     { en: 'messages sent.', he: 'הודעות נשלחו.' },
  couldntStop:      { en: "You couldn't stop talking. 💬", he: 'לא הצלחתם להפסיק לחפור. 💬' },

  // SlideChatterbox
  theChatterbox:    { en: 'The Chatterbox', he: 'מלך/מלכת החפירות' },
  whoTalksMore:     { en: 'Who talks more?', he: 'מי חופר/ת יותר?' },
  talksPctMore:     { en: (name, pct) => `🏆 ${name} talks ${pct}% more!`, he: (name, pct) => `🏆 ${name} מדבר/ת ${pct}% יותר — אחי כבר!` },

  // SlideLOLMeter
  laughterAnalysis: { en: 'Laughter Analysis', he: 'מי מת יותר' },
  lolMeter:         { en: 'The LOL Meter 😂', he: 'מד ה-חחח 😂' },
  cracksUpMore:     { en: 'Who cracks up more?', he: 'מי יותר מת/ה מצחוק?' },
  laughEvents:      { en: 'laugh events', he: 'פעמי צחוק' },
  theComedian:      { en: '😂 The Comedian', he: '😂 הסטנדאפיסט/ית' },
  theAudience:      { en: '👀 The Audience', he: '👀 הקהל' },
  detectedPatterns: { en: 'Detected: haha · lol · lmao · rofl · 😂 · 🤣 · 💀 · 😭', he: 'זוהו: חחח · לול · lmao · מת · 😂 · 🤣 · 💀 · 😭' },

  // SlideGhostInitiator
  conversationDynamics: { en: 'Conversation Dynamics', he: 'דינמיקת הצ\'אט' },
  ghostInitiator:       { en: 'Ghost & Initiator 👻', he: 'קאספר ומי שפותח 👻' },
  avgReplyTime:         { en: 'Average Reply Time', he: 'זמן תגובה ממוצע' },
  theGhost:             { en: 'The Ghost 🕯️', he: 'קאספר 🕯️' },
  speedRacer:           { en: 'Speed Racer ⚡', he: 'ספרינטר/ית ⚡' },
  ghostTakes:           { en: (name, time) => `${name} takes ${time} longer to reply — Playing Hard to Get 😏`, he: (name, time) => `${name} לוקח/ת ${time} יותר לענות — מסנן/ת כמו אלוף/ה 😏` },
  whoStartsConvos:      { en: 'Who Starts Conversations?', he: 'מי פותח/ת שיחות?' },
  afterSilence:         { en: '(message after 6h+ silence)', he: '(הודעה אחרי שקט של 6+ שעות)' },
  keepsChatAlive:       { en: (name) => `🚀 ${name} keeps the chat alive!`, he: (name) => `🚀 ${name} מחיה את הצ'אט — חיים שלי!` },

  // SlideEmotions
  emotionalIntelligence: { en: 'Emotional Intelligence', he: 'בדיקת ויבס' },
  vibesAndLols:          { en: 'Vibes & LOLs', he: 'ויבס וחחח' },
  signatureEmoji:        { en: 'Signature Emoji', he: 'אמוג\'י חתימה' },
  whoLaughsMore:         { en: 'Who laughs more?', he: 'מי יותר מת/ה?' },
  hahas:                 { en: "ha-ha's", he: "חחח'ים" },
  findsEverythingFunny:  { en: (name) => `😂 ${name} finds everything funnier!`, he: (name) => `😂 ${name} מת/ה על הכל — אמאל'ה!` },

  // SlideVibeCheck
  theVibeCheck:         { en: 'The Vibe Check', he: 'בדיקת הויבס' },
  sharedObsessions:     { en: 'Your shared obsessions', he: 'מה שאתם חיים בשבילו' },
  wordsDefineYou:       { en: 'Words that define you two 👀', he: 'המילים שמגדירות אתכם 👀' },
  privateUniverse:      { en: "These are your private universe's keywords", he: 'אלה מילות המפתח של היקום הפרטי שלכם' },

  // SlideWordPodium
  topWords:             { en: 'Top Words', he: 'המילים שאתם חיים בהן' },
  wordPodiumTitle:      { en: 'The Word Podium 🏆', he: 'פודיום המילים 🏆' },
  wordPodiumSub:        { en: 'Most used words in your chat', he: 'המילים שחזרו הכי הרבה בצ\'אט' },
  timesUsed:            { en: (n) => `${n}×`, he: (n) => `${n} פעמים` },
  alsoTrending:         { en: 'Also trending', he: 'גם בטרנד אצלכם' },

  // SlideDoubleText
  doubleTextCrown:      { en: 'Double Text Crown 👑', he: 'מלך/מלכת הדאבל טקסט 👑' },
  impatient:            { en: 'Most Impatient', he: 'נואש/ת לקשב' },
  doubleTexts:          { en: 'double texts', he: 'דאבל טקסטים' },

  // SlideYapper
  yapperTitle:          { en: 'The Yapper 🗣️', he: 'מלך/מלכת החפירות 🗣️' },
  avgWords:             { en: 'avg words/msg', he: 'מילים ממוצע להודעה' },
  oneWordWonder:        { en: 'One-Word Wonder 🤐', he: 'אחד/אחת במילה 🤐' },

  // SlideSwearJar
  swearJarTitle:        { en: 'The Swear Jar 🤬', he: 'קופת הקללות 🤬' },
  swearJarSub:          { en: 'Who owes the most?', he: 'מי חייב/ת הכי הרבה?' },
  perSwear:             { en: '$1 per swear', he: '₪1 על כל קללה' },
  totalDebt:            { en: 'Total debt', he: 'חוב כולל' },

  // SlideAIInsights
  aiInsightsTitle:      { en: 'AI Insights ✨', he: 'תובנות AI ✨' },
  coupleArchetype:      { en: 'Your Dynamic', he: 'הדינמיקה שלכם' },
  blackCatGolden:       { en: 'Black Cat & Golden Retriever', he: 'חתול שחור וגולדן רטריבר' },
  dynamicRoast:         { en: 'The Roast', he: 'הרוסט' },
  chatEvolution:        { en: 'Chat Evolution', he: 'איך זה התפתח' },
  mostApologetic:       { en: 'Most Apologetic', he: 'אלוף/ת הסליחות' },
  delusionalAward:      { en: 'Delusional Award', he: 'פרס "חי/ה בסרט"' },
  groupTherapist:       { en: 'Group Therapist', he: 'הפסיכולוג/ית של הקבוצה' },
  groupPatient:         { en: 'The Patient', he: 'המטופל/ת' },
  boomerScore:          { en: 'Boomer Score', he: 'דוד בוואטסאפ — ציון' },
  ignoredAward:         { en: 'Most Ignored', he: 'אלוף/ת הסינון' },
  unhingedQuote:        { en: 'Most Unhinged Quote', he: 'הציטוט הכי בלתי אפשרי' },

  // Family slides
  familyRoles:          { en: 'Family Roles', he: 'תפקידים במשפחה' },
  familyWrapped:        { en: 'Family Wrapped', he: 'וואטסראפ משפחתי' },
  familyAwards:         { en: 'Family Awards 🏅', he: 'פרסי המשפחה 🏅' },
  resultsAreIn:         { en: 'The results are in.', he: 'התוצאות הגיעו. אמאל\'ה.' },

  theOrganizer:         { en: 'The Organizer', he: 'המארגן/ת הרשמי' },
  organizerDesc:        { en: 'Always planning dinner, meetups & schedules', he: 'תמיד קובע/ת ארוחות, מפגשים וסדרי יום' },
  theComedianAward:     { en: 'The Comedian', he: 'הסטנדאפיסט/ית של המשפחה' },
  comedianDesc:         { en: 'Keeps everyone laughing', he: 'מחייך/ת את כולם — בין אם רוצים ולא' },
  theNightOwlAward:     { en: 'The Night Owl', he: 'יצור הלילה' },
  nightOwlDesc:         { en: 'Still texting at 3am', he: 'עדיין פעיל/ה ב-3 בלילה. איך?' },
  theLoudest:           { en: 'The Loudest', he: 'הכי רועש/ת' },
  loudestDesc:          { en: 'TYPES LIKE THIS A LOT', he: 'מקליד/ה ככה בלי הפסקה' },

  // SlideFamilyCapsLock
  theLoudestTitle:      { en: 'The Loudest 📣', he: 'מי צועק/ת בקאפס 📣' },
  whoTypesCaps:         { en: 'WHO TYPES LIKE THIS THE MOST?', he: 'מי שולח/ת הכי הרבה הודעות בצעקות?' },
  allCapsWords:         { en: (n) => `${n} ALL-CAPS words`, he: (n) => `${n} מילים בקאפס` },
  energyLabels:         {
    en: ['ABSOLUTELY SCREAMING', 'Very Enthusiastic', 'Normal Energy', 'Calm', 'Zen Mode'],
    he: ['צועק/ת ממש', 'נלהב/ת מאוד', 'אנרגיה רגילה', 'רגוע/ה', 'מצב זן'],
  },

  // SlideFamilyGhost
  familyGhostTitle:     { en: 'The Ghost 👻', he: 'קאספר של המשפחה 👻' },
  readsEverything:      { en: 'Reads everything. Replies… eventually.', he: 'קורא/ת הכל. עונה… אולי.' },
  onlyContributed:      { en: (name, pct) => `Only contributed ${pct}% of all messages`, he: (name, pct) => `תרם/ה רק ${pct}% מכל ההודעות — אמאל\'ה` },
  sawItBusy:            { en: '"I saw it but I was busy"', he: '"ראיתי אבל הייתי עסוק/ה" — בטח' },
  topChatter:           { en: 'Top chatter by contrast:', he: 'לעומת זאת, הכי פעיל/ה:' },
  messages:             { en: 'messages', he: 'הודעות' },

  // SlideFamilyMediaMogul
  theMediaMogul:        { en: 'The Media Mogul 📸', he: 'מוגול המדיה 📸' },
  whoSpamsGifs:         { en: 'Who spams the group with GIFs & images?', he: 'מי מפציץ/ה את הקבוצה עם GIFs ותמונות שנשלחו בוואטסאפ?' },
  mediaSent:            { en: (n) => `${n} media messages sent`, he: (n) => `${n} הודעות מדיה נשלחו` },
  goodMorningEnergy:    { en: '"Good morning 🌅" energy detected', he: 'זוהתה אנרגיית "בוקר טוב 🌅" — דוד בוואטסאפ mode ON' },

  // Friends slides
  friendGroup:          { en: 'Friend Group', he: 'חבר\'ה' },
  theRoastMaster:       { en: 'The Roast Master 🔥', he: 'מלך/מלכת הצחוק 🔥' },
  mostLolInGroup:       { en: 'Most lol, lmao, dead & 😂 in the group.', he: 'הכי הרבה חחח, lmao, מת/ה ו-😂 בקבוצה.' },
  laughReactions:       { en: (n) => `${n} laugh reactions`, he: (n) => `${n} תגובות צחוק` },
  groupDeadWithout:     { en: 'The group chat would be dead without them', he: 'הקבוצה הייתה מתה בלעדיהם — פיק מי' },

  theNightShift:        { en: 'The Night Shift 🌙', he: 'משמרת הלילה 🌙' },
  whoKeepsGroupAlive:   { en: 'Who keeps the group alive after midnight?', he: 'מי שומר/ת על הקבוצה חיה אחרי חצות?' },
  messagesAfterMidnight:{ en: (n) => `${n} messages after midnight`, he: (n) => `${n} הודעות אחרי חצות — אחי ישן/ה?' ` },
  sleepOverrated:       { en: '"Sleep is overrated anyway"', he: '"שינה זה ממילא מיותר" — כנראה' },

  theSummoningSpell:    { en: 'The Summoning Spell 🔮', he: 'לחש ההזמנה 🔮' },
  sayMagicWord:         { en: 'Say the magic word and they appear.', he: 'תגיד/י את המילה הקסומה — והם מופיעים כמו מהאוויר.' },
  theInactiveOne:       { en: 'The Inactive One', he: 'הכי פחות פעיל/ה בקבוצה' },
  usuallyMIA:           { en: 'Usually MIA in the chat', he: 'בדרך כלל נעדר/ת — קאספר' },
  summoningWord:        { en: 'Their Summoning Word', he: 'מילת הקסם שלהם' },
  triggeredReplies:     { en: (n) => `Triggered ${n}x replies from them`, he: (n) => `עוררה ${n} תגובות` },
  whenYouMention:       { en: (kw, name) => `"When you mention ${kw}, ${name} wakes up!"`, he: (kw, name) => `"כשמזכירים ${kw}, ${name} מתעורר/ת מהמתים!"` },
  notEnoughData:        { en: 'Not enough data to find a summoning spell!', he: 'אין מספיק נתונים למציאת לחש קסם!' },

  // SlideShare
  yourWrapped:          { en: 'Your Wrapped is Ready! 🎉', he: 'הוואטסראפ שלכם מוכן! 🎉' },
  shareTitle:           { en: 'Share Your Story', he: 'שתפו את הסיפור שלכם' },
  copyLink:             { en: 'Copy Link', he: 'העתק קישור' },
  copied:               { en: 'Copied!', he: 'הועתק!' },
  shareWhatsApp:        { en: 'Share on WhatsApp', he: 'שתף בוואטסאפ' },
  startOver:            { en: 'Start Over', he: 'התחל מחדש' },

  // SlidePaywall
  unlockPremium:        { en: 'Unlock Premium', he: 'פתח פרמיום' },
  unlockBtn:            { en: 'Unlock Full Wrapped ✨', he: 'פתח את הוואטסראפ המלא ✨' },

  // SlideWisdom
  wisdomTitle:          { en: 'Quotes & Wisdom 💬', he: 'ציטוטים שנשארו 💬' },
  wisdomSub:            { en: 'The lines that live rent-free in your head', he: 'הדברים שאמרתם שאי אפשר להתאושש מהם' },
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