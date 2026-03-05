// WhatsApp chat parser - handles standard export format
const STOP_WORDS_EN = new Set([
  'the','and','is','to','a','of','in','it','you','that','was','for','on','are',
  'with','as','i','his','they','be','at','one','have','this','from','or','had',
  'by','not','but','we','an','were','her','she','do','their','if','will','up',
  'about','out','who','get','which','go','me','when','make','can','like','time',
  'no','just','him','know','take','people','into','year','your','good','some',
  'could','them','see','other','than','then','now','look','only','come','its',
  'over','think','also','back','after','use','two','how','our','work','first',
  'well','way','even','new','want','because','any','these','give','day','most',
  'us','he','my','has','what','so','all','would','there','their','been','more',
  'ok','okay','yeah','yes','no','oh','ah','hey','hi','hello','lol','haha','lmao',
  'im','ur','r','u','ya','yep','nope','nah','na','gonna','wanna','gotta','kinda',
  'omg','wtf','idk','imo','tbh','btw','thats','dont','cant','wont','isnt','wasnt',
  'didnt','doesnt','havent','hasnt','arent','werent','shouldnt','wouldnt','couldnt',
  'media','omitted','message','deleted','null','missed','voice','call','video','image',
  'gif','sticker','audio','document','contact','location','live'
]);

const STOP_WORDS_HE = new Set([
  'של','את','על','עם','לא','זה','הוא','היא','אני','אתה','אנחנו','הם','הן',
  'כן','לו','לה','אבל','אם','כי','או','גם','רק','כבר','עוד','היה','הייתה',
  'יש','אין','מה','איך','למה','מתי','איפה','כל','אחד','אחת','עכשיו','אז',
  'תודה','בסדר','טוב','יופי','כך','כזה','שם','פה','כלום','שוב','בוא','באה',
  'אוקיי','אוקי','ממש','מאוד','קצת','הרבה','פחות','יותר','בדיוק','נכון','אמרתי',
  'deleted','omitted','image','video','audio','sticker','gif','document','media','missed','call'
]);

const ORGANIZER_WORDS_HE = new Set(['ארוחה','צהריים','ערב','בוקר','תוכנית','פגישה','מתי','מחר','היום','הלילה','סוף שבוע','לוח זמנים','בוא','הצטרף','הזמנה','יום הולדת','מסיבה','טיול','הולכים']);

const STOP_WORDS = STOP_WORDS_EN; // default, overridden per call

const LAUGH_PATTERNS_EN = /(\b(haha+|hah|hehe+|hhh+|lol|lmao|lmfao|rofl|dead|weak)\b|😂|🤣|💀|😭)/gi;
const LAUGH_PATTERNS_HE = /(ח{2,}|ה{2,}|lol|lmao|😂|🤣|💀|😭)/gi;
const EMOJI_REGEX = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;
// Matches WhatsApp "media omitted" in all languages/formats
const MEDIA_PATTERN = /(omitted|<media omitted>|התמונה הושמטה|הסרטון הושמט|הקובץ הושמט|המדיה הושמטה|הסטיקר הושמט|האודיו הושמט|המסמך הושמט|הושמט|הושמטה)/i;

// Individual words that are WhatsApp system placeholders — never count them
const MEDIA_STOP_WORDS = new Set(['omitted', 'הושמט', 'הושמטה']);
const ORGANIZER_WORDS = new Set(['dinner','lunch','breakfast','plan','meet','meeting','time','when','tomorrow','today','tonight','weekend','schedule','come','join','invite','birthday','party','trip','going']);

const SWEAR_WORDS = new Set([
  'fuck','fucking','fucked','fucker','shit','shitting','bullshit','damn','damnit','ass','asshole',
  'bitch','bitches','bastard','crap','cunt','dick','pussy','cock','piss','hell','wtf','stfu',
  'motherfucker','motherfucking','jackass','douchebag','idiot','moron','retard','screw','screwed',
  'fck','fk','sh*t','f*ck','b*tch','a**','s**t'
]);

