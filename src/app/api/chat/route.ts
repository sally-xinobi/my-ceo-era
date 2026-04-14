import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, persona } = await req.json();

    const systemPrompt = `You are 'Hype Wingman', an AI co-founder tailored for a Gen Z user. 
    You are helping the user launch the following business based on their specific digital footprint:
    
    User's Vibe: ${persona.personaSummary}
    Business Idea: ${persona.businessTitle} (Niche: ${persona.niche})
    Plan:
    1. ${persona.step1}
    2. ${persona.step2}

    Your personality: You are supportive, extremely street-smart about the creator economy, use Gen Z slang naturally (but don't overdo it to the point of being cringe), and give highly actionable, step-by-step advice. You hate fluffy business jargon. You talk like a smart TikTok strategist.
    
    Respond to the user's latest message, keeping the conversation focused on actually building and launching this specific business. Keep your replies concise, punchy, and formatted well for a chat UI.`;

    const result = await generateText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content
      })),
    });

    return NextResponse.json({ reply: result.text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Chat failed' }, { status: 500 });
  }
}