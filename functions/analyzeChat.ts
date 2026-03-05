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

    const { chatText, condensedChatText, mode, localStats } = await req.json();

    if (!chatText || chatText.length < 100) {
      return Response.json({ error: 'Invalid chat text provided.' }, { status: 400 });
    }

    // Use condensedChatText (pre-stripped by parser) if available, else truncate raw
    const fullChat = condensedChatText
      ? condensedChatText.slice(0, 80000)
      : chatText.slice(0, 60000);

    const systemPrompt = `You are an expert at analyzing WhatsApp chat exports.
Read the ENTIRE provided chat history to understand deep dynamics, inside jokes, personality shifts, recurring themes, and emotional patterns over time.
Extract statistics and insights and return ONLY valid JSON matching the schema exactly.
Rules:
- participants: array of up to 10 unique sender names (strings)
- totalMessages: total message count (number)
- msgCounts: object with participant name keys and message count values
- hourlyData: array of 24 objects, one per hour 0-23, each with { hour, total, ...participantCounts }
- dayOfWeekData: array of 7 objects: { day: "Sunday"|"Monday"|..., count: number }
- topWords: array of up to 10 { word, count } objects — only actual words spoken; EXCLUDE stop words, short words (<3 chars), system messages, participant names, media placeholders
- signatureEmojis: object mapping each participant to their most-used emoji, use "✨" if none
- laughCounts: object mapping each participant to number of laugh expressions
- nightOwlCounts: object mapping each participant to messages sent between midnight and 5am
- mediaCounts: object mapping each participant to number of media messages
- capsLockCounts: object mapping each participant to ALL-CAPS word count
- organizerScore: object mapping each participant to planning/organizing message count
- replyTimes: object mapping each participant to average reply time in minutes
- initiatorCounts: object mapping each participant to conversation starters (gap > 6 hours)
- summoningSpell: null OR { user: string, keyword: string, triggerCount: number }
- quotes: array of up to 8 { sender, content } — funny/memorable messages under 55 chars
- wisdomSentences: array of up to 8 { sender, content } — iconic catchphrases or recurring lines, under 80 chars
- aiInsights: object shaped differently per mode (see below)

For mode="couple", aiInsights must be:
{ "dynamic": string (e.g. "Black Cat & Golden Retriever"), "blackCatUser": string, "goldenRetrieverUser": string, "dynamicRoast": string (funny 2-sentence roast based on the whole chat), "evolution": string (how it started vs how it's going), "mostApologetic": string }

For mode="friends", aiInsights must be:
{ "unhingedQuote": { "sender": string, "text": string (most bizarre out-of-context quote) }, "delusionalAward": { "user": string, "reason": string }, "therapist": string, "patient": string }

For mode="family", aiInsights must be:
{ "boomerScores": { [name]: number 0-100 }, "ignoredAward": { "user": string, "roast": string } }`;

    const participantsNote = `IMPORTANT:
1. Participant names are message authors (text before the colon). Do NOT include names in topWords, quotes, or summoningSpell keywords.
2. IGNORE all media placeholder messages: "image omitted", "video omitted", "audio omitted", "sticker omitted", "document omitted", "<Media omitted>", "הושמט", "הושמטה" and related Hebrew variants. These are NOT real messages.
3. Also ignore WhatsApp system messages like "end-to-end encrypted", "created group", "added", "left", etc.`;

    const userPrompt = `Mode: ${mode}\n\n${participantsNote}\n\nFull chat history:\n${fullChat}\n\nReturn only the JSON object, no markdown.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.4,
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