export function parseChatFile(text, lang = 'en') {
  const stopWords = lang === 'he' ? STOP_WORDS_HE : STOP_WORDS_EN;
  const organizerWords = lang === 'he' ? ORGANIZER_WORDS_HE : ORGANIZER_WORDS;
  const lines = text.split('\n');
  const messages = [];

  const patterns = [
    // [DD/MM/YYYY, HH:MM] Sender: content  (iOS with brackets)
    /^\[(\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4}),\s*(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\]\s*([^:]+):\s*(.*)/i,
    // DD/MM/YYYY, HH:MM - Sender: content  (Android)
    /^(\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4}),\s*(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\s*-\s*([^:]+):\s*(.*)/i,
    // [DD/MM/YYYY HH:MM] Sender: content  (no comma)
    /^\[(\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4})\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\]\s*([^:]+):\s*(.*)/i,
    // DD/MM/YYYY HH:MM - Sender: content  (no comma, Android variant)
    /^(\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4})\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\s*-\s*([^:]+):\s*(.*)/i,
  ];

  let currentMessage = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    let matched = false;
    for (const pattern of patterns) {
      const match = trimmed.match(pattern);
      if (match) {
        if (currentMessage) messages.push(currentMessage);
        const [, date, time, sender, content] = match;
        const hour = parseHour(time);
        currentMessage = { date: date.trim(), time: time.trim(), hour, sender: sender.trim(), content: content.trim() };
        matched = true;
        break;
      }
    }
    if (!matched && currentMessage) {
      currentMessage.content += ' ' + trimmed;
    }
  }
  if (currentMessage) messages.push(currentMessage);
  return analyzeMessages(messages, stopWords, organizerWords, lang);
}

function parseHour(timeStr) {
  const m = timeStr.match(/(\d{1,2}):(\d{2})(?::\d{2})?\s*([AP]M)?/i);
  if (!m) return 0;
  let hour = parseInt(m[1]);
  const ampm = m[3];
  if (ampm) {
    if (ampm.toUpperCase() === 'PM' && hour !== 12) hour += 12;
    if (ampm.toUpperCase() === 'AM' && hour === 12) hour = 0;
  }
  return hour;
}

