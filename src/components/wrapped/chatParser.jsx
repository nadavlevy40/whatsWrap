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

const LAUGH_PATTERNS = /(\b(haha+|hah|hehe+|hhh+|lol|lmao|lmfao|rofl|dead|weak)\b|😂|🤣|💀|😭)/gi;
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
  const topWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([word, count]) => ({ word, count }));

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

  // Reply times
  const replyTimes = {};
  participants.forEach(p => (replyTimes[p] = { total: 0, count: 0 }));
  for (let i = 1; i < filtered.length; i++) {
    const prev = filtered[i - 1];
    const curr = filtered[i];
    if (curr.sender !== prev.sender && participants.includes(curr.sender) && participants.includes(prev.sender)) {
      const parseTime = (m) => {
        const parts = m.date.split('/').map(Number);
        const [mm, dd, yy] = parts;
        const year = yy < 100 ? 2000 + yy : yy;
        const h = m.hour;
        const minMatch = m.time.match(/:(\d{2})/);
        const min = minMatch ? parseInt(minMatch[1]) : 0;
        return new Date(year, mm - 1, dd, h, min).getTime();
      };
      const delta = (parseTime(curr) - parseTime(prev)) / 60000; // minutes
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

  // Conversation starters (message after 6h silence)
  const initiatorCounts = {};
  participants.forEach(p => (initiatorCounts[p] = 0));
  for (let i = 1; i < filtered.length; i++) {
    const prev = filtered[i - 1];
    const curr = filtered[i];
    const parseTime2 = (m) => {
      const parts = m.date.split('/').map(Number);
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
    const parts = m.date.split('/');
    if (parts.length >= 3) {
      let [mm, dd, yy] = parts.map(Number);
      const year = yy < 100 ? 2000 + yy : yy;
      const d = new Date(year, mm - 1, dd);
      if (!isNaN(d)) dayCountsArr[d.getDay()]++;
    }
  });
  const dayOfWeekData = DAY_NAMES.map((day, i) => ({ day, count: dayCountsArr[i] }));

  // Media counts (images, stickers, videos, gifs)
  const mediaCounts = {};
  participants.forEach(p => (mediaCounts[p] = 0));
  filtered.forEach(m => {
    if (m.content.includes('omitted') || /\.(jpg|jpeg|png|gif|mp4|webp)/i.test(m.content)) {
      if (mediaCounts[m.sender] !== undefined) mediaCounts[m.sender]++;
    }
  });

  // Caps lock counts
  const capsLockCounts = {};
  participants.forEach(p => (capsLockCounts[p] = 0));
  filtered.forEach(m => {
    const words = m.content.split(/\s+/);
    words.forEach(w => {
      if (w.length >= 3 && w === w.toUpperCase() && /[A-Z]/.test(w)) {
        if (capsLockCounts[m.sender] !== undefined) capsLockCounts[m.sender]++;
      }
    });
  });

  // Organizer score (dinner, time, when, plan, meet, schedule, where, tomorrow, tonight, today)
  const ORGANIZER_WORDS = new Set(['dinner', 'lunch', 'meeting', 'meet', 'plan', 'plans', 'schedule', 'tomorrow', 'tonight', 'today', 'where', 'when', 'come', 'coming', 'join', 'time', 'date', 'birthday', 'party', 'event']);
  const organizerScore = {};
  participants.forEach(p => (organizerScore[p] = 0));
  filtered.forEach(m => {
    const words = m.content.toLowerCase().split(/\s+/);
    words.forEach(w => {
      if (ORGANIZER_WORDS.has(w) && organizerScore[m.sender] !== undefined) organizerScore[m.sender]++;
    });
  });

  // Summoning spells: find low-activity users and what triggers them
  const allParticipants = sortedSenders.map(([name]) => name);
  const summoningSpells = [];
  if (allParticipants.length > 2) {
    const avgMsg = userMessages.length / allParticipants.length;
    const lowActivity = allParticipants.filter(p => (senderCounts[p] || 0) < avgMsg * 0.5);
    
    lowActivity.slice(0, 2).forEach(targetUser => {
      const triggerWords = {};
      const allFiltered = userMessages.filter(m => 
        !m.content.includes('end-to-end encrypted') && !m.content.includes('Messages and calls')
      );
      
      for (let i = 1; i < allFiltered.length; i++) {
        if (allFiltered[i].sender === targetUser) {
          // Look at previous 3 messages
          for (let j = Math.max(0, i - 3); j < i; j++) {
            const words = allFiltered[j].content.toLowerCase()
              .replace(/[^a-z\s]/g, ' ').split(/\s+/)
              .filter(w => w.length > 3 && !STOP_WORDS.has(w));
            words.forEach(w => { triggerWords[w] = (triggerWords[w] || 0) + 1; });
          }
        }
      }
      
      const topTriggers = Object.entries(triggerWords).sort((a, b) => b[1] - a[1]).slice(0, 3);
      if (topTriggers.length > 0) {
        summoningSpells.push({
          user: targetUser,
          keywords: topTriggers.map(([w]) => w),
          activations: topTriggers[0][1],
        });
      }
    });
  }

  const suggestedMode = allParticipants.length > 2 ? 'friends' : 'couple';

  return { 
    participants, 
    allParticipants,
    totalMessages: filtered.length, 
    msgCounts, 
    hourlyData, 
    dayOfWeekData, 
    topWords, 
    signatureEmojis, 
    laughCounts, 
    nightOwlCounts, 
    quotes, 
    replyTimes: avgReplyTimes, 
    initiatorCounts, 
    mediaCounts,
    capsLockCounts,
    organizerScore,
    summoningSpells,
    suggestedMode,
    isMock: false 
  };
}

export function generateMockData(mode = 'couple') {
  if (mode === 'family') return generateFamilyMockData();
  if (mode === 'friends') return generateFriendsMockData();
  return generateCoupleMockData();
}

function generateCoupleMockData() {
  const participants = ['Alex', 'Jordan'];
  return {
    participants,
    allParticipants: participants,
    suggestedMode: 'couple',
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
      { word: 'lowkey',    count: 143 },
      { word: 'bestie',    count: 121 },
      { word: 'vibes',     count: 98 },
      { word: 'frfr',      count: 87 },
      { word: 'periodt',   count: 72 },
    ],
    signatureEmojis: { Alex: '😂', Jordan: '❤️' },
    laughCounts: { Alex: 423, Jordan: 189 },
    nightOwlCounts: { Alex: 234, Jordan: 567 },
    mediaCounts: { Alex: 312, Jordan: 148 },
    capsLockCounts: { Alex: 89, Jordan: 34 },
    organizerScore: { Alex: 120, Jordan: 44 },
    summoningSpells: [],
    replyTimes: { Alex: 7, Jordan: 148 },
    initiatorCounts: { Alex: 312, Jordan: 189 },
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

function generateFamilyMockData() {
  const participants = ['Mom', 'Dad', 'Sarah', 'Tom', 'Gran'];
  return {
    participants,
    allParticipants: participants,
    suggestedMode: 'family',
    totalMessages: 28741,
    msgCounts: { Mom: 9200, Dad: 4100, Sarah: 7800, Tom: 5900, Gran: 1741 },
    hourlyData: Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      total: Math.floor(Math.random() * 200 + 50),
      ...Object.fromEntries(participants.map(p => [p, Math.floor(Math.random() * 80 + 5)])),
    })),
    dayOfWeekData: [
      { day: 'Sunday',    count: 4800 },
      { day: 'Monday',    count: 3200 },
      { day: 'Tuesday',   count: 2900 },
      { day: 'Wednesday', count: 3100 },
      { day: 'Thursday',  count: 3400 },
      { day: 'Friday',    count: 5200 },
      { day: 'Saturday',  count: 6141 },
    ],
    topWords: [
      { word: 'dinner', count: 412 },
      { word: 'tomorrow', count: 320 },
      { word: 'love', count: 290 },
      { word: 'coming', count: 245 },
      { word: 'meeting', count: 200 },
      { word: 'birthday', count: 178 },
      { word: 'sunday', count: 154 },
      { word: 'food', count: 131 },
      { word: 'beautiful', count: 110 },
      { word: 'holiday', count: 88 },
    ],
    signatureEmojis: { Mom: '❤️', Dad: '👍', Sarah: '😂', Tom: '🔥', Gran: '🌹' },
    laughCounts: { Mom: 210, Dad: 80, Sarah: 540, Tom: 320, Gran: 45 },
    nightOwlCounts: { Mom: 12, Dad: 8, Sarah: 290, Tom: 180, Gran: 2 },
    mediaCounts: { Mom: 1240, Dad: 320, Sarah: 450, Tom: 280, Gran: 88 },
    capsLockCounts: { Mom: 340, Dad: 510, Sarah: 120, Tom: 200, Gran: 60 },
    organizerScore: { Mom: 480, Dad: 120, Sarah: 90, Tom: 60, Gran: 20 },
    summoningSpells: [],
    replyTimes: { Mom: 3, Dad: 45, Sarah: 8, Tom: 22, Gran: 180 },
    initiatorCounts: { Mom: 520, Dad: 200, Sarah: 310, Tom: 180, Gran: 40 },
    quotes: [
      { sender: 'Mom',  content: 'Who wants dinner Sunday? 🍝' },
      { sender: 'Dad',  content: 'JUST SAW THE NEWS 😡' },
      { sender: 'Sarah', content: 'omg i cannot 😂😂😂' },
      { sender: 'Gran', content: 'Good morning my darlings 🌹' },
      { sender: 'Tom',  content: 'can we please not discuss this rn' },
    ],
    isMock: true,
  };
}

