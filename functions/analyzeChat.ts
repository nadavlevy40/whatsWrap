import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';
import OpenAI from 'npm:openai';

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { chatText, fullChatText, mode, stats } = await req.json();

    const chatInput = fullChatText || chatText;
    if (!chatInput || chatInput.length < 100) {
      return Response.json({ error: 'Invalid chat text provided.' }, { status: 400 });
    }

    // Truncate to ~60k chars to stay within token limits
    const truncated = chatInput.slice(0, 60000);

    const systemPrompt = `You are an expert at analyzing WhatsApp chat exports. 
Extract statistics and insights from the provided chat text and return ONLY valid JSON matching the schema exactly.
Rules:
- participants: array of up to 10 unique sender names (strings)
- totalMessages: total message count (number)
- msgCounts: object with participant name keys and message count values
- hourlyData: array of 24 objects, one per hour 0-23, each with { hour, total, ...participantCounts }
- dayOfWeekData: array of 7 objects: { day: "Sunday"|"Monday"|..., count: number }
- topWords: array of up to 10 { word, count } objects — only actual words spoken in messages; EXCLUDE: stop words, short words (<3 chars), system messages, participant names, parts of participant names, and any metadata
- signatureEmojis: object mapping each participant to their most-used emoji (string), use "✨" if none
- laughCounts: object mapping each participant to number of laugh expressions (haha, lol, 😂, etc.)
- nightOwlCounts: object mapping each participant to messages sent between midnight and 5am
- mediaCounts: object mapping each participant to number of media messages sent
- capsLockCounts: object mapping each participant to number of ALL-CAPS words used
- organizerScore: object mapping each participant to a score for planning/organizing messages
- replyTimes: object mapping each participant to their average reply time in minutes
- initiatorCounts: object mapping each participant to number of times they started a new conversation (gap > 6 hours)
- summoningSpell: null OR { user: string, keyword: string, triggerCount: number } - the least active user and what keyword in others' messages triggers their reply
- quotes: array of up to 8 { sender: string, content: string } objects - funny or memorable short messages under 55 chars
- wisdomSentences: array of up to 8 { sender: string, content: string } objects - the most iconic, repeated, or characteristic sentences/phrases used by participants. These should feel like "that's SO something they'd say" — recurring catchphrases, strong opinions, funny observations, or philosophical one-liners. Under 80 chars each, must be actual messages from the chat.`;

    const participantsNote = `IMPORTANT: 
1. Participant names are the message authors (text before the colon, e.g. "Alice:", "Bob:"). Do NOT include any participant names or parts of their names in topWords, quotes, or summoningSpell keywords.
2. IGNORE and EXCLUDE all media placeholder messages such as: "image omitted", "video omitted", "audio omitted", "sticker omitted", "document omitted", "‎<Media omitted>", "התמונה הושמטה", "הסרטון הושמט", "הקובץ הושמט", "המדיה הושמטה", "הסטיקר הושמט", "האודיו הושמט", "המסמך הושמט" — these are NOT real messages and should NOT be counted or referenced anywhere.
3. Also ignore WhatsApp system messages like "end-to-end encrypted", "created group", "added", "left", etc.`;
    const userPrompt = `Mode: ${mode}\n\n${participantsNote}\n\nChat export:\n${truncated}\n\nReturn only the JSON object, no markdown.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const raw = completion.choices[0].message.content;
    const parsed = JSON.parse(raw);

    // Ensure hourlyData has all 24 hours
    if (!parsed.hourlyData || parsed.hourlyData.length < 24) {
      const existing = (parsed.hourlyData || []).reduce((acc, h) => { acc[h.hour] = h; return acc; }, {});
      parsed.hourlyData = Array.from({ length: 24 }, (_, h) => existing[h] || { hour: h, total: 0 });
    }

    // Ensure dayOfWeekData has all 7 days
    const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (!parsed.dayOfWeekData || parsed.dayOfWeekData.length < 7) {
      const existing = (parsed.dayOfWeekData || []).reduce((acc, d) => { acc[d.day] = d; return acc; }, {});
      parsed.dayOfWeekData = DAY_NAMES.map(day => existing[day] || { day, count: 0 });
    }

    parsed.isMock = false;
    parsed.mode = mode;

    // Pre-build trivia questions so they're ready when the user reaches that slide
    try {
      const len = truncated.length;
      const mid = Math.floor(len / 2);
      const triviaSample = [
        truncated.slice(0, 8000),
        truncated.slice(mid - 4000, mid + 4000),
        truncated.slice(Math.max(0, len - 6000)),
      ].join('\n...\n');

      const statsStr = JSON.stringify({
        totalMessages: parsed.totalMessages,
        msgCounts: parsed.msgCounts,
        topWords: parsed.topWords,
        laughCounts: parsed.laughCounts,
        nightOwlCounts: parsed.nightOwlCounts,
        replyTimes: parsed.replyTimes,
        initiatorCounts: parsed.initiatorCounts,
        signatureEmojis: parsed.signatureEmojis,
      });

      const triviaSystem = `You are a creative and witty trivia game designer for a WhatsApp chat "Wrapped" experience.
Generate 6 surprising, fun, creative trivia questions based on ACTUAL content of the chat.
Rules:
- Questions must be based on REAL things found in the chat: specific moments, recurring themes, inside jokes, unusual habits, fun patterns.
- Be creative and vary question types. Good examples:
  * "Which topic came up the most in [month]?"
  * "Who sent the longest message in the whole chat?"
  * "Fill in the blank: '[partial quote]...'"
  * "Who was more likely to double-text?"
- Questions should be surprising — even someone in the chat should have to think.
- Each question must have exactly 4 answer options, one being correct.
- Return JSON with key "questions": array of 6 objects:
  { "prompt": string, "emoji": string, "label": string, "options": [4 strings], "correct": string, "funFact": string }`;

      const triviaUser = `Participants: ${(parsed.participants || []).join(', ')}
Chat stats: ${statsStr}

IMPORTANT: Lines containing "image omitted", "video omitted", "audio omitted", "sticker omitted", "document omitted", "<Media omitted>", "התמונה הושמטה", "הסרטון הושמט", "הקובץ הושמט", "המדיה הושמטה", "הסטיקר הושמט", "האודיו הושמט", "המסמך הושמט" are system placeholders — NOT real messages. Ignore them completely.

Chat sample:
${triviaSample}

Generate 6 creative trivia questions. Return only JSON.`;

      const triviaCompletion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: triviaSystem },
          { role: 'user', content: triviaUser },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.8,
      });

      const triviaRaw = triviaCompletion.choices[0].message.content;
      const triviaParsed = JSON.parse(triviaRaw);
      if (triviaParsed?.questions?.length > 0) {
        parsed.triviaQuestions = triviaParsed.questions;
      }
    } catch (_e) {
      // Trivia pre-build failed — SlideTrivia will fall back to local questions
    }

    return Response.json(parsed);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});