function analyzeMessages(messages, stopWords = STOP_WORDS_EN, organizerWords = ORGANIZER_WORDS, lang = 'en') {
  if (messages.length === 0) return null;

  const SYSTEM_PATTERN = /(end-to-end encrypted|created group|Messages and calls|added|removed|left|joined|changed the subject|changed this group|security code changed|הוצפנה מקצה לקצה|נוצרה הקבוצה|הודעות ושיחות|הצטרף|עזב|עזבה|הסיר|הסירה|הוסיף|הוסיפה|שינה|שינתה)/i;

  const userMessages = messages.filter(m =>
    m.sender && m.sender.length > 0 &&
    !SYSTEM_PATTERN.test(m.content)
  );

  // Separate real-text messages from media-only ones
  const textMessages = userMessages.filter(m => !MEDIA_PATTERN.test(m.content));

  const senderCounts = {};
  userMessages.forEach(m => { senderCounts[m.sender] = (senderCounts[m.sender] || 0) + 1; });
  const sortedSenders = Object.entries(senderCounts).sort((a, b) => b[1] - a[1]);
  // Support up to 10 participants for family/friends
  const participants = sortedSenders.slice(0, 10).map(([name]) => name);
  const filtered = userMessages.filter(m => participants.includes(m.sender));
  // Text-only messages (no media placeholders) — used for content analysis
  const filteredText = textMessages.filter(m => participants.includes(m.sender));

  const msgCounts = {};
  participants.forEach(p => (msgCounts[p] = 0));
  filtered.forEach(m => msgCounts[m.sender]++);

  const hourlyData = Array.from({ length: 24 }, (_, h) => {
    const obj = { hour: h, total: 0 };
    participants.forEach(p => (obj[p] = 0));
    return obj;
  });
  filtered.forEach(m => {
    if (m.hour >= 0 && m.hour < 24) {
      hourlyData[m.hour].total++;
      hourlyData[m.hour][m.sender] = (hourlyData[m.hour][m.sender] || 0) + 1;
    }
  });

  // Build a set of name tokens to exclude from top words
  const nameTokens = new Set();
  participants.forEach(name => {
    name.toLowerCase().split(/\s+/).forEach(token => { if (token.length > 0) nameTokens.add(token); });
  });

  const wordCounts = {};
  filteredText.forEach(m => {
    // For Hebrew, keep Hebrew chars; for English, keep Latin only
    const cleaned = lang === 'he'
      ? m.content.toLowerCase().replace(/[^א-תa-z\s]/g, ' ')
      : m.content.toLowerCase().replace(/[^a-z\s]/g, ' ');
    const words = cleaned.split(/\s+/).filter(w => w.length > 1 && !stopWords.has(w) && !nameTokens.has(w) && !MEDIA_STOP_WORDS.has(w));
    words.forEach(w => { wordCounts[w] = (wordCounts[w] || 0) + 1; });
  });
  const topWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([word, count]) => ({ word, count }));

  const emojiCounts = {};
  participants.forEach(p => (emojiCounts[p] = {}));
  filteredText.forEach(m => {
    const emojis = m.content.match(EMOJI_REGEX) || [];
    emojis.forEach(e => {
      if (emojiCounts[m.sender]) emojiCounts[m.sender][e] = (emojiCounts[m.sender][e] || 0) + 1;
    });
  });
  const signatureEmojis = {};
  participants.forEach(p => {
    const sorted = Object.entries(emojiCounts[p]).sort((a, b) => b[1] - a[1]);
    signatureEmojis[p] = sorted.length > 0 ? sorted[0][0] : '✨';
  });

  const LAUGH_PATTERNS = lang === 'he' ? LAUGH_PATTERNS_HE : LAUGH_PATTERNS_EN;
  const laughCounts = {};
  participants.forEach(p => (laughCounts[p] = 0));
  filteredText.forEach(m => {
    const matches = m.content.match(LAUGH_PATTERNS) || [];
    if (laughCounts[m.sender] !== undefined) laughCounts[m.sender] += matches.length;
  });

  const nightOwlCounts = {};
  participants.forEach(p => (nightOwlCounts[p] = 0));
  filtered.forEach(m => {
    if (m.hour >= 0 && m.hour < 5 && nightOwlCounts[m.sender] !== undefined) nightOwlCounts[m.sender]++;
  });

  // Media counts
  const mediaCounts = {};
  participants.forEach(p => (mediaCounts[p] = 0));
  filtered.forEach(m => {
    if (MEDIA_PATTERN.test(m.content) && mediaCounts[m.sender] !== undefined) mediaCounts[m.sender]++;
  });

  // Caps lock counts (words that are all uppercase, length > 1)
  const capsLockCounts = {};
  participants.forEach(p => (capsLockCounts[p] = 0));
  filteredText.forEach(m => {
    const caps = m.content.split(/\s+/).filter(w => w.length > 1 && w === w.toUpperCase() && /[A-Z]/.test(w));
    if (capsLockCounts[m.sender] !== undefined) capsLockCounts[m.sender] += caps.length;
  });

  // Organizer score
  const organizerScore = {};
  participants.forEach(p => (organizerScore[p] = 0));
  filteredText.forEach(m => {
    const words = m.content.toLowerCase().split(/\s+/);
    const score = words.filter(w => organizerWords.has(w)).length;
    if (organizerScore[m.sender] !== undefined) organizerScore[m.sender] += score;
  });

  // Double-text counts
  const doubleTextCounts = {};
  participants.forEach(p => (doubleTextCounts[p] = 0));
  for (let i = 1; i < filtered.length; i++) {
    const prev = filtered[i - 1];
    const curr = filtered[i];
    if (curr.sender === prev.sender && participants.includes(curr.sender)) {
      const parseMs = (m) => {
        const parts = m.date.split(/[\/\.\-]/).map(Number);
        const [mm, dd, yy] = parts;
        const year = yy < 100 ? 2000 + yy : yy;
        const minMatch = m.time.match(/:(\d{2})/);
        const min = minMatch ? parseInt(minMatch[1]) : 0;
        return new Date(year, mm - 1, dd, m.hour, min).getTime();
      };
      const delta = (parseMs(curr) - parseMs(prev)) / 60000;
      if (delta >= 1 && delta <= 60) doubleTextCounts[curr.sender]++;
    }
  }

  // Average words per message
  const wordTotals = {};
  const msgTextCounts = {};
  participants.forEach(p => { wordTotals[p] = 0; msgTextCounts[p] = 0; });
  filteredText.forEach(m => {
    if (!participants.includes(m.sender)) return;
    const words = m.content.trim().split(/\s+/).filter(w => w.length > 0);
    wordTotals[m.sender] += words.length;
    msgTextCounts[m.sender]++;
  });
  const avgWordsPerMessage = {};
  participants.forEach(p => {
    avgWordsPerMessage[p] = msgTextCounts[p] > 0 ? wordTotals[p] / msgTextCounts[p] : 0;
  });

  // Swear counts
  const swearCounts = {};
  participants.forEach(p => (swearCounts[p] = 0));
  filteredText.forEach(m => {
    if (!participants.includes(m.sender)) return;
    const words = m.content.toLowerCase().split(/\s+/);
    words.forEach(w => { if (SWEAR_WORDS.has(w.replace(/[^a-z*]/g, ''))) swearCounts[m.sender]++; });
  });

  // Regret index (deleted messages)
  const regretCounts = {};
  participants.forEach(p => (regretCounts[p] = 0));
  filtered.forEach(m => {
    if (participants.includes(m.sender) && /this message was deleted/i.test(m.content)) {
      regretCounts[m.sender]++;
    }
  });

  // Build full condensed chat text for AI (skip media-only messages)
  const fullChatText = filtered
    .filter(m => !MEDIA_PATTERN.test(m.content))
    .map(m => `${m.sender}: ${m.content}`)
    .join('\n');

  const quotes = filteredText
    .filter(m => m.content.length > 8 && m.content.length < 55 && !m.content.includes('http') && !m.content.includes('www'))
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  // Reply times
  const replyTimes = {};
  participants.forEach(p => (replyTimes[p] = { total: 0, count: 0 }));
  for (let i = 1; i < filtered.length; i++) {
    const prev = filtered[i - 1];
    const curr = filtered[i];
    if (curr.sender !== prev.sender && participants.includes(curr.sender) && participants.includes(prev.sender)) {
      const parseTime = (m) => {
        const parts = m.date.split(/[\/\.\-]/).map(Number);
        const [mm, dd, yy] = parts;
        const year = yy < 100 ? 2000 + yy : yy;
        const h = m.hour;
        const minMatch = m.time.match(/:(\d{2})/);
        const min = minMatch ? parseInt(minMatch[1]) : 0;
        return new Date(year, mm - 1, dd, h, min).getTime();
      };
      const delta = (parseTime(curr) - parseTime(prev)) / 60000;
      if (delta > 0 && delta < 1440) {
        replyTimes[curr.sender].total += delta;
        replyTimes[curr.sender].count++;
      }
    }
  }
  const avgReplyTimes = {};
  participants.forEach(p => {
    avgReplyTimes[p] = replyTimes[p].count > 0 ? replyTimes[p].total / replyTimes[p].count : 0;
  });

  // Conversation starters
  const initiatorCounts = {};
  participants.forEach(p => (initiatorCounts[p] = 0));
  for (let i = 1; i < filtered.length; i++) {
    const prev = filtered[i - 1];
    const curr = filtered[i];
    const parseTime2 = (m) => {
      const parts = m.date.split(/[\/\.\-]/).map(Number);
      const [mm, dd, yy] = parts;
      const year = yy < 100 ? 2000 + yy : yy;
      const minMatch = m.time.match(/:(\d{2})/);
      const min = minMatch ? parseInt(minMatch[1]) : 0;
      return new Date(year, mm - 1, dd, m.hour, min).getTime();
    };
    const delta = (parseTime2(curr) - parseTime2(prev)) / 60000;
    if (delta > 360 && participants.includes(curr.sender)) {
      initiatorCounts[curr.sender]++;
    }
  }

  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayCountsArr = Array(7).fill(0);
  filtered.forEach(m => {
    const parts = m.date.split(/[\/\.\-]/);
    if (parts.length >= 3) {
    let [mm, dd, yy] = parts.map(Number);
      const year = yy < 100 ? 2000 + yy : yy;
      const d = new Date(year, mm - 1, dd);
      if (!isNaN(d)) dayCountsArr[d.getDay()]++;
    }
  });
  const dayOfWeekData = DAY_NAMES.map((day, i) => ({ day, count: dayCountsArr[i] }));

  // Summoning spell: find the least active user and what keyword triggers their replies
  const summoningSpell = computeSummoningSpell(filtered, participants, msgCounts, stopWords, lang);

  return {
    participants,
    totalMessages: filtered.length,
    msgCounts,
    hourlyData,
    dayOfWeekData,
    topWords,
    signatureEmojis,
    laughCounts,
    nightOwlCounts,
    mediaCounts,
    capsLockCounts,
    organizerScore,
    quotes,
    replyTimes: avgReplyTimes,
    initiatorCounts,
    summoningSpell,
    isMock: false,
  };
}

