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

    const { chatText, mode } = await req.json();

    if (!chatText || chatText.length < 100) {
      return Response.json({ error: 'Invalid chat text provided.' }, { status: 400 });
    }

    // Truncate to ~60k chars to stay within token limits
    const truncated = chatText.slice(0, 60000);

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
- quotes: array of up to 8 { sender: string, content: string } objects - funny or memorable short messages under 55 chars`;

    const userPrompt = `Mode: ${mode}\n\nChat export:\n${truncated}\n\nReturn only the JSON object, no markdown.`;

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

    return Response.json(parsed);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});