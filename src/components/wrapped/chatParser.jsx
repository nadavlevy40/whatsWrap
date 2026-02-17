// WhatsApp chat parser - handles standard export format
const STOP_WORDS = new Set([
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

const LAUGH_PATTERNS = /\b(haha|hahaha|hahahaha|lol|lmao|lmfao|hehe|hihi)\b/gi;
const EMOJI_REGEX = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;

export function parseChatFile(text) {
  const lines = text.split('\n');
  const messages = [];

  const patterns = [
    /^\[(\d{1,2}\/\d{1,2}\/\d{2,4}),\s*(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\]\s*([^:]+):\s*(.*)/i,
    /^(\d{1,2}\/\d{1,2}\/\d{2,4}),\s*(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\s*-\s*([^:]+):\s*(.*)/i,
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
  return analyzeMessages(messages);
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

function analyzeMessages(messages) {
  if (messages.length === 0) return null;

  const userMessages = messages.filter(m =>
    m.sender && m.sender.length > 0 &&
    !m.content.includes('end-to-end encrypted') &&
    !m.content.includes('created group') &&
    !m.content.includes('Messages and calls')
  );

  const senderCounts = {};
  userMessages.forEach(m => { senderCounts[m.sender] = (senderCounts[m.sender] || 0) + 1; });
  const sortedSenders = Object.entries(senderCounts).sort((a, b) => b[1] - a[1]);
  const participants = sortedSenders.slice(0, 2).map(([name]) => name);
  const filtered = userMessages.filter(m => participants.includes(m.sender));

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

  const wordCounts = {};
  filtered.forEach(m => {
    const words = m.content.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !STOP_WORDS.has(w));
    words.forEach(w => { wordCounts[w] = (wordCounts[w] || 0) + 1; });
  });
  const topWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([word, count]) => ({ word, count }));

  const emojiCounts = {};
  participants.forEach(p => (emojiCounts[p] = {}));
  filtered.forEach(m => {
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

  const laughCounts = {};
  participants.forEach(p => (laughCounts[p] = 0));
  filtered.forEach(m => {
    const matches = m.content.match(LAUGH_PATTERNS) || [];
    if (laughCounts[m.sender] !== undefined) laughCounts[m.sender] += matches.length;
  });

  const nightOwlCounts = {};
  participants.forEach(p => (nightOwlCounts[p] = 0));
  filtered.forEach(m => {
    if (m.hour >= 0 && m.hour < 5 && nightOwlCounts[m.sender] !== undefined) nightOwlCounts[m.sender]++;
  });

  const quotes = filtered
    .filter(m => m.content.length > 8 && m.content.length < 55 && !m.content.includes('omitted') && !m.content.includes('http') && !m.content.includes('www'))
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayCountsArr = Array(7).fill(0);
  filtered.forEach(m => {
    const parts = m.date.split('/');
    if (parts.length >= 3) {
      let [mm, dd, yy] = parts.map(Number);
      const year = yy < 100 ? 2000 + yy : yy;
      const d = new Date(year, mm - 1, dd);
      if (!isNaN(d)) dayCountsArr[d.getDay()]++;
    }
  });
  const dayOfWeekData = DAY_NAMES.map((day, i) => ({ day, count: dayCountsArr[i] }));

  return { participants, totalMessages: filtered.length, msgCounts, hourlyData, dayOfWeekData, topWords, signatureEmojis, laughCounts, nightOwlCounts, quotes, isMock: false };
}

export function generateMockData() {
  const participants = ['Alex', 'Jordan'];
  return {
    participants,
    totalMessages: 14382,
    msgCounts: { Alex: 7841, Jordan: 6541 },
    hourlyData: Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      total: Math.floor(Math.sin(h / 3) * 150 + 180 + Math.random() * 60),
      Alex: Math.floor(Math.random() * 160 + 20),
      Jordan: Math.floor(Math.random() * 140 + 20),
    })),
    dayOfWeekData: [
      { day: 'Sunday',    count: 1200 },
      { day: 'Monday',    count: 980 },
      { day: 'Tuesday',   count: 1450 },
      { day: 'Wednesday', count: 2100 },
      { day: 'Thursday',  count: 1870 },
      { day: 'Friday',    count: 3200 },
      { day: 'Saturday',  count: 2850 },
    ],
    topWords: [
      { word: 'literally', count: 342 },
      { word: 'obsessed',  count: 287 },
      { word: 'bruh',      count: 241 },
      { word: 'actually',  count: 198 },
      { word: 'insane',    count: 175 },
    ],
    signatureEmojis: { Alex: '😂', Jordan: '❤️' },
    laughCounts: { Alex: 423, Jordan: 189 },
    nightOwlCounts: { Alex: 234, Jordan: 567 },
    quotes: [
      { sender: 'Alex',   content: 'wait that actually happened??' },
      { sender: 'Jordan', content: 'i literally cannot stop laughing' },
      { sender: 'Alex',   content: 'bro no way 😭' },
      { sender: 'Jordan', content: 'tell me you did not just say that' },
      { sender: 'Alex',   content: 'we need to talk about this rn' },
      { sender: 'Jordan', content: 'okay but why does this always happen to us' },
      { sender: 'Alex',   content: 'this is actually so unhinged lmao' },
    ],
    isMock: true,
  };
}