function computeSummoningSpell(filtered, participants, msgCounts, stopWords = STOP_WORDS_EN, lang = 'en') {
  if (participants.length < 2) return null;
  // Find least active participant
  const leastActive = [...participants].sort((a, b) => (msgCounts[a] || 0) - (msgCounts[b] || 0))[0];

  // Build name tokens to exclude
  const nameTokens = new Set();
  participants.forEach(name => {
    name.toLowerCase().split(/\s+/).forEach(token => { if (token.length > 0) nameTokens.add(token); });
  });

  // Find messages sent by others just before leastActive replies
  const precedingWords = {};
  for (let i = 1; i < filtered.length; i++) {
    const curr = filtered[i];
    const prev = filtered[i - 1];
    if (curr.sender === leastActive && prev.sender !== leastActive) {
      const cleaned = lang === 'he'
        ? prev.content.toLowerCase().replace(/[^א-תa-z\s]/g, ' ')
        : prev.content.toLowerCase().replace(/[^a-z\s]/g, ' ');
      const words = cleaned.split(/\s+/).filter(w => w.length > 1 && !stopWords.has(w) && !nameTokens.has(w) && !MEDIA_STOP_WORDS.has(w));
      words.forEach(w => { precedingWords[w] = (precedingWords[w] || 0) + 1; });
    }
  }

  const sorted = Object.entries(precedingWords).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return null;

  return { user: leastActive, keyword: sorted[0][0], triggerCount: sorted[0][1] };
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export function generateMockData(mode = 'couple') {
  if (mode === 'family') return generateFamilyMockData();
  if (mode === 'friends') return generateFriendsMockData();
  return generateCoupleMockData();
}

function generateCoupleMockData() {
  const participants = ['Alex', 'Jordan'];
  return {
    participants,
    mode: 'couple',
    totalMessages: 14382,
    msgCounts: { Alex: 7841, Jordan: 6541 },
    hourlyData: Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      total: Math.floor(Math.sin(h / 3) * 150 + 180 + Math.random() * 60),
      Alex: Math.floor(Math.random() * 160 + 20),
      Jordan: Math.floor(Math.random() * 140 + 20),
    })),
    dayOfWeekData: [
      { day: 'Sunday', count: 1200 }, { day: 'Monday', count: 980 },
      { day: 'Tuesday', count: 1450 }, { day: 'Wednesday', count: 2100 },
      { day: 'Thursday', count: 1870 }, { day: 'Friday', count: 3200 },
      { day: 'Saturday', count: 2850 },
    ],
    topWords: [
      { word: 'literally', count: 342 }, { word: 'obsessed', count: 287 },
      { word: 'bruh', count: 241 }, { word: 'actually', count: 198 },
      { word: 'insane', count: 175 }, { word: 'lowkey', count: 143 },
      { word: 'bestie', count: 121 }, { word: 'vibes', count: 98 },
      { word: 'frfr', count: 87 }, { word: 'periodt', count: 72 },
    ],
    signatureEmojis: { Alex: '😂', Jordan: '❤️' },
    laughCounts: { Alex: 423, Jordan: 189 },
    nightOwlCounts: { Alex: 234, Jordan: 567 },
    mediaCounts: { Alex: 312, Jordan: 241 },
    capsLockCounts: { Alex: 89, Jordan: 34 },
    organizerScore: { Alex: 120, Jordan: 85 },
    replyTimes: { Alex: 7, Jordan: 148 },
    initiatorCounts: { Alex: 312, Jordan: 189 },
    summoningSpell: null,
    quotes: [
      { sender: 'Alex', content: 'wait that actually happened??' },
      { sender: 'Jordan', content: 'i literally cannot stop laughing' },
      { sender: 'Alex', content: 'bro no way 😭' },
      { sender: 'Jordan', content: 'tell me you did not just say that' },
      { sender: 'Alex', content: 'we need to talk about this rn' },
      { sender: 'Jordan', content: 'okay but why does this always happen to us' },
      { sender: 'Alex', content: 'this is actually so unhinged lmao' },
    ],
    isMock: true,
  };
}