function generateFriendsMockData() {
  const participants = ['Jake', 'Maya', 'Chris', 'Sam', 'Dave'];
  return {
    participants,
    allParticipants: participants,
    suggestedMode: 'friends',
    totalMessages: 41280,
    msgCounts: { Jake: 11200, Maya: 9800, Chris: 10400, Sam: 8700, Dave: 1180 },
    hourlyData: Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      total: Math.floor(Math.random() * 300 + 80),
      ...Object.fromEntries(participants.map(p => [p, Math.floor(Math.random() * 120 + 10)])),
    })),
    dayOfWeekData: [
      { day: 'Sunday',    count: 4200 },
      { day: 'Monday',    count: 5100 },
      { day: 'Tuesday',   count: 4800 },
      { day: 'Wednesday', count: 6200 },
      { day: 'Thursday',  count: 6900 },
      { day: 'Friday',    count: 9100 },
      { day: 'Saturday',  count: 4980 },
    ],
    topWords: [
      { word: 'bro', count: 890 },
      { word: 'actually', count: 760 },
      { word: 'insane', count: 640 },
      { word: 'fifa', count: 580 },
      { word: 'bruh', count: 510 },
      { word: 'gaming', count: 430 },
      { word: 'lowkey', count: 380 },
      { word: 'frfr', count: 320 },
      { word: 'wild', count: 290 },
      { word: 'snack', count: 240 },
    ],
    signatureEmojis: { Jake: '💀', Maya: '😭', Chris: '🔥', Sam: '😭', Dave: '🎮' },
    laughCounts: { Jake: 820, Maya: 710, Chris: 900, Sam: 650, Dave: 42 },
    nightOwlCounts: { Jake: 540, Maya: 290, Chris: 680, Sam: 420, Dave: 28 },
    mediaCounts: { Jake: 620, Maya: 480, Chris: 710, Sam: 390, Dave: 55 },
    capsLockCounts: { Jake: 340, Maya: 210, Chris: 480, Sam: 310, Dave: 18 },
    organizerScore: { Jake: 180, Maya: 320, Chris: 140, Sam: 290, Dave: 20 },
    summoningSpells: [
      {
        user: 'Dave',
        keywords: ['fifa', 'gaming', 'ps5'],
        activations: 47,
      },
    ],
    replyTimes: { Jake: 4, Maya: 6, Chris: 3, Sam: 9, Dave: 240 },
    initiatorCounts: { Jake: 480, Maya: 390, Chris: 520, Sam: 310, Dave: 15 },
    quotes: [
      { sender: 'Chris', content: 'bro i am DEAD 💀' },
      { sender: 'Jake',  content: 'this is so unhinged lmao' },
      { sender: 'Maya',  content: 'why does this always happen to us' },
      { sender: 'Dave',  content: 'anyone up for FIFA later?' },
      { sender: 'Sam',   content: 'ok but fr tho 😭' },
      { sender: 'Jake',  content: 'mention FIFA and Dave wakes up' },
    ],
    isMock: true,
  };
}