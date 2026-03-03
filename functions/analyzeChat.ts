import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';
import OpenAI from 'npm:openai';

const openai = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') });

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const { chatText, mode } = await req.json();

    if (!chatText || chatText.length < 50) {
      return Response.json({ error: 'Chat text too short or missing' }, { status: 400 });
    }

    // Truncate to avoid token limits — take first ~60k characters
    const truncated = chatText.slice(0, 60000);

    const systemPrompt = `You are an expert WhatsApp chat analyst. Analyze the provided WhatsApp chat export and extract detailed statistics. Return ONLY valid JSON matching the exact schema provided.`;

    const userPrompt = `Analyze this WhatsApp chat export and return a JSON object with these exact fields:

{
  "participants": ["array of participant names (max 10, ordered by message count desc)"],
  "totalMessages": number,
  "msgCounts": { "name": count },
  "topWords": [{ "word": "string", "count": number }],
  "signatureEmojis": { "name": "most_used_emoji_or_✨" },
  "laughCounts": { "name": count },
  "nightOwlCounts": { "name": count_of_messages_between_midnight_and_5am },
  "mediaCounts": { "name": count_of_media_messages },
  "capsLockCounts": { "name": count_of_all_caps_words },
  "organizerScore": { "name": score_based_on_planning_words },
  "replyTimes": { "name": avg_minutes_to_reply },
  "initiatorCounts": { "name": count_of_conversation_starts },
  "hourlyData": [{ "hour": 0-23, "total": count, ...per_participant_counts }],
  "dayOfWeekData": [{ "day": "Sunday", "count": number }, ...for all 7 days],
  "quotes": [{ "sender": "name", "content": "short memorable quote under 60 chars" }],
  "summoningSpell": { "user": "least_active_person", "keyword": "word_that_gets_them_talking", "triggerCount": number } or null,
  "aiInsights": {
    "overallVibe": "one sentence describing the group vibe",
    "funniest": "name of funniest person with reason",
    "mostDramatic": "name of most dramatic person",
    "insideJoke": "a detected inside joke or recurring theme",
    "couplescore": number_0_to_100_only_if_2_people,
    "peakDramaDate": "a date or period when things got spicy",
    "groupPersonality": "one fun label like 'Chaotic Neutral Friend Group'"
  },
  "isMock": false
}

Rules:
- topWords: exclude common stop words, min 10 entries
- quotes: pick 6-8 short, funny or memorable quotes from the actual chat
- summoningSpell: find the least active participant and what word/name reliably triggers their response
- hourlyData: must have exactly 24 entries (hour 0-23)
- dayOfWeekData: must have exactly 7 entries
- Be accurate - use the actual data from the chat

Chat export:
${truncated}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const raw = response.choices[0].message.content;
    const parsed = JSON.parse(raw);

    // Ensure hourlyData has all 24 hours
    if (!parsed.hourlyData || parsed.hourlyData.length !== 24) {
      parsed.hourlyData = Array.from({ length: 24 }, (_, h) => {
        const existing = (parsed.hourlyData || []).find(d => d.hour === h);
        return existing || { hour: h, total: 0 };
      });
    }

    // Ensure dayOfWeekData has all 7 days
    const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    if (!parsed.dayOfWeekData || parsed.dayOfWeekData.length !== 7) {
      parsed.dayOfWeekData = DAY_NAMES.map(day => {
        const existing = (parsed.dayOfWeekData || []).find(d => d.day === day);
        return existing || { day, count: 0 };
      });
    }

    parsed.isMock = false;
    parsed.mode = mode || 'couple';

    return Response.json(parsed);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});