function generateFamilyMockData() {
  const participants = ['Mom', 'Dad', 'Sarah', 'Jake', 'Grandma'];
  return {
    participants,
    mode: 'family',
    totalMessages: 21840,
    msgCounts: { Mom: 8200, Dad: 3100, Sarah: 5400, Jake: 3800, Grandma: 1340 },
    hourlyData: Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      total: Math.floor(Math.random() * 100 + 50),
      Mom: Math.floor(Math.random() * 50 + 10),
      Dad: Math.floor(Math.random() * 20 + 5),
      Sarah: Math.floor(Math.random() * 35 + 8),
      Jake: Math.floor(Math.random() * 28 + 6),
      Grandma: Math.floor(Math.random() * 10 + 2),
    })),
    dayOfWeekData: [
      { day: 'Sunday', count: 4200 }, { day: 'Monday', count: 2100 },
      { day: 'Tuesday', count: 1980 }, { day: 'Wednesday', count: 2300 },
      { day: 'Thursday', count: 2050 }, { day: 'Friday', count: 3100 },
      { day: 'Saturday', count: 6110 },
    ],
    topWords: [
      { word: 'dinner', count: 412 }, { word: 'tomorrow', count: 310 },
      { word: 'home', count: 298 }, { word: 'school', count: 245 },
      { word: 'family', count: 220 }, { word: 'weekend', count: 187 },
      { word: 'love', count: 165 }, { word: 'meeting', count: 143 },
      { word: 'birthday', count: 121 }, { word: 'trip', count: 99 },
    ],
    signatureEmojis: { Mom: '❤️', Dad: '👍', Sarah: '😂', Jake: '🔥', Grandma: '🙏' },
    laughCounts: { Mom: 234, Dad: 45, Sarah: 612, Jake: 389, Grandma: 28 },
    nightOwlCounts: { Mom: 12, Dad: 8, Sarah: 345, Jake: 287, Grandma: 2 },
    mediaCounts: { Mom: 1240, Dad: 180, Sarah: 320, Jake: 210, Grandma: 890 },
    capsLockCounts: { Mom: 421, Dad: 65, Sarah: 89, Jake: 342, Grandma: 312 },
    organizerScore: { Mom: 520, Dad: 120, Sarah: 98, Jake: 65, Grandma: 40 },
    replyTimes: { Mom: 5, Dad: 120, Sarah: 8, Jake: 25, Grandma: 480 },
    initiatorCounts: { Mom: 620, Dad: 110, Sarah: 240, Jake: 180, Grandma: 40 },
    summoningSpell: null,
    quotes: [
      { sender: 'Mom', content: 'Dinner at 7, everyone please be on time!' },
      { sender: 'Dad', content: 'Ok' },
      { sender: 'Sarah', content: 'omg dad that is literally all you ever say 😂' },
      { sender: 'Jake', content: 'I CANT BREATHE 💀' },
      { sender: 'Grandma', content: 'What is LOL? Is someone laughing?' },
      { sender: 'Mom', content: 'JAKE HAVE YOU EATEN TODAY' },
    ],
    isMock: true,
  };
}

