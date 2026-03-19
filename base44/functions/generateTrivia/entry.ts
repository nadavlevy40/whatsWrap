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

    const { chatText, participants, stats } = await req.json();

    if (!chatText || !participants) {
      return Response.json({ error: 'Missing chatText or participants.' }, { status: 400 });
    }

    // Sample from beginning, middle, and end for better coverage
    const len = chatText.length;
    const mid = Math.floor(len / 2);
    const sample = [
      chatText.slice(0, 8000),
      chatText.slice(mid - 4000, mid + 4000),
      chatText.slice(Math.max(0, len - 6000)),
    ].join('\n...\n');

    const statsStr = JSON.stringify(stats || {});

    const systemPrompt = `You are a creative and witty trivia game designer for a WhatsApp chat "Wrapped" experience.
Your job is to analyze a real WhatsApp chat export and generate 6 surprising, fun, and creative trivia questions based on the ACTUAL content of that chat.

Rules:
- Questions must be based on REAL things found in the chat: specific moments, recurring themes, inside jokes, unusual habits, fun patterns, hot topics, surprising statistics etc.
- Be creative: don't just ask "who said X" — vary the question types. Examples of good question types:
  * "Which topic came up the most in [month]?"
  * "How many times did the word X appear — was it more or less than Y?"  
  * "What was the first thing said on [date]?"
  * "Who sent the longest message in the whole chat?"
  * "Which day of the week had the most messages?"
  * "True or False: [specific claim about the chat]"
  * "Fill in the blank: '[partial quote]...'"
  * "How many days passed between [event A] and [event B]?"
  * "Who was more likely to double-text (send 2+ messages in a row)?"
  * "What was the main topic on [a notable date]?"
- Questions should be surprising, fun, and NOT obvious — even someone who was in the chat should have to think.
- Answers should feel satisfying and sometimes unexpected.
- Each question must have exactly 4 answer options, one being correct.
- Make wrong answers plausible but clearly wrong once revealed.
- Return a JSON object with key "questions": array of 6 objects, each with:
  {
    "prompt": string (the question),
    "emoji": string (one relevant emoji),
    "label": string (a short fun category label, e.g. "Hot Topic 🌶️", "Plot Twist 🌀", "Deep Cut 🔍"),
    "options": array of 4 strings,
    "correct": string (must exactly match one of the options),
    "funFact": string (a short fun/surprising explanation shown after answering, 1 sentence)
  }`;

    const userPrompt = `Participants: ${participants.join(', ')}
Chat stats summary: ${statsStr}

Chat sample:
${sample}

Generate 6 creative trivia questions. Return only the JSON object.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    });

    const raw = completion.choices[0].message.content;
    const parsed = JSON.parse(raw);

    return Response.json(parsed);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});