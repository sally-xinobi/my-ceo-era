import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';

// Ensure you have OPENAI_API_KEY in your .env
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { handle } = await req.json();

    // In a real app, you would scrape TikTok/Reddit here based on the handle.
    // For this prototype, we simulate the scraping by passing the handle 
    // to the LLM to invent a highly specific, Gen Z aesthetic persona.

    const result = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        personaSummary: z.string().describe("A slightly snarky but highly accurate 1-sentence summary of their Gen Z aesthetic (e.g., 'Cozy Gamer Girl who complains about back pain on Reddit but has a pristine desk setup on TikTok.')"),
        businessTitle: z.string().describe("Catchy title of the business they should start (e.g., 'Digital Notion Templates')"),
        niche: z.string().describe("Their specific aesthetic niche (e.g., 'Cozy Productivity')"),
        step1: z.string().describe("Step 1: What is the exact digital product they should make based on their vibe? Keep it short and actionable."),
        step2: z.string().describe("Step 2: How to funnel traffic using their current platform (e.g., Stan Store link + 7 second aesthetic TikToks).")
      }),
      prompt: `Act as a hyper-intelligent, Gen-Z digital footprint analyst and business strategist. 
      Analyze the TikTok handle "${handle}".
      
      Since we don't have real data, invent a highly realistic, hyper-specific Gen Z / TikTok persona for this handle. 
      Assume they are active on TikTok, Pinterest, and Reddit.
      
      Based on this invented persona, create a highly specific, low-overhead digital business they could launch today. 
      The business must perfectly match their aesthetic/vibe so it feels authentic to their followers.`,
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to analyze footprint' }, { status: 500 });
  }
}