function generateFriendsMockData() {
  const participants = ['Marcus', 'Priya', 'Dave', 'Zoe', 'Liam'];
  return {
    participants,
    mode: 'friends',
    totalMessages: 32410,
    msgCounts: { Marcus: 9800, Priya: 8200, Dave: 1940, Zoe: 7600, Liam: 4870 },
    hourlyData: Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      total: Math.floor(Math.random() * 180 + 80),
      Marcus: Math.floor(Math.random() * 60 + 20),
      Priya: Math.floor(Math.random() * 55 + 15),
      Dave: Math.floor(Math.random() * 15 + 2),
      Zoe: Math.floor(Math.random() * 50 + 18),
      Liam: Math.floor(Math.random() * 35 + 10),
    })),
    dayOfWeekData: [
      { day: 'Sunday', count: 2800 }, { day: 'Monday', count: 3200 },
      { day: 'Tuesday', count: 3900 }, { day: 'Wednesday', count: 4100 },
      { day: 'Thursday', count: 4800 }, { day: 'Friday', count: 7600 },
      { day: 'Saturday', count: 6010 },
    ],
    topWords: [
      { word: 'bro', count: 1240 }, { word: 'literally', count: 890 },
      { word: 'fifa', count: 342 }, { word: 'insane', count: 710 },
      { word: 'bruh', count: 680 }, { word: 'dead', count: 590 },
      { word: 'lowkey', count: 450 }, { word: 'facts', count: 380 },
      { word: 'ngl', count: 310 }, { word: 'goat', count: 270 },
    ],
    signatureEmojis: { Marcus: '💀', Priya: '😭', Dave: '⚽', Zoe: '🔥', Liam: '😂' },
    laughCounts: { Marcus: 1820, Priya: 1340, Dave: 120, Zoe: 1560, Liam: 980 },
    nightOwlCounts: { Marcus: 820, Priya: 340, Dave: 45, Zoe: 1240, Liam: 620 },
    mediaCounts: { Marcus: 640, Priya: 520, Dave: 80, Zoe: 810, Liam: 380 },
    capsLockCounts: { Marcus: 380, Priya: 210, Dave: 45, Zoe: 520, Liam: 290 },
    organizerScore: { Marcus: 210, Priya: 380, Dave: 30, Zoe: 290, Liam: 180 },
    replyTimes: { Marcus: 4, Priya: 6, Dave: 180, Zoe: 5, Liam: 12 },
    initiatorCounts: { Marcus: 480, Priya: 390, Dave: 20, Zoe: 420, Liam: 250 },
    summoningSpell: { user: 'Dave', keyword: 'FIFA', triggerCount: 89 },
    quotes: [
      { sender: 'Marcus', content: 'bro I am actually DEAD 💀' },
      { sender: 'Priya', content: 'why does this always happen to us lmao' },
      { sender: 'Zoe', content: 'I cannot with you people 😭' },
      { sender: 'Liam', content: 'ngl that was kinda unhinged' },
      { sender: 'Dave', content: 'FIFA anyone? 👀' },
      { sender: 'Marcus', content: 'Dave appears from the void' },
    ],
    isMock: true,
  };
}