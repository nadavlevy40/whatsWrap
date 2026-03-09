// Central translations for all app UI strings
// Usage: import { t } from './i18n'; t('key', lang)

const translations = {
  // Landing / flow steps
  stepLanguage: { en: 'Step 1 of 3', he: 'שלב 1 מתוך 3' },
  stepMode:     { en: 'Step 3 of 3', he: 'שלב 3 מתוך 3' },

  // ModeSelector
  modeSelectorStep:   { en: 'Step 3 of 3', he: 'שלב 3 מתוך 3' },
  modeSelectorTitle:  { en: "What kind of chat\nis this?", he: 'איזה סוג צ\'אט\nזה אצלכם?' },
  modeSelectorSub:    { en: 'Pick a mode for your personalized story.', he: 'בחרו מצב לסיפור האישי שלכם.' },
  modeSelectorFooter: { en: 'You can always change this later', he: 'תמיד אפשר לשנות אחר כך' },
  modeSuggested:      { en: 'Suggested', he: 'מומלץ' },

  modeCouple:    { en: 'Couple', he: 'זוגיות' },
  modeCouplesSub:{ en: 'Romantic & Roast', he: 'אהבה ורוסט' },
  modeFamily:    { en: 'Family', he: 'משפחה' },
  modeFamilySub: { en: 'Wholesome & Chaotic', he: 'חמימות ובלאגן' },
  modeFriends:   { en: 'Friends', he: "חבר'ה" },
  modeFriendsSub:{ en: 'Banter & Triggers', he: 'שטויות וטריגרים' },

  // SlideVolume
  totalMessages:    { en: 'Total Messages', he: 'סה"כ הודעות' },
  messagesSent:     { en: 'messages sent.', he: 'הודעות נשלחו.' },
  couldntStop:      { en: "You couldn't stop talking. 💬", he: 'לא הפסקתם לרגע. 💬' },

  // SlideChatterbox
  theChatterbox:    { en: 'The Chatterbox', he: 'אלוף/ת החפירות' },
  whoTalksMore:     { en: 'Who talks more?', he: 'מי חופר/ת יותר?' },
  talksPctMore:     { en: (name, pct) => `🏆 ${name} talks ${pct}% more!`, he: (name, pct) => `🏆 ${name} מדבר/ת ${pct}% יותר — אחי, רציני?` },

  // SlideLOLMeter
  laughterAnalysis: { en: 'Laughter Analysis', he: 'בדיקת חחח' },
  lolMeter:         { en: 'The LOL Meter 😂', he: 'מד ה-חחח 😂' },
  cracksUpMore:     { en: 'Who cracks up more?', he: 'מי יותר מת/ה מצחוק?' },
  laughEvents:      { en: 'laugh events', he: 'פרצי צחוק' },
  theComedian:      { en: '😂 The Comedian', he: '😂 הקומיקאי/ת' },
  theAudience:      { en: '👀 The Audience', he: '👀 הקהל' },
  detectedPatterns: { en: 'Detected: haha · lol · lmao · rofl · 😂 · 🤣 · 💀 · 😭', he: 'זוהו: חחח · לול · lmao · מת/ה · 😂 · 🤣 · 💀 · 😭' },

  // SlideGhostInitiator
  conversationDynamics: { en: 'Conversation Dynamics', he: 'דינמיקת הצ\'אט' },
  ghostInitiator:       { en: 'Ghost & Initiator 👻', he: 'קאספר ומי שפותח 👻' },
  avgReplyTime:         { en: 'Average Reply Time', he: 'זמן תגובה ממוצע' },
  theGhost:             { en: 'The Ghost 🕯️', he: 'אלוף/ת הסינון 🕯️' },
  speedRacer:           { en: 'Speed Racer ⚡', he: 'ענייני ⚡' },
  ghostTakes:           { en: (name, time) => `${name} takes ${time} longer to reply — Playing Hard to Get 😏`, he: (name, time) => `${name} לוקח/ת ${time} יותר לענות — בטח ב״עסוקים״ 😏` },
  whoStartsConvos:      { en: 'Who Starts Conversations?', he: 'מי פותח/ת שיחות?' },
  afterSilence:         { en: '(message after 6h+ silence)', he: '(הודעה אחרי שקט של 6+ שעות)' },
  keepsChatAlive:       { en: (name) => `🚀 ${name} keeps the chat alive!`, he: (name) => `🚀 ${name} מחייה את הצ'אט — חיים שלי!` },

  // SlideEmotions
  emotionalIntelligence: { en: 'Emotional Intelligence', he: 'בדיקת ווייבים' },
  vibesAndLols:          { en: 'Vibes & LOLs', he: 'ווייבים וחחח' },
  signatureEmoji:        { en: 'Signature Emoji', he: 'האמוג\'י שמגדיר אתכם' },
  whoLaughsMore:         { en: 'Who laughs more?', he: 'מי יותר מת/ה מצחוק?' },
  hahas:                 { en: "ha-ha's", he: "פעמי חחח" },
  findsEverythingFunny:  { en: (name) => `😂 ${name} finds everything funnier!`, he: (name) => `😂 ${name} מת/ה על הכל — אמאל'ה!` },

  // SlideVibeCheck
  theVibeCheck:         { en: 'The Vibe Check', he: 'בדיקת ווייבים' },
  sharedObsessions:     { en: 'Your shared obsessions', he: 'מה שאתם חיים בשבילו' },
  wordsDefineYou:       { en: 'Words that define you two 👀', he: 'המילים שמגדירות אתכם 👀' },
  privateUniverse:      { en: "These are your private universe's keywords", he: 'אלה מילות הקוד של היקום הפרטי שלכם' },

  // SlideWordPodium
  topWords:             { en: 'Top Words', he: 'מילות הטרנד שלכם' },
  wordPodiumTitle:      { en: 'The Word Podium 🏆', he: 'פודיום המילים 🏆' },
  wordPodiumSub:        { en: 'Most used words in your chat', he: 'המילים שחזרו הכי הרבה בצ\'אט' },
  timesUsed:            { en: (n) => `${n}×`, he: (n) => `${n} פעמים` },
  alsoTrending:         { en: 'Also trending', he: 'גם בטרנד אצלכם' },

  // SlideDoubleText
  doubleTextCrown:      { en: 'Double Text Crown 👑', he: 'מלך/מלכת הדאבל טקסט 👑' },
  doubleTextHeader:     { en: "Who can't wait\nfor a reply?", he: 'מי לא מצליח/ה\nלחכות לתגובה?' },
  doubleTextSentBefore: { en: 'sent before getting a reply', he: 'שלח/ה לפני שקיבל/ה תגובה' },
  impatient:            { en: 'The Impatient One', he: 'נואש/ת לקשב' },
  doubleTexts:          { en: 'double texts', he: 'דאבל טקסטים' },

  // SlideYapper
  yapperVsOneWord:      { en: 'Yapper vs. One-Word Wonder', he: 'חופר/ת מול קצרצר/ת' },
  yapperHeader:         { en: 'Who writes\nessays?', he: 'מי כותב/ת\nרומנים בוואטסאפ?' },
  yapperTitle:          { en: 'The Yapper 🗣️', he: 'מלך/מלכת החפירות 🗣️' },
  yapperLabel:          { en: 'Yapper', he: 'חופר/ת' },
  avgWords:             { en: 'avg words/msg', he: 'מילים ממוצע להודעה' },
  wordsPerMsg:          { en: 'words/msg', he: 'מילים/הודעה' },
  oneWordWonder:        { en: 'One-Word Wonder 🤐', he: 'מסתפק/ת במינימום 🤐' },
  oneWordLabel:         { en: 'One-Word Wonder', he: 'קצרצר/ת' },
  yapperWritesMore:     { en: (yapper, ratio, quiet) => `${yapper} writes ${ratio}x more words per message than ${quiet}`, he: (yapper, ratio, quiet) => `${yapper} כותב/ת ${ratio} פעמים יותר מילים להודעה מ-${quiet}` },

  // SlideSwearJar
  swearJarTitle:        { en: 'The Swear Jar 🤬', he: 'קופת הקללות 🤬' },
  swearJarHeader:       { en: 'Who owes\nthe most?', he: 'מי חייב/ת\nהכי הרבה?' },
  swearJarSub:          { en: 'Who owes the most?', he: 'מי חייב/ת הכי הרבה?' },
  mostPottyMouthed:     { en: 'Most Potty-Mouthed', he: 'הפה הכי מלוכלך' },
  perSwear:             { en: '$1 per swear', he: '₪1 על כל קללה' },
  totalDebt:            { en: 'Total debt', he: 'חוב כולל' },
  swearOwes:            { en: (count, owes) => `${count} swear words · owes $${owes}`, he: (count, owes) => `${count} קללות · חייב/ת ₪${owes}` },

  // SlideAIInsights
  aiInsightsTitle:      { en: 'AI Insights ✨', he: 'תובנות AI ✨' },
  aiRelationshipAnalysis: { en: 'AI Relationship Analysis 🤖', he: 'ניתוח זוגיות ע"י AI 🤖' },
  aiGroupAnalysis:      { en: 'AI Group Analysis 🤖', he: 'ניתוח הקבוצה ע"י AI 🤖' },
  aiFamilyAnalysis:     { en: 'AI Family Analysis 🤖', he: 'ניתוח המשפחה ע"י AI 🤖' },
  theVerdict:           { en: 'The Verdict', he: 'הפסיקה' },
  boomerScoreTitle:     { en: 'Boomer Score', he: 'ציון דוד בוואטסאפ' },
  coupleArchetype:      { en: 'Your Dynamic', he: 'הדינמיקה שלכם' },
  blackCatGolden:       { en: 'Black Cat & Golden Retriever', he: 'חתול שחור וגולדן רטריבר' },
  blackCatLabel:        { en: 'Black Cat', he: 'חתול שחור' },
  goldenLabel:          { en: 'Golden Retriever', he: 'גולדן רטריבר' },
  dynamicRoast:         { en: 'The Roast ☕', he: 'הרוסט ☕' },
  chatEvolution:        { en: 'The Evolution 📈', he: 'האבולוציה 📈' },
  mostApologetic:       { en: '🙏 Most Apologetic', he: '🙏 אלוף/ת הסליחות' },
  delusionalAward:      { en: '🏆 Delusional Award', he: '🏆 פרס "חי/ה בסרט"' },
  groupTherapist:       { en: 'Group Therapist', he: 'הפסיכולוג/ית של הקבוצה' },
  groupPatient:         { en: 'The Patient', he: 'המטופל/ת' },
  boomerScore:          { en: 'Boomer Score', he: 'ציון דוד בוואטסאפ' },
  ignoredAward:         { en: '👻 Left On Read Award', he: '👻 פרס הסינון' },
  unhingedQuote:        { en: '🤪 Most Unhinged Quote', he: '🤪 הציטוט הכי לא נורמלי' },
  aiUnavailable:        { en: 'AI insights unavailable', he: 'תובנות AI לא זמינות' },

  // SlideWisdom
  wisdomTitle:          { en: 'Quotes & Wisdom 💬', he: 'ציטוטים שנשארו 💬' },
  wisdomHeader:         { en: 'Your Signature Lines', he: 'הביטויים שלכם' },
  wisdomSub:            { en: 'The lines that live rent-free in your head', he: 'הדברים שאמרתם שאי אפשר להתאושש מהם' },
  wisdomPhrasesSub:     { en: 'The phrases that define this chat', he: 'הביטויים שמגדירים את הצ\'אט הזה' },

  // Family slides
  familyRoles:          { en: 'Family Roles', he: 'תפקידים במשפחה' },
  familyWrapped:        { en: 'Family Wrapped', he: 'וואטסראפ משפחתי' },
  familyAwards:         { en: 'Family Awards 🏅', he: 'פרסי המשפחה 🏅' },
  resultsAreIn:         { en: 'The results are in.', he: "התוצאות הגיעו. אמאל'ה." },

  theOrganizer:         { en: 'The Organizer', he: 'המארגן/ת הרשמי' },
  organizerDesc:        { en: 'Always planning dinner, meetups & schedules', he: 'קובע/ת ארוחות, מפגשים וסדרי יום — ובוא תגיד תודה' },
  theComedianAward:     { en: 'The Comedian', he: 'הקומיקאי/ת של המשפחה' },
  comedianDesc:         { en: 'Keeps everyone laughing', he: 'מצחיק/ה את כולם — בין אם רוצים ובין אם לא' },
  theNightOwlAward:     { en: 'The Night Owl', he: 'יצור הלילה' },
  nightOwlDesc:         { en: 'Still texting at 3am', he: 'עדיין ער/ה ב-3 לפנות בוקר. למה? אין מושג.' },
  theLoudest:           { en: 'The Loudest', he: 'הכי רועש/ת' },
  loudestDesc:          { en: 'TYPES LIKE THIS A LOT', he: 'מקליד/ה בקאפס כאילו הכל דחוף' },

  // SlideFamilyCapsLock
  theLoudestTitle:      { en: 'The Loudest 📣', he: 'מי צועק/ת בקאפס 📣' },
  whoTypesCaps:         { en: 'WHO TYPES LIKE THIS THE MOST?', he: 'מי מקליד/ה ככה בלי הפסקה?' },
  allCapsWords:         { en: (n) => `${n} ALL-CAPS words`, he: (n) => `${n} מילים בקאפס` },
  energyLabels:         {
    en: ['ABSOLUTELY SCREAMING', 'Very Enthusiastic', 'Normal Energy', 'Calm', 'Zen Mode'],
    he: ['צועק/ת בלי עצור', 'נלהב/ת מאוד', 'אנרגיה רגילה', 'רגוע/ה', 'מצב זן'],
  },

  // SlideFamilyGhost
  familyGhostTitle:     { en: 'The Ghost 👻', he: 'קאספר המשפחתי 👻' },
  readsEverything:      { en: 'Reads everything. Replies… eventually.', he: 'קורא/ת הכל. עונה… אולי מחר.' },
  onlyContributed:      { en: (name, pct) => `Only contributed ${pct}% of all messages`, he: (name, pct) => `תרם/ה רק ${pct}% מכל ההודעות — כן, ספרנו` },
  sawItBusy:            { en: '"I saw it but I was busy"', he: '"ראיתי אבל הייתי עסוק/ה" — בטח' },
  topChatter:           { en: 'Top chatter by contrast:', he: 'לעומת זאת, הכי פעיל/ה:' },
  messages:             { en: 'messages', he: 'הודעות' },

  // SlideFamilyMediaMogul
  theMediaMogul:        { en: 'The Media Mogul 📸', he: 'מוגול המדיה 📸' },
  whoSpamsGifs:         { en: 'Who spams the group with GIFs & images?', he: 'מי מפציץ/ה את הקבוצה עם GIFs ותמונות?' },
  mediaSent:            { en: (n) => `${n} media messages sent`, he: (n) => `${n} קבצי מדיה נשלחו` },
  goodMorningEnergy:    { en: '"Good morning 🌅" energy detected', he: 'זוהתה אנרגיית "בוקר טוב 🌅" — מצב דוד-בוואטסאפ' },

  // Friends slides
  friendGroup:          { en: 'Friend Group', he: "חבר'ה" },
  theRoastMaster:       { en: 'The Roast Master 🔥', he: 'מלך/מלכת הצחוק 🔥' },
  mostLolInGroup:       { en: 'Most lol, lmao, dead & 😂 in the group.', he: 'הכי הרבה חחח, lmao, מת/ה ו-😂 בקבוצה.' },
  laughReactions:       { en: (n) => `${n} laugh reactions`, he: (n) => `${n} תגובות צחוק` },
  groupDeadWithout:     { en: 'The group chat would be dead without them', he: 'הקבוצה הייתה מתה בלעדיהם — פיק מי' },

  theNightShift:        { en: 'The Night Shift 🌙', he: 'משמרת הלילה 🌙' },
  whoKeepsGroupAlive:   { en: 'Who keeps the group alive after midnight?', he: 'מי מחייה את הקבוצה אחרי חצות?' },
  messagesAfterMidnight:{ en: (n) => `${n} messages after midnight`, he: (n) => `${n} הודעות אחרי חצות — אחי, ישן/ה?` },
  sleepOverrated:       { en: '"Sleep is overrated anyway"', he: '"שינה זה ממילא מיותר" — כנראה' },

  theSummoningSpell:    { en: 'The Summoning Spell 🔮', he: 'לחש ההזמנה 🔮' },
  sayMagicWord:         { en: 'Say the magic word and they appear.', he: 'תגיד/י את המילה הקסומה — והם מתעוררים מהמתים.' },
  theInactiveOne:       { en: 'The Inactive One', he: 'הכי פחות פעיל/ה בקבוצה' },
  usuallyMIA:           { en: 'Usually MIA in the chat', he: 'בדרך כלל עושה קאספר' },
  summoningWord:        { en: 'Their Summoning Word', he: 'מילת הקסם שלהם' },
  triggeredReplies:     { en: (n) => `Triggered ${n}x replies from them`, he: (n) => `גרמה ל-${n} תגובות מהם` },
  whenYouMention:       { en: (kw, name) => `"When you mention ${kw}, ${name} wakes up!"`, he: (kw, name) => `"כשמזכירים ${kw}, ${name} מתעורר/ת מהמתים!"` },
  notEnoughData:        { en: 'Not enough data to find a summoning spell!', he: 'אין מספיק נתונים למציאת לחש קסם!' },

  // SlideShare
  reportUnlocked:       { en: 'Report Unlocked', he: 'הדוח נפתח' },
  yourWrapped:          { en: 'Your Wrapped is Ready! 🎉', he: 'הוואטסראפ שלכם מוכן! 🎉' },
  shareTitle:           { en: 'Share Your Story', he: 'שתפו את הסיפור שלכם' },
  shareHeadline:        { en: 'Share Your\nWrapped Report', he: 'שתפו את\nהוואטסראפ שלכם' },
  shareHeadlineAccent:  { en: 'Wrapped Report', he: 'הוואטסראפ שלכם' },
  yourUniqueLink:       { en: 'Your unique link', he: 'הקישור הייחודי שלכם' },
  scanToOpen:           { en: "Scan to open on partner's phone", he: 'סרקו לפתיחה בטלפון השני' },
  copyLink:             { en: 'Copy', he: 'העתק' },
  copied:               { en: 'Copied!', he: 'הועתק!' },
  shareWhatsApp:        { en: 'Send via WhatsApp', he: 'שלח בוואטסאפ' },
  startOver:            { en: '↩ Start over', he: '↩ התחל מחדש' },

  // SlidePaywall
  unlockPremium:        { en: 'Unlock Premium', he: 'פתח פרמיום' },
  unlockBtn:            { en: 'Unlock Full Wrapped ✨', he: 'פתח את הוואטסראפ המלא ✨' },

  // Premium slides shared
  premiumBadge:         { en: '✨ Premium', he: '✨ פרמיום' },
  premiumOnly:          { en: 'Deep Dive', he: 'צלילה עמוקה' },

  // SlidePremiumShadowStats
  shadowStatsTitle:     { en: 'Shadow Stats 🕶️', he: 'נתוני הצל 🕶️' },
  shadowStatsSub:       { en: 'The data they hoped you would never see.', he: 'הנתונים שקיוו שלא תראו.' },
  doubleDownTitle:      { en: 'Double-Down Award 🏆', he: 'פרס הפאנץ\' 🏆' },
  doubleDownDesc:       { en: '5+ messages in a row before anyone replied', he: '5+ הודעות ברצף לפני שמישהו ענה' },
  lastWordTitle:        { en: 'Last Word Obsession 🔇', he: 'אובססיית המילה האחרונה 🔇' },
  lastWordDesc:         { en: 'Always has to have the last word before silence', he: 'תמיד חייב/ת את המילה האחרונה לפני שקט' },
  vibeShiftTitle:       { en: 'Vibe Shift Timeline 📅', he: 'ציר הזמן של הווייב 📅' },

  // SlidePremiumPersonas
  personasTitle:        { en: 'Your Chat Personas 🎭', he: 'הפרסונות של הצ\'אט 🎭' },
  personasSub:          { en: 'AI assigned you roles. No take-backs.', he: 'ה-AI חילק תפקידים. אין ערעורים.' },
  personaMainChar:      { en: '🌟 Main Character', he: '🌟 הדמות הראשית' },
  personaTherapist:     { en: '🧠 The Therapist', he: '🧠 המטפל/ת' },
  personaChaosAgent:    { en: '💥 Chaos Agent', he: '💥 סוכן/ת הכאוס' },
  personaBoomer:        { en: '👍 Boomer-in-Training', he: '👍 בוגר/ת בהכשרה' },
  personaMainDesc:      { en: 'Always brings it back to themselves', he: 'תמיד מחזיר/ה את זה לעצמם' },
  personaTherapistDesc: { en: 'Sends supportive paragraphs', he: 'שולח/ת פסקאות תמיכה' },
  personaChaosDesc:     { en: 'Drops wild takes and disappears', he: 'זורק/ת משפטים מטורפים ונעלם/ת' },
  personaBoomerDesc:    { en: 'Uses too many ellipses and 👍', he: 'משתמש/ת יותר מדי ב... ו-👍' },

  // SlidePremiumDeepDive
  deepDiveTitle:        { en: 'The Deep Dive 🔍', he: 'הצלילה העמוקה 🔍' },
  deepDiveSub:          { en: 'AI read your entire chat. Here\'s the verdict.', he: 'ה-AI קרא את כל הצ\'אט. הנה הפסיקה.' },
  duoNameLabel:         { en: '🏷️ Your Official Duo Name', he: '🏷️ שם הצמד הרשמי שלכם' },
  firstVsLastLabel:     { en: '📖 Then vs Now', he: '📖 אז לעומת עכשיו' },
  apologyAnalysisLabel: { en: '🙏 The Apology Report', he: '🙏 דוח הסליחות' },

  // SlidePremiumVault
  vaultTitle:           { en: 'The Vault 🔐', he: 'הכספת 🔐' },
  vaultSub:             { en: 'Quotes so unhinged they deserve a shrine.', he: 'ציטוטים כל כך לא נורמליים שמגיעה להם מצבה.' },
  hallOfFameLabel:      { en: '🏛️ Hall of Fame', he: '🏛️ אולם התהילה' },
  mostIgnoredLabel:     { en: '🦗 Most Ignored Topic', he: '🦗 הנושא הכי מסונן' },
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